<script lang="ts">
	import { setContext, getContext } from 'svelte';

	let userName = $state('Alice');
	let theme = $state<'light' | 'dark'>('light');

	// The context-based solution
	const THEME_KEY = Symbol('theme');

	setContext(THEME_KEY, {
		get current() { return theme; },
		toggle() { theme = theme === 'light' ? 'dark' : 'light'; }
	});

	interface ThemeCtx {
		readonly current: 'light' | 'dark';
		toggle: () => void;
	}

	function getThemeContext(): ThemeCtx {
		return getContext<ThemeCtx>(THEME_KEY);
	}

	// Simulate reading context in deeply nested component
	const themeCtx = getThemeContext();
</script>

<section class="page">
	<h1>11.1 — The Prop Drilling Problem</h1>

	<p class="concept">
		<strong>Prop drilling</strong> is the pattern of passing data through multiple layers of
		components that don't need it, just so a deeply nested child can access the value.
		This creates fragile, verbose code. <strong>Context</strong> solves this by providing
		values to any descendant without explicit prop passing.
	</p>

	<h3>The Problem: 4 Levels Deep</h3>
	<p class="concept">
		Imagine passing <code>userName</code> through four nested levels. Each intermediate
		layer must accept and forward the prop even though it doesn't use it.
	</p>

	<div class="build">
		<div class="level" style="padding: var(--space-sm);">
			<span class="label">Level 1 — App</span>
			<code>props: userName="{userName}"</code>
			<div class="level nested" style="padding: var(--space-sm);">
				<span class="label">Level 2 — Layout</span>
				<code>props: userName="{userName}" (just forwarding)</code>
				<div class="level nested" style="padding: var(--space-sm);">
					<span class="label">Level 3 — Sidebar</span>
					<code>props: userName="{userName}" (still forwarding)</code>
					<div class="level nested" style="padding: var(--space-sm);">
						<span class="label">Level 4 — UserBadge</span>
						<code class="highlight">Finally uses: {userName}</code>
					</div>
				</div>
			</div>
		</div>
	</div>

	<h3>The Fix: Context</h3>
	<p class="concept">
		With <strong>context</strong>, the top-level component sets a value, and any
		descendant can read it directly. No intermediate prop passing required.
	</p>

	<div class="build">
		<div class="context-demo">
			<p>Current theme: <strong>{themeCtx.current}</strong></p>
			<button onclick={() => themeCtx.toggle()}>Toggle Theme</button>

			<div class="level" style="padding: var(--space-sm);">
				<span class="label">Level 1 — sets context</span>
				<div class="level nested" style="padding: var(--space-sm);">
					<span class="label">Level 2 — no props needed</span>
					<div class="level nested" style="padding: var(--space-sm);">
						<span class="label">Level 3 — no props needed</span>
						<div class="level nested" style="padding: var(--space-sm);">
							<span class="label">Level 4 — reads context directly</span>
							<code class="highlight">Theme: {themeCtx.current}</code>
						</div>
					</div>
				</div>
			</div>
		</div>

		<label class="input-label">
			Change user name:
			<input type="text" bind:value={userName} />
		</label>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Prop drilling forces every intermediate component to know about data it doesn't use</li>
		<li>Adding or removing a prop requires changes at every level</li>
		<li><code>setContext</code> / <code>getContext</code> skip intermediate layers entirely</li>
		<li>Context is scoped to the component tree — it won't leak to unrelated components</li>
	</ul>

	<h3>What you learned</h3>
	<ul>
		<li>Prop drilling passes data through intermediate components that do not use it, creating fragile code.</li>
		<li><code>setContext</code> and <code>getContext</code> let any descendant read shared state without props.</li>
		<li>Context is scoped to the component subtree, preventing leakage to unrelated parts of the app.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.level {
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		margin-block-start: var(--space-xs);
	}
	.level.nested {
		margin-inline-start: var(--space-md);
	}
	.label {
		font-weight: 600;
		font-size: 0.85em;
		color: var(--color-text-muted);
	}
	.highlight {
		background: var(--color-primary);
		color: var(--color-surface-1);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
	}
	button {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
	}
	input {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.input-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: 0.9em;
		color: var(--color-text-muted);
	}
</style>
