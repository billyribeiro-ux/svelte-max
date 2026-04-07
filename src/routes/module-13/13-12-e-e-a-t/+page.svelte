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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how removing E-E-A-T signals degrades perceived trustworthiness. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the author name and URL from the checklist's Experience section.</strong> Without visible authorship, the content becomes anonymous. Google's quality raters specifically look for identifiable authors with credentials, and anonymous content on YMYL topics receives the lowest trust scores. The checklist score drops, mirroring what a human rater would flag.</li>
		<li><strong>Uncheck every item in the Trust section and observe the score.</strong> Trust is the foundation of E-E-A-T. Even if every Experience, Expertise, and Authoritativeness item is checked, a zero Trust score means the other signals carry no weight. This models Google's own guidance that trust is the most important element because without it, the rest is meaningless.</li>
		<li><strong>Remove all outbound citation links from the content.</strong> The Authoritativeness section depends on both inbound and outbound links. Removing citations makes claims unverifiable, which signals to both human raters and AI systems that the content may not be grounded in evidence. Quality raters are trained to check whether claims are sourced.</li>
		<li><strong>Change the <code>$state</code> array to use plain booleans without the toggle function.</strong> The reactive checklist stops working because direct array mutation without the proper <code>$state</code> reassignment pattern does not trigger Svelte's fine-grained reactivity. This is a Svelte-specific lesson: always reassign state arrays (spread or map) rather than mutating in place.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trust. It is the framework Google's Search Quality Raters use to evaluate content quality, and it has become the dominant quality signal since the March 2026 Core Update. Experience asks whether the author has first-hand involvement with the topic. Expertise evaluates credentials and depth of knowledge. Authoritativeness measures whether the site is a recognised leader in its niche. Trust is the foundation that validates all three.</p>
	<p class="prose">Trust is especially critical for YMYL (Your Money Your Life) topics like health, finance, legal, and safety content. Sites covering these topics must demonstrate HTTPS, transparent contact and about pages, verifiable citations, and clear editorial policies. Without trust signals, even expert content may be suppressed in search results because Google cannot verify that the information is safe to surface to users making important decisions.</p>
	<p class="prose">As a developer, you can support E-E-A-T through technical implementation: author bio pages linked from each article, Organization and Person JSON-LD schemas, clear site architecture with breadcrumbs, HTTPS everywhere, and structured data that identifies the publisher. The interactive checklist in this lesson models these signals as concrete, checkable items. Building E-E-A-T is not a one-time task; it is an ongoing practice that compounds as the site publishes more high-quality, well-attributed content.</p>
	<p class="next">Next, you will learn how to optimise your content for Google AI Overviews and other generative search systems.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
