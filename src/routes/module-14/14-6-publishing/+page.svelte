<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface CheckItem {
		id: string;
		label: string;
		checked: boolean;
	}

	let checklist = $state<CheckItem[]>([
		{ id: 'types', label: 'TypeScript declarations generated and exports map includes "types" condition', checked: false },
		{ id: 'peer', label: 'svelte listed as peerDependency, not dependency', checked: false },
		{ id: 'sideeffects', label: '"sideEffects": false set for tree-shaking', checked: false },
		{ id: 'esm', label: '"type": "module" in package.json', checked: false },
		{ id: 'no-kit', label: 'No SvelteKit-specific imports ($app/*, $env/*) in library code', checked: false },
		{ id: 'esm-env', label: 'Using esm-env for environment checks instead of import.meta.env', checked: false },
		{ id: 'files', label: '"files" field includes only "dist" (no src leakage)', checked: false },
		{ id: 'readme', label: 'README.md with install instructions and API docs', checked: false },
		{ id: 'license', label: 'LICENSE file present', checked: false },
		{ id: 'changelog', label: 'CHANGELOG.md updated with version notes', checked: false },
		{ id: 'semver', label: 'Version bumped following semver rules', checked: false },
		{ id: 'test', label: 'All tests pass', checked: false },
		{ id: 'build', label: 'svelte-package builds without errors', checked: false },
		{ id: 'dry-run', label: 'npm publish --dry-run reviewed (no extra files)', checked: false },
	]);

	let completedCount = $derived(checklist.filter(item => item.checked).length);
	let allDone = $derived(completedCount === checklist.length);

	function toggleItem(id: string) {
		checklist = checklist.map(item =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
	}

	function resetChecklist() {
		checklist = checklist.map(item => ({ ...item, checked: false }));
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface CheckItem {\n" +
		"		id: string;\n" +
		"		label: string;\n" +
		"		checked: boolean;\n" +
		"	}\n" +
		"\n" +
		"	let checklist = $state\u003cCheckItem[]\u003e([\n" +
		"		{ id: 'types', label: 'TypeScript declarations generated and exports map includes \"types\" condition', checked: false },\n" +
		"		{ id: 'peer', label: 'svelte listed as peerDependency, not dependency', checked: false },\n" +
		"		{ id: 'sideeffects', label: '\"sideEffects\": false set for tree-shaking', checked: false },\n" +
		"		{ id: 'esm', label: '\"type\": \"module\" in package.json', checked: false },\n" +
		"		{ id: 'no-kit', label: 'No SvelteKit-specific imports ($app/*, $env/*) in library code', checked: false },\n" +
		"		{ id: 'esm-env', label: 'Using esm-env for environment checks instead of import.meta.env', checked: false },\n" +
		"		{ id: 'files', label: '\"files\" field includes only \"dist\" (no src leakage)', checked: false },\n" +
		"		{ id: 'readme', label: 'README.md with install instructions and API docs', checked: false },\n" +
		"		{ id: 'license', label: 'LICENSE file present', checked: false },\n" +
		"		{ id: 'changelog', label: 'CHANGELOG.md updated with version notes', checked: false },\n" +
		"		{ id: 'semver', label: 'Version bumped following semver rules', checked: false },\n" +
		"		{ id: 'test', label: 'All tests pass', checked: false },\n" +
		"		{ id: 'build', label: 'svelte-package builds without errors', checked: false },\n" +
		"		{ id: 'dry-run', label: 'npm publish --dry-run reviewed (no extra files)', checked: false },\n" +
		"	]);\n" +
		"\n" +
		"	let completedCount = $derived(checklist.filter(item =\u003e item.checked).length);\n" +
		"	let allDone = $derived(completedCount === checklist.length);\n" +
		"\n" +
		"	function toggleItem(id: string) {\n" +
		"		checklist = checklist.map(item =\u003e\n" +
		"			item.id === id ? { ...item, checked: !item.checked } : item\n" +
		"		);\n" +
		"	}\n" +
		"\n" +
		"	function resetChecklist() {\n" +
		"		checklist = checklist.map(item =\u003e ({ ...item, checked: false }));\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e14.6 — Publishing and Versioning\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Once your library is built with \u003ccode\u003esvelte-package\u003c/code\u003e, publishing to npm is\n" +
		"		straightforward. The key challenges are \u003cstrong\u003esemver discipline\u003c/strong\u003e, avoiding\n" +
		"		SvelteKit-specific imports, and ensuring your package works for all consumers.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003ePublishing Commands\u003c/h3\u003e\n" +
		"	\u003cpre\u003e{`# Build the package\n" +
		"npx svelte-package\n" +
		"\n" +
		"# Preview what will be published\n" +
		"npm publish --dry-run\n" +
		"\n" +
		"# Publish (requires npm login)\n" +
		"npm publish\n" +
		"\n" +
		"# Publish a scoped package as public\n" +
		"npm publish --access public`}\u003c/pre\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSemver for Component Libraries\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Semantic versioning (\u003cstrong\u003esemver\u003c/strong\u003e) communicates the nature of changes to consumers.\n" +
		"		For component libraries, the boundaries are specific:\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"semver-row major\"\u003e\n" +
		"			\u003cstrong\u003eMajor (X.0.0)\u003c/strong\u003e — Breaking changes\n" +
		"			\u003cul\u003e\n" +
		"				\u003cli\u003eRemoving or renaming an exported component\u003c/li\u003e\n" +
		"				\u003cli\u003eChanging a required prop name or type\u003c/li\u003e\n" +
		"				\u003cli\u003eRemoving a CSS custom property consumers depend on\u003c/li\u003e\n" +
		"				\u003cli\u003eChanging the custom element tag name\u003c/li\u003e\n" +
		"				\u003cli\u003eDropping support for a Svelte version\u003c/li\u003e\n" +
		"			\u003c/ul\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"semver-row minor\"\u003e\n" +
		"			\u003cstrong\u003eMinor (0.X.0)\u003c/strong\u003e — New features\n" +
		"			\u003cul\u003e\n" +
		"				\u003cli\u003eAdding a new component or export\u003c/li\u003e\n" +
		"				\u003cli\u003eAdding an optional prop with a default\u003c/li\u003e\n" +
		"				\u003cli\u003eAdding new slots or snippets\u003c/li\u003e\n" +
		"				\u003cli\u003eAdding new CSS custom properties\u003c/li\u003e\n" +
		"			\u003c/ul\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"semver-row patch\"\u003e\n" +
		"			\u003cstrong\u003ePatch (0.0.X)\u003c/strong\u003e — Bug fixes\n" +
		"			\u003cul\u003e\n" +
		"				\u003cli\u003eFixing a rendering bug\u003c/li\u003e\n" +
		"				\u003cli\u003eFixing a TypeScript type error\u003c/li\u003e\n" +
		"				\u003cli\u003eFixing accessibility issues\u003c/li\u003e\n" +
		"				\u003cli\u003ePerformance improvements with no API change\u003c/li\u003e\n" +
		"			\u003c/ul\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>14.6 — Publishing and Versioning</h1>

	<p class="concept">
		Once your library is built with <code>svelte-package</code>, publishing to npm is
		straightforward. The key challenges are <strong>semver discipline</strong>, avoiding
		SvelteKit-specific imports, and ensuring your package works for all consumers.
	</p>

	<h3>Publishing Commands</h3>
	<pre>{`# Build the package
npx svelte-package

# Preview what will be published
npm publish --dry-run

# Publish (requires npm login)
npm publish

# Publish a scoped package as public
npm publish --access public`}</pre>

	<h3>Semver for Component Libraries</h3>
	<p class="concept">
		Semantic versioning (<strong>semver</strong>) communicates the nature of changes to consumers.
		For component libraries, the boundaries are specific:
	</p>

	<div class="build">
		<div class="semver-row major">
			<strong>Major (X.0.0)</strong> — Breaking changes
			<ul>
				<li>Removing or renaming an exported component</li>
				<li>Changing a required prop name or type</li>
				<li>Removing a CSS custom property consumers depend on</li>
				<li>Changing the custom element tag name</li>
				<li>Dropping support for a Svelte version</li>
			</ul>
		</div>

		<div class="semver-row minor">
			<strong>Minor (0.X.0)</strong> — New features
			<ul>
				<li>Adding a new component or export</li>
				<li>Adding an optional prop with a default</li>
				<li>Adding new slots or snippets</li>
				<li>Adding new CSS custom properties</li>
			</ul>
		</div>

		<div class="semver-row patch">
			<strong>Patch (0.0.X)</strong> — Bug fixes
			<ul>
				<li>Fixing a rendering bug</li>
				<li>Fixing a TypeScript type error</li>
				<li>Fixing accessibility issues</li>
				<li>Performance improvements with no API change</li>
			</ul>
		</div>
	</div>

	<h3>Best Practices</h3>
	<ul>
		<li>Use <code>esm-env</code> for <code>BROWSER</code> / <code>DEV</code> checks instead of <code>import.meta.env</code></li>
		<li>Never import from <code>$app/*</code> or <code>$env/*</code> — those are SvelteKit-only</li>
		<li>Test your package in a clean project with <code>npm pack</code> + <code>npm install ./tarball.tgz</code></li>
		<li>Use <code>publint</code> to catch common packaging mistakes</li>
		<li>Consider <code>changesets</code> for automated version management in monorepos</li>
	</ul>

	<h3>Publishing Checklist</h3>
	<div class="build">
		<div class="checklist-header">
			<span class="progress">{completedCount} / {checklist.length} complete</span>
			<button class="reset-btn" onclick={resetChecklist}>Reset</button>
		</div>

		<div class="progress-bar">
			<div
				class="progress-fill"
				style="width: {(completedCount / checklist.length) * 100}%"
			></div>
		</div>

		{#each checklist as item}
			<label class="check-item">
				<input
					type="checkbox"
					checked={item.checked}
					onchange={() => toggleItem(item.id)}
				/>
				<span class:done={item.checked}>{item.label}</span>
			</label>
		{/each}

		{#if allDone}
			<div class="ready-banner">
				Ready to publish. Run <code>npm publish --access public</code>.
			</div>
		{/if}
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment simulates a publishing mistake. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Import <code>$app/environment</code> in a library component.</strong> The library compiles fine in your SvelteKit project, but consumers who install it from npm get a "Cannot resolve <code>$app/environment</code>" error because <code>$app/*</code> modules are SvelteKit-only virtual imports. Library code must use <code>esm-env</code> for environment checks instead.</li>
		<li><strong>Bump the version by a patch (0.0.X) when you have actually renamed a prop.</strong> Consumers who update get a breaking change they did not expect. Their code passes a prop name that no longer exists, causing silent failures or runtime errors. This is why semver discipline matters: renaming a prop is a major (X.0.0) change, not a patch.</li>
		<li><strong>Run <code>npm publish</code> without running <code>svelte-package</code> first.</strong> The <code>dist/</code> folder is stale or missing. Consumers install the package and get either an outdated version or missing files. The <code>prepublishOnly</code> script should run <code>svelte-package</code> automatically, but forgetting to configure it leads to this exact mistake.</li>
		<li><strong>Skip <code>npm publish --dry-run</code> and publish directly.</strong> You miss that the tarball includes a 50MB test fixture directory or a <code>.env</code> file with secrets. The dry run lists every file that will be published, giving you a chance to catch mistakes before they become permanent. Once published, an npm version cannot be unpublished after 72 hours.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Publishing a Svelte library to npm requires semver discipline and a pre-publish checklist. Major versions (X.0.0) signal breaking changes like renamed props, removed components, or dropped Svelte version support. Minor versions (0.X.0) add new features like additional components or optional props. Patch versions (0.0.X) fix bugs without changing the API surface. Misclassifying a breaking change as a patch erodes consumer trust and causes unexpected build failures.</p>
	<p class="prose">Library code must avoid SvelteKit-specific imports (<code>$app/*</code>, <code>$env/*</code>) because they only exist inside a SvelteKit project. Consumers of your npm package may use Vite, Rollup, or another bundler that does not provide these virtual modules. Use <code>esm-env</code> for <code>BROWSER</code> and <code>DEV</code> checks instead. Run <code>publint</code> to catch common packaging mistakes, and test the package in a clean project with <code>npm pack</code> followed by <code>npm install ./tarball.tgz</code> to verify it works outside your monorepo.</p>
	<p class="prose">The publishing workflow is: build with <code>svelte-package</code>, review with <code>npm publish --dry-run</code>, verify the tarball contents, and publish with <code>npm publish --access public</code> for scoped packages. Automate the build step with a <code>prepublishOnly</code> script. For monorepos and teams, consider <code>changesets</code> for automated version management and changelogs. The interactive checklist in this lesson codifies every step so nothing is forgotten.</p>
	<p class="next">Next, you will apply everything from this module in the custom elements project to build and package a complete Svelte component library.</p>
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

	.semver-row {
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border-left: 4px solid;
	}
	.major { border-color: var(--color-error); background: var(--color-surface-2); }
	.minor { border-color: var(--color-warning); background: var(--color-surface-2); }
	.patch { border-color: var(--color-success); background: var(--color-surface-2); }

	.checklist-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.progress { font-weight: 600; color: var(--color-text); }
	.reset-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-sm);
	}

	.progress-bar {
		height: 0.5rem;
		background: var(--color-surface-2);
		border-radius: var(--radius-xs);
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-xs);
		transition: width 0.3s ease;
	}

	.check-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.check-item input[type="checkbox"] { margin-block-start: 0.25rem; flex-shrink: 0; }
	.done { text-decoration: line-through; opacity: 0.6; }

	.ready-banner {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-success);
		border-radius: var(--radius-md);
		text-align: center;
		color: var(--color-success);
		font-weight: 600;
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
