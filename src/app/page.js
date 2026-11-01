import IntroStage from "@/components/home/IntroStage";
import Hero from "@/components/home/Hero";
import AboutBand from "@/components/home/AboutBand";
import Engines from "@/components/home/Engines";
import SpectrumBand from "@/components/home/SpectrumBand";
import StatBand from "@/components/home/StatBand";
import MethodBand from "@/components/home/MethodBand";
import ProjectsBand from "@/components/home/ProjectsBand";
import AgencyBand from "@/components/home/AgencyBand";
import ClosingBand from "@/components/home/ClosingBand";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <IntroStage />
      <Hero />
      <AboutBand />
      <Engines />
      <SpectrumBand />
      <StatBand />
      <MethodBand />
      <ProjectsBand />
      <AgencyBand />
      <ClosingBand />
      <Contact />
    </>
  );
}
