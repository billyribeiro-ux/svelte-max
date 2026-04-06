<script lang="ts">
	let showCompiled = $state(false);

	const counterExample = `<!-- MyCounter.svelte -->
\u003csvelte:options customElement="my-counter" /\u003e

\u003cscript lang="ts"\u003e
  interface Props {
    initial?: number;
    label?: string;
  }

  let { initial = 0, label = 'Count' }: Props = $props();
  let count = $state(initial);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
\u003c/script\u003e

<div class="counter">
  <span class="label">{label}</span>
  <button onclick={decrement}>-</button>
  <span class="value">{count}</span>
  <button onclick={increment}>+</button>
</div>

\u003cstyle\u003e
  .counter {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: system-ui;
  }
  .label { font-weight: 600; }
  .value {
    min-width: 2rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
  button {
    width: 2rem; height: 2rem;
    border-radius: 50%;
    border: 1px solid #ccc;
    cursor: pointer;
  }
\u003c/style\u003e`;

	const usageExample = `<!DOCTYPE html>
<html>
<head>
  \u003cscript type="module" src="./my-counter.js"\u003e\u003c/script\u003e
</head>
<body>
  <my-counter initial="5" label="Items"></my-counter>

  \u003cscript\u003e
    // You can also set attributes programmatically
    const el = document.querySelector('my-counter');
    if (el) el.setAttribute('label', 'Updated Label');
  \u003c/script\u003e
</body>
</html>`;
</script>

<section class="page">
	<h1>14.2 — Building Custom Elements with Svelte</h1>

	<p class="concept">
		To compile a Svelte component as a custom element, you add
		<strong><code>&lt;svelte:options customElement="my-element" /&gt;</code></strong> at the top of
		the component file. At build time, the Svelte compiler emits a class that extends
		<code>HTMLElement</code>, registers itself via <code>customElements.define()</code>, and wires
		up reactive props as DOM attributes.
	</p>

	<h3>The Compiler Option</h3>
	<p class="concept">
		You also need to enable custom element compilation in your build config. In
		<code>svelte.config.js</code>, set <strong><code>compilerOptions.customElement: true</code></strong>.
		This tells the compiler to emit custom element wrappers instead of standard Svelte components.
	</p>

	<pre>{`// svelte.config.js
const config = {
  compilerOptions: {
    customElement: true
  }
};
export default config;`}</pre>

	<h3>Props Become Attributes</h3>
	<ul>
		<li>Each <code>$props()</code> property becomes an observed HTML attribute</li>
		<li>Attribute names are lowercased: <code>initialCount</code> becomes <code>initialcount</code></li>
		<li>Only string values pass through attributes; use <code>props</code> config for type coercion</li>
		<li>Setting attributes triggers Svelte's reactivity system automatically</li>
	</ul>

	<h3>Mini-Build: A Counter Custom Element</h3>
	<div class="build">
		<p class="concept">
			Below is the complete source for a <code>&lt;my-counter&gt;</code> custom element.
			This file would live outside of SvelteKit routes (e.g. in a standalone library project).
		</p>

		<pre><code>{counterExample}</code></pre>

		<button class="toggle-btn" onclick={() => showCompiled = !showCompiled}>
			{showCompiled ? 'Hide' : 'Show'} what happens at compile time
		</button>

		{#if showCompiled}
			<div class="compiled-info">
				<h3>At Compile Time</h3>
				<ul>
					<li>Svelte wraps the component in a class extending <code>HTMLElement</code></li>
					<li>A Shadow DOM root is created (mode <code>"open"</code> by default)</li>
					<li>Scoped styles are injected into the shadow root</li>
					<li><code>observedAttributes</code> is set to <code>["initial", "label"]</code></li>
					<li><code>attributeChangedCallback</code> triggers Svelte's reactivity on attribute updates</li>
					<li><code>customElements.define("my-counter", MyCounter)</code> is called automatically</li>
				</ul>
			</div>
		{/if}
	</div>

	<h3>Usage in Plain HTML</h3>
	<pre><code>{usageExample}</code></pre>

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;svelte:options customElement="tag-name" /&gt;</code> compiles a Svelte component as a custom element.</li>
		<li>The <code>compilerOptions.customElement: true</code> flag must be set in <code>svelte.config.js</code>.</li>
		<li>Each <code>$props()</code> property becomes an observed HTML attribute with automatic reactivity.</li>
		<li>The compiled output is a standalone class that works in any HTML page without Svelte.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.toggle-btn {
		align-self: flex-start;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.toggle-btn:hover { background: var(--color-primary); color: var(--color-text); }

	.compiled-info {
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
