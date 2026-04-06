<script lang="ts">
	import { setContext, getContext } from 'svelte';

	// Typed ThemeContext factory using Symbol key
	interface ThemeState {
		mode: 'light' | 'dark';
		accent: string;
	}

	function createThemeContext() {
		const key = Symbol('theme');
		return {
			set: (v: ThemeState) => setContext(key, v),
			get: () => getContext<ThemeState>(key)
		};
	}

	const ThemeContext = createThemeContext();

	// Parent sets context
	let mode = $state<'light' | 'dark'>('light');
	let accent = $state('#7c3aed');

	// We use a getter-based object so context always reflects current state
	ThemeContext.set({
		get mode() { return mode; },
		get accent() { return accent; }
	});

	// Deeply nested child reads context
	const theme = ThemeContext.get();

	function toggleMode() {
		mode = mode === 'light' ? 'dark' : 'light';
	}
</script>

<section class="page">
	<h1>11.2 — Typed Context Pattern</h1>

	<p class="concept">
		The <strong>typed context pattern</strong> uses a factory function with a <code>Symbol</code> key
		to create type-safe context accessors. This prevents key collisions and gives you full
		TypeScript inference on both the setter and getter sides.
	</p>

	<h3>The Pattern</h3>
	<div class="build">
		<pre><code>function createThemeContext() &#123;
  const key = Symbol('theme');
  return &#123;
    set: (v: ThemeState) =&gt; setContext(key, v),
    get: () =&gt; getContext&lt;ThemeState&gt;(key)
  &#125;;
&#125;</code></pre>
		<p class="concept">
			Using <code>Symbol()</code> as the key guarantees uniqueness — no two contexts
			can accidentally collide, even if they share the same string description.
		</p>
	</div>

	<h3>Live Demo</h3>
	<div class="build">
		<div class="controls">
			<button onclick={toggleMode}>
				Toggle Mode: {mode}
			</button>
			<label class="color-picker">
				Accent:
				<input type="color" bind:value={accent} />
			</label>
		</div>

		<!-- Simulating deeply nested component tree -->
		<div class="tree">
			<div class="node parent">
				<span class="node-label">Parent (sets context)</span>
				<div class="node child">
					<span class="node-label">Child (no props)</span>
					<div class="node grandchild">
						<span class="node-label">Grandchild (reads context)</span>
						<div
							class="theme-preview"
							style:background={theme.mode === 'dark' ? '#1a1a2e' : '#f8f9fa'}
							style:color={theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e'}
							style:border-color={theme.accent}
						>
							<p>Mode: <strong>{theme.mode}</strong></p>
							<p>Accent: <span style:color={theme.accent}>{theme.accent}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<h3>Modern Alternative: Svelte 5.40+</h3>
	<p class="concept">
		Svelte 5.40 introduced a built-in <code>createContext</code> helper that works
		similarly to this pattern. However, the manual <code>setContext</code> / <code>getContext</code>
		approach shown above works across <strong>all Svelte 5.x versions</strong> and gives
		you full control over the typing and key strategy.
	</p>

	<h3>Key Takeaways</h3>
	<ul>
		<li><code>Symbol()</code> keys prevent accidental collisions between contexts</li>
		<li>The factory pattern gives you a typed <code>[set, get]</code> pair</li>
		<li>Context is set during component initialization and read by any descendant</li>
		<li>Context values can be reactive objects — descendants see updates automatically</li>
		<li>Use <code>setContext</code>/<code>getContext</code> for maximum compatibility across Svelte 5.x</li>
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

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.controls {
		display: flex;
		gap: var(--space-md);
		align-items: center;
		flex-wrap: wrap;
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
	.color-picker {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: 0.9em;
		color: var(--color-text-muted);
	}
	.color-picker input {
		width: 2.5rem;
		height: 2rem;
		border: none;
		cursor: pointer;
		background: none;
	}
	.tree {
		padding: var(--space-sm);
	}
	.node {
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		margin-block-start: var(--space-xs);
	}
	.child {
		margin-inline-start: var(--space-md);
	}
	.grandchild {
		margin-inline-start: var(--space-md);
	}
	.node-label {
		font-size: 0.85em;
		font-weight: 600;
		color: var(--color-text-muted);
	}
	.theme-preview {
		margin-block-start: var(--space-sm);
		padding: var(--space-md);
		border: 2px solid;
		border-radius: var(--radius-md);
		transition: all 0.3s ease;
	}
	.theme-preview p {
		margin: 0;
		font-size: 0.9em;
	}
</style>
