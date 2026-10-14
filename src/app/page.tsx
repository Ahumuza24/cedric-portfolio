import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="canvas-grid pt-[78px] text-ink">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Clients />
        <Contact />
      </main>
    </>
  );
}
