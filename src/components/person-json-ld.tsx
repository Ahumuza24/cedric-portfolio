import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

const GITHUB_LABEL = "GitHub";

function buildPersonSchema() {
  const currentRole = site.experience.find((role) => role.current);
  const github = site.socials.find((social) => social.label === GITHUB_LABEL);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}${site.about.photo.src}`,
    jobTitle: site.role,
    description: site.seo.description,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "UG" },
    worksFor: currentRole && { "@type": "Organization", name: currentRole.company },
    knowsAbout: site.about.skills,
    sameAs: github ? [github.href] : [],
  };
}

/** Structured data that tells search engines who this site is about. */
export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildPersonSchema()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
