"use client";

import { useI18n } from "@/components/I18nProvider";

/**
 * Stage 4 · Claim (Statement Wipe Stage)
 * Exact layout and scroll animation from Kilnwave (#claim, 230svh with sticky pin)
 */
export default function Statement() {
	const { t } = useI18n();

	const quote =
		t.statementSection?.quote ||
		"Rien n’est laissé au hasard. Chaque ligne de code, chaque campagne et chaque flux automatisé sont taillés sur mesure pour votre rentabilité.";
	const caption =
		t.statementSection?.caption ||
		"Engagement de delivery & traçabilité sur chaque sprint";

	return (
		<section className="stage" id="claim">
			<div className="pin">
				<div className="claim-in">
					<h2 className="font-display">
						{quote}
						<span className="fill" aria-hidden="true">
							{quote}
						</span>
					</h2>
					<div className="claim-rule">
						<i />
					</div>
					<span className="label-mono text-muted">{caption}</span>
				</div>
			</div>
		</section>
	);
}
