<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let iconSize = $state(32);
	let iconColor = $state('var(--color-brand)');
	let iconStroke = $state(2);
	let iconClass = $state('');

	const colorOptions = [
		{ label: 'Brand', value: 'var(--color-brand)' },
		{ label: 'Error', value: 'var(--color-error)' },
		{ label: 'Success', value: 'var(--color-success)' },
		{ label: 'Warning', value: 'var(--color-warning)' },
		{ label: 'Text', value: 'var(--color-text)' },
		{ label: 'Muted', value: 'var(--color-text-muted)' },
	];

	const interfaceCode = `interface IconProps {
  /** Pixel size — sets both width and height */
  size?: number;
  /** Stroke/fill color — accepts any CSS value */
  color?: string;
  /** SVG stroke width */
  strokeWidth?: number;
  /** Additional CSS class for the host <svg> */
  class?: string;
  /** Accessible label — when set, renders role="img" + aria-label instead of aria-hidden */
  ariaLabel?: string;
}`;

	const componentCode = `<script lang="ts">
  interface IconProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    class?: string;
    ariaLabel?: string;
  }

  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    class: className = '',
    ariaLabel,
  }: IconProps = $props();
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
  role={ariaLabel ? 'img' : undefined}
  aria-label={ariaLabel}
  aria-hidden={ariaLabel ? undefined : true}
>
  <!-- SVG path data here -->
  <circle cx="12" cy="12" r="10" />
  <polyline points="12 6 12 12 16 14" />
</svg>`;

	const usageCode = `<script lang="ts">
  import IconClock from '$lib/icons/IconClock.svelte';
<\/script>

<!-- Default: 24px, currentColor, stroke 2 -->
<IconClock />

<!-- Custom size and color via PE7 tokens -->
<IconClock size={48} color="var(--color-brand)" />

<!-- Accessible: meaningful icon with label -->
<IconClock size={20} ariaLabel="Current time" />

<!-- Decorative: hidden from screen readers (default) -->
<span>3:45 PM <IconClock size={16} /></span>`;

	const restPropsCode = `<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';

  interface IconProps extends SVGAttributes<SVGSVGElement> {
    size?: number;
    color?: string;
    strokeWidth?: number;
  }

  let {
    size = 24,
    color = 'currentColor',
    strokeWidth = 2,
    ...rest
  }: IconProps = $props();
<\/script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  width={size}
  height={size}
  {...rest}
>
  <!-- paths -->
</svg>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // Interactive icon prop playground\n" +
		"  let iconSize = $state(32);\n" +
		"  let iconColor = $state('var(--color-brand)');\n" +
		"  // ... controls and code examples\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.3 — Building a Typed Icon Component</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.3 — Building a Typed Icon Component</h1>
	<p class="concept">
		<strong>Concept.</strong> A professional icon component is not just an SVG wrapper — it is a typed
		API contract. The <code>IconProps</code> interface declares every customization point:
		<code>size</code>, <code>color</code>, <code>strokeWidth</code>, and accessibility via
		<code>ariaLabel</code>. When <code>ariaLabel</code> is provided, the icon renders as
		<code>role="img"</code> with a label; otherwise it is <code>aria-hidden="true"</code> (decorative).
		Rest props via <code>...rest</code> forward any native SVG attribute the consumer needs.
	</p>

	<div class="build">
		<h3 class="section-title">The IconProps interface</h3>
		<pre class="code-block"><code>{interfaceCode}</code></pre>

		<h3 class="section-title">Full component template</h3>
		<pre class="code-block"><code>{componentCode}</code></pre>

		<h3 class="section-title">Interactive playground</h3>
		<div class="playground">
			<div class="controls">
				<label>
					<span>Size: {iconSize}px</span>
					<input type="range" min="12" max="96" step="4" bind:value={iconSize} />
				</label>
				<label>
					<span>Stroke: {iconStroke}</span>
					<input type="range" min="0.5" max="4" step="0.5" bind:value={iconStroke} />
				</label>
				<label>
					<span>Color</span>
					<div class="color-chips">
						{#each colorOptions as opt}
							<button
								type="button"
								class="chip"
								class:active={iconColor === opt.value}
								onclick={() => iconColor = opt.value}
								style="--chip-color: {opt.value}"
							>
								{opt.label}
							</button>
						{/each}
					</div>
				</label>
			</div>

			<div class="preview-area">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke={iconColor}
					stroke-width={iconStroke}
					stroke-linecap="round"
					stroke-linejoin="round"
					width={iconSize}
					height={iconSize}
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
				<span class="preview-label">{iconSize}px · stroke {iconStroke}</span>
			</div>
		</div>

		<h3 class="section-title">Usage examples</h3>
		<pre class="code-block"><code>{usageCode}</code></pre>

		<h3 class="section-title">Advanced: rest props with SVGAttributes</h3>
		<pre class="code-block"><code>{restPropsCode}</code></pre>
		<p class="chart-note">Extending <code>SVGAttributes&lt;SVGSVGElement&gt;</code> from <code>svelte/elements</code> gives consumers full type-safe access to every native SVG attribute via prop spreading.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">A typed icon component is a contract. Break each part to understand what it enforces.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>ariaLabel</code> prop and always set <code>aria-hidden="true"</code>.</strong> Now meaningful icons (like a standalone "close" button icon) have no accessible name. Screen reader users hear nothing. The conditional <code>ariaLabel</code> pattern solves this: set it when the icon conveys meaning, omit it when it is decorative.</li>
		<li><strong>Set <code>color</code> to a hardcoded hex value like <code>#ff0000</code>.</strong> It works — but now the icon ignores dark mode and PE7 tokens. Always use <code>var(--color-*)</code> tokens or <code>currentColor</code> (which inherits from the parent's <code>color</code> property).</li>
		<li><strong>Remove <code>stroke-linecap="round"</code> and <code>stroke-linejoin="round"</code>.</strong> Path endpoints become square and sharp. These SVG attributes control the visual style of strokes and should be baked into the component, not left to the consumer.</li>
		<li><strong>Pass <code>onclick</code> to the icon without <code>...rest</code> spreading.</strong> TypeScript errors because <code>IconProps</code> does not include <code>onclick</code>. The <code>extends SVGAttributes</code> pattern with <code>...rest</code> forwards any native attribute — including event handlers — without the component needing to declare each one.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A typed icon component is a three-layer contract: <strong>visual</strong> (size, color, stroke), <strong>semantic</strong> (accessible or decorative), and <strong>extensible</strong> (rest props for any native SVG attribute). The <code>IconProps</code> interface encodes the first two layers explicitly, and the <code>extends SVGAttributes</code> pattern handles the third. This means consumers get full IntelliSense for every prop, TypeScript catches misuse at compile time, and the component handles its own accessibility defaults.</p>
	<p class="prose">The <code>currentColor</code> default for <code>color</code> is a critical design decision. It means icons inherit their parent element's <code>color</code> CSS property, which is exactly how text works. When you set <code>color: var(--color-text)</code> on a container, all icons inside it automatically match — no prop passing needed. Override only when you need a specific semantic color like <code>var(--color-error)</code>.</p>
	<p class="prose">The accessibility pattern — conditional <code>aria-hidden</code> vs <code>role="img" + aria-label</code> — is not optional. It is the correct way to handle icons in a WAI-ARIA compliant application. Decorative icons (next to visible text) should be invisible to assistive technology. Meaningful icons (standalone buttons, status indicators) must have an accessible name. The <code>ariaLabel</code> prop makes this decision explicit at the call site.</p>
	<p class="next">Next lesson: <a href="/svg-to-svelte/s2s-4-attribute-overrides">S2S.4 — Attribute Overrides & Theme Integration</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.chart-note { font-size: var(--text-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 0; }
	.playground { display: flex; flex-wrap: wrap; gap: var(--space-lg); align-items: start; }
	.controls { display: flex; flex-direction: column; gap: var(--space-md); flex: 1; min-inline-size: 200px; }
	.controls label { display: flex; flex-direction: column; gap: var(--space-xs); font-size: var(--text-sm); color: var(--color-text-muted); }
	.controls input[type="range"] { inline-size: 200px; accent-color: oklch(65% 0.22 270); }
	.color-chips { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
	.chip { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-full); background: var(--color-surface); color: var(--color-text-muted); font-size: var(--text-xs); cursor: pointer; transition: all var(--dur-fast) var(--ease-out); &.active { border-color: var(--color-brand); color: var(--color-brand); background: oklch(from var(--color-brand) l c h / 0.08); } }
	.preview-area { display: flex; flex-direction: column; align-items: center; gap: var(--space-sm); padding: var(--space-lg); background: var(--color-surface-2); border-radius: var(--radius-md); min-inline-size: 120px; }
	.preview-label { font-size: var(--text-xs); color: var(--color-text-muted); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
