<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let prefix = $state('Icon');
	let suffix = $state('');
	let casing = $state<'PascalCase' | 'camelCase' | 'kebab-case'>('PascalCase');
	let useTs = $state(true);
	let overrideFill = $state(true);

	const previewName = $derived(() => {
		const base = 'alert-circle';
		const parts = base.split('-');
		let name = '';
		if (casing === 'PascalCase') {
			name = parts.map(p => p[0].toUpperCase() + p.slice(1)).join('');
		} else if (casing === 'camelCase') {
			name = parts[0] + parts.slice(1).map(p => p[0].toUpperCase() + p.slice(1)).join('');
		} else {
			name = base;
		}
		return `${prefix}${name}${suffix}.svelte`;
	});

	const installCmd = 'pnpm add -D @jlacostaec/svgtosvelte';

	const basicUsage = 'svgtosvelte static/icons src/lib/icons';

	const fullCmd = $derived(
		`svgtosvelte static/icons src/lib/icons` +
		(prefix ? ` -p ${prefix}` : '') +
		(suffix ? ` -s ${suffix}` : '') +
		(casing !== 'PascalCase' ? ` -c ${casing}` : '') +
		(useTs ? ' -t' : '') +
		(overrideFill ? ' -a fill.currentColor' : '')
	);

	const outputExample = `src/lib/icons/
├── IconAlertCircle.svelte
├── IconArrowRight.svelte
├── IconCheck.svelte
├── IconChevronDown.svelte
├── IconSearch.svelte
├── IconUser.svelte
├── index.ts          ← barrel export
└── registry.json     ← component metadata`;

	const barrelExport = `// src/lib/icons/index.ts (auto-generated)
export { default as IconAlertCircle } from './IconAlertCircle.svelte';
export { default as IconArrowRight } from './IconArrowRight.svelte';
export { default as IconCheck } from './IconCheck.svelte';
export { default as IconChevronDown } from './IconChevronDown.svelte';
export { default as IconSearch } from './IconSearch.svelte';
export { default as IconUser } from './IconUser.svelte';`;

	const programmaticApi = `import { svgsToSvelte } from '@jlacostaec/svgtosvelte';

svgsToSvelte('static/icons/', 'src/lib/icons/', {
  prefix: 'Icon',
  suffix: '',
  casing: 'PascalCase',
  useTypeScript: true,
  attributes: ['fill.currentColor', 'width.100%', 'height.auto'],
  filter: [],
  exclude: [],
  registry: true
});`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  let prefix = $state('Icon');\n" +
		"  let casing = $state('PascalCase');\n" +
		"  // ... interactive config builder\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.2 — CLI Setup & First Conversion</h1>\n" +
		"  <!-- concept, build, experiments, what you learned -->\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.2 — CLI Setup & First Conversion</h1>
	<p class="concept">
		<strong>Concept.</strong> The <code>@jlacostaec/svgtosvelte</code> package provides a CLI tool
		that batch-converts a directory of <code>.svg</code> files into Svelte 5 components. V2 is a
		complete rewrite — it works directly on SVG strings without AST parsing, making it dramatically
		faster. It generates a barrel <code>index.ts</code> for clean imports and an optional
		<code>registry.json</code> for programmatic icon lookup.
	</p>

	<div class="build">
		<h3 class="section-title">1. Install</h3>
		<pre class="cmd"><code>{installCmd}</code></pre>

		<h3 class="section-title">2. Basic usage</h3>
		<pre class="cmd"><code>{basicUsage}</code></pre>
		<p class="chart-note"><code>static/icons</code> = source directory with <code>.svg</code> files. <code>src/lib/icons</code> = output for generated <code>.svelte</code> components.</p>

		<h3 class="section-title">3. Configure options</h3>
		<div class="config-builder">
			<div class="config-row">
				<label>
					<span>Prefix</span>
					<input type="text" bind:value={prefix} placeholder="e.g. Icon" />
				</label>
				<label>
					<span>Suffix</span>
					<input type="text" bind:value={suffix} placeholder="e.g. Svg" />
				</label>
				<label>
					<span>Casing</span>
					<select bind:value={casing}>
						<option value="PascalCase">PascalCase</option>
						<option value="camelCase">camelCase</option>
						<option value="kebab-case">kebab-case</option>
					</select>
				</label>
			</div>
			<div class="config-row">
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={useTs} />
					<span>TypeScript</span>
				</label>
				<label class="checkbox-label">
					<input type="checkbox" bind:checked={overrideFill} />
					<span>Override fill → currentColor</span>
				</label>
			</div>

			<div class="preview-filename">
				<span class="label">Preview:</span> <code>alert-circle.svg</code> → <code>{previewName()}</code>
			</div>

			<h3 class="section-title">Generated command</h3>
			<pre class="cmd"><code>{fullCmd}</code></pre>
		</div>

		<h3 class="section-title">4. Output structure</h3>
		<pre class="output"><code>{outputExample}</code></pre>

		<h3 class="section-title">5. Import and use</h3>
		<pre class="output"><code>{barrelExport}</code></pre>
		<p class="chart-note">The barrel export lets you import any icon by name: <code>import {'{ IconSearch }'} from '$lib/icons';</code></p>

		<h3 class="section-title">6. Programmatic API</h3>
		<pre class="output"><code>{programmaticApi}</code></pre>
		<p class="chart-note">Use the programmatic API in build scripts or Vite plugins for automated SVG-to-Svelte pipelines.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Understanding the CLI means understanding what each option controls and what breaks without it.</p>
	<ol class="experiments">
		<li><strong>Run without the <code>-t</code> flag and try to import a generated component with types.</strong> The component will use plain JavaScript — no <code>interface Props</code>, no type checking on the <code>size</code> or <code>color</code> props. TypeScript consumers get <code>any</code> types, defeating the purpose of typed icon components. Always use <code>-t</code>.</li>
		<li><strong>Skip the <code>-a fill.currentColor</code> flag on SVGs exported from Figma.</strong> Figma SVGs often have hardcoded <code>fill="#000000"</code>. Without the override, the icons render black regardless of your PE7 color tokens or dark mode settings. The <code>-a fill.currentColor</code> flag replaces all fill values, making icons inherit their parent's text color.</li>
		<li><strong>Run with <code>-c kebab-case</code> and try to import the component.</strong> Svelte components must be imported as PascalCase identifiers. A file named <code>alert-circle.svelte</code> cannot be imported as <code>&lt;alert-circle /&gt;</code> in Svelte — it will be treated as an HTML element. PascalCase is the only Svelte-compatible naming convention.</li>
		<li><strong>Add a duplicate SVG with a slightly different name (e.g. <code>alert.svg</code> and <code>Alert.svg</code>).</strong> On case-insensitive file systems (macOS default), this creates a collision. The <code>--filter</code> and <code>--exclude</code> flags let you deduplicate before conversion.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>svgtosvelte</code> CLI is a one-command conversion pipeline. You point it at a directory of raw SVG files, configure naming and attribute overrides, and it outputs typed Svelte 5 components with a barrel export for clean imports. The <code>-t</code> flag generates TypeScript, <code>-a fill.currentColor</code> makes icons theme-aware, and <code>-p</code> adds a consistent prefix for namespace clarity.</p>
	<p class="prose">V2's string-based transformation (no AST) makes it fast enough to run in a Vite plugin on every file change. The programmatic <code>svgsToSvelte()</code> API opens the door to custom build pipelines — watch a <code>static/icons/</code> directory and regenerate components on save, ensuring your Svelte icon library is always in sync with your design system's SVG exports.</p>
	<p class="prose">The registry JSON is a hidden power feature. It maps every component name to its original SVG filename, dimensions, and path data — enabling runtime icon lookup for dynamic icon rendering, search interfaces, and documentation tools without importing every icon statically.</p>
	<p class="next">Next lesson: <a href="/svg-to-svelte/s2s-3-typed-icon-component">S2S.3 — Building a Typed Icon Component</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.cmd { background: oklch(15% 0.02 270); color: oklch(85% 0.05 145); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; }
	.output { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.chart-note { font-size: var(--text-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 0; }
	.config-builder { display: flex; flex-direction: column; gap: var(--space-md); }
	.config-row { display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: end; }
	.config-row label { display: flex; flex-direction: column; gap: var(--space-xs); font-size: var(--text-sm); color: var(--color-text-muted); }
	.config-row input[type="text"], .config-row select { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-text); font-family: var(--font-mono); font-size: var(--text-sm); inline-size: 120px; }
	.checkbox-label { flex-direction: row !important; align-items: center !important; gap: var(--space-xs) !important; }
	.checkbox-label input[type="checkbox"] { accent-color: oklch(65% 0.22 270); }
	.preview-filename { font-size: var(--text-sm); color: var(--color-text); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-sm); }
	.preview-filename .label { color: var(--color-text-muted); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.cmd code, .output code { background: transparent; padding: 0; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
