<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let showConverted = $state(false);

	const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10" />
  <line x1="12" y1="8" x2="12" y2="12" />
  <line x1="12" y1="16" x2="12.01" y2="16" />
</svg>`;

	const convertedSvelte = `<script lang="ts">
  interface Props {
    size?: number;
    color?: string;
    strokeWidth?: number;
    class?: string;
  }

  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    class: className = ''
  }: Props = $props();
<\/script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  width={size}
  height={size}
  class={className}
  role="img"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" y1="8" x2="12" y2="12" />
  <line x1="12" y1="16" x2="12.01" y2="16" />
</svg>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"\n" +
		"  let showConverted = $state(false);\n" +
		"\n" +
		"  const rawSvg = `...`; // raw SVG string\n" +
		"  const convertedSvelte = `...`; // converted Svelte component\n" +
		"<\/script>\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.1 — Why SVG to Svelte?</h1>\n" +
		"  <!-- concept, build, experiments, what you learned -->\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.1 — Why SVG to Svelte?</h1>
	<p class="concept">
		<strong>Concept.</strong> Raw SVG files are static XML. They cannot accept props, respond to state
		changes, or participate in Svelte's reactivity system. The <code>svgtosvelte</code> tool
		(<code>@jlacostaec/svgtosvelte</code>) converts SVG strings directly into Svelte 5 components —
		turning static markup into reactive, typed, composable building blocks. This is the foundation of
		a professional icon and illustration system: every SVG becomes a <code>.svelte</code> file with
		<code>$props()</code>, typed interfaces, and scoped styles.
	</p>

	<div class="build">
		<p class="hint">Click the toggle to see the transformation from raw SVG to a Svelte 5 component.</p>

		<div class="toggle-bar">
			<button
				type="button"
				class="toggle-btn"
				class:active={!showConverted}
				onclick={() => showConverted = false}
			>
				Raw SVG
			</button>
			<button
				type="button"
				class="toggle-btn"
				class:active={showConverted}
				onclick={() => showConverted = true}
			>
				Svelte Component
			</button>
		</div>

		<div class="code-compare">
			{#if !showConverted}
				<div class="code-panel">
					<h3>Static SVG string</h3>
					<pre><code>{rawSvg}</code></pre>
					<ul class="problems">
						<li>No props — size, color, stroke-width are hardcoded</li>
						<li>No TypeScript — consumers have no type safety</li>
						<li>No reactivity — cannot respond to <code>$state</code></li>
						<li>No scoping — styles leak, no Svelte hash classes</li>
						<li>No tree-shaking — unused SVGs still ship in the bundle</li>
					</ul>
				</div>
			{:else}
				<div class="code-panel converted">
					<h3>Svelte 5 Component</h3>
					<pre><code>{convertedSvelte}</code></pre>
					<ul class="solutions">
						<li><strong>Typed props</strong> — <code>size</code>, <code>color</code>, <code>strokeWidth</code> via <code>$props()</code></li>
						<li><strong>Composable</strong> — <code>&lt;AlertIcon size={'{32}'} color="var(--color-error)" /&gt;</code></li>
						<li><strong>Reactive</strong> — bind any prop to <code>$state</code> and it updates live</li>
						<li><strong>Accessible</strong> — <code>role="img"</code> and <code>aria-hidden</code> baked in</li>
						<li><strong>Tree-shakeable</strong> — Svelte only bundles imported components</li>
					</ul>
				</div>
			{/if}
		</div>

		<div class="live-preview">
			<h3>Live preview</h3>
			<div class="icon-row">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					width="24" height="24" role="img" aria-hidden="true">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
					stroke="var(--color-brand)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
					width="32" height="32" role="img" aria-hidden="true">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
					stroke="var(--color-error)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
					width="48" height="48" role="img" aria-hidden="true">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
			</div>
			<p class="chart-note">Same SVG rendered at 24px, 32px (brand color), and 48px (error color, thick stroke) — only possible when SVG is a Svelte component with props.</p>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Understanding the transformation means understanding what breaks when you skip it.</p>
	<ol class="experiments">
		<li><strong>Try to change the color of a raw <code>&lt;svg&gt;</code> from the parent.</strong> Without props, you would need <code>:global()</code> CSS selectors or inline <code>style</code> attributes — both violate PE7 scoping rules. A Svelte component solves this with a <code>color</code> prop that maps to the <code>stroke</code> attribute internally.</li>
		<li><strong>Import two copies of the same raw SVG and try to give them different sizes.</strong> You cannot — they share the same hardcoded <code>width</code>/<code>height</code>. A Svelte component with a <code>size</code> prop makes each instance independently sizable.</li>
		<li><strong>Add <code>role="img"</code> and <code>aria-label</code> to a raw SVG used as a decorative icon.</strong> Decorative icons should use <code>aria-hidden="true"</code> instead. The Svelte component can default to <code>aria-hidden</code> and optionally accept an <code>ariaLabel</code> prop for meaningful icons — encoding accessibility decisions in the component contract.</li>
		<li><strong>Paste an SVG from Figma with inline <code>style</code> attributes.</strong> The SVG will have <code>style="fill: #000"</code> which breaks dark mode. The <code>svgtosvelte</code> tool can override <code>fill</code> to <code>currentColor</code> via the <code>-a fill.currentColor</code> flag, making it theme-aware automatically.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Raw SVG strings are dead-end artifacts — they exist as static XML with no way to accept input, participate in reactivity, or respect component boundaries. Converting an SVG into a Svelte component transforms it into a first-class citizen of your application: it gets typed props via <code>$props()</code>, participates in Svelte's reactivity graph, benefits from scoped styles, and is tree-shaken by the compiler so only imported icons ship to the client.</p>
	<p class="prose">The <code>@jlacostaec/svgtosvelte</code> package automates this transformation at the CLI level. It takes a directory of <code>.svg</code> files and outputs <code>.svelte</code> components with configurable naming (PascalCase, camelCase, kebab-case), optional TypeScript, attribute overrides (like forcing <code>fill="currentColor"</code> for theme compatibility), and a registry JSON for programmatic lookup. Version 2 rewrites SVG strings directly without AST parsing, making it dramatically faster than v1.</p>
	<p class="prose">The PE7 principle at work here is <strong>composability over configuration</strong>. Instead of configuring an SVG icon library with runtime options, you convert each SVG into a typed Svelte component that declares exactly what it accepts and how it renders. This moves the complexity from runtime to compile time, where the Svelte compiler and TypeScript can verify correctness statically.</p>
	<p class="next">Next lesson: <a href="/svg-to-svelte/s2s-2-cli-setup">S2S.2 — CLI Setup & First Conversion</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong { color: var(--color-text); }
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	.hint { color: var(--color-text-muted); font-size: var(--text-sm); margin: 0; }
	.toggle-bar {
		display: flex;
		gap: var(--space-xs);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-xs);
		inline-size: fit-content;
	}
	.toggle-btn {
		padding: var(--space-xs) var(--space-md);
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: 500;
		cursor: pointer;
		transition: all var(--dur-fast) var(--ease-out);

		&.active {
			background: var(--color-surface);
			color: var(--color-text);
			box-shadow: var(--shadow-sm);
		}
	}
	.code-compare { min-block-size: 200px; }
	.code-panel {
		& h3 {
			font-size: var(--text-sm);
			color: var(--color-text-muted);
			margin: 0 0 var(--space-sm);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
		& pre {
			background: var(--color-surface-2);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-md);
			padding: var(--space-md);
			overflow-x: auto;
			font-family: var(--font-mono);
			font-size: var(--text-xs);
			line-height: 1.6;
			margin: 0;
		}
	}
	.problems, .solutions {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-md);
		margin-block-start: var(--space-sm);
		font-size: var(--text-sm);
		line-height: 1.5;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
		}
	}
	.problems { color: var(--color-error); }
	.solutions { color: var(--color-success); }
	.solutions strong { color: var(--color-text); }
	.live-preview {
		& h3 {
			font-size: var(--text-sm);
			color: var(--color-text-muted);
			margin: 0 0 var(--space-sm);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}
	}
	.icon-row {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}
	.chart-note { font-size: var(--text-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 0; }
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
