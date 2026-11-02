"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { founders, contactInfo } from "@/data/content";
import BandHeader from "@/components/ui/BandHeader";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import aboutImage from "@/assets/home-imgs/home-about.webp";
import agencyImage from "@/assets/home-imgs/studio-team.webp";

export default function Studio() {
	const { t } = useI18n();
	const intro = t.aboutIntro;
	const home = t.aboutHome;
	const page = t.aboutPage;

	const facts = [
		[ intro.foundedBy, `${ founders[ 0 ].name } · ${ intro.founderStatus }` ],
		[ page.hqLabel, contactInfo.locations.join( " · " ) ],
		[ page.scopeLabel, page.scopeValue ],
	];

	const photos = [
		{
			src: aboutImage,
			alt: intro.imageAlt,
			caption: intro.imageCaption,
		},
		{
			src: agencyImage,
			alt: home.secondImageAlt,
			caption: home.secondImageCaption,
		},
	];

	return (
		<section id="agence" className="section-y bg-page zellige-spot zellige-spot--mid-end zellige-spot--large">
			<span id="skemalab" aria-hidden="true" className="block h-0" />

			<div className="shell">
				<Reveal>
					<BandHeader
						index="05"
						label={ home.sectionLabel }
						title={ home.title }
						description={ home.p1 }
					/>
				</Reveal>

				<Reveal delay={ 0.06 } className="mt-12 sm:mt-16">
					<div className="grid grid-cols-1 gap-px border-y border-line bg-line min-[560px]:grid-cols-2">
						{ photos.map( ( photo ) => (
							<figure
								key={ photo.caption }
								className="photo-duotone relative m-0 aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[16/9]"
							>
								<Image
									src={ photo.src }
									alt={ photo.alt }
									fill
									sizes="(max-width: 560px) 100vw, 50vw"
									className="object-cover"
								/>
								<figcaption className="absolute bottom-0 start-0 z-10 border-t border-e border-[rgba(242,237,226,0.1)] bg-[#07110e]/75 backdrop-blur-md px-3.5 py-2">
									<span className="label-mono text-cream/90 font-mono text-[11px]">
										{ photo.caption }
									</span>
								</figcaption>
							</figure>
						) ) }
					</div>
				</Reveal>

				<div className="mt-12 grid gap-10 sm:mt-16 min-[900px]:grid-cols-[1fr_0.9fr] min-[900px]:gap-16">
					<div className="min-w-0">
						<Reveal>
							<p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
								{ home.p2 }
							</p>
						</Reveal>
						<Reveal delay={ 0.06 }>
							<p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
								{ intro.secondary }
							</p>
						</Reveal>

						<Reveal delay={ 0.12 }>
							<div className="mt-9 border-s-2 border-accent/70 ps-5 py-1">
								<p className="label-mono text-accent">{ home.promiseEyebrow }</p>
								<blockquote className="mt-3 max-w-[34ch] font-display text-[clamp(1.25rem,2vw,1.6rem)] font-light leading-[1.3] tracking-[-0.02em] text-fg">
									« { home.promiseText } »
								</blockquote>
							</div>
						</Reveal>
					</div>

					<div className="min-w-0">
						<Reveal delay={ 0.08 }>
							<dl className="space-y-0">
								{ facts.map( ( [ term, value ] ) => (
									<div
										key={ term }
										className="grid gap-1 border-b border-line px-3 py-4 transition-colors duration-200 hover:bg-surface-2/25 sm:grid-cols-[0.4fr_1fr] sm:items-baseline sm:gap-6"
									>
										<dt className="label-mono text-muted">{ term }</dt>
										<dd className="text-sm leading-relaxed text-fg">{ value }</dd>
									</div>
								) ) }
							</dl>
						</Reveal>

						<Reveal delay={ 0.14 }>
							<div className="mt-8 flex flex-wrap items-center gap-3">
								<Button href="#contact">
									{ home.cta }
									<ArrowUpRight size={ 16 } className="rtl-flip" />
								</Button>
								<Button
									href="/our-story"
									variant="outline"
								>
									{ intro.cta }
								</Button>
							</div>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
