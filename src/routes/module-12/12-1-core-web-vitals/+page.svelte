<script lang="ts">
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
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
