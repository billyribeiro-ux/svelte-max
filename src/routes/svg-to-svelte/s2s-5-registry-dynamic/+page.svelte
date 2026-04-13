<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface RegistryEntry {
		name: string;
		original: string;
		category: string;
	}

	const mockRegistry: RegistryEntry[] = [
		{ name: 'IconAlertCircle', original: 'alert-circle.svg', category: 'feedback' },
		{ name: 'IconArrowRight', original: 'arrow-right.svg', category: 'navigation' },
		{ name: 'IconCheck', original: 'check.svg', category: 'feedback' },
		{ name: 'IconChevronDown', original: 'chevron-down.svg', category: 'navigation' },
		{ name: 'IconHome', original: 'home.svg', category: 'navigation' },
		{ name: 'IconSearch', original: 'search.svg', category: 'actions' },
		{ name: 'IconSettings', original: 'settings.svg', category: 'actions' },
		{ name: 'IconUser', original: 'user.svg', category: 'identity' },
		{ name: 'IconTrash', original: 'trash.svg', category: 'actions' },
		{ name: 'IconEdit', original: 'edit.svg', category: 'actions' },
		{ name: 'IconStar', original: 'star.svg', category: 'feedback' },
		{ name: 'IconHeart', original: 'heart.svg', category: 'feedback' },
	];

	let search = $state('');
	let activeCategory = $state('all');

	const categories = $derived(['all', ...new Set(mockRegistry.map(e => e.category))]);

	const filtered = $derived(
		mockRegistry.filter(e => {
			const matchSearch = search === '' || e.name.toLowerCase().includes(search.toLowerCase());
			const matchCat = activeCategory === 'all' || e.category === activeCategory;
			return matchSearch && matchCat;
		})
	);

	const registryJson = `// registry.json (auto-generated with -r flag)
{
  "icons": [
    {
      "name": "IconAlertCircle",
      "originalFile": "alert-circle.svg",
      "outputFile": "IconAlertCircle.svelte",
      "dimensions": { "width": 24, "height": 24 }
    },
    {
      "name": "IconArrowRight",
      "originalFile": "arrow-right.svg",
      "outputFile": "IconArrowRight.svelte",
      "dimensions": { "width": 24, "height": 24 }
    }
    // ... one entry per converted icon
  ],
  "total": 42,
  "generatedAt": "2026-04-13T00:00:00.000Z"
}`;

	const dynamicImportCode = `<script lang="ts">
  // Dynamic import: load an icon component by name at runtime
  let iconName = $state('IconSearch');

  // Vite's import.meta.glob pre-indexes all icon components
  const iconModules = import.meta.glob<{ default: typeof import('svelte').SvelteComponent }>(
    '$lib/icons/*.svelte'
  );

  const iconComponent = $derived.by(() => {
    const path = \`/src/lib/icons/\${iconName}.svelte\`;
    const loader = iconModules[path];
    if (!loader) return null;
    // loader() returns a Promise<Module>
    return loader;
  });
<\/script>

{#if iconComponent}
  {#await iconComponent() then mod}
    <mod.default size={32} color="var(--color-brand)" />
  {/await}
{/if}`;

	const iconPickerCode = `<script lang="ts">
  import registry from '$lib/icons/registry.json';
  import type { Snippet } from 'svelte';

  interface Props {
    onselect?: (name: string) => void;
    children?: Snippet;
  }

  let { onselect, children }: Props = $props();
  let query = $state('');

  const filtered = $derived(
    registry.icons.filter(icon =>
      icon.name.toLowerCase().includes(query.toLowerCase())
    )
  );
<\/script>

<div class="picker">
  <input type="search" placeholder="Search icons..." bind:value={query} />
  <div class="grid">
    {#each filtered as icon (icon.name)}
      <button type="button" onclick={() => onselect?.(icon.name)}>
        <!-- Dynamic render via import.meta.glob -->
        {icon.name}
      </button>
    {/each}
  </div>
</div>`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  // ... registry demo with search and filter\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>S2S.5 — Registry & Dynamic Icon Rendering</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>S2S.5 — Registry & Dynamic Icon Rendering</h1>
	<p class="concept">
		<strong>Concept.</strong> The <code>-r</code> (registry) flag generates a <code>registry.json</code>
		file alongside your icon components. This JSON maps every component name to its original SVG
		filename and dimensions — enabling runtime icon lookup, search interfaces, and dynamic rendering
		via <code>import.meta.glob</code>. Combined with Vite's lazy module loading, you can build icon
		pickers, dynamic dashboards, and CMS-driven icon fields without statically importing every icon.
	</p>

	<div class="build">
		<h3 class="section-title">Registry JSON structure</h3>
		<pre class="code-block"><code>{registryJson}</code></pre>

		<h3 class="section-title">Interactive registry explorer</h3>
		<div class="explorer">
			<div class="explorer-controls">
				<input
					type="search"
					placeholder="Search icons..."
					bind:value={search}
					class="search-input"
				/>
				<div class="category-tabs">
					{#each categories as cat}
						<button
							type="button"
							class="cat-btn"
							class:active={activeCategory === cat}
							onclick={() => activeCategory = cat}
						>
							{cat}
						</button>
					{/each}
				</div>
			</div>

			<div class="icon-results">
				{#each filtered as entry (entry.name)}
					<div class="result-card">
						<div class="result-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
								stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								width="28" height="28" aria-hidden="true">
								<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
								<circle cx="8.5" cy="8.5" r="1.5" />
								<polyline points="21 15 16 10 5 21" />
							</svg>
						</div>
						<div class="result-meta">
							<code class="result-name">{entry.name}</code>
							<span class="result-file">{entry.original}</span>
							<span class="result-cat">{entry.category}</span>
						</div>
					</div>
				{:else}
					<p class="no-results">No icons match "{search}"</p>
				{/each}
			</div>
			<p class="chart-note">{filtered.length} of {mockRegistry.length} icons shown</p>
		</div>

		<h3 class="section-title">Dynamic import with import.meta.glob</h3>
		<pre class="code-block"><code>{dynamicImportCode}</code></pre>
		<p class="chart-note">Vite's <code>import.meta.glob</code> creates a map of lazy loaders. Each icon loads only when requested — zero upfront bundle cost for unused icons.</p>

		<h3 class="section-title">Icon picker component pattern</h3>
		<pre class="code-block"><code>{iconPickerCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Dynamic icon rendering introduces async boundaries and import paths. Test each failure mode.</p>
	<ol class="experiments">
		<li><strong>Request an icon name that does not exist in the registry.</strong> The <code>iconModules[path]</code> lookup returns <code>undefined</code>. Without the null check, you get a runtime error when calling <code>loader()</code>. Always guard dynamic imports with existence checks.</li>
		<li><strong>Use a hardcoded import path instead of <code>import.meta.glob</code>.</strong> A static <code>import()</code> with a variable path (<code>import(\`./icons/\${name}.svelte\`)</code>) cannot be analyzed by Vite at build time. It either fails or bundles every possible module. <code>import.meta.glob</code> is the Vite-native solution for this exact problem.</li>
		<li><strong>Import the registry JSON and try to render a component from it.</strong> The registry contains metadata (names, files) but not component references. You need a second step — using the name to dynamically import the actual <code>.svelte</code> module. The registry is an index; <code>import.meta.glob</code> is the loader.</li>
		<li><strong>Add a non-SVG file to the icons directory and run the converter.</strong> The CLI ignores non-<code>.svg</code> files, but the registry might reference stale entries if you delete an SVG without re-running. Always regenerate the registry when the icon set changes.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The registry JSON transforms a static icon set into a searchable, filterable database. Each entry maps a component name to its original file, dimensions, and output path. This metadata powers icon pickers, documentation pages, and CMS integrations where the icon choice is data-driven rather than hardcoded in markup.</p>
	<p class="prose">Dynamic icon rendering via <code>import.meta.glob</code> is Vite's answer to lazy loading. Instead of importing 200 icons upfront, you create a map of loader functions. Each loader returns a Promise that resolves to the component module. Combined with Svelte's <code>{'{#await}'}</code> block, you can render any icon by name with zero upfront cost — the module loads only when the component is mounted.</p>
	<p class="prose">The icon picker pattern composes the registry (for search/filter) with dynamic imports (for rendering). The picker reads <code>registry.json</code> to list available icons, filters them by user query, and dynamically loads the selected icon's <code>.svelte</code> module on demand. This is how production design tools, admin dashboards, and CMS editors handle icon selection at scale.</p>
	<p class="next">Next lesson: <a href="/svg-to-svelte/s2s-6-animation-pipeline">S2S.6 — SVG-to-Svelte Animation Pipeline</a></p>
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
	.explorer { display: flex; flex-direction: column; gap: var(--space-md); }
	.explorer-controls { display: flex; flex-direction: column; gap: var(--space-sm); }
	.search-input { padding: var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); color: var(--color-text); font-size: var(--text-sm); inline-size: 100%; max-inline-size: 300px; &:focus { outline: 2px solid var(--color-brand); outline-offset: 2px; } }
	.category-tabs { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
	.cat-btn { padding: var(--space-xs) var(--space-sm); border: 1px solid var(--color-border); border-radius: var(--radius-full); background: transparent; color: var(--color-text-muted); font-size: var(--text-xs); cursor: pointer; text-transform: capitalize; transition: all var(--dur-fast) var(--ease-out); &.active { border-color: var(--color-brand); color: var(--color-brand); background: oklch(from var(--color-brand) l c h / 0.08); } }
	.icon-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-sm); }
	.result-card { display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); transition: border-color var(--dur-fast) var(--ease-out); &:hover { border-color: var(--color-brand); } }
	.result-icon { display: flex; align-items: center; justify-content: center; inline-size: 44px; block-size: 44px; background: var(--color-surface); border-radius: var(--radius-sm); color: var(--color-text); flex-shrink: 0; }
	.result-meta { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
	.result-name { font-size: var(--text-xs); color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
	.result-file { font-size: 10px; color: var(--color-text-muted); }
	.result-cat { font-size: 10px; color: var(--color-brand); text-transform: capitalize; }
	.no-results { font-size: var(--text-sm); color: var(--color-text-muted); text-align: center; padding: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
