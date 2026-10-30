import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import SiteShell from "@/components/SiteShell";

export default function NotFound() {
	return (
		<SiteShell>
			<div className="relative flex min-h-[80vh] items-center justify-center px-4 py-24 text-center">
				<div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
					<div className="h-[450px] w-[450px] rounded-full bg-brand/10 blur-[140px]" />
				</div>
				<div className="mx-auto max-w-xl">
					<span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-brand">
						404 • Page introuvable
					</span>
					<h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-6xl">
						Cette page a pris la clé des champs.
					</h1>
					<p className="mt-4 text-base text-muted sm:text-lg">
						La page que vous recherchez n’existe pas ou a été déplacée. Revenez
						à l’accueil pour continuer votre navigation.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<Link
							href="/"
							className="inline-flex items-center gap-2 rounded-[3px] bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-brand/90"
						>
							<Home size={18} />
							Retour à l’accueil
						</Link>
					</div>
				</div>
			</div>
		</SiteShell>
	);
}
