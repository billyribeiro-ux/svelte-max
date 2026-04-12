<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let expandedField = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"	function toggleField(field: string) {\n" +
		"		expandedField = expandedField === field ? null : field;\n" +
		"	}\n" +
		"\n" +
		"	const fields: Array\u003c{ key: string; description: string }\u003e = [\n" +
		"		{ key: 'name', description: 'The npm package name. Use a scope (@org/name) for organization packages.' },\n" +
		"		{ key: 'version', description: 'Semver version. Start at 0.1.0 for pre-release, 1.0.0 for stable.' },\n" +
		"		{ key: 'type', description: 'Set to \"module\" to use ESM imports/exports throughout.' },\n" +
		"		{ key: 'exports', description: 'The entry points map. Each key is a subpath. Use \"types\" and \"svelte\" conditions to point to .d.ts and .svelte files respectively.' },\n" +
		"		{ key: 'svelte', description: 'Legacy field pointing to the main Svelte entry. Some tools still use this.' },\n" +
		"		{ key: 'files', description: 'Array of directories/files included in the published tarball. Usually just [\"dist\"].' },\n" +
		"		{ key: 'sideEffects', description: 'Set to false to enable aggressive tree-shaking. Bundlers can safely drop unused exports.' },\n" +
		"		{ key: 'peerDependencies', description: 'Declare svelte as a peer dependency so consumers use their own version.' },\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.5 — @sveltejs/package\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003e\u003ccode\u003e@sveltejs/package\u003c/code\u003e\u003c/strong\u003e takes your \u003ccode\u003esrc/lib\u003c/code\u003e directory and\n" +
		"		generates a publishable \u003ccode\u003edist\u003c/code\u003e folder. It processes \u003ccode\u003e.svelte\u003c/code\u003e files,\n" +
		"		generates TypeScript declarations, and outputs a clean package ready for npm. This is the\n" +
		"		standard way to build Svelte component libraries.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eHow It Works\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eRun \u003ccode\u003esvelte-package\u003c/code\u003e (or \u003ccode\u003esvelte-kit package\u003c/code\u003e in older versions)\u003c/li\u003e\n" +
		"		\u003cli\u003eIt reads every file in \u003ccode\u003esrc/lib/\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eSvelte files are preprocessed and type declarations are generated\u003c/li\u003e\n" +
		"		\u003cli\u003eTypeScript files are transpiled to JavaScript + \u003ccode\u003e.d.ts\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eOutput lands in \u003ccode\u003edist/\u003c/code\u003e with the same folder structure\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003ePackage.json Anatomy\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Click any field below to see what it does. Then review the complete example.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		{#each fields as field}\n" +
		"			\u003cbutton class=\"field-btn\" onclick={() =\u003e toggleField(field.key)}\u003e\n" +
		"				\u003ccode\u003e{field.key}\u003c/code\u003e\n" +
		"				\u003cspan class=\"arrow\"\u003e{expandedField === field.key ? '\\u25B2' : '\\u25BC'}\u003c/span\u003e\n" +
		"			\u003c/button\u003e\n" +
		"			{#if expandedField === field.key}\n" +
		"				\u003cp class=\"concept field-desc\"\u003e{field.description}\u003c/p\u003e\n" +
		"			{/if}\n" +
		"		{/each}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eComplete Example\u003c/h3\u003e\n" +
		"	\u003cpre\u003e{`{\n" +
		"  \"name\": \"@svelte-max/ui\",\n" +
		"  \"version\": \"1.0.0\",\n" +
		"  \"type\": \"module\",\n" +
		"  \"description\": \"A Svelte 5 component library built with runes\",\n" +
		"  \"license\": \"MIT\",\n" +
		"  \"svelte\": \"./dist/index.js\",\n" +
		"  \"types\": \"./dist/index.d.ts\",\n" +
		"  \"files\": [\n" +
		"    \"dist\"\n" +
		"  ],\n" +
		"  \"sideEffects\": false,\n" +
		"  \"exports\": {\n" +
		"    \".\": {\n" +
		"      \"types\": \"./dist/index.d.ts\",\n" +
		"      \"svelte\": \"./dist/index.js\"\n" +
		"    },\n" +
		"    \"./Button.svelte\": {\n" +
		"      \"types\": \"./dist/components/Button.svelte.d.ts\",\n" +
		"      \"svelte\": \"./dist/components/Button.svelte\"\n" +
		"    },\n" +
		"    \"./Badge.svelte\": {\n" +
		"      \"types\": \"./dist/components/Badge.svelte.d.ts\",\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a packaging pitfall that causes consumer-side failures. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>"types"</code> condition from the <code>exports</code> map.</strong> TypeScript consumers lose type information for your package. Their IDE shows <code>any</code> types instead of the component's actual props interface, and <code>tsc --noEmit</code> may report "could not find a declaration file" errors. The <code>"types"</code> condition is essential for TypeScript compatibility.</li>
		<li><strong>Move <code>svelte</code> from <code>peerDependencies</code> to <code>dependencies</code>.</strong> Now your package bundles its own copy of Svelte. If the consumer also installs Svelte (which they must, since they are building a Svelte app), there are two Svelte runtimes in the bundle. This doubles the bundle size and causes subtle bugs because the two runtimes maintain separate reactivity graphs.</li>
		<li><strong>Set <code>"files": ["src", "dist"]</code> instead of just <code>["dist"]</code>.</strong> The published tarball now includes your raw source code, increasing the package size and potentially exposing internal implementation details. The <code>"files"</code> field should include only the build output that consumers need.</li>
		<li><strong>Remove <code>"sideEffects": false</code> from package.json.</strong> Bundlers like Vite and webpack cannot safely tree-shake unused exports from your package. If a consumer imports one component, the bundler includes all components because it cannot guarantee that the others do not have side effects (global CSS, module-level code).</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>@sveltejs/package</code> is the standard tool for building Svelte component libraries. It reads every file in <code>src/lib/</code>, preprocesses Svelte files, transpiles TypeScript to JavaScript, generates <code>.d.ts</code> type declarations, and outputs a clean <code>dist/</code> folder ready for npm publishing. The folder structure in <code>dist/</code> mirrors <code>src/lib/</code>, so your exports map can point directly to the output files.</p>
	<p class="prose">The <code>exports</code> field in <code>package.json</code> is a conditions map that tells bundlers and TypeScript where to find each entry point. The <code>"svelte"</code> condition points to the raw <code>.svelte</code> file (so Svelte-aware tools compile it with the consumer's Svelte version), and the <code>"types"</code> condition points to the <code>.d.ts</code> declaration file for IDE support and type checking. This dual-condition approach ensures both optimal compilation and full TypeScript compatibility.</p>
	<p class="prose">Two package.json fields are critical for library consumers: <code>"sideEffects": false</code> enables aggressive tree-shaking so bundlers can safely drop unused components, and <code>"peerDependencies"</code> with Svelte listed ensures consumers use their own Svelte version rather than bundling a duplicate. The <code>"files"</code> field should include only <code>["dist"]</code> to keep the published tarball clean and small.</p>
	<p class="next">Next, you will learn the publishing workflow, semver discipline, and the pre-publish checklist for releasing a Svelte package to npm.</p>
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

	.field-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		inline-size: 100%;
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

	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
