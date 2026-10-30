"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error("Skemalab Error:", error);
	}, [error]);

	return (
		<SiteShell>
			<div className="relative flex min-h-[80vh] items-center justify-center px-4 py-24 text-center">
				<div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
					<div className="h-[450px] w-[450px] rounded-full bg-accent/10 blur-[140px]" />
				</div>
				<div className="mx-auto max-w-xl">
					<span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent">
						Erreur technique
					</span>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-fg sm:text-5xl">
						Une erreur inattendue s’est produite.
					</h1>
					<p className="mt-4 text-base text-muted sm:text-lg">
						Nos équipes ont été notifiées. Vous pouvez réessayer de charger
						cette page ou retourner à l’accueil.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<button
							onClick={() => reset()}
							className="inline-flex items-center gap-2 rounded-[3px] bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-brand/90"
						>
							<RefreshCw size={18} />
							Réessayer
						</button>
						<Link
							href="/"
							className="inline-flex items-center gap-2 rounded-[3px] border border-line bg-surface px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-brand hover:text-brand"
						>
							<Home size={18} />
							Accueil
						</Link>
					</div>
				</div>
			</div>
		</SiteShell>
	);
}
