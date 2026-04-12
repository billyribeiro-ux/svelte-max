<script lang="ts">
	import { setContext, getContext } from 'svelte';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { setContext, getContext } from 'svelte';\n" +
		"\n" +
		"	let userName = $state('Alice');\n" +
		"	let theme = $state\u003c'light' | 'dark'\u003e('light');\n" +
		"\n" +
		"	// The context-based solution\n" +
		"	const THEME_KEY = Symbol('theme');\n" +
		"\n" +
		"	setContext(THEME_KEY, {\n" +
		"		get current() { return theme; },\n" +
		"		toggle() { theme = theme === 'light' ? 'dark' : 'light'; }\n" +
		"	});\n" +
		"\n" +
		"	interface ThemeCtx {\n" +
		"		readonly current: 'light' | 'dark';\n" +
		"		toggle: () =\u003e void;\n" +
		"	}\n" +
		"\n" +
		"	function getThemeContext(): ThemeCtx {\n" +
		"		return getContext\u003cThemeCtx\u003e(THEME_KEY);\n" +
		"	}\n" +
		"\n" +
		"	// Simulate reading context in deeply nested component\n" +
		"	const themeCtx = getThemeContext();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.1 — The Prop Drilling Problem\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eProp drilling\u003c/strong\u003e is the pattern of passing data through multiple layers of\n" +
		"		components that don't need it, just so a deeply nested child can access the value.\n" +
		"		This creates fragile, verbose code. \u003cstrong\u003eContext\u003c/strong\u003e solves this by providing\n" +
		"		values to any descendant without explicit prop passing.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Problem: 4 Levels Deep\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Imagine passing \u003ccode\u003euserName\u003c/code\u003e through four nested levels. Each intermediate\n" +
		"		layer must accept and forward the prop even though it doesn't use it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"level\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eLevel 1 — App\u003c/span\u003e\n" +
		"			\u003ccode\u003eprops: userName=\"{userName}\"\u003c/code\u003e\n" +
		"			\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"				\u003cspan class=\"label\"\u003eLevel 2 — Layout\u003c/span\u003e\n" +
		"				\u003ccode\u003eprops: userName=\"{userName}\" (just forwarding)\u003c/code\u003e\n" +
		"				\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"					\u003cspan class=\"label\"\u003eLevel 3 — Sidebar\u003c/span\u003e\n" +
		"					\u003ccode\u003eprops: userName=\"{userName}\" (still forwarding)\u003c/code\u003e\n" +
		"					\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"						\u003cspan class=\"label\"\u003eLevel 4 — UserBadge\u003c/span\u003e\n" +
		"						\u003ccode class=\"highlight\"\u003eFinally uses: {userName}\u003c/code\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Fix: Context\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		With \u003cstrong\u003econtext\u003c/strong\u003e, the top-level component sets a value, and any\n" +
		"		descendant can read it directly. No intermediate prop passing required.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"context-demo\"\u003e\n" +
		"			\u003cp\u003eCurrent theme: \u003cstrong\u003e{themeCtx.current}\u003c/strong\u003e\u003c/p\u003e\n" +
		"			\u003cbutton onclick={() =\u003e themeCtx.toggle()}\u003eToggle Theme\u003c/button\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"level\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"				\u003cspan class=\"label\"\u003eLevel 1 — sets context\u003c/span\u003e\n" +
		"				\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"					\u003cspan class=\"label\"\u003eLevel 2 — no props needed\u003c/span\u003e\n" +
		"					\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"						\u003cspan class=\"label\"\u003eLevel 3 — no props needed\u003c/span\u003e\n" +
		"						\u003cdiv class=\"level nested\" style=\"padding: var(--space-sm);\"\u003e\n" +
		"							\u003cspan class=\"label\"\u003eLevel 4 — reads context directly\u003c/span\u003e\n" +
		"							\u003ccode class=\"highlight\"\u003eTheme: {themeCtx.current}\u003c/code\u003e\n" +
		"						\u003c/div\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove one intermediate prop pass (e.g. skip Level 2) in the drilling example.</strong> The Level 3 component can no longer read <code>userName</code>, proving that every link in the prop chain must be maintained or the data disappears.</li>
		<li><strong>Call <code>getContext</code> with a plain string key like <code>'theme'</code> from a component that is not a descendant of the provider.</strong> The function returns <code>undefined</code> and your template crashes trying to read <code>.current</code> on it, showing that context is strictly tree-scoped.</li>
		<li><strong>Pass a plain value (not a getter-based object) to <code>setContext</code> and then mutate the original variable.</strong> The context consumer never sees the update because context captured the value at set time, not a reactive reference.</li>
		<li><strong>Try calling <code>setContext</code> inside an event handler instead of at the top level of the script.</strong> Svelte throws an error because <code>setContext</code> must be called during component initialisation, not inside callbacks or lifecycle hooks.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Prop drilling forces every intermediate component in a tree to accept and forward data it does not use, creating tight coupling between layers. Adding or renaming a prop requires changes at every level, making refactoring expensive and error-prone in deep component hierarchies.</p>
	<p class="prose">Svelte's <code>setContext</code> and <code>getContext</code> solve this by letting a parent inject a value into the component tree and any descendant read it directly. The intermediate components remain blissfully unaware of the data flowing past them, keeping their interfaces clean and focused.</p>
	<p class="prose">Context is scoped to the component subtree rooted at the provider, which means it cannot leak to siblings or cousins. For reactive context values, pass an object with getters so descendants always read the latest state rather than a stale snapshot captured at initialization time.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-2-context">11.2 — Typed Context Pattern</a> — build collision-proof, type-safe context with Symbol keys.</p>
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
