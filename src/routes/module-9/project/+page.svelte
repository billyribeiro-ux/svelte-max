<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();

	let refreshing = $state(false);

	async function refresh() {
		refreshing = true;
		await invalidate('app:weather');
		refreshing = false;
	}

	function formatTime(iso: string): string {
		const d = new Date(iso);
		return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { invalidate } from '$app/navigation';\n" +
		"	import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\n" +
		"	let refreshing = $state(false);\n" +
		"\n" +
		"	async function refresh() {\n" +
		"		refreshing = true;\n" +
		"		await invalidate('app:weather');\n" +
		"		refreshing = false;\n" +
		"	}\n" +
		"\n" +
		"	function formatTime(iso: string): string {\n" +
		"		const d = new Date(iso);\n" +
		"		return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page dashboard\"\u003e\n" +
		"	\u003ch1\u003eModule 9A Project — Weather Dashboard\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A production-shaped dashboard combining every load-function technique from\n" +
		"		Module 9A: parallel fetching for the fast data, streaming for slow historical data, a custom dependency\n" +
		"		key with \u003ccode\u003einvalidate\u003c/code\u003e for refresh, and typed \u003ccode\u003ePageData\u003c/code\u003e throughout.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cheader class=\"hero\"\u003e\n" +
		"		\u003cdiv class=\"hero-main\"\u003e\n" +
		"			\u003cspan class=\"location\"\u003e{data.current.location}\u003c/span\u003e\n" +
		"			\u003cdiv class=\"temp\"\u003e\n" +
		"				\u003cspan class=\"temp-value\"\u003e{data.current.tempC}\u003c/span\u003e\n" +
		"				\u003cspan class=\"temp-unit\"\u003e°C\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cspan class=\"condition\"\u003e{data.current.condition}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"hero-meta\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eObserved\u003c/span\u003e\n" +
		"			\u003cspan class=\"time\"\u003e{formatTime(data.current.observedAt)}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/header\u003e\n" +
		"\n" +
		"	{#if data.alerts.length \u003e 0}\n" +
		"		\u003cdiv class=\"alerts\"\u003e\n" +
		"			{#each data.alerts as alert (alert.id)}\n" +
		"				\u003cdiv class=\"alert alert-{alert.level}\"\u003e\n" +
		"					\u003cspan class=\"alert-title\"\u003e{alert.title}\u003c/span\u003e\n" +
		"					\u003cspan class=\"alert-body\"\u003e{alert.body}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	{/if}\n" +
		"\n" +
		"	\u003csection class=\"forecast\"\u003e\n" +
		"		\u003ch2\u003e5-day forecast\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"forecast-grid\"\u003e\n" +
		"			{#each data.forecast as day (day.day)}\n" +
		"				\u003carticle class=\"forecast-card\"\u003e\n" +
		"					\u003cspan class=\"forecast-day\"\u003e{day.day}\u003c/span\u003e\n" +
		"					\u003cspan class=\"forecast-icon\" aria-hidden=\"true\"\u003e\n" +
		"						{#if day.icon === 'sun'}☀{:else if day.icon === 'cloud-sun'}⛅{:else if day.icon === 'cloud'}☁{:else if day.icon === 'cloud-rain'}🌧{:else}☀{/if}\n" +
		"					\u003c/span\u003e\n" +
		"					\u003cdiv class=\"forecast-temps\"\u003e\n" +
		"						\u003cspan class=\"high\"\u003e{day.highC}°\u003c/span\u003e\n" +
		"						\u003cspan class=\"low\"\u003e{day.lowC}°\u003c/span\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/article\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/section\u003e\n" +
		"\n" +
		"	\u003csection class=\"historical\"\u003e\n" +
		"		\u003ch2\u003eHistorical context\u003c/h2\u003e\n" +
		"		{#await data.historical}\n" +
		"			\u003cdiv class=\"skeleton\"\u003e\n" +
		"				\u003cdiv class=\"skeleton-row\"\u003e\u003c/div\u003e\n" +
		"				\u003cdiv class=\"skeleton-row short\"\u003e\u003c/div\u003e\n" +
		"				\u003cp class=\"loading-text\"\u003eLoading history...\u003c/p\u003e\n" +
		"			\u003c/div\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page dashboard">
	<h1>Module 9A Project — Weather Dashboard</h1>
	<p class="concept">
		<strong>Concept.</strong> A production-shaped dashboard combining every load-function technique from
		Module 9A: parallel fetching for the fast data, streaming for slow historical data, a custom dependency
		key with <code>invalidate</code> for refresh, and typed <code>PageData</code> throughout.
	</p>

	<header class="hero">
		<div class="hero-main">
			<span class="location">{data.current.location}</span>
			<div class="temp">
				<span class="temp-value">{data.current.tempC}</span>
				<span class="temp-unit">°C</span>
			</div>
			<span class="condition">{data.current.condition}</span>
		</div>
		<div class="hero-meta">
			<span class="label">Observed</span>
			<span class="time">{formatTime(data.current.observedAt)}</span>
		</div>
	</header>

	{#if data.alerts.length > 0}
		<div class="alerts">
			{#each data.alerts as alert (alert.id)}
				<div class="alert alert-{alert.level}">
					<span class="alert-title">{alert.title}</span>
					<span class="alert-body">{alert.body}</span>
				</div>
			{/each}
		</div>
	{/if}

	<section class="forecast">
		<h2>5-day forecast</h2>
		<div class="forecast-grid">
			{#each data.forecast as day (day.day)}
				<article class="forecast-card">
					<span class="forecast-day">{day.day}</span>
					<span class="forecast-icon" aria-hidden="true">
						{#if day.icon === 'sun'}☀{:else if day.icon === 'cloud-sun'}⛅{:else if day.icon === 'cloud'}☁{:else if day.icon === 'cloud-rain'}🌧{:else}☀{/if}
					</span>
					<div class="forecast-temps">
						<span class="high">{day.highC}°</span>
						<span class="low">{day.lowC}°</span>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="historical">
		<h2>Historical context</h2>
		{#await data.historical}
			<div class="skeleton">
				<div class="skeleton-row"></div>
				<div class="skeleton-row short"></div>
				<p class="loading-text">Loading history...</p>
			</div>
		{:then hist}
			<div class="hist-body">
				<div class="hist-stat">
					<span class="label">Weekly average</span>
					<span class="hist-value">{hist.avgC}°C</span>
				</div>
				<p class="hist-note">{hist.trendNote}</p>
			</div>
		{/await}
	</section>

	<footer class="telemetry">
		<div class="tele-row">
			<span class="label">Parallel load duration</span>
			<span class="tele-value">{data.duration}ms</span>
		</div>
		<button type="button" onclick={refresh} disabled={refreshing}>
			{refreshing ? 'Refreshing...' : 'Refresh'}
		</button>
		<div class="built-with">
			<span class="label">Built with</span>
			<ul>
				<li>Parallel loading via <code>Promise.all</code></li>
				<li>Streaming via non-awaited Promise</li>
				<li>Custom dependency key <code>app:weather</code></li>
				<li><code>invalidate()</code> for scoped refresh</li>
				<li>Typed <code>PageData</code> end-to-end</li>
			</ul>
		</div>
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.dashboard {
		--color-brand: oklch(72% 0.12 220);
		--color-brand-dim: oklch(62% 0.1 220);
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dim) 100%);
		color: var(--color-surface);
		padding: var(--space-xl);
		border-radius: var(--radius-lg);
		margin-block: var(--space-lg);
		box-shadow: var(--shadow-md);
	}
	.hero-main {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.location {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.9;
	}
	.temp {
		display: flex;
		align-items: flex-start;
		gap: var(--space-xs);
	}
	.temp-value {
		font-size: var(--text-hero);
		font-weight: 700;
		line-height: 1;
	}
	.temp-unit {
		font-size: var(--text-2xl);
		font-weight: 400;
		margin-block-start: var(--space-sm);
	}
	.condition {
		font-size: var(--text-lg);
		opacity: 0.95;
	}
	.hero-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		opacity: 0.9;
	}
	.hero-meta .label {
		color: var(--color-surface);
		opacity: 0.8;
	}
	.time {
		font-family: var(--font-mono);
	}

	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.alerts {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block: var(--space-md);
	}
	.alert {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		border-inline-start-width: 4px;
	}
	.alert-info {
		border-inline-start-color: var(--color-brand);
	}
	.alert-warning {
		border-inline-start-color: var(--color-warning);
	}
	.alert-severe {
		border-inline-start-color: var(--color-error);
	}
	.alert-title {
		font-weight: 600;
		color: var(--color-text);
	}
	.alert-body {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.forecast,
	.historical {
		margin-block: var(--space-lg);
	}
	h2 {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin-block: 0 var(--space-md);
	}

	.forecast-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
	}
	.forecast-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
	}
	.forecast-day {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.forecast-icon {
		font-size: var(--text-2xl);
	}
	.forecast-temps {
		display: flex;
		gap: var(--space-sm);
		align-items: baseline;
	}
	.high {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}
	.low {
		color: var(--color-text-muted);
	}

	.historical {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}
	.hist-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.hist-stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.hist-value {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.hist-note {
		margin: 0;
		color: var(--color-text);
		line-height: 1.6;
	}

	.skeleton {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.skeleton-row {
		height: 1rem;
		background: var(--color-surface-2);
		border-radius: var(--radius-xs);
		animation: pulse 1.4s var(--ease-in-out) infinite;
	}
	.skeleton-row.short {
		width: 60%;
	}
	.loading-text {
		margin: 0;
		color: var(--color-text-muted);
		font-style: italic;
		font-size: var(--text-sm);
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.telemetry {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		margin-block-start: var(--space-lg);
	}
	.tele-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.tele-value {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		color: var(--color-brand);
		font-weight: 700;
	}
	button {
		align-self: flex-start;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: background var(--dur-sm) var(--ease-out);
	}
	button:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.built-with {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-block-start: var(--space-md);
		border-block-start: 1px solid var(--color-border);
	}
	.built-with ul {
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
		.hero {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
		.forecast-grid {
			grid-template-columns: repeat(5, 1fr);
		}
		.hist-body {
			flex-direction: row;
			align-items: center;
			gap: var(--space-xl);
		}
		.hist-stat {
			flex: 0 0 auto;
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
