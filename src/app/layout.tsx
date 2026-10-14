import type { Metadata } from "next";
import { Bitcount_Prop_Single, Caveat, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  title: `${site.name} · ${site.role}`,
  description: site.about.statement,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${hand.variable} ${display.variable} scroll-smooth antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
