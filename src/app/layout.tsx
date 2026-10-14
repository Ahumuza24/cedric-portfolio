import type { Metadata, Viewport } from "next";
import { Bitcount_Prop_Single, Caveat, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });
const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const hand = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["500", "600"] });
const display = Bitcount_Prop_Single({
  variable: "--font-bitcount",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const title = `${site.name} · ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.seo.description,
    locale: "en_UG",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${hand.variable} ${display.variable} scroll-smooth antialiased`}
    >
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
