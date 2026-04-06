<script lang="ts">
	let expandedField = $state<string | null>(null);

	function toggleField(field: string) {
		expandedField = expandedField === field ? null : field;
	}

	const fields: Array<{ key: string; description: string }> = [
		{ key: 'name', description: 'The npm package name. Use a scope (@org/name) for organization packages.' },
		{ key: 'version', description: 'Semver version. Start at 0.1.0 for pre-release, 1.0.0 for stable.' },
		{ key: 'type', description: 'Set to "module" to use ESM imports/exports throughout.' },
		{ key: 'exports', description: 'The entry points map. Each key is a subpath. Use "types" and "svelte" conditions to point to .d.ts and .svelte files respectively.' },
		{ key: 'svelte', description: 'Legacy field pointing to the main Svelte entry. Some tools still use this.' },
		{ key: 'files', description: 'Array of directories/files included in the published tarball. Usually just ["dist"].' },
		{ key: 'sideEffects', description: 'Set to false to enable aggressive tree-shaking. Bundlers can safely drop unused exports.' },
		{ key: 'peerDependencies', description: 'Declare svelte as a peer dependency so consumers use their own version.' },
	];
</script>

<section class="page">
	<h1>14.5 — @sveltejs/package</h1>

	<p class="concept">
		<strong><code>@sveltejs/package</code></strong> takes your <code>src/lib</code> directory and
		generates a publishable <code>dist</code> folder. It processes <code>.svelte</code> files,
		generates TypeScript declarations, and outputs a clean package ready for npm. This is the
		standard way to build Svelte component libraries.
	</p>

	<h3>How It Works</h3>
	<ul>
		<li>Run <code>svelte-package</code> (or <code>svelte-kit package</code> in older versions)</li>
		<li>It reads every file in <code>src/lib/</code></li>
		<li>Svelte files are preprocessed and type declarations are generated</li>
		<li>TypeScript files are transpiled to JavaScript + <code>.d.ts</code></li>
		<li>Output lands in <code>dist/</code> with the same folder structure</li>
	</ul>

	<h3>Package.json Anatomy</h3>
	<p class="concept">
		Click any field below to see what it does. Then review the complete example.
	</p>

	<div class="build">
		{#each fields as field}
			<button class="field-btn" onclick={() => toggleField(field.key)}>
				<code>{field.key}</code>
				<span class="arrow">{expandedField === field.key ? '\u25B2' : '\u25BC'}</span>
			</button>
			{#if expandedField === field.key}
				<p class="concept field-desc">{field.description}</p>
			{/if}
		{/each}
	</div>

	<h3>Complete Example</h3>
	<pre>{`{
  "name": "@svelte-max/ui",
  "version": "1.0.0",
  "type": "module",
  "description": "A Svelte 5 component library built with runes",
  "license": "MIT",
  "svelte": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    },
    "./Button.svelte": {
      "types": "./dist/components/Button.svelte.d.ts",
      "svelte": "./dist/components/Button.svelte"
    },
    "./Badge.svelte": {
      "types": "./dist/components/Badge.svelte.d.ts",
      "svelte": "./dist/components/Badge.svelte"
    },
    "./Card.svelte": {
      "types": "./dist/components/Card.svelte.d.ts",
      "svelte": "./dist/components/Card.svelte"
    },
    "./Modal.svelte": {
      "types": "./dist/components/Modal.svelte.d.ts",
      "svelte": "./dist/components/Modal.svelte"
    }
  },
  "peerDependencies": {
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "@sveltejs/package": "^2.0.0",
    "svelte": "^5.0.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "build": "svelte-package",
    "prepublishOnly": "npm run build"
  }
}`}</pre>

	<h3>The Exports Map</h3>
	<p class="concept">
		The <code>exports</code> field is a <strong>conditions map</strong>. When a bundler sees
		<code>import Button from '@svelte-max/ui/Button.svelte'</code>, it checks the conditions.
		The <code>"svelte"</code> condition tells Svelte-aware tools to import the raw
		<code>.svelte</code> file. The <code>"types"</code> condition tells TypeScript where to find
		type declarations. This dual-condition approach ensures both IDE support and optimal compilation.
	</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.field-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.field-btn:hover { border-color: var(--color-primary); }
	.arrow { font-size: 0.75em; color: var(--color-text-muted); }
	.field-desc { padding-inline-start: var(--space-md); }

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
