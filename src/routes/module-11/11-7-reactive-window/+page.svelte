<script lang="ts">
	import { innerWidth, innerHeight, scrollY, online, devicePixelRatio } from 'svelte/reactivity/window';
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

	<h3>What you learned</h3>
	<ul>
		<li><code>svelte/reactivity/window</code> exposes reactive objects like <code>innerWidth</code> and <code>scrollY</code> with a <code>.current</code> property.</li>
		<li>These values are <code>undefined</code> during SSR, so you must guard access with <code>{'{#if innerWidth}'}</code>.</li>
		<li>No manual event listeners are needed; Svelte manages resize, scroll, and online/offline tracking internally.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
