<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { dashboard } from '$lib/stores/dashboard.svelte';
	import { slide } from 'svelte/transition';
	import type { KpiMetric } from '$lib/types/kpi';

	let demoLoading = $state(false);
	let demoError = $state(false);
	let demoEmpty = $state(false);

	const emptyMetrics: KpiMetric[] = [];

	const errorMetric: KpiMetric = {
		id: 'error-demo',
		label: 'Failed Metric',
		value: 0,
		previousValue: 0,
		target: 100,
		unit: '',
		history: []
	};

	const displayMetrics = $derived.by(() => {
		if (demoEmpty) return emptyMetrics;
		return dashboard.metrics;
	});

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"	import KpiCard from '$lib/components/KpiCard.svelte';\n" +
		"	import { dashboard } from '$lib/stores/dashboard.svelte';\n" +
		"\n" +
		"	let demoLoading = $state(false);\n" +
		"	let demoError = $state(false);\n" +
		"	let demoEmpty = $state(false);\n" +
		"\n" +
		"	// Loading: shimmer skeletons per card\n" +
		"	// Error: per-card error state, not whole-page\n" +
		"	// Empty: actionable empty state\n" +
		"	// Filters: propagate to every component\n" +
		"	// ARIA: keyboard-navigable cards with landmarks\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eKPI.10 — Distinguished Engineer Patterns\u003c/h1\u003e\n" +
		"	\u003cdiv class=\"kpi-grid\"\u003e\n" +
		"		{#each dashboard.metrics as metric (metric.id)}\n" +
		"			\u003cKpiCard {metric} /\u003e\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>KPI.10 — Distinguished Engineer Patterns</h1>
	<p class="concept">
		<strong>Concept.</strong> What separates a junior dashboard from a DE dashboard:
		(1) Loading skeletons per card, not a full-page spinner. (2) Error states per
		card, so one failing metric does not blank the whole page. (3) Empty states with
		actionable hints. (4) Global filters that propagate to every component.
		(5) Keyboard-navigable cards with proper ARIA landmarks.
	</p>

	<div class="build">
		<h2>State toggles</h2>
		<div class="toggles">
			<label class="toggle-label">
				<input type="checkbox" bind:checked={demoLoading} />
				<span>Loading</span>
			</label>
			<label class="toggle-label">
				<input type="checkbox" bind:checked={demoError} />
				<span>Error</span>
			</label>
			<label class="toggle-label">
				<input type="checkbox" bind:checked={demoEmpty} />
				<span>Empty</span>
			</label>
		</div>

		<h2>Filter bar</h2>
		<div class="filter-bar" role="toolbar" aria-label="Dashboard filters">
			<div class="filter-group">
				<label class="filter-label" for="env-select">Environment</label>
				<select
					id="env-select"
					class="filter-select"
					value={dashboard.filters.environment}
					onchange={(e) => dashboard.setEnvironment(e.currentTarget.value as 'production' | 'staging' | 'development')}
				>
					<option value="production">Production</option>
					<option value="staging">Staging</option>
					<option value="development">Development</option>
				</select>
			</div>
			<div class="filter-group">
				<label class="filter-label" for="time-select">Time Range</label>
				<select
					id="time-select"
					class="filter-select"
					value={dashboard.filters.timeRange}
					onchange={(e) => dashboard.setTimeRange(e.currentTarget.value as '1h' | '6h' | '24h' | '7d' | '30d')}
				>
					<option value="1h">Last 1h</option>
					<option value="6h">Last 6h</option>
					<option value="24h">Last 24h</option>
					<option value="7d">Last 7d</option>
					<option value="30d">Last 30d</option>
				</select>
			</div>
			<span class="filter-status">
				{dashboard.filters.environment} / {dashboard.filters.timeRange}
			</span>
		</div>

		<h2>Dashboard cards</h2>
		<div class="kpi-grid" role="region" aria-label="Key performance indicators">
			{#if demoEmpty}
				<div class="empty-state" role="status">
					<span class="empty-icon">&#x1f4ad;</span>
					<p class="empty-title">No metrics available</p>
					<p class="empty-hint">Try selecting a different environment or time range.</p>
				</div>
			{:else}
				{#each displayMetrics as metric (metric.id)}
					{#if demoLoading}
						<article class="skeleton-card" aria-hidden="true">
							<div class="skeleton-line skeleton-short"></div>
							<div class="skeleton-line skeleton-wide"></div>
							<div class="skeleton-line skeleton-med"></div>
							<div class="skeleton-bar"></div>
						</article>
					{:else if demoError}
						<!-- out:slide — standalone exit-only transition on dismissed error cards -->
					<article class="error-card" role="alert" out:slide={{ duration: 250 }}>
							<span class="error-label">{metric.label}</span>
							<span class="error-icon">&#x26A0;</span>
							<p class="error-text">Failed to load metric</p>
							<button class="error-retry" type="button" onclick={() => { demoError = false; }}>
								Retry
							</button>
						</article>
					{:else}
						<KpiCard {metric} />
					{/if}
				{/each}
			{/if}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Production dashboard patterns handle the unhappy paths. Break them to see what users experience when things go wrong.</p>
	<ol class="experiments">
		<li><strong>Enable the Loading toggle and remove the skeleton card shimmer animation.</strong> The loading state becomes a static gray block with no visual indication that something is happening. The shimmer animation communicates "loading in progress" — without it, users assume the dashboard is broken or frozen.</li>
		<li><strong>Enable the Error toggle and remove the Retry button from error cards.</strong> Users see a failure message with no way to recover. Actionable error states with a retry mechanism are what separate professional dashboards from amateur ones — never show an error without offering a next step.</li>
		<li><strong>Remove <code>role="region"</code> and <code>aria-label</code> from the KPI grid container.</strong> Screen reader users lose the ability to navigate directly to the KPI section using landmark navigation. ARIA landmarks create a table of contents for assistive technologies.</li>
		<li><strong>Remove the filter bar's <code>role="toolbar"</code> and its <code>aria-label</code>.</strong> Keyboard users lose the semantic grouping of filter controls. The toolbar role tells assistive technologies that these controls operate as a unit, enabling efficient navigation with arrow keys.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Loading skeletons rendered per card maintain layout stability while data loads, preventing cumulative layout shift. The shimmer animation communicates active loading — static placeholders look broken. Per-card error states isolate failures so that one bad API call does not blank the entire dashboard.</p>
	<p class="prose">Empty states with actionable hints guide users toward resolution instead of presenting a blank screen. Global filters propagate through the reactive store to every subscribed component automatically, ensuring that environment and time-range selections affect all cards simultaneously without prop drilling.</p>
	<p class="prose">ARIA landmarks (<code>role="region"</code>, <code>role="toolbar"</code>) and labels make the dashboard keyboard-navigable and screen-reader friendly. These invisible structural elements create a navigation map for assistive technologies, making complex dashboards as accessible as simple web pages.</p>
	<p class="next">You have completed the KPI cards track. Apply these patterns in the project lesson to build a production-quality dashboard.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
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
	.build h2 {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		margin: 0;
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

	.toggles {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toggle-label input[type='checkbox'] {
		accent-color: var(--color-brand);
	}

	/* ── Filter Bar ── */
	.filter-bar {
		display: flex;
		align-items: flex-end;
		gap: var(--space-md);
		flex-wrap: wrap;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.filter-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.filter-select {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.filter-status {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-inline-start: auto;
		font-family: var(--font-mono);
	}

	/* ── KPI Grid ── */
	.kpi-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	/* interpolate-size: allow-keywords — enables animating to/from keyword sizes like 'auto' */
	.build {
		interpolate-size: allow-keywords;
	}

	/* @starting-style — entry animation for skeleton-to-content transitions */
	@starting-style {
		.skeleton-card {
			opacity: 0;
			transform: scale(0.97);
		}
	}

	/* ── Skeleton ── */
	.skeleton-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		/* Smooth entry from @starting-style */
		opacity: 1;
		transform: scale(1);
		transition:
			opacity var(--dur-base) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}

	.skeleton-line {
		block-size: 12px;
		background: var(--color-border);
		border-radius: var(--radius-xs);
		animation: shimmer 1.5s infinite ease-in-out;
	}

	.skeleton-short { inline-size: 40%; }
	.skeleton-wide { inline-size: 70%; block-size: 24px; }
	.skeleton-med { inline-size: 55%; }

	.skeleton-bar {
		block-size: 28px;
		inline-size: 100%;
		background: var(--color-border);
		border-radius: var(--radius-xs);
		animation: shimmer 1.5s infinite ease-in-out;
		animation-delay: 0.3s;
	}

	@keyframes shimmer {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 0.8; }
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton-line, .skeleton-bar {
			animation: none;
			opacity: 0.5;
		}
	}

	/* ── Error Card ── */
	.error-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-lg);
		background: var(--color-surface-2);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.error-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.error-icon {
		font-size: var(--text-2xl);
		line-height: 1;
	}

	.error-text {
		font-size: var(--text-sm);
		color: var(--color-error);
		margin: 0;
	}

	.error-retry {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		font-weight: 600;
		background: var(--color-surface-1);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	.error-retry:hover {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}

	/* ── Empty State ── */
	.empty-state {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-2xl) var(--space-lg);
		background: var(--color-surface-2);
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.empty-icon {
		font-size: var(--text-3xl);
		line-height: 1;
	}

	.empty-title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
		margin: 0;
	}

	.empty-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
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
		.kpi-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
		.kpi-grid { grid-template-columns: repeat(4, 1fr); }
	}
</style>
