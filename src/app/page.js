import dynamic from "next/dynamic";
import { HeroShowcase } from "@/components/sections/hero-variants";
import AboutIntro from "@/components/sections/AboutIntro";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

const Loader = dynamic(() => import("@/components/Loader"));

export default function Home() {
  return (
    <>
      <Loader />
      <HeroShowcase />
      <AboutIntro />
      <Services />
      <Process />
      <Projects />
      <Stats />
      <About />
      <CTA />
      <Contact />
    </>
  );
}
