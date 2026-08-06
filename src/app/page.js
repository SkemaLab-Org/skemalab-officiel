import dynamic from "next/dynamic";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/sections/Hero";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";

const Loader = dynamic(() => import("@/components/Loader"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const About = dynamic(() => import("@/components/sections/About"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CTA = dynamic(() => import("@/components/sections/CTA"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
