type Tone = "walnut" | "parchment";

const overlays: Record<Tone, string> = {
  walnut:
    "linear-gradient(180deg, rgba(28,19,12,0.70) 0%, rgba(28,19,12,0.85) 60%, rgba(28,19,12,0.97) 100%)",
  parchment:
    "linear-gradient(180deg, rgba(244,236,221,0.80) 0%, rgba(244,236,221,0.92) 70%, rgba(244,236,221,1) 100%)",
};

/** A photo washed into the room's colour, so it reads as atmosphere rather than content. */
export default function FadedBackdrop({
  src,
  tone = "walnut",
  position = "center",
}: {
  src: string;
  tone?: Tone;
  position?: string;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: position,
          filter: "sepia(0.45) saturate(0.75)",
        }}
      />
      <div className="absolute inset-0" style={{ background: overlays[tone] }} />
    </div>
  );
}
