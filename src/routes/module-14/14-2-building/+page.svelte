<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let showCompiled = $state(false);\n" +
		"\n" +
		"	const counterExample = `\u003c!-- MyCounter.svelte --\u003e\n" +
		"\\u003csvelte:options customElement=\"my-counter\" /\\u003e\n" +
		"\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  interface Props {\n" +
		"    initial?: number;\n" +
		"    label?: string;\n" +
		"  }\n" +
		"\n" +
		"  let { initial = 0, label = 'Count' }: Props = $props();\n" +
		"  let count = $state(initial);\n" +
		"\n" +
		"  function increment() {\n" +
		"    count += 1;\n" +
		"  }\n" +
		"\n" +
		"  function decrement() {\n" +
		"    count -= 1;\n" +
		"  }\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cdiv class=\"counter\"\u003e\n" +
		"  \u003cspan class=\"label\"\u003e{label}\u003c/span\u003e\n" +
		"  \u003cbutton onclick={decrement}\u003e-\u003c/button\u003e\n" +
		"  \u003cspan class=\"value\"\u003e{count}\u003c/span\u003e\n" +
		"  \u003cbutton onclick={increment}\u003e+\u003c/button\u003e\n" +
		"\u003c/div\u003e\n" +
		"\n" +
		"\\u003cstyle\\u003e\n" +
		"  .counter {\n" +
		"    display: inline-flex;\n" +
		"    align-items: center;\n" +
		"    gap: 0.5rem;\n" +
		"    font-family: system-ui;\n" +
		"  }\n" +
		"  .label { font-weight: 600; }\n" +
		"  .value {\n" +
		"    min-width: 2rem;\n" +
		"    text-align: center;\n" +
		"    font-variant-numeric: tabular-nums;\n" +
		"  }\n" +
		"  button {\n" +
		"    width: 2rem; height: 2rem;\n" +
		"    border-radius: 50%;\n" +
		"    border: 1px solid #ccc;\n" +
		"    cursor: pointer;\n" +
		"  }\n" +
		"\\u003c/style\\u003e`;\n" +
		"\n" +
		"	const usageExample = `\u003c!DOCTYPE html\u003e\n" +
		"\u003chtml\u003e\n" +
		"\u003chead\u003e\n" +
		"  \\u003cscript type=\"module\" src=\"./my-counter.js\"\\u003e\\u003c/script\\u003e\n" +
		"\u003c/head\u003e\n" +
		"\u003cbody\u003e\n" +
		"  \u003cmy-counter initial=\"5\" label=\"Items\"\u003e\u003c/my-counter\u003e\n" +
		"\n" +
		"  \\u003cscript\\u003e\n" +
		"    // You can also set attributes programmatically\n" +
		"    const el = document.querySelector('my-counter');\n" +
		"    if (el) el.setAttribute('label', 'Updated Label');\n" +
		"  \\u003c/script\\u003e\n" +
		"\u003c/body\u003e\n" +
		"\u003c/html\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.2 — Building Custom Elements with Svelte\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		To compile a Svelte component as a custom element, you add\n" +
		"		\u003cstrong\u003e\u003ccode\u003e&lt;svelte:options customElement=\"my-element\" /&gt;\u003c/code\u003e\u003c/strong\u003e at the top of\n" +
		"		the component file. At build time, the Svelte compiler emits a class that extends\n" +
		"		\u003ccode\u003eHTMLElement\u003c/code\u003e, registers itself via \u003ccode\u003ecustomElements.define()\u003c/code\u003e, and wires\n" +
		"		up reactive props as DOM attributes.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Compiler Option\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		You also need to enable custom element compilation in your build config. In\n" +
		"		\u003ccode\u003esvelte.config.js\u003c/code\u003e, set \u003cstrong\u003e\u003ccode\u003ecompilerOptions.customElement: true\u003c/code\u003e\u003c/strong\u003e.\n" +
		"		This tells the compiler to emit custom element wrappers instead of standard Svelte components.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cpre\u003e{`// svelte.config.js\n" +
		"const config = {\n" +
		"  compilerOptions: {\n" +
		"    customElement: true\n" +
		"  }\n" +
		"};\n" +
		"export default config;`}\u003c/pre\u003e\n" +
		"\n" +
		"	\u003ch3\u003eProps Become Attributes\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eEach \u003ccode\u003e$props()\u003c/code\u003e property becomes an observed HTML attribute\u003c/li\u003e\n" +
		"		\u003cli\u003eAttribute names are lowercased: \u003ccode\u003einitialCount\u003c/code\u003e becomes \u003ccode\u003einitialcount\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eOnly string values pass through attributes; use \u003ccode\u003eprops\u003c/code\u003e config for type coercion\u003c/li\u003e\n" +
		"		\u003cli\u003eSetting attributes triggers Svelte's reactivity system automatically\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: A Counter Custom Element\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Below is the complete source for a \u003ccode\u003e&lt;my-counter&gt;\u003c/code\u003e custom element.\n" +
		"			This file would live outside of SvelteKit routes (e.g. in a standalone library project).\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003cpre\u003e\u003ccode\u003e{counterExample}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003cbutton class=\"toggle-btn\" onclick={() =\u003e showCompiled = !showCompiled}\u003e\n" +
		"			{showCompiled ? 'Hide' : 'Show'} what happens at compile time\n" +
		"		\u003c/button\u003e\n" +
		"\n" +
		"		{#if showCompiled}\n" +
		"			\u003cdiv class=\"compiled-info\"\u003e\n" +
		"				\u003ch3\u003eAt Compile Time\u003c/h3\u003e\n" +
		"				\u003cul\u003e\n" +
		"					\u003cli\u003eSvelte wraps the component in a class extending \u003ccode\u003eHTMLElement\u003c/code\u003e\u003c/li\u003e\n" +
		"					\u003cli\u003eA Shadow DOM root is created (mode \u003ccode\u003e\"open\"\u003c/code\u003e by default)\u003c/li\u003e\n" +
		"					\u003cli\u003eScoped styles are injected into the shadow root\u003c/li\u003e\n" +
		"					\u003cli\u003e\u003ccode\u003eobservedAttributes\u003c/code\u003e is set to \u003ccode\u003e[\"initial\", \"label\"]\u003c/code\u003e\u003c/li\u003e\n" +
		"					\u003cli\u003e\u003ccode\u003eattributeChangedCallback\u003c/code\u003e triggers Svelte's reactivity on attribute updates\u003c/li\u003e\n" +
		"					\u003cli\u003e\u003ccode\u003ecustomElements.define(\"my-counter\", MyCounter)\u003c/code\u003e is called automatically\u003c/li\u003e\n" +
		"				\u003c/ul\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eUsage in Plain HTML\u003c/h3\u003e\n" +
		"	\u003cpre\u003e\u003ccode\u003e{usageExample}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e&lt;svelte:options customElement=\"tag-name\" /&gt;\u003c/code\u003e compiles a Svelte component as a custom element.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe \u003ccode\u003ecompilerOptions.customElement: true\u003c/code\u003e flag must be set in \u003ccode\u003esvelte.config.js\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eEach \u003ccode\u003e$props()\u003c/code\u003e property becomes an observed HTML attribute with automatic reactivity.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe compiled output is a standalone class that works in any HTML page without Svelte.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a custom element compilation detail. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove <code>{'<svelte:options customElement="my-counter" />'}</code> but keep <code>compilerOptions.customElement: true</code>.</strong> The component compiles as a regular Svelte component, not a custom element. Without the <code>customElement</code> option on the component itself, the compiler has no tag name to register, and <code>customElements.define()</code> is never called.</li>
		<li><strong>Use a camelCase prop name like <code>initialCount</code> and try to set it via an HTML attribute.</strong> The attribute name is lowercased to <code>initialcount</code> because HTML attributes are case-insensitive. If you write <code>{'<my-counter initialCount="5">'}</code>, the browser sees <code>initialcount</code>, which may not match your prop name. Always use lowercase or kebab-case attribute names.</li>
		<li><strong>Try to pass a JavaScript array as an attribute value in plain HTML.</strong> The attribute is always a string, so <code>items="[1,2,3]"</code> arrives as the literal string <code>"[1,2,3]"</code>, not a JavaScript array. Without the <code>props</code> configuration for type coercion, the component receives a string and likely breaks.</li>
		<li><strong>Remove <code>compilerOptions.customElement: true</code> from <code>svelte.config.js</code> but keep the <code>{'<svelte:options>'}</code> directive.</strong> The compiler ignores the <code>customElement</code> option on the component because the global flag is not set. The component compiles as a regular Svelte component, and the tag name is treated as an unknown option that produces a warning.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Building a Svelte custom element requires two pieces: the <code>{'<svelte:options customElement="tag-name" />'}</code> directive on the component file, and the <code>compilerOptions.customElement: true</code> flag in <code>svelte.config.js</code>. At build time, the Svelte compiler emits a class extending <code>HTMLElement</code> that calls <code>customElements.define()</code> with the specified tag name. The generated class creates a Shadow DOM root, injects scoped styles, and wires up reactive props.</p>
	<p class="prose">Every <code>$props()</code> property automatically becomes an observed HTML attribute. When a consumer sets an attribute on the element (either in HTML or via <code>setAttribute()</code>), the <code>attributeChangedCallback</code> fires and triggers Svelte's reactivity system. Attribute names are lowercased by the browser, so a prop named <code>initialCount</code> becomes the attribute <code>initialcount</code>. Only string values pass through attributes natively; complex types require the <code>props</code> configuration for type coercion.</p>
	<p class="prose">The compiled output is a standalone JavaScript file that works in any HTML page without Svelte installed. You import it with a <code>{'<script type="module">'}</code> tag, and the custom element self-registers. This makes Svelte custom elements ideal for distributing interactive widgets to non-Svelte consumers: embed a counter, a date picker, or a data table in WordPress, Shopify, or a static HTML page with a single script import.</p>
	<p class="next">Next, you will learn the lifecycle callbacks and the advanced options object for fine-grained control over shadow DOM, type coercion, and form participation.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
