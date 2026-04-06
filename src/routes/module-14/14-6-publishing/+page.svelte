<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>Follow semver: major for breaking changes, minor for new features, patch for bug fixes.</li>
		<li>Avoid <code>$app/*</code> and <code>$env/*</code> imports in library code — they are SvelteKit-only.</li>
		<li>Use <code>npm publish --dry-run</code> and <code>publint</code> to catch packaging mistakes before publishing.</li>
		<li>Test your package in a clean project with <code>npm pack</code> to verify it works outside your repo.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
