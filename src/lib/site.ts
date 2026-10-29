/** Public origin of the deployed site, used for canonical links, the sitemap, and link previews. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://dwdhr.vercel.app").replace(/\/+$/, "");
