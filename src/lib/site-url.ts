const LOCAL_URL = "http://localhost:3000";

/**
 * Public origin of the site, used for canonical links, the sitemap and social previews.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; Vercel's production URL is the fallback.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return LOCAL_URL;
}

export const siteUrl = resolveSiteUrl();
