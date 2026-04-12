<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const before = `Some people say that OKLCH might be a better color space for the
web, though it depends on what you're doing. In some cases, older formats
like hex or HSL are fine, but there are also times when more modern
options can matter. Browser support is something to keep in mind too.`;

	const afterIntro = `OKLCH is the right color space for new web projects in 2026.`;
	const afterFacts: string[] = [
		'Perceptually uniform: equal numeric steps feel like equal visual steps.',
		'Supported in all modern browsers since 2023 (Chrome 111, Safari 16.4, Firefox 113).',
		'Trivial to generate accessible contrast pairs by holding L constant and varying C.'
	];
	const afterFaq: { q: string; a: string }[] = [
		{
			q: 'Is OKLCH supported in Safari?',
			a: 'Yes — since Safari 16.4 released in March 2023.'
		},
		{
			q: 'Should I still ship a hex fallback?',
			a: 'No. All evergreen browsers support OKLCH natively.'
		}
	];


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const before = `Some people say that OKLCH might be a better color space for the\n" +
		"web, though it depends on what you're doing. In some cases, older formats\n" +
		"like hex or HSL are fine, but there are also times when more modern\n" +
		"options can matter. Browser support is something to keep in mind too.`;\n" +
		"\n" +
		"	const afterIntro = `OKLCH is the right color space for new web projects in 2026.`;\n" +
		"	const afterFacts: string[] = [\n" +
		"		'Perceptually uniform: equal numeric steps feel like equal visual steps.',\n" +
		"		'Supported in all modern browsers since 2023 (Chrome 111, Safari 16.4, Firefox 113).',\n" +
		"		'Trivial to generate accessible contrast pairs by holding L constant and varying C.'\n" +
		"	];\n" +
		"	const afterFaq: { q: string; a: string }[] = [\n" +
		"		{\n" +
		"			q: 'Is OKLCH supported in Safari?',\n" +
		"			a: 'Yes — since Safari 16.4 released in March 2023.'\n" +
		"		},\n" +
		"		{\n" +
		"			q: 'Should I still ship a hex fallback?',\n" +
		"			a: 'No. All evergreen browsers support OKLCH natively.'\n" +
		"		}\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.13 — AI Overviews &amp; generative search\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Google AI Overviews (rolled out globally in late 2024)\n" +
		"		use Gemini to synthesize answers from multiple sources at the top of the SERP.\n" +
		"		Being cited sends traffic and authority. Optimize by (1) using clear\n" +
		"		question/answer structure, (2) marking up with \u003ccode\u003eFAQPage\u003c/code\u003e schema, (3)\n" +
		"		writing unambiguous statements, (4) backing claims with sources, (5) placing\n" +
		"		direct answers near the top of the page, and (6) building strong E-E-A-T —\n" +
		"		LLMs weight authoritative sources heavier.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"cols\"\u003e\n" +
		"			\u003carticle class=\"col before\"\u003e\n" +
		"				\u003cheader\u003eBefore — wishy-washy\u003c/header\u003e\n" +
		"				\u003cp\u003e{before}\u003c/p\u003e\n" +
		"			\u003c/article\u003e\n" +
		"\n" +
		"			\u003carticle class=\"col after\"\u003e\n" +
		"				\u003cheader\u003eAfter — AI-Overview ready\u003c/header\u003e\n" +
		"				\u003cp class=\"lede\"\u003e{afterIntro}\u003c/p\u003e\n" +
		"				\u003cul class=\"facts\"\u003e\n" +
		"					{#each afterFacts as f (f)}\n" +
		"						\u003cli\u003e{f}\u003c/li\u003e\n" +
		"					{/each}\n" +
		"				\u003c/ul\u003e\n" +
		"				\u003ch3 class=\"faq-title\"\u003eFAQ\u003c/h3\u003e\n" +
		"				\u003cdl\u003e\n" +
		"					{#each afterFaq as item (item.q)}\n" +
		"						\u003cdt\u003e{item.q}\u003c/dt\u003e\n" +
		"						\u003cdd\u003e{item.a}\u003c/dd\u003e\n" +
		"					{/each}\n" +
		"				\u003c/dl\u003e\n" +
		"			\u003c/article\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"note\"\u003e\n" +
		"			The \"After\" version leads with a direct answer, offers verifiable facts,\n" +
		"			and closes with a schema-friendly FAQ — all patterns Gemini can extract and\n" +
		"			cite with confidence.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eAI Overviews reward direct answers and clear structure.\u003c/li\u003e\n" +
		"		\u003cli\u003eHedging language is a weak signal for LLM citation.\u003c/li\u003e\n" +
		"		\u003cli\u003eFAQPage schema gives crawlers an explicit Q&amp;A contract.\u003c/li\u003e\n" +
		"		\u003cli\u003eStrong E-E-A-T flows into AI Overview source selection.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>13.13 — AI Overviews &amp; generative search</h1>
	<p class="concept">
		<strong>Concept.</strong> Google AI Overviews (rolled out globally in late 2024)
		use Gemini to synthesize answers from multiple sources at the top of the SERP.
		Being cited sends traffic and authority. Optimize by (1) using clear
		question/answer structure, (2) marking up with <code>FAQPage</code> schema, (3)
		writing unambiguous statements, (4) backing claims with sources, (5) placing
		direct answers near the top of the page, and (6) building strong E-E-A-T —
		LLMs weight authoritative sources heavier.
	</p>

	<div class="build">
		<div class="cols">
			<article class="col before">
				<header>Before — wishy-washy</header>
				<p>{before}</p>
			</article>

			<article class="col after">
				<header>After — AI-Overview ready</header>
				<p class="lede">{afterIntro}</p>
				<ul class="facts">
					{#each afterFacts as f (f)}
						<li>{f}</li>
					{/each}
				</ul>
				<h3 class="faq-title">FAQ</h3>
				<dl>
					{#each afterFaq as item (item.q)}
						<dt>{item.q}</dt>
						<dd>{item.a}</dd>
					{/each}
				</dl>
			</article>
		</div>
		<p class="note">
			The "After" version leads with a direct answer, offers verifiable facts,
			and closes with a schema-friendly FAQ — all patterns Gemini can extract and
			cite with confidence.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how content style affects AI Overview citation potential. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Replace the direct-answer lede with hedging language like "It depends on your use case."</strong> The "After" column loses its clarity advantage. AI Overviews prefer content that makes a definitive statement first and qualifies it later. Leading with uncertainty makes the content harder for an LLM to extract a citable fact from, reducing the chance of being selected as a source.</li>
		<li><strong>Remove the bulleted facts list and merge everything into a single paragraph.</strong> The structured format disappears, making it harder for Gemini to identify discrete, citable claims. AI systems parse lists and structured content more reliably than dense paragraphs. The loss of visual and semantic structure weakens both human readability and machine extractability.</li>
		<li><strong>Remove the FAQ section entirely.</strong> Without explicit question-and-answer pairs, the page loses its most direct match for the queries AI Overviews are designed to answer. FAQPage schema gives crawlers a machine-readable Q&amp;A contract, and the visible FAQ provides the matching human-readable content that validates the schema.</li>
		<li><strong>Replace specific facts (dates, version numbers, browser names) with vague statements like "most browsers support it."</strong> Vague claims cannot be verified, which makes them low-value for citation. AI Overviews prioritise sources with specific, verifiable data because they need to present accurate information to users. Precision in claims is a key signal for source selection.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Google AI Overviews, powered by Gemini, synthesise answers from multiple web sources and display them at the top of search results. Being cited as a source in an AI Overview drives significant traffic and establishes authority. The key to citation is writing content that an LLM can confidently extract and attribute: lead with a direct, unambiguous answer, follow with verifiable facts, and close with structured Q&amp;A pairs that match the FAQPage schema.</p>
	<p class="prose">Hedging language like "it depends" or "in some cases" is a weak signal for AI citation because it introduces uncertainty that the model cannot resolve. Direct statements backed by specific data (dates, version numbers, measurable outcomes) are much stronger candidates. The before-and-after comparison in this lesson demonstrates the difference: the "wishy-washy" version would rarely be cited, while the structured, fact-rich version gives Gemini everything it needs to extract and attribute a confident answer.</p>
	<p class="prose">Strong E-E-A-T signals compound the effect. AI Overviews do not just select the most structured content; they also weight the authoritativeness and trustworthiness of the source. A page with clear authorship, correct structured data, and a history of accurate, well-cited content is more likely to be selected as an AI Overview source than an anonymous page with the same information. The combination of content quality, structure, and trust is what makes a page visible in the generative search era.</p>
	<p class="next">Next, you will learn how hreflang tags and international SEO make your site discoverable across languages and regions.</p>
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
	.cols {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.col {
		padding: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.col header {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding-block-end: var(--space-xs);
		border-block-end: 1px solid var(--color-border);
	}
	.before {
		border-color: var(--color-error);
	}
	.after {
		border-color: var(--color-success);
	}
	.col p {
		margin: 0;
		color: var(--color-text-muted);
		line-height: 1.6;
	}
	.lede {
		font-weight: 600;
		color: var(--color-text) !important;
	}
	.facts {
		list-style: disc;
		padding-inline-start: var(--space-lg);
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--color-text-muted);
	}
	.faq-title {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	dl {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	dt {
		font-weight: 600;
		color: var(--color-text);
	}
	dd {
		margin: 0;
		color: var(--color-text-muted);
	}
	.note {
		margin: 0;
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.cols {
			grid-template-columns: 1fr 1fr;
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
