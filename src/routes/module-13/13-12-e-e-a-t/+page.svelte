<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Section {
		letter: string;
		title: string;
		items: string[];
	}

	const sections: Section[] = [
		{
			letter: 'E',
			title: 'Experience',
			items: [
				'Author has first-hand experience with the topic',
				'Article references specific cases, dates, or measurable outcomes',
				'Photos or screenshots from the author, not stock imagery'
			]
		},
		{
			letter: 'E',
			title: 'Expertise',
			items: [
				'Author has a linked bio page with credentials',
				'Technical terms used correctly and defined when needed',
				'Content depth matches an expert-level treatment'
			]
		},
		{
			letter: 'A',
			title: 'Authoritativeness',
			items: [
				'Site is known for this topic (narrow, not broad)',
				'Inbound links from other authorities in the space',
				'Publisher identified via Organization schema'
			]
		},
		{
			letter: 'T',
			title: 'Trust',
			items: [
				'Site uses HTTPS with a valid certificate',
				'Transparent About and Contact pages',
				'Article cites sources with outbound links',
				'No misleading headlines or clickbait'
			]
		}
	];

	const total = sections.reduce((n, s) => n + s.items.length, 0);
	const checked = $state<boolean[]>(new Array(total).fill(false));
	const score = $derived(checked.filter((c) => c).length);

	function indexOf(sectionIdx: number, itemIdx: number): number {
		let n = 0;
		for (let i = 0; i < sectionIdx; i += 1) n += sections[i].items.length;
		return n + itemIdx;
	}

	function toggle(i: number): void {
		checked[i] = !checked[i];
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface Section {\n" +
		"		letter: string;\n" +
		"		title: string;\n" +
		"		items: string[];\n" +
		"	}\n" +
		"\n" +
		"	const sections: Section[] = [\n" +
		"		{\n" +
		"			letter: 'E',\n" +
		"			title: 'Experience',\n" +
		"			items: [\n" +
		"				'Author has first-hand experience with the topic',\n" +
		"				'Article references specific cases, dates, or measurable outcomes',\n" +
		"				'Photos or screenshots from the author, not stock imagery'\n" +
		"			]\n" +
		"		},\n" +
		"		{\n" +
		"			letter: 'E',\n" +
		"			title: 'Expertise',\n" +
		"			items: [\n" +
		"				'Author has a linked bio page with credentials',\n" +
		"				'Technical terms used correctly and defined when needed',\n" +
		"				'Content depth matches an expert-level treatment'\n" +
		"			]\n" +
		"		},\n" +
		"		{\n" +
		"			letter: 'A',\n" +
		"			title: 'Authoritativeness',\n" +
		"			items: [\n" +
		"				'Site is known for this topic (narrow, not broad)',\n" +
		"				'Inbound links from other authorities in the space',\n" +
		"				'Publisher identified via Organization schema'\n" +
		"			]\n" +
		"		},\n" +
		"		{\n" +
		"			letter: 'T',\n" +
		"			title: 'Trust',\n" +
		"			items: [\n" +
		"				'Site uses HTTPS with a valid certificate',\n" +
		"				'Transparent About and Contact pages',\n" +
		"				'Article cites sources with outbound links',\n" +
		"				'No misleading headlines or clickbait'\n" +
		"			]\n" +
		"		}\n" +
		"	];\n" +
		"\n" +
		"	const total = sections.reduce((n, s) =\u003e n + s.items.length, 0);\n" +
		"	const checked = $state\u003cboolean[]\u003e(new Array(total).fill(false));\n" +
		"	const score = $derived(checked.filter((c) =\u003e c).length);\n" +
		"\n" +
		"	function indexOf(sectionIdx: number, itemIdx: number): number {\n" +
		"		let n = 0;\n" +
		"		for (let i = 0; i \u003c sectionIdx; i += 1) n += sections[i].items.length;\n" +
		"		return n + itemIdx;\n" +
		"	}\n" +
		"\n" +
		"	function toggle(i: number): void {\n" +
		"		checked[i] = !checked[i];\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.12 — E-E-A-T signals\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Google’s Search Quality Rater Guidelines use\n" +
		"		\u003ccode\u003eE-E-A-T\u003c/code\u003e — Experience (has the author actually done this?),\n" +
		"		Expertise (credentials and depth), Authoritativeness (is the site the authority\n" +
		"		on the topic?), and Trust (secure, transparent, accurate). Trust is the\n" +
		"		foundation — without it, the others don’t matter. Especially critical for YMYL\n" +
		"		(Your Money Your Life) topics like health, finance, and safety.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"score\"\u003e\n" +
		"			\u003cspan class=\"score-label\"\u003eE-E-A-T score\u003c/span\u003e\n" +
		"			\u003cspan class=\"score-value\"\u003e{score} / {total}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		{#each sections as section, sIdx (section.title)}\n" +
		"			\u003cdiv class=\"section\"\u003e\n" +
		"				\u003ch2\u003e\n" +
		"					\u003cspan class=\"letter\"\u003e{section.letter}\u003c/span\u003e\n" +
		"					{section.title}\n" +
		"				\u003c/h2\u003e\n" +
		"				\u003cul class=\"checks\"\u003e\n" +
		"					{#each section.items as item, iIdx (item)}\n" +
		"						{@const idx = indexOf(sIdx, iIdx)}\n" +
		"						\u003cli\u003e\n" +
		"							\u003clabel\u003e\n" +
		"								\u003cinput\n" +
		"									type=\"checkbox\"\n" +
		"									checked={checked[idx]}\n" +
		"									onclick={() =\u003e toggle(idx)}\n" +
		"								/\u003e\n" +
		"								\u003cspan class:done={checked[idx]}\u003e{item}\u003c/span\u003e\n" +
		"							\u003c/label\u003e\n" +
		"						\u003c/li\u003e\n" +
		"					{/each}\n" +
		"				\u003c/ul\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eE-E-A-T = Experience, Expertise, Authoritativeness, Trust.\u003c/li\u003e\n" +
		"		\u003cli\u003eTrust is the foundation; all other signals build on it.\u003c/li\u003e\n" +
		"		\u003cli\u003eYMYL topics demand the highest E-E-A-T bar.\u003c/li\u003e\n" +
		"		\u003cli\u003eConcrete signals: author bios, citations, HTTPS, Organization schema.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>13.12 — E-E-A-T signals</h1>
	<p class="concept">
		<strong>Concept.</strong> Google’s Search Quality Rater Guidelines use
		<code>E-E-A-T</code> — Experience (has the author actually done this?),
		Expertise (credentials and depth), Authoritativeness (is the site the authority
		on the topic?), and Trust (secure, transparent, accurate). Trust is the
		foundation — without it, the others don’t matter. Especially critical for YMYL
		(Your Money Your Life) topics like health, finance, and safety.
	</p>

	<div class="build">
		<div class="score">
			<span class="score-label">E-E-A-T score</span>
			<span class="score-value">{score} / {total}</span>
		</div>

		{#each sections as section, sIdx (section.title)}
			<div class="section">
				<h2>
					<span class="letter">{section.letter}</span>
					{section.title}
				</h2>
				<ul class="checks">
					{#each section.items as item, iIdx (item)}
						{@const idx = indexOf(sIdx, iIdx)}
						<li>
							<label>
								<input
									type="checkbox"
									checked={checked[idx]}
									onclick={() => toggle(idx)}
								/>
								<span class:done={checked[idx]}>{item}</span>
							</label>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>E-E-A-T = Experience, Expertise, Authoritativeness, Trust.</li>
		<li>Trust is the foundation; all other signals build on it.</li>
		<li>YMYL topics demand the highest E-E-A-T bar.</li>
		<li>Concrete signals: author bios, citations, HTTPS, Organization schema.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	.score {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.score-label {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.score-value {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		color: var(--color-brand);
		font-weight: 700;
	}
	.section {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.section h2 {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin: 0;
		font-size: var(--text-lg);
	}
	.letter {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 1.8em;
		block-size: 1.8em;
		background: var(--color-brand);
		color: var(--color-surface);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-base);
	}
	.checks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	label {
		display: flex;
		align-items: flex-start;
		gap: var(--space-sm);
		cursor: pointer;
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	input[type='checkbox'] {
		accent-color: var(--color-brand);
		margin-block-start: 0.2em;
	}
	.done {
		color: var(--color-success);
		text-decoration: line-through;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
