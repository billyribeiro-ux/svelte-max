<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let fillMode = $state<'currentColor' | 'none' | 'custom'>('currentColor');
	let customFill = $state('var(--color-brand)');
	let responsive = $state(true);
	let darkMode = $state(false);

	const fillDemoColor = $derived(
		fillMode === 'currentColor' ? 'currentColor'
		: fillMode === 'none' ? 'none'
		: customFill
	);

	const cliOverrides = `# Override fill to currentColor (theme-aware)
svgtosvelte icons -a fill.currentColor

# Make SVGs responsive (100% width, auto height)
svgtosvelte icons -a fill.currentColor width.100% height.auto

# Remove hardcoded dimensions + force round caps
svgtosvelte icons -a fill.currentColor width.100% height.auto stroke-linecap.round stroke-linejoin.round

# Multiple overrides compose — each -a flag adds one
svgtosvelte icons -a fill.currentColor -a width.100% -a height.auto`;

	const programmaticOverrides = `import { svgsToSvelte } from '@jlacostaec/svgtosvelte';

svgsToSvelte('static/icons/', 'src/lib/icons/', {
  prefix: 'Icon',
  useTypeScript: true,
  attributes: [
    'fill.currentColor',       // theme-aware fill
    'width.100%',              // responsive width
    'height.auto',             // maintain aspect ratio
    'stroke-linecap.round',    // round stroke ends
    'stroke-linejoin.round',   // round stroke joins
  ],
});`;

	const figmaExport = `<!-- Figma exports this: -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 7l10 5 10-5-10-5z"
    fill="#1A1A1A"
    stroke="#1A1A1A"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>

<!-- After svgtosvelte -a fill.currentColor -a stroke.currentColor: -->
<svg width="100%" height="auto" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 7l10 5 10-5-10-5z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"/>
</svg>`;

	const pe7Integration = `<!-- Icon inherits parent color via currentColor -->
<nav style:color="var(--color-text)">
  <IconHome />     <!-- inherits --color-text -->
  <IconSearch />   <!-- inherits --color-text -->
  <IconUser />     <!-- inherits --color-text -->
</nav>

<!-- Error state: parent color overrides all children -->
<div style:color="var(--color-error)">
  <IconAlert /> Something went wrong
</div>

<!-- Dark mode: color tokens switch automatically -->
<!-- No icon changes needed — currentColor just works -->`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  let fillMode = $state('currentColor');\n" +
		"  // ... attribute override demos\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.4 — Attribute Overrides & Theme Integration</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.4 — Attribute Overrides & Theme Integration</h1>
	<p class="concept">
		<strong>Concept.</strong> SVGs exported from design tools like Figma carry hardcoded values —
		<code>fill="#1A1A1A"</code>, fixed <code>width/height</code>, square stroke caps. The
		<code>-a</code> (attributes) flag in <code>svgtosvelte</code> overrides these at conversion time.
		The critical override is <code>fill.currentColor</code>, which makes every icon inherit its
		parent's CSS <code>color</code> property — enabling PE7 token-driven theming, dark mode, and
		semantic color states without touching a single icon file.
	</p>

	<div class="build">
		<h3 class="section-title">CLI attribute overrides</h3>
		<pre class="code-block"><code>{cliOverrides}</code></pre>

		<h3 class="section-title">Programmatic API equivalent</h3>
		<pre class="code-block"><code>{programmaticOverrides}</code></pre>

		<h3 class="section-title">Figma export → theme-aware conversion</h3>
		<pre class="code-block"><code>{figmaExport}</code></pre>

		<h3 class="section-title">Interactive: fill mode comparison</h3>
		<div class="fill-demo" class:dark={darkMode}>
			<div class="fill-controls">
				<div class="mode-buttons">
					{#each (['currentColor', 'none', 'custom'] as const) as mode}
						<button
							type="button"
							class="mode-btn"
							class:active={fillMode === mode}
							onclick={() => fillMode = mode}
						>
							{mode}
						</button>
					{/each}
				</div>
				<label class="dark-toggle">
					<input type="checkbox" bind:checked={darkMode} />
					<span>Dark mode</span>
				</label>
			</div>

			<div class="icon-grid">
				<div class="icon-card">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillDemoColor}
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						width="48" height="48" aria-hidden="true">
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
					<span>Home</span>
				</div>
				<div class="icon-card">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillDemoColor}
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						width="48" height="48" aria-hidden="true">
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
					</svg>
					<span>Search</span>
				</div>
				<div class="icon-card">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillDemoColor}
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						width="48" height="48" aria-hidden="true">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
					<span>User</span>
				</div>
				<div class="icon-card">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fillDemoColor}
						stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						width="48" height="48" aria-hidden="true">
						<polyline points="20 6 9 17 4 12" />
					</svg>
					<span>Check</span>
				</div>
			</div>
			<p class="chart-note">Toggle between fill modes and dark mode to see how <code>currentColor</code> automatically adapts icons to their context.</p>
		</div>

		<h3 class="section-title">PE7 token integration</h3>
		<pre class="code-block"><code>{pe7Integration}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Attribute overrides are the bridge between raw design exports and a PE7-compliant icon system.</p>
	<ol class="experiments">
		<li><strong>Export 10 icons from Figma without the <code>fill.currentColor</code> override.</strong> Toggle dark mode in your app. Every icon stays the same color — they are using hardcoded <code>#1A1A1A</code> which is invisible on a dark background. This single override fixes all of them at once.</li>
		<li><strong>Use <code>width.24</code> and <code>height.24</code> instead of <code>width.100%</code>.</strong> The icons render at exactly 24px regardless of the component's <code>size</code> prop. Fixed dimensions in the SVG override the component's <code>width</code>/<code>height</code> attributes. Use <code>100%</code> and <code>auto</code> so the component controls sizing.</li>
		<li><strong>Override <code>stroke.none</code> on an icon that uses strokes for its design.</strong> The icon's outline disappears entirely, leaving only the fill shape. Attribute overrides are global — they apply to every element in the SVG. Use them judiciously and only for attributes that should be universally consistent across your icon set.</li>
		<li><strong>Set <code>fill.currentColor</code> on a multicolor illustration SVG.</strong> Every path becomes the same color, destroying the illustration's distinct fills. The <code>currentColor</code> override is for monochrome icon sets. Multicolor SVGs need per-path overrides or should not use this flag.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Attribute overrides are the single most important feature of the <code>svgtosvelte</code> pipeline for PE7 compliance. The <code>-a fill.currentColor</code> flag transforms static, hardcoded SVGs into theme-aware components that inherit their color from the CSS cascade. This means dark mode, semantic color states (<code>var(--color-error)</code>), and PE7 OKLCH tokens all work automatically — zero per-icon configuration needed.</p>
	<p class="prose">The <code>width.100%</code> and <code>height.auto</code> overrides are equally important. They remove fixed dimensions from the SVG element, allowing the Svelte component's <code>size</code> prop to control rendering. Without this, the internal SVG dimensions fight the component's attributes, leading to inconsistent sizing across your icon set.</p>
	<p class="prose">The key insight is that attribute overrides happen at <strong>conversion time</strong>, not runtime. Every generated <code>.svelte</code> component already has the correct attributes baked in. There is no runtime cost, no conditional logic, and no configuration needed by consumers. The build pipeline guarantees that every icon in <code>$lib/icons/</code> is PE7-compliant by default.</p>
	<p class="next">Next lesson: <a href="/svg-to-svelte/s2s-5-registry-dynamic">S2S.5 — Registry & Dynamic Icon Rendering</a></p>
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
	.fill-demo { padding: var(--space-lg); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); color: var(--color-text); transition: all var(--dur-base) var(--ease-out); &.dark { background: oklch(15% 0.02 270); color: oklch(90% 0.02 270); } }
	.fill-controls { display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center; margin-block-end: var(--space-md); }
	.mode-buttons { display: flex; gap: var(--space-xs); }
	.mode-btn { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: transparent; color: inherit; font-size: var(--text-xs); cursor: pointer; transition: all var(--dur-fast) var(--ease-out); &.active { border-color: var(--color-brand); color: var(--color-brand); background: oklch(from var(--color-brand) l c h / 0.1); } }
	.dark-toggle { display: flex; align-items: center; gap: var(--space-xs); font-size: var(--text-sm); color: inherit; cursor: pointer; & input { accent-color: oklch(65% 0.22 270); } }
	.icon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: var(--space-md); }
	.icon-card { display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); padding: var(--space-md); background: oklch(from currentColor l c h / 0.04); border-radius: var(--radius-md); & span { font-size: var(--text-xs); color: inherit; opacity: 0.7; } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
