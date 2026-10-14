import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

const CANVAS_COLOR = "#faf9f5";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.role}`,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: CANVAS_COLOR,
    theme_color: CANVAS_COLOR,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
