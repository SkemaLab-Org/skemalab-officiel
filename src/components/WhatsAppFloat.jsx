"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { contactInfo } from "@/data/content";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";
import { useI18n } from "@/components/I18nProvider";

export default function WhatsAppFloat() {
	const { t } = useI18n();
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = (e) => {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const href = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
		"Bonjour Skemalab, je souhaite en savoir plus sur vos services.",
	)}`;

	return (
		<div className="fixed bottom-5 end-5 z-[100] flex flex-col items-center gap-2.5 sm:bottom-7 sm:end-7">
			<button
				type="button"
				onClick={scrollToTop}
				aria-label={t.common.backToTop || "Retour en haut"}
				title={t.common.backToTop || "Retour en haut"}
				className={`flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-fg shadow-lg transition-all duration-300 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
					showScrollTop
						? "translate-y-0 opacity-100"
						: "pointer-events-none translate-y-3 opacity-0"
				}`}
			>
				<ArrowUp size={18} strokeWidth={2} aria-hidden="true" />
			</button>

			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Contacter Skemalab sur WhatsApp"
				title="WhatsApp"
				className="group flex h-13 w-13 items-center justify-center rounded-full bg-brand text-on-brand shadow-lg shadow-brand/25 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
			>
				<WhatsAppIcon className="h-6 w-6" />
			</a>
		</div>
	);
}
