<script lang="ts">
	import { createContext } from 'svelte';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	// Typed context created with createContext (Svelte 5.40+)
	interface ThemeState {
		readonly mode: 'light' | 'dark';
		readonly accent: string;
	}

	// createContext returns a typed [get, set] tuple — no keys, no collisions
	const [getTheme, setTheme] = createContext<ThemeState>();

	// Parent owns the reactive state
	let mode = $state<'light' | 'dark'>('light');
	let accent = $state('#7c3aed');

	// Pass a getter-based object so descendants always see current state
	setTheme({
		get mode() { return mode; },
		get accent() { return accent; }
	});

	// A descendant reads context — no props, no prop-drilling
	const theme = getTheme();

	function toggleMode() {
		mode = mode === 'light' ? 'dark' : 'light';
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { createContext } from 'svelte';\n" +
		"\n" +
		"	// Typed context created with createContext (Svelte 5.40+)\n" +
		"	interface ThemeState {\n" +
		"		readonly mode: 'light' | 'dark';\n" +
		"		readonly accent: string;\n" +
		"	}\n" +
		"\n" +
		"	// createContext returns a typed [get, set] tuple \u2014 no keys, no collisions\n" +
		"	const [getTheme, setTheme] = createContext\u003cThemeState\u003e();\n" +
		"\n" +
		"	// Parent owns the reactive state\n" +
		"	let mode = $state\u003c'light' | 'dark'\u003e('light');\n" +
		"	let accent = $state('#7c3aed');\n" +
		"\n" +
		"	// Pass a getter-based object so descendants always see current state\n" +
		"	setTheme({\n" +
		"		get mode() { return mode; },\n" +
		"		get accent() { return accent; }\n" +
		"	});\n" +
		"\n" +
		"	// A descendant reads context \u2014 no props, no prop-drilling\n" +
		"	const theme = getTheme();\n" +
		"\n" +
		"	function toggleMode() {\n" +
		"		mode = mode === 'light' ? 'dark' : 'light';\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.2 — Typed Context Pattern\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003ecreateContext\u003c/strong\u003e (since 5.40) returns a typed \u003ccode\u003e[get, set]\u003c/code\u003e tuple.\n" +
		"		It replaces the legacy \u003ccode\u003esetContext\u003c/code\u003e/\u003ccode\u003egetContext\u003c/code\u003e pair and eliminates\n" +
		"		the need for string or Symbol keys — the tuple itself is the key, so collisions are impossible.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Pattern\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003eimport &#123; createContext &#125; from 'svelte';\n" +
		"\n" +
		"interface ThemeState &#123;\n" +
		"  readonly mode: 'light' | 'dark';\n" +
		"  readonly accent: string;\n" +
		"&#125;\n" +
		"\n" +
		"export const [getTheme, setTheme] = createContext&lt;ThemeState&gt;();\u003c/code\u003e\u003c/pre\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			TypeScript narrows \u003ccode\u003egetTheme()\u003c/code\u003e to return \u003ccode\u003eThemeState\u003c/code\u003e and\n" +
		"			\u003ccode\u003esetTheme(v)\u003c/code\u003e to require that exact shape — mismatches fail at compile time.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003cbutton onclick={toggleMode}\u003e\n" +
		"				Toggle Mode: {mode}\n" +
		"			\u003c/button\u003e\n" +
		"			\u003clabel class=\"color-picker\"\u003e\n" +
		"				Accent:\n" +
		"				\u003cinput type=\"color\" bind:value={accent} /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003c!-- Simulating deeply nested component tree --\u003e\n" +
		"		\u003cdiv class=\"tree\"\u003e\n" +
		"			\u003cdiv class=\"node parent\"\u003e\n" +
		"				\u003cspan class=\"node-label\"\u003eParent (sets context)\u003c/span\u003e\n" +
		"				\u003cdiv class=\"node child\"\u003e\n" +
		"					\u003cspan class=\"node-label\"\u003eChild (no props)\u003c/span\u003e\n" +
		"					\u003cdiv class=\"node grandchild\"\u003e\n" +
		"						\u003cspan class=\"node-label\"\u003eGrandchild (reads context)\u003c/span\u003e\n" +
		"						\u003cdiv\n" +
		"							class=\"theme-preview\"\n" +
		"							style:background={theme.mode === 'dark' ? '#1a1a2e' : '#f8f9fa'}\n" +
		"							style:color={theme.mode === 'dark' ? '#e0e0e0' : '#1a1a2e'}\n" +
		"							style:border-color={theme.accent}\n" +
		"						\u003e\n" +
		"							\u003cp\u003eMode: \u003cstrong\u003e{theme.mode}\u003c/strong\u003e\u003c/p\u003e\n" +
		"							\u003cp\u003eAccent: \u003cspan style:color={theme.accent}\u003e{theme.accent}\u003c/span\u003e\u003c/p\u003e\n" +
		"						\u003c/div\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eModern Alternative: Svelte 5.40+\u003c/h3\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>11.2 — Typed Context with <code>createContext</code></h1>

	<p class="concept">
		<strong><code>createContext</code></strong> (since Svelte 5.40) returns a typed <code>[get, set]</code> tuple.
		It replaces the legacy <code>setContext</code>/<code>getContext</code> pair and eliminates
		the need for string or Symbol keys — the tuple itself is the key, so collisions are impossible.
	</p>

	<h3>The Pattern</h3>
	<div class="build">
		<pre><code>import &#123; createContext &#125; from 'svelte';

interface ThemeState &#123;
  readonly mode: 'light' | 'dark';
  readonly accent: string;
&#125;

export const [getTheme, setTheme] = createContext&lt;ThemeState&gt;();</code></pre>
		<p class="concept">
			TypeScript narrows <code>getTheme()</code> to return <code>ThemeState</code> and
			<code>setTheme(v)</code> to require that exact shape — mismatches fail at compile time.
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

	<h3>Legacy alternative (Svelte 5.0 – 5.39)</h3>
	<p class="concept">
		Before 5.40, you had to use <code>setContext(key, value)</code> / <code>getContext&lt;T&gt;(key)</code>
		with a <code>Symbol()</code> key to avoid collisions. <code>createContext</code> is preferred
		because it provides better type safety and eliminates keys entirely.
	</p>

	<h3>Key Takeaways</h3>
	<ul>
		<li><code>createContext&lt;T&gt;()</code> returns a typed <code>[get, set]</code> tuple — no keys required</li>
		<li>Each <code>createContext()</code> call creates a unique context — collisions are impossible</li>
		<li>Context is set during parent initialization; descendants read it with <code>get()</code></li>
		<li>Pass a getter-based object to keep context values reactive across updates</li>
		<li>Scopes state per-request — safe for SSR (unlike module-level <code>$state</code>)</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Call <code>getTheme()</code> in a parent component that never calls <code>setTheme()</code>.</strong> It throws at runtime because no provider exists — <code>createContext</code>'s getter requires a matching setter higher in the tree.</li>
		<li><strong>Remove the getter syntax from the context value (use a plain <code>&#123; mode, accent &#125;</code> object instead of <code>&#123; get mode() &#123; return mode &#125; &#125;</code>).</strong> The grandchild reads the initial value but never sees updates when you toggle, proving that reactive context requires getter-based objects.</li>
		<li><strong>Call <code>getTheme()</code> in a module-level <code>.ts</code> file outside the component tree.</strong> It throws because <code>createContext</code>'s getter only works during Svelte's component initialization phase.</li>
		<li><strong>Pass a shape that doesn't match <code>ThemeState</code> to <code>setTheme()</code>.</strong> TypeScript refuses to compile — the <code>&lt;ThemeState&gt;</code> type parameter enforces the contract at both the setter and getter sides.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>createContext&lt;T&gt;()</code> returns a typed <code>[get, set]</code> tuple that owns its own unique context identity. Every call to <code>createContext()</code> produces a fresh tuple, so two independent contexts can never accidentally collide — you simply can't call the wrong getter with the wrong setter because they come as a pair.</p>
	<p class="prose">Making the context value reactive requires passing an object with getter properties rather than plain values. Getters are evaluated lazily at read time, so when a descendant accesses <code>theme.mode</code> inside the template, Svelte tracks the underlying <code>$state</code> variable and re-renders when it changes.</p>
	<p class="prose">Context is the canonical pattern for sharing reactive state across a component subtree — especially important in SvelteKit, where module-level <code>$state</code> can leak between requests during SSR. Because context is scoped to a component tree (and therefore a request), it is always safe.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-3-svelte-ts">11.3 — Universal Reactive State</a> — use <code>$state</code> at the module level in <code>.svelte.ts</code> files.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

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
		inline-size: 2.5rem;
		block-size: 2rem;
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
