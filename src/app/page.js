import dynamic from "next/dynamic";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/sections/Hero";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

const Loader = dynamic(() => import("@/components/Loader"));

export default function Home() {
  return (
    <SiteShell showLoader loader={<Loader />}>
      <Hero />
      <ClientsMarquee />
      <Services />
      <Process />
      <Projects />
      <Stats />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
    </SiteShell>
  );
}
