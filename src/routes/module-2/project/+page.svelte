<script lang="ts">
	import { SvelteMap, MediaQuery } from 'svelte/reactivity';

	interface Metric {
		id: string;
		label: string;
		value: number;
		target: number;
		unit: string;
	}

	interface Activity {
		id: number;
		text: string;
		at: Date;
	}

	const STORAGE_KEY = 'svelte-max:module-2:dashboard';

	const initialMetrics: Metric[] = [
		{ id: 'req', label: 'Requests served', value: 18420, target: 20000, unit: 'req' },
		{ id: 'users', label: 'Active users', value: 642, target: 800, unit: 'users' },
		{ id: 'errors', label: 'Error rate', value: 17, target: 25, unit: 'err/min' },
		{ id: 'latency', label: 'P95 latency', value: 142, target: 200, unit: 'ms' }
	];

	const initialActivities: Activity[] = [
		{ id: 1, text: 'Deployment v2.4.0 shipped to production', at: new Date(Date.now() - 60_000) },
		{
			id: 2,
			text: 'New signup from hello@studio.example',
			at: new Date(Date.now() - 120_000)
		},
		{ id: 3, text: 'Cache hit ratio climbed to 94%', at: new Date(Date.now() - 240_000) },
		{ id: 4, text: 'Scheduled backup completed', at: new Date(Date.now() - 360_000) },
		{ id: 5, text: 'Feature flag "onboarding-v3" enabled for 10%', at: new Date(Date.now() - 480_000) }
	];

	const activityMessages: string[] = [
		'New user signed up from the marketing site',
		'Edge cache warmed in eu-west',
		'Background job finished in 820ms',
		'Webhook delivered to integration partner',
		'Rate limiter released a throttled client',
		'Health check passed on all regions',
		'A/B test bucket rebalanced',
		'Daily email digest queued',
		'Analytics batch flushed to warehouse',
		'New comment posted on thread #481'
	];

	let metrics = $state<Metric[]>(initialMetrics.map((m) => ({ ...m })));

	// SvelteMap: reactive Map. Mutations trigger re-renders of readers.
	const activities = new SvelteMap<number, Activity>();
	for (const a of initialActivities) activities.set(a.id, a);

	let query = $state('');
	let paused = $state(false);

	// MediaQuery is SSR-safe — returns a fallback during SSR, real value in browser.
	const isWide = new MediaQuery('(min-width: 768px)');

	// $derived.by for multi-field computations.
	const totals = $derived.by(() => {
		const totalProgress = metrics.reduce((sum, m) => sum + m.value / m.target, 0);
		const avgProgress = metrics.length > 0 ? (totalProgress / metrics.length) * 100 : 0;
		const overTarget = metrics.filter((m) => m.value >= m.target).length;
		return {
			avgProgress: Math.round(avgProgress),
			overTarget,
			count: metrics.length
		};
	});

	// Reactive search over the live Map. Newest first.
	const filteredActivities = $derived(
		[...activities.values()]
			.filter((a) => a.text.toLowerCase().includes(query.toLowerCase()))
			.sort((a, b) => b.at.getTime() - a.at.getTime())
	);

	// Restore saved snapshot on mount. $effect only runs in the browser, so
	// `localStorage` access is inherently safe here.
	$effect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw) as { metrics?: Metric[] };
			if (Array.isArray(parsed.metrics)) {
				metrics = parsed.metrics;
			}
		} catch {
			// Corrupt storage — leave defaults in place.
		}
	});

	// Persist metrics to localStorage whenever they change. $state.snapshot
	// converts the proxy into a plain cloneable value for JSON.stringify.
	$effect(() => {
		const snapshot = $state.snapshot({ metrics });
		localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
	});

	// Interval that streams new activities in — with cleanup. Respects the
	// pause toggle by early-returning inside the tick callback.
	$effect(() => {
		const id = window.setInterval(() => {
			if (paused) return;
			const now = Date.now();
			const text = activityMessages[Math.floor(Math.random() * activityMessages.length)];
			activities.set(now, { id: now, text, at: new Date(now) });
			// Cap the map so it doesn't grow forever.
			if (activities.size > 40) {
				const oldest = [...activities.keys()].sort((a, b) => a - b)[0];
				activities.delete(oldest);
			}
		}, 5000);

		return () => window.clearInterval(id);
	});

	function bumpMetric(id: string, delta: number): void {
		metrics = metrics.map((m) => (m.id === id ? { ...m, value: Math.max(0, m.value + delta) } : m));
	}

	function clearActivities(): void {
		activities.clear();
	}

	function resetAll(): void {
		metrics = initialMetrics.map((m) => ({ ...m }));
		activities.clear();
		for (const a of initialActivities) activities.set(a.id, a);
		query = '';
		paused = false;
		localStorage.removeItem(STORAGE_KEY);
	}

	function formatTime(d: Date): string {
		return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	}

	function percent(m: Metric): number {
		return Math.min(100, Math.round((m.value / m.target) * 100));
	}
</script>

<section class="page">
	<!--
		Per-page color personality. Overriding --color-brand on a root class
		scoped to this component gives the dashboard an amber identity without
		affecting any other page. This foreshadows Module 6.9 where we use the
		same pattern at route-group scale.
	-->
	<div class="dashboard">
		<h1>Module 2 Project — Interactive Dashboard</h1>

		<header class="topbar">
			<div class="summary">
				<span class="summary-label">Average progress</span>
				<span class="summary-value">{totals.avgProgress}%</span>
				<span class="summary-sub">
					{totals.overTarget} / {totals.count} metrics at or above target
				</span>
			</div>
			<button type="button" class="ghost" onclick={resetAll}>Reset dashboard</button>
		</header>

		<div class={['layout', { wide: isWide.current }]}>
			<section class="metrics" aria-label="Metrics">
				<h2>Metrics</h2>
				<div class="metric-grid">
					{#each metrics as m (m.id)}
						<article class="metric">
							<header class="metric-head">
								<span class="metric-label">{m.label}</span>
								<span class="metric-pct" class:over={m.value >= m.target}>
									{percent(m)}%
								</span>
							</header>
							<div class="metric-value">
								{m.value.toLocaleString()}
								<span class="metric-unit">{m.unit}</span>
							</div>
							<div class="metric-target">target {m.target.toLocaleString()} {m.unit}</div>
							<div class="bar" aria-hidden="true">
								<div class="fill" style:width="{percent(m)}%"></div>
							</div>
							<div class="metric-actions">
								<button type="button" onclick={() => bumpMetric(m.id, -10)}>−10</button>
								<button type="button" onclick={() => bumpMetric(m.id, 10)}>+10</button>
							</div>
						</article>
					{/each}
				</div>
			</section>

			<section class="feed" aria-label="Activity feed">
				<div class="feed-head">
					<h2>Activity</h2>
					<div class="feed-controls">
						<label class="toggle">
							<input type="checkbox" bind:checked={paused} />
							<span>{paused ? 'Feed paused' : 'Pause feed'}</span>
						</label>
						<button type="button" class="ghost small" onclick={clearActivities}>Clear</button>
					</div>
				</div>
				<input
					type="search"
					class="search"
					placeholder="Filter activities…"
					bind:value={query}
				/>
				<ul class="feed-list">
					{#each filteredActivities as a (a.id)}
						<li class="feed-item">
							<span class="time">{formatTime(a.at)}</span>
							<span class="text">{a.text}</span>
						</li>
					{:else}
						<li class="empty">No activities match your filter.</li>
					{/each}
				</ul>
			</section>
		</div>

		<footer class="built">
			<h3>Built with</h3>
			<ul>
				<li><code>$state</code> for typed reactive metrics and UI toggles</li>
				<li><code>$derived.by</code> for multi-field totals computation</li>
				<li><code>$derived</code> for the filtered, sorted activity list</li>
				<li><code>$effect</code> with cleanup — streaming activity interval</li>
				<li><code>$effect</code> syncing metrics to <code>localStorage</code></li>
				<li><code>$state.snapshot</code> for cloneable persistence payloads</li>
				<li><code>SvelteMap</code> as the reactive activity store</li>
				<li><code>MediaQuery</code> from <code>svelte/reactivity</code> for layout switching</li>
				<li>Class object binding <code>{'{ wide: isWide.current }'}</code></li>
				<li>Per-page OKLCH color personality on the <code>.dashboard</code> root</li>
			</ul>
		</footer>
	</div>
</section>

<style>
	/*
		Per-page personality: every descendant that reads --color-brand via
		var() now gets amber. Scoped to .dashboard so it never leaks.
	*/
	.dashboard {
		--color-brand: oklch(72% 0.18 60);
		--color-brand-dim: oklch(62% 0.15 60);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	h1 {
		color: var(--color-text);
	}

	.topbar {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
		justify-content: space-between;
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	@media (min-width: 768px) {
		.topbar {
			flex-direction: row;
			align-items: center;
		}
	}

	.summary {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.summary-label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.summary-value {
		font-size: var(--text-2xl);
		font-weight: 800;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}

	.summary-sub {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}

	.layout.wide {
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
	}

	h2 {
		font-size: var(--text-lg);
		margin-block-end: var(--space-md);
	}

	.metric-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	@media (min-width: 480px) {
		.metric-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.metric-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.metric {
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-shadow: var(--shadow-sm);
		transition: transform var(--dur-fast) var(--ease-spring);
	}

	.metric:hover {
		transform: translateY(-2px);
	}

	.metric-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-sm);
	}

	.metric-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.metric-pct {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.metric-pct.over {
		color: var(--color-success);
	}

	.metric-value {
		font-size: var(--text-xl);
		font-weight: 800;
		font-family: var(--font-mono);
		color: var(--color-text);
	}

	.metric-unit {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-inline-start: var(--space-xs);
	}

	.metric-target {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.bar {
		block-size: 0.4rem;
		background: var(--color-surface-2);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.fill {
		block-size: 100%;
		background: var(--color-brand);
		transition: width var(--dur-base) var(--ease-out);
	}

	.metric-actions {
		display: flex;
		gap: var(--space-xs);
		margin-block-start: var(--space-xs);
	}

	.metric-actions button {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
	}

	.metric-actions button:hover {
		border-color: var(--color-brand);
		color: var(--color-brand);
	}

	.feed {
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.feed-head {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		justify-content: space-between;
	}

	@media (min-width: 480px) {
		.feed-head {
			flex-direction: row;
			align-items: center;
		}
	}

	.feed-head h2 {
		margin: 0;
	}

	.feed-controls {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
	}

	.toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		cursor: pointer;
	}

	.toggle input {
		accent-color: var(--color-brand);
	}

	.search {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-sm);
	}

	.search:focus-visible {
		border-color: var(--color-brand);
		outline: none;
	}

	.feed-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		max-block-size: 22rem;
		overflow-y: auto;
	}

	.feed-item {
		display: flex;
		gap: var(--space-sm);
		padding: var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		font-size: var(--text-sm);
		border-inline-start: 3px solid var(--color-brand);
	}

	.feed-item .time {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		flex-shrink: 0;
	}

	.feed-item .text {
		color: var(--color-text);
	}

	.empty {
		padding: var(--space-md);
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-style: italic;
	}

	.ghost {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-text);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.ghost:hover {
		border-color: var(--color-brand);
		color: var(--color-brand);
	}

	.ghost.small {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
	}

	.built {
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.built h3 {
		font-size: var(--text-lg);
		margin-block-end: var(--space-md);
	}

	.built ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	@media (min-width: 768px) {
		.built ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.built code {
		font-family: var(--font-mono);
		color: var(--color-brand);
	}
</style>
