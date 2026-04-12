<script lang="ts">
	import KpiCard from '$lib/components/KpiCard.svelte';
	import { dashboard } from '$lib/stores/dashboard.svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	let running = $state(true);
	let demoLoading = $state(false);
	let demoError = $state(false);
	let demoEmpty = $state(false);

	$effect(() => {
		if (!running || !dashboard.filters.autoRefresh) return;
		const id = setInterval(() => dashboard.tick(), 2000);
		return () => clearInterval(id);
	});

	const lastUpdated = $state({ time: new Date() });

	$effect(() => {
		// Track metric changes to update timestamp
		void dashboard.metrics;
		lastUpdated.time = new Date();
	});

	function formatTime(date: Date): string {
		return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	}

	const levelColor: Record<string, string> = {
		info: 'var(--color-text-muted)',
		warning: 'oklch(70% 0.18 60)',
		error: 'var(--color-error)'
	};

	const levelBg: Record<string, string> = {
		info: 'oklch(95% 0.01 210)',
		warning: 'oklch(95% 0.03 60)',
		error: 'oklch(95% 0.03 25)'
	};

	const recentActivities = $derived(dashboard.activities.slice(-10).reverse());

	const concepts = [
		'Type-safe KpiMetric interfaces',
		'Animated counter with Tween',
		'Trend arrows with OKLCH colors',
		'SVG sparkline with gradient fill',
		'Circular progress ring',
		'Composed KpiCard component',
		'Reactive .svelte.ts store',
		'CSS Grid responsive layout',
		'Loading/Error/Empty states',
		'ARIA landmarks & a11y'
	];
</script>

<section class="mission-control page">
	<header class="mc-header">
		<div class="mc-title-row">
			<h1 class="mc-title">Mission Control</h1>
			<span class="mc-badge" class:live={running && dashboard.filters.autoRefresh}>
				{running && dashboard.filters.autoRefresh ? 'LIVE' : 'PAUSED'}
			</span>
		</div>

		<div class="mc-toolbar" role="toolbar" aria-label="Dashboard controls">
			<div class="mc-filter-group">
				<label class="mc-filter-label" for="mc-env">Environment</label>
				<select
					id="mc-env"
					class="mc-select"
					value={dashboard.filters.environment}
					onchange={(e) => dashboard.setEnvironment(e.currentTarget.value as 'production' | 'staging' | 'development')}
				>
					<option value="production">Production</option>
					<option value="staging">Staging</option>
					<option value="development">Development</option>
				</select>
			</div>

			<div class="mc-filter-group">
				<label class="mc-filter-label" for="mc-time">Time Range</label>
				<select
					id="mc-time"
					class="mc-select"
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

			<label class="mc-toggle">
				<input
					type="checkbox"
					checked={dashboard.filters.autoRefresh}
					onchange={() => {
						dashboard.filters = { ...dashboard.filters, autoRefresh: !dashboard.filters.autoRefresh };
					}}
				/>
				<span>Auto-refresh</span>
			</label>

			<time class="mc-timestamp" datetime={lastUpdated.time.toISOString()}>
				Updated {formatTime(lastUpdated.time)}
			</time>
		</div>
	</header>

	<!-- KPI Row -->
	<div class="mc-kpi-row" role="region" aria-label="Key performance indicators">
		{#if demoEmpty}
			<div class="mc-empty" role="status">
				<p class="mc-empty-title">No metrics available</p>
				<p class="mc-empty-hint">Select a different environment or time range to load data.</p>
			</div>
		{:else}
			{#each dashboard.metrics as metric (metric.id)}
				{#if demoLoading}
					<article class="mc-skeleton" aria-hidden="true">
						<div class="skel-line skel-short"></div>
						<div class="skel-line skel-wide"></div>
						<div class="skel-line skel-med"></div>
						<div class="skel-bar"></div>
					</article>
				{:else if demoError}
					<article class="mc-error-card" role="alert">
						<span class="mc-error-label">{metric.label}</span>
						<span class="mc-error-icon">&#x26A0;</span>
						<p class="mc-error-text">Failed to load</p>
						<button class="mc-retry-btn" type="button" onclick={() => { demoError = false; }}>
							Retry
						</button>
					</article>
				{:else}
					<KpiCard {metric} />
				{/if}
			{/each}
		{/if}
	</div>

	<!-- Activity Feed -->
	<aside class="mc-activity" aria-label="Activity feed">
		<h2 class="mc-section-title">Activity Feed</h2>
		<div class="mc-feed" role="log">
			{#each recentActivities as event (event.id)}
				<div class="mc-feed-item" style:background={levelBg[event.level]}>
					<span class="mc-feed-dot" style:background={levelColor[event.level]}></span>
					<span class="mc-feed-text">{event.text}</span>
					<time class="mc-feed-time">{formatTime(event.at)}</time>
				</div>
			{/each}
		</div>
	</aside>

	<!-- Controls -->
	<div class="mc-controls">
		<h2 class="mc-section-title">Controls</h2>
		<div class="mc-control-row">
			<button class="mc-btn mc-btn-primary" type="button" onclick={() => { running = !running; }}>
				{running ? 'Pause' : 'Resume'}
			</button>
			<button class="mc-btn mc-btn-secondary" type="button" onclick={() => dashboard.reset()}>
				Reset
			</button>

			<div class="mc-demo-toggles">
				<label class="mc-toggle">
					<input type="checkbox" bind:checked={demoLoading} />
					<span>Loading</span>
				</label>
				<label class="mc-toggle">
					<input type="checkbox" bind:checked={demoError} />
					<span>Error</span>
				</label>
				<label class="mc-toggle">
					<input type="checkbox" bind:checked={demoEmpty} />
					<span>Empty</span>
				</label>
			</div>
		</div>

		<p class="mc-motion-note">
			Reduced motion: <strong>{prefersReducedMotion.current ? 'ON' : 'OFF'}</strong>
		</p>
	</div>

	<!-- Footer -->
	<footer class="mc-footer">
		<p class="mc-footer-title">Built with</p>
		<ul class="mc-concepts">
			{#each concepts as concept}
				<li>{concept}</li>
			{/each}
		</ul>
	</footer>
</section>

<style>
	/* ── OKLCH Personality: steel cyan ── */
	.mission-control {
		--mc-brand: oklch(58% 0.15 210);
		--mc-brand-light: oklch(92% 0.04 210);
		--mc-brand-dark: oklch(35% 0.1 210);
	}

	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
	}

	/* ── Header ── */
	.mc-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: var(--mc-brand-light);
		border: 1px solid var(--mc-brand);
		border-radius: var(--radius-lg);
	}

	.mc-title-row {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.mc-title {
		font-size: var(--text-2xl);
		color: var(--mc-brand-dark);
		margin: 0;
	}

	.mc-badge {
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}

	.mc-badge.live {
		background: oklch(45% 0.15 145);
		color: oklch(95% 0.03 145);
	}

	.mc-toolbar {
		display: flex;
		align-items: flex-end;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.mc-filter-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.mc-filter-label {
		font-size: var(--text-xs);
		color: var(--mc-brand-dark);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.mc-select {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
		background: var(--color-surface);
		border: 1px solid var(--mc-brand);
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.mc-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.mc-toggle input[type='checkbox'] {
		accent-color: var(--mc-brand);
	}

	.mc-timestamp {
		font-size: var(--text-xs);
		color: var(--mc-brand-dark);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		margin-inline-start: auto;
	}

	/* ── KPI Row ── */
	.mc-kpi-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	/* ── Skeleton ── */
	.mc-skeleton {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.skel-line {
		block-size: 12px;
		background: var(--color-border);
		border-radius: var(--radius-xs);
		animation: shimmer 1.5s infinite ease-in-out;
	}

	.skel-short { inline-size: 40%; }
	.skel-wide { inline-size: 70%; block-size: 24px; }
	.skel-med { inline-size: 55%; }

	.skel-bar {
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
		.skel-line, .skel-bar {
			animation: none;
			opacity: 0.5;
		}
	}

	/* ── Error Card ── */
	.mc-error-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.mc-error-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.mc-error-icon {
		font-size: var(--text-2xl);
		line-height: 1;
	}

	.mc-error-text {
		font-size: var(--text-sm);
		color: var(--color-error);
		margin: 0;
	}

	.mc-retry-btn {
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		font-weight: 600;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	.mc-retry-btn:hover {
		background: var(--mc-brand);
		color: var(--color-surface);
		border-color: var(--mc-brand);
	}

	/* ── Empty State ── */
	.mc-empty {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-2xl) var(--space-lg);
		background: var(--color-surface-1);
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
	}

	.mc-empty-title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
		margin: 0;
	}

	.mc-empty-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	/* ── Activity Feed ── */
	.mc-activity {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}

	.mc-section-title {
		font-size: var(--text-sm);
		color: var(--mc-brand-dark);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 0 0 var(--space-sm) 0;
	}

	.mc-feed {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		max-block-size: 320px;
		overflow-y: auto;
	}

	.mc-feed-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
	}

	.mc-feed-dot {
		inline-size: 8px;
		block-size: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.mc-feed-text {
		flex: 1;
		color: var(--color-text);
	}

	.mc-feed-time {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	/* ── Controls ── */
	.mc-controls {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}

	.mc-control-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.mc-btn {
		padding: var(--space-sm) var(--space-lg);
		border: none;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	.mc-btn:hover {
		opacity: 0.85;
	}

	.mc-btn-primary {
		background: var(--mc-brand);
		color: white;
	}

	.mc-btn-secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.mc-demo-toggles {
		display: flex;
		gap: var(--space-md);
		margin-inline-start: var(--space-md);
	}

	.mc-motion-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: var(--space-sm) 0 0 0;
	}

	/* ── Footer ── */
	.mc-footer {
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-lg);
	}

	.mc-footer-title {
		font-size: var(--text-sm);
		color: var(--mc-brand-dark);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 0 0 var(--space-sm) 0;
	}

	.mc-concepts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.mc-concepts li {
		font-size: var(--text-xs);
		font-weight: 500;
		padding: var(--space-xs) var(--space-sm);
		background: var(--mc-brand-light);
		color: var(--mc-brand-dark);
		border: 1px solid var(--mc-brand);
		border-radius: var(--radius-sm);
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.mc-kpi-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-inline-size: 768px) {
		.mc-title {
			font-size: var(--text-3xl);
		}
	}

	@media (min-inline-size: 1024px) {
		.mc-kpi-row {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
