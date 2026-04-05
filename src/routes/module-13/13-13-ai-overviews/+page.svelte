<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>AI Overviews reward direct answers and clear structure.</li>
		<li>Hedging language is a weak signal for LLM citation.</li>
		<li>FAQPage schema gives crawlers an explicit Q&amp;A contract.</li>
		<li>Strong E-E-A-T flows into AI Overview source selection.</li>
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
		.cols {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
