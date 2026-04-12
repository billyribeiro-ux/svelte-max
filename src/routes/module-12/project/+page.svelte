<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { Action } from 'svelte/action';

	// --- Dashboard state ---
	let dropdownOpen = $state(false);
	let widgetCrashed = $state(false);
	let widgetKey = $state(0);
	let sectionVisible = $state(false);
	let activeTab = $state<'vitest' | 'playwright' | 'sw'>('vitest');

	// --- use:clickOutside ---
	const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				callback();
			}
		}
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};

	// --- use:intersect ---
	const intersect: Action<HTMLElement, (visible: boolean) => void> = (node, callback) => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					callback(entry.isIntersecting);
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	};

	// --- $derived.by memoized computation ---
	type MetricData = { label: string; value: number; change: number };

	const rawMetrics: MetricData[] = [
		{ label: 'Page Views', value: 24580, change: 12.3 },
		{ label: 'Unique Visitors', value: 8920, change: -2.1 },
		{ label: 'Bounce Rate', value: 34, change: -5.8 },
		{ label: 'Avg. Session', value: 185, change: 8.4 },
		{ label: 'Conversions', value: 342, change: 15.7 },
		{ label: 'Revenue', value: 18450, change: 22.1 }
	];

	let sortBy = $state<'label' | 'value' | 'change'>('value');
	let computeCount = $state(0);

	const sortedMetrics = $derived.by(() => {
		computeCount++;
		return [...rawMetrics].sort((a, b) => {
			if (sortBy === 'label') return a.label.localeCompare(b.label);
			if (sortBy === 'value') return b.value - a.value;
			return b.change - a.change;
		});
	});

	// --- Deployment checklist ---
	type CheckItem = { label: string; done: boolean };
	let deployChecklist = $state<CheckItem[]>([
		{ label: 'Choose adapter (node/vercel/static)', done: false },
		{ label: 'Set environment variables', done: false },
		{ label: 'Run npm run build', done: false },
		{ label: 'Test with npm run preview', done: false },
		{ label: 'Enable HTTPS', done: false },
		{ label: 'Configure error monitoring', done: false },
		{ label: 'Verify Core Web Vitals', done: false },
		{ label: 'Set up CI/CD pipeline', done: false }
	]);

	function toggleDeploy(index: number) {
		deployChecklist[index].done = !deployChecklist[index].done;
	}

	const deployDone = $derived(deployChecklist.filter((c) => c.done).length);

	function crashWidget() {
		widgetCrashed = true;
	}

	function resetWidget() {
		widgetCrashed = false;
		widgetKey++;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { Action } from 'svelte/action';\n" +
		"\n" +
		"	// --- Dashboard state ---\n" +
		"	let dropdownOpen = $state(false);\n" +
		"	let widgetCrashed = $state(false);\n" +
		"	let widgetKey = $state(0);\n" +
		"	let sectionVisible = $state(false);\n" +
		"	let activeTab = $state\u003c'vitest' | 'playwright' | 'sw'\u003e('vitest');\n" +
		"\n" +
		"	// --- use:clickOutside ---\n" +
		"	const clickOutside: Action\u003cHTMLElement, () =\u003e void\u003e = (node, callback) =\u003e {\n" +
		"		function handleClick(event: MouseEvent) {\n" +
		"			if (!node.contains(event.target as Node)) {\n" +
		"				callback();\n" +
		"			}\n" +
		"		}\n" +
		"		document.addEventListener('click', handleClick, true);\n" +
		"		return {\n" +
		"			destroy() {\n" +
		"				document.removeEventListener('click', handleClick, true);\n" +
		"			}\n" +
		"		};\n" +
		"	};\n" +
		"\n" +
		"	// --- use:intersect ---\n" +
		"	const intersect: Action\u003cHTMLElement, (visible: boolean) =\u003e void\u003e = (node, callback) =\u003e {\n" +
		"		const observer = new IntersectionObserver(\n" +
		"			(entries) =\u003e {\n" +
		"				for (const entry of entries) {\n" +
		"					callback(entry.isIntersecting);\n" +
		"				}\n" +
		"			},\n" +
		"			{ threshold: 0.3 }\n" +
		"		);\n" +
		"		observer.observe(node);\n" +
		"		return {\n" +
		"			destroy() {\n" +
		"				observer.disconnect();\n" +
		"			}\n" +
		"		};\n" +
		"	};\n" +
		"\n" +
		"	// --- $derived.by memoized computation ---\n" +
		"	type MetricData = { label: string; value: number; change: number };\n" +
		"\n" +
		"	const rawMetrics: MetricData[] = [\n" +
		"		{ label: 'Page Views', value: 24580, change: 12.3 },\n" +
		"		{ label: 'Unique Visitors', value: 8920, change: -2.1 },\n" +
		"		{ label: 'Bounce Rate', value: 34, change: -5.8 },\n" +
		"		{ label: 'Avg. Session', value: 185, change: 8.4 },\n" +
		"		{ label: 'Conversions', value: 342, change: 15.7 },\n" +
		"		{ label: 'Revenue', value: 18450, change: 22.1 }\n" +
		"	];\n" +
		"\n" +
		"	let sortBy = $state\u003c'label' | 'value' | 'change'\u003e('value');\n" +
		"	let computeCount = $state(0);\n" +
		"\n" +
		"	const sortedMetrics = $derived.by(() =\u003e {\n" +
		"		computeCount++;\n" +
		"		return [...rawMetrics].sort((a, b) =\u003e {\n" +
		"			if (sortBy === 'label') return a.label.localeCompare(b.label);\n" +
		"			if (sortBy === 'value') return b.value - a.value;\n" +
		"			return b.change - a.change;\n" +
		"		});\n" +
		"	});\n" +
		"\n" +
		"	// --- Deployment checklist ---\n" +
		"	type CheckItem = { label: string; done: boolean };\n" +
		"	let deployChecklist = $state\u003cCheckItem[]\u003e([\n" +
		"		{ label: 'Choose adapter (node/vercel/static)', done: false },\n" +
		"		{ label: 'Set environment variables', done: false },\n" +
		"		{ label: 'Run npm run build', done: false },\n" +
		"		{ label: 'Test with npm run preview', done: false },\n" +
		"		{ label: 'Enable HTTPS', done: false },\n" +
		"		{ label: 'Configure error monitoring', done: false },\n" +
		"		{ label: 'Verify Core Web Vitals', done: false },\n" +
		"		{ label: 'Set up CI/CD pipeline', done: false }\n" +
		"	]);\n" +
		"\n" +
		"	function toggleDeploy(index: number) {\n" +
		"		deployChecklist[index].done = !deployChecklist[index].done;\n" +
		"	}\n" +
		"\n" +
		"	const deployDone = $derived(deployChecklist.filter((c) =\u003e c.done).length);\n" +
		"\n" +
		"	function crashWidget() {\n" +
		"		widgetCrashed = true;\n" +
		"	}\n" +
		"\n" +
		"	function resetWidget() {\n" +
		"		widgetCrashed = false;\n" +
		"		widgetKey++;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eModule 12 Project — Production Ready\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		This dashboard brings together everything from Module 12: \u003cstrong\u003eimage optimization\u003c/strong\u003e,\n" +
		"		\u003cstrong\u003eerror boundaries\u003c/strong\u003e, \u003cstrong\u003ereusable actions\u003c/strong\u003e, \u003cstrong\u003ememoized computations\u003c/strong\u003e,\n" +
		"		\u003cstrong\u003edeployment readiness\u003c/strong\u003e, \u003cstrong\u003etesting patterns\u003c/strong\u003e, and\n" +
		"		\u003cstrong\u003eservice worker strategies\u003c/strong\u003e. A production-ready Svelte application in one page.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003c!-- Hero Image with optimization --\u003e\n" +
		"	\u003cdiv class=\"hero\"\u003e\n" +
		"		\u003cimg\n" +
		"			src=\"https://picsum.photos/seed/dashboard/1200/400\"\n" +
		"			alt=\"Dashboard hero banner showing analytics overview\"\n" +
		"			width=\"1200\"\n" +
		"			height=\"400\"\n" +
		"			fetchpriority=\"high\"\n" +
		"		/\u003e\n" +
		"		\u003cdiv class=\"hero-overlay\"\u003e\n" +
		"			\u003ch2\u003ePerformance Dashboard\u003c/h2\u003e\n" +
		"			\u003cp\u003eReal-time analytics with production-grade patterns\u003c/p\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003c!-- Dropdown with use:clickOutside --\u003e\n" +
		"	\u003ch3\u003eQuick Actions (use:clickOutside)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This dropdown uses \u003ccode\u003euse:clickOutside\u003c/code\u003e to close when clicking elsewhere on the page.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cdiv class=\"dropdown-wrapper\" use:clickOutside={() =\u003e { dropdownOpen = false; }}\u003e\n" +
		"			\u003cbutton class=\"demo-btn\" onclick={() =\u003e { dropdownOpen = !dropdownOpen; }}\u003e\n" +
		"				Actions {dropdownOpen ? '(open)' : '(closed)'}\n" +
		"			\u003c/button\u003e\n" +
		"			{#if dropdownOpen}\n" +
		"				\u003cdiv class=\"dropdown-menu\"\u003e\n" +
		"					\u003cdiv class=\"dropdown-item\"\u003eExport CSV\u003c/div\u003e\n" +
		"					\u003cdiv class=\"dropdown-item\"\u003eGenerate Report\u003c/div\u003e\n" +
		"					\u003cdiv class=\"dropdown-item\"\u003eShare Dashboard\u003c/div\u003e\n" +
		"					\u003cdiv class=\"dropdown-item\"\u003eSettings\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003c!-- Error boundary widget --\u003e\n" +
		"	\u003ch3\u003eAnalytics Widget (svelte:boundary)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This widget is wrapped in \u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e. Click \"Crash\" to trigger\n" +
		"			an error — the boundary catches it and shows fallback UI.\n" +
		"		\u003c/p\u003e\n" +
		"		{#key widgetKey}\n" +
		"			\u003csvelte:boundary\u003e\n" +
		"				\u003cdiv class=\"widget\"\u003e\n" +
		"					{#if widgetCrashed}\n" +
		"						{(() =\u003e { throw new Error('Analytics widget crashed!'); })()}\n" +
		"					{/if}\n" +
		"					\u003cdiv class=\"widget-header\"\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>Module 12 Project — Production Ready</h1>

	<p class="concept">
		This dashboard brings together everything from Module 12: <strong>image optimization</strong>,
		<strong>error boundaries</strong>, <strong>reusable actions</strong>, <strong>memoized computations</strong>,
		<strong>deployment readiness</strong>, <strong>testing patterns</strong>, and
		<strong>service worker strategies</strong>. A production-ready Svelte application in one page.
	</p>

	<!-- Hero Image with optimization -->
	<div class="hero">
		<img
			src="https://picsum.photos/seed/dashboard/1200/400"
			alt="Dashboard hero banner showing analytics overview"
			width="1200"
			height="400"
			fetchpriority="high"
		/>
		<div class="hero-overlay">
			<h2>Performance Dashboard</h2>
			<p>Real-time analytics with production-grade patterns</p>
		</div>
	</div>

	<!-- Dropdown with use:clickOutside -->
	<h3>Quick Actions (use:clickOutside)</h3>
	<div class="build">
		<p class="concept">
			This dropdown uses <code>use:clickOutside</code> to close when clicking elsewhere on the page.
		</p>
		<div class="dropdown-wrapper" use:clickOutside={() => { dropdownOpen = false; }}>
			<button class="demo-btn" onclick={() => { dropdownOpen = !dropdownOpen; }}>
				Actions {dropdownOpen ? '(open)' : '(closed)'}
			</button>
			{#if dropdownOpen}
				<div class="dropdown-menu">
					<div class="dropdown-item">Export CSV</div>
					<div class="dropdown-item">Generate Report</div>
					<div class="dropdown-item">Share Dashboard</div>
					<div class="dropdown-item">Settings</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Error boundary widget -->
	<h3>Analytics Widget (svelte:boundary)</h3>
	<div class="build">
		<p class="concept">
			This widget is wrapped in <code>&lt;svelte:boundary&gt;</code>. Click "Crash" to trigger
			an error — the boundary catches it and shows fallback UI.
		</p>
		{#key widgetKey}
			<svelte:boundary>
				<div class="widget">
					{#if widgetCrashed}
						{(() => { throw new Error('Analytics widget crashed!'); })()}
					{/if}
					<div class="widget-header">
						<h4>Live Analytics</h4>
						<button class="crash-btn" onclick={crashWidget}>Crash</button>
					</div>
					<div class="widget-stats">
						<div class="widget-stat">
							<span class="stat-val">1,247</span>
							<span class="stat-lbl">Active Users</span>
						</div>
						<div class="widget-stat">
							<span class="stat-val">89ms</span>
							<span class="stat-lbl">Avg Response</span>
						</div>
						<div class="widget-stat">
							<span class="stat-val">99.9%</span>
							<span class="stat-lbl">Uptime</span>
						</div>
					</div>
				</div>

				{#snippet failed(error)}
					<div class="widget error-widget">
						<h4>Widget Error</h4>
						<p class="error-msg">{(error as Error).message}</p>
						<button class="demo-btn" onclick={resetWidget}>Restore Widget</button>
					</div>
				{/snippet}
			</svelte:boundary>
		{/key}
	</div>

	<!-- $derived.by memoized metrics -->
	<h3>Metrics ($derived.by Memoization)</h3>
	<div class="build">
		<p class="concept">
			Metrics are sorted via <code>$derived.by()</code>. The computation counter shows
			it only re-runs when <code>sortBy</code> changes — not on unrelated state changes.
			<strong>Compute count: {computeCount}</strong>
		</p>
		<div class="sort-controls">
			<span>Sort by:</span>
			<button class="sort-btn" class:active={sortBy === 'label'} onclick={() => sortBy = 'label'}>Name</button>
			<button class="sort-btn" class:active={sortBy === 'value'} onclick={() => sortBy = 'value'}>Value</button>
			<button class="sort-btn" class:active={sortBy === 'change'} onclick={() => sortBy = 'change'}>Change</button>
		</div>
		<div class="metrics-grid">
			{#each sortedMetrics as metric}
				<div class="metric-card">
					<span class="metric-label">{metric.label}</span>
					<span class="metric-value">{metric.value.toLocaleString()}</span>
					<span class="metric-change" class:positive={metric.change > 0} class:negative={metric.change < 0}>
						{metric.change > 0 ? '+' : ''}{metric.change}%
					</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- use:intersect lazy section -->
	<h3>Lazy Section (use:intersect)</h3>
	<div class="build">
		<p class="concept">
			This section uses <code>use:intersect</code> to detect when it enters the viewport.
			Content loads only when visible.
		</p>
		<div class="intersect-section" use:intersect={(visible) => { sectionVisible = visible; }}>
			{#if sectionVisible}
				<div class="lazy-content">
					<h4>Section Loaded</h4>
					<p>This content was lazy-loaded when the section scrolled into view.
					In a real app, this could trigger a data fetch or render a heavy component.</p>
					<div class="lazy-chart">
						{#each [65, 42, 78, 55, 90, 38, 72, 85, 60, 45] as val}
							<div class="lazy-bar" style="height: {val}%"></div>
						{/each}
					</div>
				</div>
			{:else}
				<div class="lazy-placeholder">
					<p>Scroll to load content...</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Deployment checklist -->
	<h3>Deployment Checklist</h3>
	<div class="build">
		<p class="concept">
			<strong>{deployDone}/{deployChecklist.length}</strong> items completed.
		</p>
		<div class="progress-bar">
			<div class="progress-fill" style="width: {(deployDone / deployChecklist.length) * 100}%"></div>
		</div>
		<div class="checklist">
			{#each deployChecklist as item, i}
				<label class="check-item" class:checked={item.done}>
					<input type="checkbox" checked={item.done} onchange={() => toggleDeploy(i)} />
					<span>{item.label}</span>
				</label>
			{/each}
		</div>
	</div>

	<!-- Test patterns -->
	<h3>Testing Patterns</h3>
	<div class="build">
		<div class="test-tabs">
			<button class="sort-btn" class:active={activeTab === 'vitest'} onclick={() => activeTab = 'vitest'}>Vitest</button>
			<button class="sort-btn" class:active={activeTab === 'playwright'} onclick={() => activeTab = 'playwright'}>Playwright</button>
			<button class="sort-btn" class:active={activeTab === 'sw'} onclick={() => activeTab = 'sw'}>Service Worker</button>
		</div>

		{#if activeTab === 'vitest'}
			<pre>{`// dashboard.svelte.test.ts
import { describe, it, expect } from 'vitest';

describe('Dashboard Metrics', () => {
  it('sorts metrics by value descending', () => {
    const metrics = [
      { label: 'A', value: 100, change: 5 },
      { label: 'B', value: 300, change: -2 },
      { label: 'C', value: 200, change: 10 }
    ];
    const sorted = [...metrics].sort((a, b) => b.value - a.value);
    expect(sorted[0].label).toBe('B');
    expect(sorted[2].label).toBe('A');
  });

  it('computes deployment progress', () => {
    const items = [
      { done: true }, { done: false },
      { done: true }, { done: false }
    ];
    const done = items.filter(i => i.done).length;
    expect(done).toBe(2);
    expect(done / items.length).toBe(0.5);
  });
});`}</pre>
		{:else if activeTab === 'playwright'}
			<pre>{`// e2e/dashboard.test.ts
import { test, expect } from '@playwright/test';

test('dashboard loads and displays metrics', async ({ page }) => {
  await page.goto('/module-12/project');

  // Hero image loads
  const hero = page.locator('.hero img');
  await expect(hero).toHaveAttribute('fetchpriority', 'high');

  // Metrics are displayed
  await expect(page.getByText('Page Views')).toBeVisible();

  // Sort by change
  await page.getByRole('button', { name: 'Change' }).click();

  // Dropdown opens and closes
  await page.getByRole('button', { name: /actions/i }).click();
  await expect(page.getByText('Export CSV')).toBeVisible();
  await page.click('body');
  await expect(page.getByText('Export CSV')).not.toBeVisible();
});`}</pre>
		{:else}
			<pre>{`// src/service-worker.js (pattern for this dashboard)
import { build, files, version } from '$service-worker';

const CACHE = \`dashboard-\${version}\`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE) await caches.delete(key);
      }
    })
  );
});

// Cache-first for static assets,
// network-first for API data
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((c) => c || fetch(event.request))
    );
  }
});`}</pre>
		{/if}
	</div>

	<!-- Footer -->
	<footer class="project-footer">
		<p>Built with SvelteKit, Svelte 5 runes, and production-grade patterns from Module 12.</p>
		<p class="footer-sub">Image optimization | Error boundaries | Reusable actions | Memoization | Deployment | Testing | Service workers</p>
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	/* Hero */
	.hero {
		position: relative;
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-block: var(--space-lg);
		border: 2px solid oklch(62% 0.10 55);
	}
	.hero img {
		display: block;
		inline-size: 100%;
		block-size: auto;
	}
	.hero-overlay {
		position: absolute;
		inset-block-end: 0;
		inset-inline-start: 0;
		inset-inline-end: 0;
		background: linear-gradient(transparent, oklch(62% 0.10 55 / 0.85));
		padding: var(--space-xl) var(--space-lg) var(--space-lg);
		color: white;
	}
	.hero-overlay h2 { margin: 0; font-size: var(--text-xl); }
	.hero-overlay p { margin: var(--space-xs) 0 0; opacity: 0.9; }

	/* Dropdown */
	.dropdown-wrapper { position: relative; align-self: flex-start; }
	.dropdown-menu {
		position: absolute;
		inset-block-start: 100%;
		inset-inline-start: 0;
		margin-block-start: var(--space-xs);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		min-inline-size: 180px;
		z-index: 10;
	}
	.dropdown-item {
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	.dropdown-item:hover { background: var(--color-surface-1); }

	/* Buttons */
	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: oklch(62% 0.10 55);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
	}
	.crash-btn {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-error);
		color: white;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
	}

	/* Widget */
	.widget {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		background: var(--color-surface-2);
	}
	.widget-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-block-end: var(--space-md);
	}
	.widget-header h4 { margin: 0; }
	.widget-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
	}
	.widget-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
	}
	.stat-val {
		font-size: var(--text-lg);
		font-weight: 700;
		color: oklch(62% 0.10 55);
	}
	.stat-lbl {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.error-widget {
		border-color: var(--color-error);
		background: var(--color-error)0d;
	}
	.error-widget h4 { margin: 0 0 var(--space-sm); }
	.error-msg { color: var(--color-error); font-weight: 600; margin: 0 0 var(--space-sm); }

	/* Sort controls */
	.sort-controls, .test-tabs {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.sort-btn {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.sort-btn.active {
		background: oklch(62% 0.10 55);
		color: white;
		border-color: oklch(62% 0.10 55);
	}

	/* Metrics grid */
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
	}
	@media (min-inline-size: 768px) {
		.metrics-grid { grid-template-columns: repeat(3, 1fr); }
	}
	.metric-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.metric-label { font-size: var(--text-sm); color: var(--color-text-muted); }
	.metric-value { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); }
	.metric-change { font-size: var(--text-sm); font-weight: 600; }
	.metric-change.positive { color: var(--color-success); }
	.metric-change.negative { color: var(--color-error); }

	/* Intersect section */
	.intersect-section {
		min-block-size: 200px;
	}
	.lazy-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		min-block-size: 200px;
		border: 2px dashed var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
	}
	.lazy-placeholder p { margin: 0; }
	.lazy-content h4 { margin: 0; }
	.lazy-content p { margin: var(--space-xs) 0 var(--space-md); color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; }
	.lazy-chart {
		display: flex;
		align-items: flex-end;
		gap: 6px;
		block-size: 120px;
	}
	.lazy-bar {
		flex: 1;
		background: oklch(62% 0.10 55);
		border-radius: var(--radius-xs) var(--radius-xs) 0 0;
		min-block-size: 4px;
		animation: growUp 0.5s ease;
	}
	@keyframes growUp {
		from { transform: scaleY(0); transform-origin: bottom; }
		to { transform: scaleY(1); transform-origin: bottom; }
	}

	/* Checklist */
	.checklist {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.check-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		cursor: pointer;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.check-item:hover { background: var(--color-surface-2); }
	.check-item.checked span { text-decoration: line-through; opacity: 0.6; }
	.check-item input[type="checkbox"] { accent-color: oklch(62% 0.10 55); }
	.progress-bar {
		block-size: 6px;
		background: var(--color-surface-2);
		border-radius: 3px;
		overflow: hidden;
	}
	.progress-fill {
		block-size: 100%;
		background: var(--color-success);
		border-radius: 3px;
		transition: width 0.3s;
	}

	/* Footer */
	.project-footer {
		margin-block-start: var(--space-xl);
		padding: var(--space-lg);
		background: oklch(62% 0.10 55 / 0.1);
		border: 1px solid oklch(62% 0.10 55 / 0.3);
		border-radius: var(--radius-lg);
		text-align: center;
	}
	.project-footer p {
		margin: 0;
		color: var(--color-text);
		font-weight: 600;
	}
	.footer-sub {
		margin-block-start: var(--space-xs) !important;
		font-weight: 400 !important;
		color: var(--color-text-muted) !important;
		font-size: var(--text-sm);
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
