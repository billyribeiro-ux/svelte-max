<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const importComponents = `---
title: Interactive Guide
---

<script>
  ${"import"} Chart from '$lib/components/Chart.svelte';
  ${"import"} Alert from '$lib/components/Alert.svelte';
  ${"import"} Tabs from '$lib/components/Tabs.svelte';

  let selectedTab = $state('overview');
  let data = $state([10, 25, 40, 30, 55]);
</script>

# Interactive Dashboard Guide

Use the tabs to explore different views:

<Tabs bind:selected={selectedTab} items={['overview', 'details', 'api']} />

{#if selectedTab === 'overview'}
  ## Overview

  Here's a live chart of the data:

  <Chart {data} type="bar" />

  Click the bars to update values.

{:else if selectedTab === 'details'}
  ## Details

  <Alert type="info">
    This section shows advanced configuration.
  </Alert>

{:else}
  ## API Reference

  \`\`\`typescript
  interface ChartProps {
    data: number[];
    type: 'bar' | 'line' | 'pie';
  }
  \`\`\`
{/if}`;

	const customElements = `// Replace HTML elements with custom Svelte components
// svelte.config.js
${"import"} { mdsvex } from 'mdsvex';

export default {
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      // Map HTML elements to Svelte components
      // Any <h1> in markdown → renders your H1.svelte instead
      layout: {
        _: './src/lib/layouts/Default.svelte'
      }
    })
  ]
};

// In your layout, provide custom renderers:
// src/lib/layouts/Default.svelte
<script>
  ${"import"} CustomH1 from '$lib/md/H1.svelte';
  ${"import"} CustomCode from '$lib/md/Code.svelte';
  ${"import"} CustomA from '$lib/md/Link.svelte';

  let { children } = $props();
<\/script>

<!-- MDsveX automatically uses these if named correctly -->
{@render children()}`;

	const globalComponents = `// Global components: available in ALL markdown files
// without importing them
//
// Create a folder: src/lib/md-components/
// Any .svelte file in this folder is auto-imported
//
// svelte.config.js:
${"import"} { mdsvex } from 'mdsvex';

export default {
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      // Auto-import components from this directory
      // <Alert> and <Tabs> work in any .md without import
      // Component filenames become tag names
    })
  ]
};

// Usage in any .md file (no import needed):
// <Alert type="warning">Watch out!</Alert>
// <Tabs items={['a', 'b']}>...</Tabs>`;

	const reactiveMarkdown = `---
title: Reactive Content
---

<script>
  let temperature = $state(72);
  let unit = $state<'F' | 'C'>('F');

  const celsius = $derived(
    unit === 'F' ? ((temperature - 32) * 5 / 9).toFixed(1) : temperature
  );
  const fahrenheit = $derived(
    unit === 'C' ? ((temperature * 9 / 5) + 32).toFixed(1) : temperature
  );
</script>

# Temperature Converter

Current: **{temperature}°{unit}**
({unit === 'F' ? celsius + '°C' : fahrenheit + '°F'})

<input type="range" bind:value={temperature} min={0} max={212} />
<label>
  <input type="radio" bind:group={unit} value="F" /> Fahrenheit
</label>
<label>
  <input type="radio" bind:group={unit} value="C" /> Celsius
</label>

## How it works

The temperature is stored as \`$state({temperature})\` and
the conversion uses \`$derived()\` for reactive computation.`;

	const fullCode =
		"<script lang=\"ts\">\n  // Components in markdown\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.3 — Components in Markdown</h1></section>";
</script>

<section class="page">
	<h1>MX.3 — Components in Markdown</h1>
	<p class="concept">
		<strong>Concept.</strong> MDsveX files are Svelte components. You can import and use any
		component, bind props, use runes, and mix Svelte template syntax with markdown. Custom element
		mapping replaces HTML elements (<code>&lt;h1&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;code&gt;</code>)
		with your own Svelte components. This enables consistent styling, anchor links on headings,
		external link indicators, and syntax-highlighted code blocks — all from markdown.
	</p>

	<div class="build">
		<h3 class="section-title">Importing & using components</h3>
		<pre class="code-block"><code>{importComponents}</code></pre>

		<h3 class="section-title">Custom element mapping</h3>
		<pre class="code-block"><code>{customElements}</code></pre>

		<h3 class="section-title">Reactive markdown with runes</h3>
		<pre class="code-block"><code>{reactiveMarkdown}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Use a self-closing component tag without <code>/&gt;</code> in markdown.</strong> MDsveX parses component tags like Svelte. <code>&lt;Alert /&gt;</code> works, but <code>&lt;Alert&gt;</code> without a closing tag causes a parse error because MDsveX doesn't know where the component ends and markdown resumes.</li>
		<li><strong>Mix markdown syntax inside a Svelte component's children.</strong> Markdown inside component children is not always processed. Use the <code>{'<svelte:fragment>'}</code> approach or pass content as a snippet prop for reliable rendering.</li>
		<li><strong>Use <code>{'{#each}'}</code> with markdown list items inside the block.</strong> The markdown parser processes before Svelte's template logic. This means list items inside <code>{'{#each}'}</code> may not be parsed as markdown. Wrap the output in HTML tags instead.</li>
		<li><strong>Import a component with a lowercase filename in markdown.</strong> MDsveX distinguishes component tags (PascalCase) from HTML elements (lowercase). <code>&lt;alert /&gt;</code> renders as an HTML <code>&lt;alert&gt;</code> element, not your <code>Alert.svelte</code> component.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Components in markdown create interactive documentation. Because MDsveX files compile to Svelte components, every Svelte feature works: <code>$state()</code>, <code>$derived()</code>, <code>bind:</code>, <code>{'{#if}'}</code>, <code>{'{#each}'}</code>. Component tags must be PascalCase to be distinguished from HTML elements. Custom element mapping lets you replace standard HTML output (<code>&lt;h1&gt;</code>, <code>&lt;a&gt;</code>) with styled Svelte components for consistent design across all markdown content.</p>
	<p class="next">Next lesson: <a href="/mdsvex/mx-4-syntax-highlighting">MX.4 — Syntax Highlighting</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
