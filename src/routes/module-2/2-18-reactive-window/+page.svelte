<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import {
		innerWidth,
		innerHeight,
		outerWidth,
		outerHeight,
		scrollX,
		scrollY,
		online,
		devicePixelRatio,
		screenLeft,
		screenTop
	} from 'svelte/reactivity/window';

	// Scroll demo container
	let scrollBox: HTMLDivElement | undefined = $state();

	// Derived viewport label
	const viewportLabel = $derived.by(() => {
		const w = innerWidth.current;
		if (w === undefined) return 'server';
		if (w < 480) return 'mobile';
		if (w < 768) return 'tablet';
		if (w < 1024) return 'small desktop';
		return 'desktop';
	});

	// Track the online/offline status history
	let statusLog = $state<string[]>([]);

	$effect(() => {
		const status = online.current;
		if (status === undefined) return;
		const stamp = new Date().toLocaleTimeString();
		statusLog = [`[${stamp}] ${status ? 'online' : 'OFFLINE'}`, ...statusLog].slice(0, 6);
	});

	/* ── Complete code for CodeCanvas ── */
	const exampleImport =
		"import {\n" +
		"  innerWidth, innerHeight,\n" +
		"  outerWidth, outerHeight,\n" +
		"  scrollX, scrollY,\n" +
		"  online, devicePixelRatio,\n" +
		"  screenLeft, screenTop\n" +
		"} from 'svelte/reactivity/window';";

	const exampleBasic =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { innerWidth, innerHeight } from 'svelte/reactivity/window';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<p>Viewport: {innerWidth.current} x {innerHeight.current}</p>";

	const exampleModule =
		"// viewport.svelte.ts\n" +
		"import { innerWidth } from 'svelte/reactivity/window';\n" +
		"\n" +
		"export function getBreakpoint(): string {\n" +
		"  const w = innerWidth.current;\n" +
		"  if (w === undefined) return 'server';\n" +
		"  if (w < 768) return 'mobile';\n" +
		"  return 'desktop';\n" +
		"}";

	const exampleOldWay =
		"<!-- OLD: svelte:window binding -->\n" +
		"\u003cscript\u003e\n" +
		"  let w = $state(0);\n" +
		"  let h = $state(0);\n" +
		"\u003c/script\u003e\n" +
		"<svelte:window bind:innerWidth={w} bind:innerHeight={h} />\n" +
		"\n" +
		"<!-- NEW: reactive import -->\n" +
		"\u003cscript\u003e\n" +
		"  import { innerWidth, innerHeight } from 'svelte/reactivity/window';\n" +
		"\u003c/script\u003e\n" +
		"<p>{innerWidth.current} x {innerHeight.current}</p>";

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import {\n" +
		"    innerWidth, innerHeight,\n" +
		"    scrollX, scrollY,\n" +
		"    online, devicePixelRatio,\n" +
		"    screenLeft, screenTop\n" +
		"  } from 'svelte/reactivity/window';\n" +
		"\n" +
		"  const viewportLabel = $derived.by(() => {\n" +
		"    const w = innerWidth.current;\n" +
		"    if (w === undefined) return 'server';\n" +
		"    if (w < 480) return 'mobile';\n" +
		"    if (w < 768) return 'tablet';\n" +
		"    if (w < 1024) return 'small desktop';\n" +
		"    return 'desktop';\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>2.18 — Reactive Window Values</h1>\n" +
		"\n" +
		"  <div class=\"build\">\n" +
		"    <div class=\"stats\">\n" +
		"      <div class=\"stat\">\n" +
		"        <span class=\"label\">viewport</span>\n" +
		"        <span class=\"value\">{innerWidth.current} x {innerHeight.current}</span>\n" +
		"      </div>\n" +
		"      <div class=\"stat\">\n" +
		"        <span class=\"label\">scroll</span>\n" +
		"        <span class=\"value\">{scrollX.current}, {scrollY.current}</span>\n" +
		"      </div>\n" +
		"      <div class=\"stat\">\n" +
		"        <span class=\"label\">online</span>\n" +
		"        <span class=\"value\">{online.current}</span>\n" +
		"      </div>\n" +
		"      <div class=\"stat\">\n" +
		"        <span class=\"label\">DPR</span>\n" +
		"        <span class=\"value\">{devicePixelRatio.current}</span>\n" +
		"      </div>\n" +
		"    </div>\n" +
		"  </div>\n" +
		"</section>";
</script>

<section class="page">
	<h1>2.18 — Reactive Window Values</h1>

	<p class="prose">
		Svelte 5.11 introduced the <code>svelte/reactivity/window</code> module — a set of
		reactive objects that mirror browser <code>window</code> properties. Instead of binding
		with <code>&lt;svelte:window bind:innerWidth&gt;</code>, you import
		<code>innerWidth</code> and read <code>innerWidth.current</code>. The value updates
		automatically when the viewport resizes, the user scrolls, or the network status
		changes. Think of it like a dashboard of live gauges for the browser environment —
		each gauge reads <code>.current</code> and updates in real time.
	</p>

	<h3>What's available</h3>
	<div class="build">
		<CodeCanvas filename="imports.ts" code={exampleImport} />
		<p class="note">
			Every value exposes a <code>.current</code> property. All are <code>undefined</code> on
			the server, making them SSR-safe out of the box.
		</p>
	</div>

	<h3>Live viewport dashboard</h3>
	<p class="prose">
		Resize your browser window and watch the numbers update instantly. No
		<code>&lt;svelte:window&gt;</code> tag, no manual event listener, no cleanup.
	</p>

	<div class="build">
		<div class="stats">
			<div class="stat">
				<span class="label">innerWidth</span>
				<span class="value">{innerWidth.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">innerHeight</span>
				<span class="value">{innerHeight.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">breakpoint</span>
				<span class="value">{viewportLabel}</span>
			</div>
			<div class="stat">
				<span class="label">outerWidth</span>
				<span class="value">{outerWidth.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">outerHeight</span>
				<span class="value">{outerHeight.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">DPR</span>
				<span class="value">{devicePixelRatio.current ?? '—'}</span>
			</div>
		</div>

		<div class="stats">
			<div class="stat">
				<span class="label">scrollX</span>
				<span class="value">{scrollX.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">scrollY</span>
				<span class="value">{scrollY.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">screenLeft</span>
				<span class="value">{screenLeft.current ?? '—'}</span>
			</div>
			<div class="stat">
				<span class="label">screenTop</span>
				<span class="value">{screenTop.current ?? '—'}</span>
			</div>
		</div>
	</div>

	<h3>Online / offline indicator</h3>
	<p class="prose">
		<code>online.current</code> is a reactive view of <code>navigator.onLine</code>. Toggle
		your Wi-Fi or use DevTools Network panel to simulate offline — the indicator updates live.
	</p>

	<div class="build">
		<div class="online-indicator">
			<span class="dot" class:is-online={online.current === true} class:is-offline={online.current === false}></span>
			<span class="online-text">
				{online.current === undefined ? 'Unknown (server)' : online.current ? 'Online' : 'Offline'}
			</span>
		</div>

		{#if statusLog.length > 0}
			<div class="log">
				<h4>Status history</h4>
				<ul>
					{#each statusLog as entry (entry)}
						<li><code>{entry}</code></li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>

	<h3>Old way vs. new way</h3>
	<p class="prose">
		Before <code>svelte/reactivity/window</code>, you had to use
		<code>&lt;svelte:window bind:innerWidth=&#123;w&#125; /&gt;</code> in a
		<code>.svelte</code> component. That worked but couldn't be used in
		<code>.svelte.ts</code> modules. The new imports work everywhere —
		components, modules, derived values, effects.
	</p>

	<div class="build">
		<CodeCanvas filename="old-vs-new.svelte" code={exampleOldWay} />
	</div>

	<h3>Usable in .svelte.ts modules</h3>
	<p class="prose">
		The biggest advantage: these reactive imports work outside components. You can build
		a shared breakpoint utility in a <code>.svelte.ts</code> file and import it anywhere.
	</p>

	<div class="build">
		<CodeCanvas filename="viewport.svelte.ts" code={exampleModule} />
	</div>

	<h3>Basic usage</h3>
	<div class="build">
		<CodeCanvas filename="+page.svelte" code={exampleBasic} />
		<p class="note">
			<code>devicePixelRatio.current</code> responds to zoom on Chrome but not on Firefox
			or Safari. All values are <code>undefined</code> during SSR, so use nullish coalescing
			or conditional rendering.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what happens, then revert.</p>
	<ol class="experiments">
		<li>
			<strong>Try <code>innerWidth.current</code> inside a server-only <code>+page.server.ts</code> file.</strong>
			It returns <code>undefined</code>. There is no <code>window</code> on the server, so every
			value in this module gracefully degrades to <code>undefined</code>. Your code must handle
			this — use nullish coalescing (<code>?? 0</code>) or conditional rendering.
		</li>
		<li>
			<strong>Assign directly to <code>innerWidth.current = 500</code>.</strong>
			TypeScript errors — <code>.current</code> is read-only. These are one-way bindings from
			the browser to your code. You observe window properties; you cannot set them through
			Svelte's reactive API.
		</li>
		<li>
			<strong>Import <code>innerWidth</code> in a plain <code>.ts</code> file instead of <code>.svelte.ts</code>.</strong>
			The import itself works, but if you try to use <code>$derived</code> or <code>$effect</code>
			with it, the compiler will not process runes in plain <code>.ts</code> files. Rename to
			<code>.svelte.ts</code> to enable rune compilation.
		</li>
		<li>
			<strong>Read <code>scrollY.current</code> outside any reactive context (plain function call at module scope).</strong>
			You get the current value as a snapshot, but it will not update — there is no effect or
			template tracking the read. Reactive values only trigger updates when read inside tracked
			contexts like templates, <code>$derived</code>, or <code>$effect</code>.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		The <code>svelte/reactivity/window</code> module provides reactive versions of common
		browser window properties — <code>innerWidth</code>, <code>innerHeight</code>,
		<code>scrollX</code>, <code>scrollY</code>, <code>online</code>,
		<code>devicePixelRatio</code>, and more. Each exposes a <code>.current</code> property
		that updates automatically when the underlying browser value changes. You never write
		an event listener or worry about cleanup.
	</p>
	<p class="prose">
		This module replaces the <code>&lt;svelte:window bind:innerWidth&gt;</code> pattern
		with something cleaner and more versatile. The old approach required a
		<code>.svelte</code> component with a special element in the template. The new approach
		is a simple import that works in components, <code>.svelte.ts</code> modules,
		<code>$derived</code> values, and <code>$effect</code> callbacks — anywhere reactive
		code runs.
	</p>
	<p class="prose">
		All values are <code>undefined</code> on the server, which makes them inherently
		SSR-safe. You do not need to guard against <code>typeof window !== 'undefined'</code>
		checks. Just use nullish coalescing or conditional rendering. This design means you can
		safely import and reference these values in universally-rendered SvelteKit pages without
		hydration mismatches.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/project">Module 2 Project</a> — integrate every rune you've learned.
	</p>
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

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
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
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
		gap: var(--space-sm);
	}

	.stat {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.stat .label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat .value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
		font-family: var(--font-mono);
	}

	.online-indicator {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.dot {
		inline-size: 12px;
		block-size: 12px;
		border-radius: var(--radius-full);
		background: var(--color-text-muted);
		flex-shrink: 0;
	}

	.dot.is-online {
		background: oklch(0.72 0.19 142);
		box-shadow: 0 0 6px oklch(0.72 0.19 142 / 0.5);
	}

	.dot.is-offline {
		background: oklch(0.63 0.21 25);
		box-shadow: 0 0 6px oklch(0.63 0.21 25 / 0.5);
	}

	.online-text {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	.log {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.log h4 {
		margin: 0 0 var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.log ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.log li { font-size: var(--text-xs); }

	.log li code {
		display: block;
		background: var(--color-surface);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		font-family: var(--font-mono);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-inline-size: 480px) {
		.stats { grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.stats { grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); }
	}
</style>
