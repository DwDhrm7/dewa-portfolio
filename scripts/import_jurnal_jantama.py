#!/usr/bin/env python3
"""Rebuild the three Jurnal Jantama novels in src/data/writer-content.json from their Word manuscripts.

    python3 scripts/import_jurnal_jantama.py "/path/to/folder/with/Jurnal_Jantama_Seri_1.docx"

The folder must hold Jurnal_Jantama_Seri_1.docx, _2.docx and _3.docx. Series 1 and 2 are imported whole; Series 3
is a Preview made of the post-office scene of its prologue plus three lines quoted from Series 2. Only the chapters
and reading time change; titles, covers, dates, synopses and typography settings stay as they are on the site.

Typography is carried over from the manuscript:
  inline    <b> <i> <sc> (small caps) <sup>
  blocks    a leading TAB = indented prose; ::tr:: ::pg:: ::news:: ::lead:: ::date:: ::formula:: ::term:: ::defn::
            ::ref:: ::quote::; "## " headings, "### " card headings, "| a | b |" tables, "1.\\t" list items,
            "* * *" scene breaks. The reader (src/app/writer/read/[slug]/Reader.tsx) draws all of these.
"""
import collections
import json
import re
import sys
import unicodedata
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
SUP = str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹")
CHAPTER_MARK = re.compile(r"^(PROLOG|EPISODE \d+|LAMPIRAN)$")
KINDS = {"tr", "pg", "news", "lead", "date", "formula", "term", "defn", "ref", "quote"}
DATA = Path(__file__).resolve().parent.parent / "src" / "data" / "writer-content.json"

NOVELS = {
    1: "novel-jurnal-jantama",
    2: "novel-jurnal-jantama-2",
    3: "novel-jurnal-jantama-3",
}

# Three lines from Series 2 (Halaman 059) that open the Series 3 preview, copied word for word.
QUOTES = [
    "> Stempel di resi: Kantor Pos Muara Baru. Tanggal di stempel itu: 14 Oktober 2025.\n> Kurir itu tidak bisa menjelaskan tanggalnya.",
    "> Simpan dua-duanya. Jurnalnya, dan buku kasmu. Jangan ada yang dibuang lagi. Aku akan datang menjemput keduanya.",
    "> Aku tidak tahu siapa ia. Pai tidak tahu. Pak Tom bilang ia tidak tahu, dan untuk pertama kalinya aku percaya ia tidak tahu.",
    "> Buku kas Bu Warsini, Halaman 059",
]


# ---------------------------------------------------------------- reading the .docx


def on(rp, tag):
    if rp is None:
        return False
    e = rp.find(W + tag)
    return e is not None and e.get(W + "val") not in ("0", "false", "none")


def run_text(r, refs=None):
    out = ""
    for ch in r:
        if ch.tag == W + "t":
            out += ch.text or ""
        elif ch.tag == W + "tab":
            out += "\t"
        elif ch.tag in (W + "br", W + "cr") and ch.get(W + "type") != "page":
            out += "\n"
        elif ch.tag == W + "footnoteReference":
            fid = int(ch.get(W + "id"))
            out += str(fid).translate(SUP)
            if refs is not None:
                refs.append(fid)
    return out


def text_of(p, refs=None):
    return "".join(run_text(r, refs) for r in p.iter(W + "r"))


def markup(p, refs=None, drop=()):
    """The paragraph's text with <b>, <i>, <sc> and <sup> where its runs carry that emphasis."""
    parts = []
    for r in p.iter(W + "r"):
        rp = r.find(W + "rPr")
        t = run_text(r, refs)
        if t == "":
            continue
        va = rp.find(W + "vertAlign") if rp is not None else None
        flags = (
            "b" if on(rp, "b") else "",
            "i" if on(rp, "i") and "i" not in drop else "",
            "sc" if on(rp, "smallCaps") and "sc" not in drop else "",
            "sup" if va is not None and va.get(W + "val") == "superscript" else "",
        )
        if parts and parts[-1][0] == flags:
            parts[-1][1] += t
        else:
            parts.append([flags, t])
    out = ""
    for flags, t in parts:
        tags = [x for x in ("sup", "sc", "b", "i") if x in flags]
        if not tags or not t.strip():
            out += t
            continue
        lead = t[: len(t) - len(t.lstrip())]
        trail = t[len(t.rstrip()):]
        out += lead + "".join(f"<{x}>" for x in tags) + t.strip() + "".join(f"</{x}>" for x in reversed(tags)) + trail
    return out


def clean(s):
    s = s.replace(" ", " ")
    s = re.sub(r"[ ]{3,}", "  ", s)
    return s.strip()


def load(path):
    z = zipfile.ZipFile(path)
    doc = ET.fromstring(z.read("word/document.xml"))
    notes = {}
    if "word/footnotes.xml" in z.namelist():
        for f in ET.fromstring(z.read("word/footnotes.xml")).findall(W + "footnote"):
            fid = int(f.get(W + "id"))
            if fid > 0:
                notes[fid] = " ".join(text_of(p) for p in f.iter(W + "p")).strip()
    numfmt = {}
    if "word/numbering.xml" in z.namelist():
        num = ET.fromstring(z.read("word/numbering.xml"))
        abstract = {}
        for a in num.findall(W + "abstractNum"):
            lvl = a.find(W + "lvl")
            fmt = lvl.find(W + "numFmt").get(W + "val") if lvl is not None and lvl.find(W + "numFmt") is not None else "bullet"
            abstract[a.get(W + "abstractNumId")] = fmt
        for n in num.findall(W + "num"):
            numfmt[n.get(W + "numId")] = abstract.get(n.find(W + "abstractNumId").get(W + "val"), "bullet")
    return doc, notes, numfmt


def style_of(p):
    st = p.find(f"{W}pPr/{W}pStyle")
    return st.get(W + "val") if st is not None else ""


def num_of(p):
    n = p.find(f"{W}pPr/{W}numPr/{W}numId")
    return n.get(W + "val") if n is not None else None


def classify(p):
    """Which typographic block this paragraph is, judged by its indents, borders, alignment and runs."""
    pr = p.find(W + "pPr")
    ind_el = pr.find(W + "ind") if pr is not None else None
    ind = {k.replace(W, ""): int(v) for k, v in ind_el.attrib.items()} if ind_el is not None else {}
    jc_el = pr.find(W + "jc") if pr is not None else None
    jc = jc_el.get(W + "val") if jc_el is not None else None
    border = pr is not None and pr.find(W + "pBdr") is not None
    chars = it = sc = 0
    sizes = collections.Counter()
    for r in p.iter(W + "r"):
        t = run_text(r)
        if not t:
            continue
        rp = r.find(W + "rPr")
        chars += len(t)
        it += len(t) if on(rp, "i") else 0
        sc += len(t) if on(rp, "smallCaps") else 0
        s_ = rp.find(W + "sz") if rp is not None else None
        sizes[int(s_.get(W + "val")) if s_ is not None else 24] += len(t)
    if chars == 0:
        return "plain", ()
    italic, small = it >= 0.8 * chars, sc >= 0.8 * chars
    size = sizes.most_common(1)[0][0]
    left, right, hang, first = ind.get("left", 0), ind.get("right", 0), ind.get("hanging", 0), ind.get("firstLine", 0)

    if border and italic and left >= 600:
        return "pg", ("i",)
    if border and not italic and left >= 300 and right > 0 and size <= 21:
        return "news", ()
    if border and italic and 100 <= left < 300:
        return "quote", ("i",)
    if hang and left == hang and not border:
        return ("ref" if left >= 380 else "term"), ()
    if left == 560 and jc == "left" and size == 22:
        return "tr", ()
    if jc == "center" and italic and size <= 22:
        return "date", ("i",)
    if jc == "center" and italic:
        return "formula", ("i",)
    if jc == "left" and small and size >= 24:
        return "lead", ("sc",)
    if left == 340 and not hang and jc == "both":
        return "defn", ()
    if jc == "both" and first > 0 and not border:
        return "indent", ()
    return "plain", ()


def table_md(tbl, refs):
    rows = []
    for tr in tbl.findall(W + "tr"):
        cells = []
        for tc in tr.findall(W + "tc"):
            cells.append(" ".join(clean(text_of(p, refs)) for p in tc.iter(W + "p") if clean(text_of(p))).replace("|", "/"))
        rows.append(cells)
    return "\n".join("| " + " | ".join(r) + " |" for r in rows)


def card_md(tbl, refs):
    paras = []
    for p in tbl.iter(W + "p"):
        plain = clean(text_of(p))
        if plain:
            paras.append((plain, clean(markup(p, refs))))
    head = [x.strip() for x in paras[0][0].split("\t") if x.strip()]
    return ["### " + " · ".join(head)] + [m for _, m in paras[1:]]


def convert(path):
    """The manuscript as a list of chapters: {label, name, blocks}."""
    doc, notes, numfmt = load(path)
    chapters, current, pending_mark, counter = [], None, None, {}

    def flush():
        if current is None:
            return
        if current["refs"]:
            seen = []
            for r in current["refs"]:
                if r not in seen:
                    seen.append(r)
            current["blocks"].append("## Catatan")
            current["blocks"] += [f"{str(r).translate(SUP)} {notes[r]}" for r in seen if r in notes]
        chapters.append(current)

    for el in list(doc.find(W + "body")):
        if el.tag == W + "tbl":
            if current is None:
                continue
            rows = el.findall(W + "tr")
            cols = max(len(r.findall(W + "tc")) for r in rows)
            if cols == 1 and len(rows) == 1:
                current["blocks"] += card_md(el, current["refs"])
            else:
                current["blocks"].append(table_md(el, current["refs"]))
            continue
        if el.tag != W + "p":
            continue

        style = style_of(el)
        plain = clean(text_of(el))

        if CHAPTER_MARK.match(plain) and style != "Heading1":
            pending_mark = plain
            continue
        if style == "Heading1" and pending_mark:
            flush()
            label = "Prolog" if pending_mark == "PROLOG" else pending_mark.title()
            current = {"label": label, "name": plain, "blocks": [], "refs": []}
            pending_mark, counter = None, {}
            continue
        if current is None:
            continue
        if plain.startswith("Sampai jumpa kembali"):
            break
        if not plain:
            continue
        if plain == "❧":
            if len(current["blocks"]) > 1:
                current["blocks"].append("* * *")
            continue

        refs_here = []
        kind, drop = classify(el)
        text = clean(markup(el, refs_here, drop))
        current["refs"] += refs_here

        if style == "Heading2":
            current["blocks"].append("## " + plain)
        elif style == "ListParagraph" or num_of(el):
            nid = num_of(el)
            fmt = numfmt.get(nid, "bullet") if nid else "bullet"
            if fmt == "decimal":
                counter[nid] = counter.get(nid, 0) + 1
                current["blocks"].append(f"{counter[nid]}.\t{text}")
            else:
                current["blocks"].append("•\t" + text)
        elif kind == "indent":
            current["blocks"].append("\t" + text)
        elif kind == "plain":
            current["blocks"].append(text)
        else:
            current["blocks"].append(f"::{kind}:: {text}")

    flush()
    return chapters


# ---------------------------------------------------------------- the site's data


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def word_count(content):
    return len(re.findall(r"\w+", re.sub(r"</?(b|i|sc|sup)>|::[a-z]+:: ", "", content)))


def to_chapters(parsed):
    out = []
    for n, ch in enumerate(parsed, 1):
        content = "\n\n".join(ch["blocks"])
        title = f"{ch['label']}: {ch['name']}"
        out.append({"id": slug(title), "chapterNumber": n, "title": title, "content": content, "wordCount": word_count(content)})
    assert len({c["id"] for c in out}) == len(out), "two chapters ended up with the same id"
    return out


def preview_of_series_3(parsed, series_2_text):
    """The Series 3 preview: the post-office scene of the prologue, trimmed to what is seen, behind three lines of Series 2."""
    bare = re.sub(r"</?(b|i|sc|sup)>", "", series_2_text)
    for line in QUOTES[:3]:
        for part in line.replace("> ", "").split("\n"):
            assert part in bare, f"the quoted line no longer exists in Series 2: {part[:60]}"
    blocks = parsed[0]["blocks"]

    def at(prefix, after=0):
        for i in range(after, len(blocks)):
            if blocks[i].startswith(prefix):
                return i
        raise SystemExit(f"Series 3 has changed: no block starts with {prefix!r}. Adjust the selection in preview_of_series_3().")

    def cut(block, drop_from=None, drop=None, keep_to=None):
        if drop:
            assert drop in block, f"expected text missing: {drop[:50]}"
            block = block.replace(drop, "")
        if drop_from:
            assert drop_from in block, f"expected text missing: {drop_from[:50]}"
            block = block[: block.index(drop_from)]
        if keep_to:
            assert keep_to in block, f"expected text missing: {keep_to[:50]}"
            block = block[: block.index(keep_to) + len(keep_to)]
        return block

    scene = blocks[at("## Berkas 000") : at("\tAku tahu. Aku menyimpan daftar itu.") + 1]
    start = at("::lead:: Yang kukirim hari ini.")
    sending = blocks[start : at("Rina tertawa", start) + 1]
    box = cut(blocks[at("1.\t<sc>Kotak kayu")], drop_from=" Seorang dosen muda", drop=", keduanya sudah berbagi <i>entanglement</i> dengan sebuah ruang mesin yang belum dibangun")
    envelope = cut(blocks[at("2.\t<sc>Amplop cokelat")], drop_from=" Amplop ini akan dibuka")
    parcel = blocks[at("3.\t<sc>Kardus cokelat")]
    weighing = blocks[at("Rina menimbangnya dua kali.") : at("\t“Dulu.”") + 1]
    receipt = cut(blocks[at("Ia memberiku resi.")], keep_to="adalah catatan.")
    nickname = at("\t<sc>Satu hal tentang aku.</sc>")
    tail = [
        blocks[nickname],
        blocks[nickname + 1],
        blocks[at("::lead:: Disimpan.")],
        blocks[at("1.\tSatu kotak kayu, satu amplop")],
        blocks[at("2.\tSejarah tempat Rukmini")],
        blocks[at("::lead:: Ditebus.")],
        blocks[at("Sebelum ke loket")],
        blocks[at("\tTiga kiriman. Satu guru.")],
        blocks[at("\tKalian yang membaca ini")],
    ]
    keep = QUOTES + ["* * *"] + scene + sending + [box, envelope, parcel] + weighing + [receipt] + tail
    content = "\n\n".join(keep)
    return [{"id": "preview", "chapterNumber": 1, "title": "Preview", "content": content, "wordCount": word_count(content)}]


def check(content, where):
    """Warn about markers the reader would not understand."""
    for kind in set(re.findall(r"^::([a-z]+):: ", content, re.M)):
        if kind not in KINDS:
            print(f"  warning: unknown block kind ::{kind}:: in {where}")
    stray = re.findall(r"</?(?!b>|i>|sc>|sup>)[a-z]+>", content)
    if stray:
        print(f"  warning: unexpected tags in {where}: {sorted(set(stray))[:5]}")


def main(folder):
    folder = Path(folder)
    parsed = {n: convert(folder / f"Jurnal_Jantama_Seri_{n}.docx") for n in (1, 2, 3)}
    raw = DATA.read_text()
    data = json.loads(raw)
    by_id = {item["id"]: item for item in data}

    series_2_text = "\n".join(c["content"] for c in to_chapters(parsed[2]))
    new = {1: to_chapters(parsed[1]), 2: to_chapters(parsed[2]), 3: preview_of_series_3(parsed[3], series_2_text)}

    for n, chapters in new.items():
        item = by_id[NOVELS[n]]
        old = {c["title"]: c["content"] for c in item.get("chapters", [])}
        changed = [c["title"] for c in chapters if old.get(c["title"]) != c["content"]]
        words = sum(c["wordCount"] for c in chapters)
        item["chapters"] = chapters
        item["readTime"] = f"± {max(1, round(words / 200))} menit baca" if n == 3 else f"± {max(1, round(words / 200 / 60))} jam baca"
        for c in chapters:
            check(c["content"], f"series {n}, {c['title']}")
        print(f"Seri {n}: {len(chapters)} bagian, {words} kata, {item['readTime']}; berubah: {len(changed)} ({', '.join(changed[:4])}{'...' if len(changed) > 4 else ''})")

    DATA.write_text(json.dumps(data, indent=2, ensure_ascii=False) + ("\n" if raw.endswith("\n") else ""))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])
