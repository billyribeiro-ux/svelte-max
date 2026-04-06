<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Metric = {
		name: string;
		full: string;
		good: string;
		needsWork: string;
		poor: string;
		description: string;
		causes: string[];
		mitigations: string[];
	};

	const metrics: Metric[] = [
		{
			name: 'LCP',
			full: 'Largest Contentful Paint',
			good: '≤ 2.5s',
			needsWork: '2.5s – 4.0s',
			poor: '> 4.0s',
			description: 'Measures loading performance — time until the largest visible element renders.',
			causes: ['Slow server response', 'Render-blocking resources', 'Large unoptimized images', 'Client-side rendering delays'],
			mitigations: ['Use SSR/SSG with SvelteKit', 'Optimize images (width/height, lazy)', 'Preload critical resources', 'Use CDN for static assets']
		},
		{
			name: 'CLS',
			full: 'Cumulative Layout Shift',
			good: '≤ 0.1',
			needsWork: '0.1 – 0.25',
			poor: '> 0.25',
			description: 'Measures visual stability — how much visible content shifts unexpectedly.',
			causes: ['Images without dimensions', 'Dynamically injected content', 'Web fonts causing FOIT/FOUT', 'Late-loading ads or embeds'],
			mitigations: ['Always set width/height on images', 'Reserve space for dynamic content', 'Use font-display: swap', 'Use CSS contain where possible']
		},
		{
			name: 'INP',
			full: 'Interaction to Next Paint',
			good: '≤ 200ms',
			needsWork: '200ms – 500ms',
			poor: '> 500ms',
			description: 'Measures responsiveness — latency of user interactions throughout the page lifecycle.',
			causes: ['Long main-thread tasks', 'Excessive re-renders', 'Heavy event handlers', 'Large DOM size'],
			mitigations: ['Break up long tasks', 'Use $derived for memoization', 'Debounce rapid inputs', 'Minimize DOM nodes']
		}
	];

	function getColor(level: 'good' | 'needsWork' | 'poor'): string {
		const colors = { good: '#2d8a4e', needsWork: '#c47a10', poor: '#cc3333' };
		return colors[level];
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Metric = {\n" +
		"		name: string;\n" +
		"		full: string;\n" +
		"		good: string;\n" +
		"		needsWork: string;\n" +
		"		poor: string;\n" +
		"		description: string;\n" +
		"		causes: string[];\n" +
		"		mitigations: string[];\n" +
		"	};\n" +
		"\n" +
		"	const metrics: Metric[] = [\n" +
		"		{\n" +
		"			name: 'LCP',\n" +
		"			full: 'Largest Contentful Paint',\n" +
		"			good: '≤ 2.5s',\n" +
		"			needsWork: '2.5s – 4.0s',\n" +
		"			poor: '\u003e 4.0s',\n" +
		"			description: 'Measures loading performance — time until the largest visible element renders.',\n" +
		"			causes: ['Slow server response', 'Render-blocking resources', 'Large unoptimized images', 'Client-side rendering delays'],\n" +
		"			mitigations: ['Use SSR/SSG with SvelteKit', 'Optimize images (width/height, lazy)', 'Preload critical resources', 'Use CDN for static assets']\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'CLS',\n" +
		"			full: 'Cumulative Layout Shift',\n" +
		"			good: '≤ 0.1',\n" +
		"			needsWork: '0.1 – 0.25',\n" +
		"			poor: '\u003e 0.25',\n" +
		"			description: 'Measures visual stability — how much visible content shifts unexpectedly.',\n" +
		"			causes: ['Images without dimensions', 'Dynamically injected content', 'Web fonts causing FOIT/FOUT', 'Late-loading ads or embeds'],\n" +
		"			mitigations: ['Always set width/height on images', 'Reserve space for dynamic content', 'Use font-display: swap', 'Use CSS contain where possible']\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'INP',\n" +
		"			full: 'Interaction to Next Paint',\n" +
		"			good: '≤ 200ms',\n" +
		"			needsWork: '200ms – 500ms',\n" +
		"			poor: '\u003e 500ms',\n" +
		"			description: 'Measures responsiveness — latency of user interactions throughout the page lifecycle.',\n" +
		"			causes: ['Long main-thread tasks', 'Excessive re-renders', 'Heavy event handlers', 'Large DOM size'],\n" +
		"			mitigations: ['Break up long tasks', 'Use $derived for memoization', 'Debounce rapid inputs', 'Minimize DOM nodes']\n" +
		"		}\n" +
		"	];\n" +
		"\n" +
		"	function getColor(level: 'good' | 'needsWork' | 'poor'): string {\n" +
		"		const colors = { good: '#2d8a4e', needsWork: '#c47a10', poor: '#cc3333' };\n" +
		"		return colors[level];\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.1 — Core Web Vitals\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCore Web Vitals\u003c/strong\u003e are three metrics Google uses to measure real-world user experience:\n" +
		"		loading (LCP), visual stability (CLS), and interactivity (INP). Svelte's\n" +
		"		\u003cstrong\u003ezero-runtime architecture\u003c/strong\u003e helps because compiled output is minimal — no framework\n" +
		"		overhead at runtime means faster paint times, smaller bundles, and less main-thread work.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eScore Cards\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"cards\"\u003e\n" +
		"		{#each metrics as metric}\n" +
		"			\u003cdiv class=\"score-card\"\u003e\n" +
		"				\u003ch4\u003e{metric.name}\u003c/h4\u003e\n" +
		"				\u003cp class=\"full-name\"\u003e{metric.full}\u003c/p\u003e\n" +
		"				\u003cp class=\"metric-desc\"\u003e{metric.description}\u003c/p\u003e\n" +
		"				\u003cdiv class=\"thresholds\"\u003e\n" +
		"					\u003cspan class=\"threshold\" style=\"background: {getColor('good')}\"\u003eGood: {metric.good}\u003c/span\u003e\n" +
		"					\u003cspan class=\"threshold\" style=\"background: {getColor('needsWork')}\"\u003eNeeds Work: {metric.needsWork}\u003c/span\u003e\n" +
		"					\u003cspan class=\"threshold\" style=\"background: {getColor('poor')}\"\u003ePoor: {metric.poor}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eCauses &amp; Mitigations\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ctable class=\"causes-table\"\u003e\n" +
		"			\u003cthead\u003e\n" +
		"				\u003ctr\u003e\n" +
		"					\u003cth\u003eMetric\u003c/th\u003e\n" +
		"					\u003cth\u003eCommon Causes\u003c/th\u003e\n" +
		"					\u003cth\u003eMitigations\u003c/th\u003e\n" +
		"				\u003c/tr\u003e\n" +
		"			\u003c/thead\u003e\n" +
		"			\u003ctbody\u003e\n" +
		"				{#each metrics as metric}\n" +
		"					\u003ctr\u003e\n" +
		"						\u003ctd\u003e\u003cstrong\u003e{metric.name}\u003c/strong\u003e\u003c/td\u003e\n" +
		"						\u003ctd\u003e\n" +
		"							\u003cul\u003e\n" +
		"								{#each metric.causes as cause}\n" +
		"									\u003cli\u003e{cause}\u003c/li\u003e\n" +
		"								{/each}\n" +
		"							\u003c/ul\u003e\n" +
		"						\u003c/td\u003e\n" +
		"						\u003ctd\u003e\n" +
		"							\u003cul\u003e\n" +
		"								{#each metric.mitigations as fix}\n" +
		"									\u003cli\u003e{fix}\u003c/li\u003e\n" +
		"								{/each}\n" +
		"							\u003c/ul\u003e\n" +
		"						\u003c/td\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"				{/each}\n" +
		"			\u003c/tbody\u003e\n" +
		"		\u003c/table\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>12.1 — Core Web Vitals</h1>

	<p class="concept">
		<strong>Core Web Vitals</strong> are three metrics Google uses to measure real-world user experience:
		loading (LCP), visual stability (CLS), and interactivity (INP). Svelte's
		<strong>zero-runtime architecture</strong> helps because compiled output is minimal — no framework
		overhead at runtime means faster paint times, smaller bundles, and less main-thread work.
	</p>

	<h3>Score Cards</h3>
	<div class="cards">
		{#each metrics as metric}
			<div class="score-card">
				<h4>{metric.name}</h4>
				<p class="full-name">{metric.full}</p>
				<p class="metric-desc">{metric.description}</p>
				<div class="thresholds">
					<span class="threshold" style="background: {getColor('good')}">Good: {metric.good}</span>
					<span class="threshold" style="background: {getColor('needsWork')}">Needs Work: {metric.needsWork}</span>
					<span class="threshold" style="background: {getColor('poor')}">Poor: {metric.poor}</span>
				</div>
			</div>
		{/each}
	</div>

	<h3>Causes &amp; Mitigations</h3>
	<div class="build">
		<table class="causes-table">
			<thead>
				<tr>
					<th>Metric</th>
					<th>Common Causes</th>
					<th>Mitigations</th>
				</tr>
			</thead>
			<tbody>
				{#each metrics as metric}
					<tr>
						<td><strong>{metric.name}</strong></td>
						<td>
							<ul>
								{#each metric.causes as cause}
									<li>{cause}</li>
								{/each}
							</ul>
						</td>
						<td>
							<ul>
								{#each metric.mitigations as fix}
									<li>{fix}</li>
								{/each}
							</ul>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h3>Mitigation Checklist</h3>
	<div class="build">
		<ul>
			<li><strong>Use SvelteKit SSR</strong> — pages render on the server, delivering HTML immediately</li>
			<li><strong>Set explicit image dimensions</strong> — prevents layout shift (CLS)</li>
			<li><strong>Lazy-load below-fold images</strong> — reduces initial load time (LCP)</li>
			<li><strong>Code-split per route</strong> — SvelteKit does this automatically</li>
			<li><strong>Use <code>$derived</code> for expensive computations</strong> — avoids unnecessary re-renders (INP)</li>
			<li><strong>Debounce user input handlers</strong> — prevents rapid re-execution (INP)</li>
			<li><strong>Preload critical fonts</strong> — avoids FOIT/FOUT (CLS)</li>
			<li><strong>Minimize third-party scripts</strong> — reduces main-thread blocking</li>
			<li><strong>Use <code>fetchpriority="high"</code> on hero images</strong> — faster LCP element load</li>
			<li><strong>Monitor with Lighthouse / CrUX</strong> — track real-user metrics over time</li>
		</ul>
	</div>

	<h3>Why Svelte Helps</h3>
	<p class="concept">
		Unlike React or Vue, Svelte compiles components to imperative DOM updates at build time.
		There is <strong>no virtual DOM diffing</strong> at runtime, meaning less JavaScript to parse,
		less main-thread work, and faster interactions. SvelteKit adds SSR, streaming, and
		automatic code-splitting — all of which directly improve Core Web Vitals scores.
	</p>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Add a 3-second <code>await new Promise(r => setTimeout(r, 3000))</code> in your <code>load()</code> function.</strong> LCP jumps because the server delays the HTML response, proving that slow data fetching directly harms perceived loading speed.</li>
		<li><strong>Remove <code>width</code> and <code>height</code> attributes from an image above the fold.</strong> The page content shifts down once the image loads, causing a visible layout jump that worsens CLS.</li>
		<li><strong>Add a synchronous <code>for</code> loop that runs 100 million iterations in a click handler.</strong> The browser freezes during the loop and the click takes seconds to respond, demonstrating exactly what INP measures.</li>
		<li><strong>Disable JavaScript in DevTools and reload the page.</strong> With SSR enabled, the page still renders its content because SvelteKit sends HTML from the server, proving that SSR directly improves LCP even without client-side JS.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Core Web Vitals are three metrics that Google uses to measure real-world user experience: LCP (Largest Contentful Paint) measures loading speed, CLS (Cumulative Layout Shift) measures visual stability, and INP (Interaction to Next Paint) measures responsiveness. All three directly affect search ranking and user satisfaction.</p>
	<p class="prose">Svelte's compiler-first architecture gives you a head start on these metrics. Because Svelte compiles components to direct DOM operations at build time, there is no virtual DOM diffing at runtime, which keeps INP low. The small bundle size means less JavaScript to download and parse, directly improving LCP.</p>
	<p class="prose">SvelteKit layers additional performance features on top: server-side rendering sends real HTML on the first response (improving LCP), automatic code-splitting ensures each page loads only the JavaScript it needs, and streaming lets the browser start painting before all data has resolved. Together, these features make good Core Web Vitals the default rather than an afterthought.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-2-image-optimization">12.2 — Image optimization</a> — prevent layout shift and speed up image loading.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		margin-block: var(--space-md);
	}
	@media (min-width: 768px) {
		.cards { grid-template-columns: repeat(3, 1fr); }
	}
	.score-card {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}
	.score-card h4 {
		margin: 0;
		font-size: var(--text-lg);
	}
	.full-name {
		margin: var(--space-xs) 0 var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.metric-desc {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
		margin: 0 0 var(--space-sm);
	}
	.thresholds {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.threshold {
		display: inline-block;
		color: white;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		font-weight: 600;
	}
	.causes-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.causes-table th,
	.causes-table td {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		vertical-align: top;
		text-align: left;
	}
	.causes-table th {
		background: var(--color-surface-2);
		font-weight: 600;
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
