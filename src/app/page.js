import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Field from "@/components/sections/Field";
import Statement from "@/components/sections/Statement";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Studio from "@/components/sections/Studio";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import PinnedStagesController from "@/components/PinnedStagesController";

export default function Home() {
	return (
		<>
			<PinnedStagesController />
			{/* 5 consecutive pinned sticky stages matching the source */}
			<Hero />
			<Services />
			<Process />
			<Field />
			<Statement />

			{/* Normal bands */}
			<Projects />
			<Stats />
			<Studio />
			<FAQ />
			<CTA />
			<Contact />
		</>
	);
}
