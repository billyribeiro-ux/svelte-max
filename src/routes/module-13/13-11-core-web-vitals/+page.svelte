<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface VitalCard {
		metric: string;
		target: string;
		measures: string;
		causes: string;
		fix: string;
		tone: 'good' | 'warn' | 'bad';
	}

	const cards: VitalCard[] = [
		{
			metric: 'LCP',
			target: '≤ 2.5s',
			measures: 'Largest Contentful Paint — when the main content becomes visible.',
			causes: 'Unoptimized hero images, render-blocking JS, slow server responses.',
			fix: 'Preload hero image, ship less JS, use a CDN, set explicit dimensions.',
			tone: 'good'
		},
		{
			metric: 'CLS',
			target: '≤ 0.1',
			measures: 'Cumulative Layout Shift — how much content jumps during load.',
			causes: 'Images without width/height, late-loading fonts, injected banners.',
			fix: 'Reserve space for images and embeds, use font-display: optional.',
			tone: 'warn'
		},
		{
			metric: 'INP',
			target: '≤ 200ms',
			measures: 'Interaction to Next Paint — responsiveness to user input.',
			causes: 'Long main-thread tasks, heavy rerenders, unthrottled handlers.',
			fix: 'Break up long tasks, debounce input, prefer Svelte’s fine-grained runes.',
			tone: 'bad'
		}
	];


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface VitalCard {\n" +
		"		metric: string;\n" +
		"		target: string;\n" +
		"		measures: string;\n" +
		"		causes: string;\n" +
		"		fix: string;\n" +
		"		tone: 'good' | 'warn' | 'bad';\n" +
		"	}\n" +
		"\n" +
		"	const cards: VitalCard[] = [\n" +
		"		{\n" +
		"			metric: 'LCP',\n" +
		"			target: '≤ 2.5s',\n" +
		"			measures: 'Largest Contentful Paint — when the main content becomes visible.',\n" +
		"			causes: 'Unoptimized hero images, render-blocking JS, slow server responses.',\n" +
		"			fix: 'Preload hero image, ship less JS, use a CDN, set explicit dimensions.',\n" +
		"			tone: 'good'\n" +
		"		},\n" +
		"		{\n" +
		"			metric: 'CLS',\n" +
		"			target: '≤ 0.1',\n" +
		"			measures: 'Cumulative Layout Shift — how much content jumps during load.',\n" +
		"			causes: 'Images without width/height, late-loading fonts, injected banners.',\n" +
		"			fix: 'Reserve space for images and embeds, use font-display: optional.',\n" +
		"			tone: 'warn'\n" +
		"		},\n" +
		"		{\n" +
		"			metric: 'INP',\n" +
		"			target: '≤ 200ms',\n" +
		"			measures: 'Interaction to Next Paint — responsiveness to user input.',\n" +
		"			causes: 'Long main-thread tasks, heavy rerenders, unthrottled handlers.',\n" +
		"			fix: 'Break up long tasks, debounce input, prefer Svelte’s fine-grained runes.',\n" +
		"			tone: 'bad'\n" +
		"		}\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.11 — Core Web Vitals\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Google’s three main performance signals are\n" +
		"		\u003ccode\u003eLCP\u003c/code\u003e (target ≤ 2.5s), \u003ccode\u003eCLS\u003c/code\u003e (target ≤ 0.1), and\n" +
		"		\u003ccode\u003eINP\u003c/code\u003e (target ≤ 200ms, which replaced First Input Delay in March\n" +
		"		2024). Svelte’s zero-runtime architecture helps all three: small bundles give\n" +
		"		fast LCP, reserved image dimensions give zero CLS, and predictable fine-grained\n" +
		"		reactivity gives fast INP. Monitor via the \u003ccode\u003eweb-vitals\u003c/code\u003e library or\n" +
		"		Chrome DevTools Lighthouse.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"grid\"\u003e\n" +
		"			{#each cards as c (c.metric)}\n" +
		"				\u003carticle class=\"card\" data-tone={c.tone}\u003e\n" +
		"					\u003ch2\u003e{c.metric}\u003c/h2\u003e\n" +
		"					\u003cp class=\"target\"\u003eTarget: \u003cstrong\u003e{c.target}\u003c/strong\u003e\u003c/p\u003e\n" +
		"					\u003cp class=\"field\"\u003e\u003cem\u003eMeasures.\u003c/em\u003e {c.measures}\u003c/p\u003e\n" +
		"					\u003cp class=\"field\"\u003e\u003cem\u003eCommon causes.\u003c/em\u003e {c.causes}\u003c/p\u003e\n" +
		"					\u003cp class=\"field\"\u003e\u003cem\u003eTypical fix.\u003c/em\u003e {c.fix}\u003c/p\u003e\n" +
		"				\u003c/article\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"note\"\u003e\n" +
		"			Note: INP replaced FID (First Input Delay) in March 2024 as Google’s\n" +
		"			responsiveness metric.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eLCP, CLS, and INP are the three Core Web Vitals.\u003c/li\u003e\n" +
		"		\u003cli\u003eEach has a \"good\" threshold you should aim for.\u003c/li\u003e\n" +
		"		\u003cli\u003eSvelte’s architecture naturally supports all three.\u003c/li\u003e\n" +
		"		\u003cli\u003eINP replaced FID in 2024 — use INP going forward.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>13.11 — Core Web Vitals</h1>
	<p class="concept">
		<strong>Concept.</strong> Google’s three main performance signals are
		<code>LCP</code> (target ≤ 2.5s), <code>CLS</code> (target ≤ 0.1), and
		<code>INP</code> (target ≤ 200ms, which replaced First Input Delay in March
		2024). Svelte’s zero-runtime architecture helps all three: small bundles give
		fast LCP, reserved image dimensions give zero CLS, and predictable fine-grained
		reactivity gives fast INP. Monitor via the <code>web-vitals</code> library or
		Chrome DevTools Lighthouse.
	</p>

	<div class="build">
		<div class="grid">
			{#each cards as c (c.metric)}
				<article class="card" data-tone={c.tone}>
					<h2>{c.metric}</h2>
					<p class="target">Target: <strong>{c.target}</strong></p>
					<p class="field"><em>Measures.</em> {c.measures}</p>
					<p class="field"><em>Common causes.</em> {c.causes}</p>
					<p class="field"><em>Typical fix.</em> {c.fix}</p>
				</article>
			{/each}
		</div>
		<p class="note">
			Note: INP replaced FID (First Input Delay) in March 2024 as Google’s
			responsiveness metric.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment simulates a Core Web Vitals regression. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Add a synchronous <code>for</code> loop that blocks the main thread for 3 seconds in the component’s script.</strong> LCP degrades because the browser cannot paint the largest contentful element until the blocking script finishes. INP also suffers because no user interaction can be processed while the main thread is occupied. This demonstrates why long tasks are the primary enemy of both metrics.</li>
		<li><strong>Remove the <code>width</code> and <code>height</code> attributes (or aspect-ratio CSS) from an image element.</strong> Without explicit dimensions, the browser does not know how much space to reserve. When the image loads, surrounding content shifts downward, producing a CLS spike. Setting explicit dimensions or using CSS <code>aspect-ratio</code> eliminates layout shift entirely.</li>
		<li><strong>Load a large unoptimised hero image (2MB+) without a <code>fetchpriority="high"</code> or preload hint.</strong> LCP balloons because the browser discovers the image late in the loading waterfall and must download a massive file. Preloading the hero image and serving a properly sized, compressed format (WebP or AVIF) is the most impactful LCP optimisation.</li>
		<li><strong>Inject a banner element at the top of the page after a 2-second delay using <code>setTimeout</code>.</strong> The late-injected element pushes all content downward, causing a large CLS score. Late-loading banners, cookie notices, and ad slots are the most common real-world CLS offenders. Reserve space for them in the initial layout to prevent shift.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Core Web Vitals are Google’s three primary performance signals for search ranking: LCP (Largest Contentful Paint, target 2.5 seconds or less), CLS (Cumulative Layout Shift, target 0.1 or less), and INP (Interaction to Next Paint, target 200 milliseconds or less, which replaced FID in March 2024). Each metric measures a different dimension of user experience: loading speed, visual stability, and responsiveness to input.</p>
	<p class="prose">Svelte’s compiled, zero-runtime architecture provides a strong foundation for all three metrics. Small bundle sizes mean faster LCP because there is less JavaScript to parse and execute before the page can paint. Fine-grained reactivity through runes means shorter main-thread tasks and better INP because updates touch only the DOM nodes that changed. And Svelte’s component-scoped styles encourage explicit sizing, which helps prevent CLS.</p>
	<p class="prose">Monitoring is essential because performance regressions often happen gradually. The <code>web-vitals</code> library can capture real user measurements and send them to an analytics endpoint. Chrome DevTools Lighthouse provides lab-based audits. Google Search Console’s Core Web Vitals report shows field data aggregated from real Chrome users. The combination of lab and field data gives you both the ability to diagnose issues locally and verify that fixes improve the experience for actual visitors.</p>
	<p class="next">Next, you will learn how E-E-A-T (Experience, Expertise, Authoritativeness, Trust) signals affect how Google evaluates content quality.</p>
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
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.card[data-tone='good'] {
		border-color: var(--color-success);
	}
	.card[data-tone='warn'] {
		border-color: var(--color-warning);
	}
	.card[data-tone='bad'] {
		border-color: var(--color-error);
	}
	.card h2 {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-lg);
	}
	.target {
		margin: 0;
		color: var(--color-text-muted);
	}
	.target strong {
		color: var(--color-text);
	}
	.field {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.field em {
		color: var(--color-text);
		font-style: normal;
		font-weight: 600;
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
		.grid {
			grid-template-columns: repeat(3, 1fr);
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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
