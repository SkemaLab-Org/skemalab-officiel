"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { useI18n } from "@/components/I18nProvider";

export default function IntroBand() {
	const { t } = useI18n();
	const copy = t.expertisePage.intro;

	return (
		<section
			className="section-y relative bg-page zellige-spot zellige-spot--mid-end zellige-spot--small"
		>
			<div className="shell relative">
				<Reveal>
					<SectionHeader
						label={copy.eyebrow}
						title={copy.title}
						description={copy.description}
					/>
				</Reveal>
			</div>
		</section>
	);
}
