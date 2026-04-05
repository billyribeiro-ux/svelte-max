<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>LCP, CLS, and INP are the three Core Web Vitals.</li>
		<li>Each has a "good" threshold you should aim for.</li>
		<li>Svelte’s architecture naturally supports all three.</li>
		<li>INP replaced FID in 2024 — use INP going forward.</li>
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
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
