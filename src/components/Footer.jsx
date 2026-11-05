"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import {
	GmailIcon,
	LinkedInIcon,
	WhatsAppIcon,
} from "@/components/icons/SocialIcons";

const socialLinks = [
	{
		label: "LinkedIn",
		href: contactInfo.linkedin,
		Icon: LinkedInIcon,
		external: true,
	},
	{
		label: "WhatsApp",
		href: `https://wa.me/${ contactInfo.whatsapp }`,
		Icon: WhatsAppIcon,
		external: true,
	},
	{
		label: "Email",
		href: `mailto:${ contactInfo.email }`,
		Icon: GmailIcon,
		external: false,
	},
];

export default function Footer( { animate = false } ) {
	const { t } = useI18n();
	const reduce = useReducedMotion();
	const FooterElement = animate ? motion.footer : "footer";
	const motionProps = animate && !reduce
		? {
			initial: { opacity: 0, y: 56 },
			whileInView: { opacity: 1, y: 0 },
			viewport: { once: true, amount: 0.14 },
			transition: { duration: 0.75, ease: [ 0.22, 1, 0.36, 1 ] },
		}
		: {};
	const navLinks = t.nav;
	const linkClass =
		"inline-flex min-h-9 items-center text-[13px] text-[#a2b8b1] transition-colors hover:text-[#3ad9bf]";

	return (
		<FooterElement { ...motionProps } className="bg-[#07110e] text-[#f2ede2]">
			<div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-16">
				<div className="max-w-sm">
					<Image
						src="/logo2.png"
						alt="SkemaLab"
						width={ 160 }
						height={ 40 }
						className="h-10 w-auto object-contain"
					/>

					<p className="mt-5 text-[13px] leading-[1.7] text-[#a2b8b1]">
						{ t.footer.description }
					</p>

					<div className="mt-7 flex items-center gap-2">
						{ socialLinks.map( ( { label, href, Icon, external } ) => (
							<a
								key={ label }
								href={ href }
								{ ...( external
									? { target: "_blank", rel: "noopener noreferrer" }
									: {} ) }
								aria-label={ label }
								className="flex h-10 w-10 items-center justify-center rounded-none border border-[rgba(242,237,226,0.16)] text-[#a2b8b1] transition-all duration-200 hover:border-[#3ad9bf] hover:bg-[#3ad9bf]/10 hover:text-[#3ad9bf]"
							>
								<Icon className="h-[17px] w-[17px]" />
							</a>
						) ) }
					</div>
				</div>

				<nav aria-label={ t.footer.navTitle }>
					<p className="label-mono text-[#a2b8b1]">{ t.footer.navTitle }</p>
					<ul className="mt-4 space-y-1">
						{ navLinks.map( ( link ) => (
							<li key={ link.href }>
								<a href={ link.href } className={ linkClass }>
									{ link.label }
								</a>
							</li>
						) ) }
					</ul>
				</nav>

				<div>
					<p className="label-mono text-[#a2b8b1]">{ t.footer.contactTitle }</p>
					<ul className="mt-4 space-y-2 text-[13px]">
						<li>
							<a
								href={ `mailto:${ contactInfo.email }` }
								className="link-underline max-w-full break-all text-[#f2ede2] transition-colors hover:text-[#3ad9bf]"
							>
								{ contactInfo.email }
							</a>
						</li>
						<li>
							<a
								href={ `tel:${ contactInfo.phone.replace( /\s/g, "" ) }` }
								className="link-underline text-[#f2ede2] transition-colors hover:text-[#3ad9bf]"
							>
								<span dir="ltr">{ contactInfo.phone }</span>
							</a>
						</li>
						<li className="text-[#a2b8b1]">
							{ contactInfo.locations.join( " · " ) }
						</li>
					</ul>
				</div>
			</div>

			<div>
				<div className="shell flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
					<p className="label-mono text-[#a2b8b1]">
						© { new Date().getFullYear() } { t.common.copyright }
					</p>
					<div className="flex flex-wrap items-center gap-5">
						<p className="label-mono text-[#a2b8b1]">{ t.common.tagline }</p>
						{/* <a
							href="#top"
							className="label-mono inline-flex items-center gap-1.5 border border-cream/15 px-2.5 py-1 text-[#a2b8b1] transition-all duration-200 hover:border-[#3ad9bf] hover:text-[#3ad9bf]"
						>
							<ArrowUp size={ 12 } aria-hidden="true" />
							<span className="sr-only">{ t.common.backToTop }</span>
						</a> */}
					</div>
				</div>
			</div>
		</FooterElement>
	);
}
