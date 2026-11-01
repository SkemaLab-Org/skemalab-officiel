import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Studio from "@/components/sections/Studio";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Projects />
      <Stats />
      <Studio />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}
