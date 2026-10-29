export type Realm = "tech" | "writer";

/** Which realm a path belongs to. The studio is the author's own tool and never gets an entrance. */
export function realmOf(pathname: string): Realm | null {
  if (pathname.startsWith("/writer/studio")) return null;
  if (/^\/writer(\/|$)/.test(pathname)) return "writer";
  if (/^\/(tech|portfolio|about|resume|contact)(\/|$)/.test(pathname)) return "tech";
  return null;
}

const seen = (realm: Realm) => `dd_entered_${realm}`;

/** Remember that this visitor has already been let in, so a refresh or a second page does not repeat it. */
export function markEntered(realm: Realm) {
  try {
    sessionStorage.setItem(seen(realm), "1");
  } catch {
    // Private mode: the entrance may show again, which is harmless.
  }
}

/**
 * Runs in the page head before the first paint. A visitor who lands straight on a realm, without having
 * passed the gateway in this session, gets html[data-entrance]; the style sheet then covers the page from
 * the very first frame, so no content flashes before the loading screen.
 */
export const ENTRANCE_SCRIPT = `(function(){try{
var p=location.pathname,r=null;
if(p.indexOf('/writer/studio')!==0){
if(/^\\/writer(\\/|$)/.test(p))r='writer';
else if(/^\\/(tech|portfolio|about|resume|contact)(\\/|$)/.test(p))r='tech';
}
if(r&&!sessionStorage.getItem('dd_entered_'+r)&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.setAttribute('data-entrance',r);
}catch(e){}})();`;
