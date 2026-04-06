<script lang="ts">
	import { innerWidth, innerHeight, scrollY, online, devicePixelRatio } from 'svelte/reactivity/window';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { innerWidth, innerHeight, scrollY, online, devicePixelRatio } from 'svelte/reactivity/window';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.7 — Reactive Window Values\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Svelte provides \u003cstrong\u003ereactive window values\u003c/strong\u003e via \u003ccode\u003esvelte/reactivity/window\u003c/code\u003e.\n" +
		"		These are objects with a \u003ccode\u003e.current\u003c/code\u003e property that updates automatically when the\n" +
		"		browser value changes. They are \u003ccode\u003eundefined\u003c/code\u003e during SSR, so guard them\n" +
		"		appropriately.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eAvailable Values\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003eimport &#123;\n" +
		"  innerWidth,\n" +
		"  innerHeight,\n" +
		"  scrollY,\n" +
		"  online,\n" +
		"  devicePixelRatio\n" +
		"&#125; from 'svelte/reactivity/window';\n" +
		"\n" +
		"// Each is an object with .current\n" +
		"// innerWidth.current === window.innerWidth (reactive)\n" +
		"// undefined during SSR\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Dashboard\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		{#if innerWidth}\n" +
		"			\u003cdiv class=\"value-grid\"\u003e\n" +
		"				\u003cdiv class=\"value-card\"\u003e\n" +
		"					\u003cspan class=\"value-label\"\u003einnerWidth\u003c/span\u003e\n" +
		"					\u003cspan class=\"value-number\"\u003e{innerWidth.current}px\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"value-card\"\u003e\n" +
		"					\u003cspan class=\"value-label\"\u003einnerHeight\u003c/span\u003e\n" +
		"					\u003cspan class=\"value-number\"\u003e{innerHeight.current}px\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"value-card\"\u003e\n" +
		"					\u003cspan class=\"value-label\"\u003escrollY\u003c/span\u003e\n" +
		"					\u003cspan class=\"value-number\"\u003e{Math.round(scrollY.current ?? 0)}px\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"value-card\"\u003e\n" +
		"					\u003cspan class=\"value-label\"\u003eonline\u003c/span\u003e\n" +
		"					\u003cspan class=\"value-number\" class:online-true={online.current} class:online-false={!online.current}\u003e\n" +
		"						{online.current ? 'Yes' : 'No'}\n" +
		"					\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"value-card\"\u003e\n" +
		"					\u003cspan class=\"value-label\"\u003edevicePixelRatio\u003c/span\u003e\n" +
		"					\u003cspan class=\"value-number\"\u003e{devicePixelRatio.current}x\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"responsive-indicator\"\u003e\n" +
		"				\u003cp\u003e\n" +
		"					Breakpoint:\n" +
		"					\u003cstrong\u003e\n" +
		"						{#if (innerWidth.current ?? 0) \u003c 640}\n" +
		"							Mobile (&lt;640px)\n" +
		"						{:else if (innerWidth.current ?? 0) \u003c 768}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>11.7 — Reactive Window Values</h1>

	<p class="concept">
		Svelte provides <strong>reactive window values</strong> via <code>svelte/reactivity/window</code>.
		These are objects with a <code>.current</code> property that updates automatically when the
		browser value changes. They are <code>undefined</code> during SSR, so guard them
		appropriately.
	</p>

	<h3>Available Values</h3>
	<div class="build">
		<pre><code>import &#123;
  innerWidth,
  innerHeight,
  scrollY,
  online,
  devicePixelRatio
&#125; from 'svelte/reactivity/window';

// Each is an object with .current
// innerWidth.current === window.innerWidth (reactive)
// undefined during SSR</code></pre>
	</div>

	<h3>Live Dashboard</h3>
	<div class="build">
		{#if innerWidth}
			<div class="value-grid">
				<div class="value-card">
					<span class="value-label">innerWidth</span>
					<span class="value-number">{innerWidth.current}px</span>
				</div>
				<div class="value-card">
					<span class="value-label">innerHeight</span>
					<span class="value-number">{innerHeight.current}px</span>
				</div>
				<div class="value-card">
					<span class="value-label">scrollY</span>
					<span class="value-number">{Math.round(scrollY.current ?? 0)}px</span>
				</div>
				<div class="value-card">
					<span class="value-label">online</span>
					<span class="value-number" class:online-true={online.current} class:online-false={!online.current}>
						{online.current ? 'Yes' : 'No'}
					</span>
				</div>
				<div class="value-card">
					<span class="value-label">devicePixelRatio</span>
					<span class="value-number">{devicePixelRatio.current}x</span>
				</div>
			</div>

			<div class="responsive-indicator">
				<p>
					Breakpoint:
					<strong>
						{#if (innerWidth.current ?? 0) < 640}
							Mobile (&lt;640px)
						{:else if (innerWidth.current ?? 0) < 768}
							Small Tablet (640-767px)
						{:else if (innerWidth.current ?? 0) < 1024}
							Tablet (768-1023px)
						{:else}
							Desktop (1024px+)
						{/if}
					</strong>
				</p>
			</div>
		{:else}
			<p class="ssr-notice">Window values are not available during server-side rendering.</p>
		{/if}
	</div>

	<h3>SSR Safety</h3>
	<p class="concept">
		Always wrap usage in <code>&#123;#if innerWidth&#125;</code> or similar guards. During SSR,
		these values are <code>undefined</code> because there is no browser window. The guard
		prevents runtime errors and provides a fallback for the server-rendered HTML.
	</p>

	<h3>Scroll Demo</h3>
	<p class="concept">
		Try scrolling this page up and down. The <code>scrollY</code> value above updates
		in real time. Resize your browser window to see <code>innerWidth</code> and
		<code>innerHeight</code> change live.
	</p>

	<div class="scroll-spacer">
		<p>Scroll down to see scrollY change</p>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Import reactive values from <code>svelte/reactivity/window</code></li>
		<li>Access via <code>.current</code> — they're reactive objects, not raw numbers</li>
		<li>Always guard SSR with <code>&#123;#if innerWidth&#125;</code> since values are undefined on server</li>
		<li>Use for responsive logic, scroll-based animations, and connectivity detection</li>
		<li>No need for manual event listeners — Svelte handles it internally</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>{'{#if innerWidth}'}</code> guard and access <code>innerWidth.current</code> directly.</strong> During SSR the value is <code>undefined</code>, so <code>.current</code> throws a runtime error on the server because you are reading a property of undefined.</li>
		<li><strong>Try using <code>window.innerWidth</code> directly instead of the reactive import.</strong> It works once but never updates when you resize the browser because there is no event listener or reactivity wiring. You would need to add your own resize listener.</li>
		<li><strong>Access <code>scrollY.current</code> without the <code>?? 0</code> fallback.</strong> The value may be <code>undefined</code> on first render before the browser reports a scroll position, causing <code>Math.round(undefined)</code> to display <code>NaN</code>.</li>
		<li><strong>Toggle your browser to offline mode in DevTools and watch the <code>online</code> value.</strong> It switches to "No" in real time without any manual listener, proving that Svelte handles the connectivity events internally.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's <code>svelte/reactivity/window</code> module exposes browser globals as reactive objects with a <code>.current</code> property. Each object automatically subscribes to the appropriate browser event (resize, scroll, online/offline) and updates its value, so your template stays in sync without manual event listeners.</p>
	<p class="prose">Because there is no browser window during server-side rendering, all reactive window values are <code>undefined</code> on the server. You must guard access with an <code>{'{#if innerWidth}'}</code> block or similar conditional to prevent runtime errors during SSR and provide a sensible fallback for the initial server-rendered HTML.</p>
	<p class="prose">These reactive values are perfect for responsive logic (breakpoint detection), scroll-based animations (parallax, sticky headers), and connectivity-aware UI (offline banners). They replace the common pattern of writing <code>$effect</code> hooks with <code>addEventListener</code> and cleanup, giving you cleaner, more declarative code.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-8-tanstack-table">11.8 — Basic TanStack Table</a> — build a headless, sortable data table.</p>
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

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.value-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: var(--space-md);
	}
	.value-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		text-align: center;
	}
	.value-label {
		font-size: 0.8em;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
	}
	.value-number {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--color-primary);
		font-family: var(--font-mono);
	}
	.online-true {
		color: oklch(60% 0.18 150);
	}
	.online-false {
		color: #e74c3c;
	}
	.responsive-indicator {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		text-align: center;
	}
	.responsive-indicator p {
		margin: 0;
		color: var(--color-text-muted);
	}
	.ssr-notice {
		color: var(--color-text-muted);
		font-style: italic;
		margin: 0;
	}
	.scroll-spacer {
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text-muted);
		margin-block: var(--space-md);
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
