<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	// $inspect logs reactive values to the console whenever they change.
	// It's stripped from production builds — a dev-only debugging tool.
	let count = $state(0);
	let user = $state({ name: 'Ada', role: 'admin' });
	let logs = $state<string[]>([]);

	// Basic $inspect — logs to console on every change (deep)
	$inspect(count);

	// Multiple values logged together
	$inspect(count, user);

	// $inspect(...).with() — custom callback instead of console.log
	$inspect(count, user).with((type, count, user) => {
		const stamp = new Date().toISOString().slice(11, 19);
		logs = [
			`[${stamp}] ${type}: count=${count} role=${user.role}`,
			...logs
		].slice(0, 8);
	});

	// $inspect.trace — added in 5.14, traces WHICH state caused a function to re-run
	const double = $derived.by(() => {
		$inspect.trace('double-derived');
		return count * 2;
	});

	function increment() {
		count += 1;
	}

	function promote() {
		user.role = user.role === 'admin' ? 'user' : 'admin';
	}

	function rename() {
		user.name = user.name === 'Ada' ? 'Grace' : 'Ada';
	}

	function clearLogs() {
		logs = [];
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let count = $state(0);\n" +
		"let user = $state({ name: 'Ada', role: 'admin' });\n" +
		"\n" +
		"// Basic $inspect \u2014 logs on every change (deep)\n" +
		"$inspect(count);\n" +
		"\n" +
		"// Multiple values\n" +
		"$inspect(count, user);\n" +
		"\n" +
		"// Custom callback with .with()\n" +
		"$inspect(count, user).with((type, count, user) =\u003e {\n" +
		"  if (type === 'update') console.trace('state change');\n" +
		"});\n" +
		"\n" +
		"// $inspect.trace \u2014 which state caused this function to re-run?\n" +
		"const double = $derived.by(() =\u003e {\n" +
		"  $inspect.trace('double-derived');\n" +
		"  return count * 2;\n" +
		"});\n" +
		"\u003c/script\u003e\n";
</script>

<section class="page">
	<h1>2.17 — <code>$inspect</code> &amp; <code>$inspect.trace</code></h1>

	<p class="concept">
		<code>$inspect</code> is Svelte's built-in reactive debugger. It's like <code>console.log</code>,
		but it re-runs automatically whenever any of its arguments change — including deep mutations
		inside objects and arrays. In production builds it becomes a no-op, so you can leave it in
		your code without performance or bundle-size penalty. Paired with <code>$inspect.trace()</code>
		(since 5.14), you can also trace <em>which</em> reactive dependency caused an effect or derived
		to fire.
	</p>

	<h3>The three forms</h3>
	<div class="build">
		<pre><code>// 1. Log on change (deep)
$inspect(count);

// 2. Log multiple values together
$inspect(count, user);

// 3. Custom callback instead of console.log
$inspect(count, user).with((type, count, user) => &#123;
  if (type === 'update') debugger;
&#125;);

// 4. Trace dependencies of an effect or derived (5.14+)
$effect(() => &#123;
  $inspect.trace('my-effect'); // must be first statement
  doWork();
&#125;);</code></pre>
		<p class="concept">
			<code>type</code> is either <code>'init'</code> (first run) or <code>'update'</code>
			(subsequent changes). Use <code>$inspect.trace</code> when a function re-runs more than
			you expected — the console will show the exact reactive dependency that triggered it.
		</p>
	</div>

	<h3>Live demo</h3>
	<p class="note">Open DevTools → Console. Every button click logs to both the console (via
		<code>$inspect</code>) and this on-page log (via <code>.with()</code>).</p>

	<div class="build">
		<div class="stats">
			<div class="stat">
				<span class="label">count</span>
				<span class="value">{count}</span>
			</div>
			<div class="stat">
				<span class="label">double (derived)</span>
				<span class="value">{double}</span>
			</div>
			<div class="stat">
				<span class="label">user.name</span>
				<span class="value">{user.name}</span>
			</div>
			<div class="stat">
				<span class="label">user.role</span>
				<span class="value">{user.role}</span>
			</div>
		</div>

		<div class="controls">
			<button type="button" onclick={increment}>count++</button>
			<button type="button" onclick={rename}>toggle name</button>
			<button type="button" onclick={promote}>toggle role</button>
			<button type="button" class="ghost" onclick={clearLogs}>clear log</button>
		</div>

		<div class="log" aria-label="Inspect log">
			<h4>Captured by <code>.with()</code></h4>
			{#if logs.length === 0}
				<p class="empty">Click a button to trigger a state change.</p>
			{:else}
				<ul>
					{#each logs as line (line)}
						<li><code>{line}</code></li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	<h3>Production-safe by design</h3>
	<p class="prose">
		Every <code>$inspect</code> call is stripped from production builds at compile time — they
		become literal no-ops. You can scatter them across your codebase during development and
		ship without cleanup. Compare this to <code>console.log</code>, which has to be manually
		removed (or filtered with a linter rule) before release.
	</p>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what happens, then revert.</p>
	<ol class="experiments">
		<li><strong>Wrap a plain (non-reactive) <code>let x = 0</code> with <code>$inspect(x)</code>.</strong> Svelte warns that <code>$inspect</code> only tracks reactive state — without <code>$state</code>, the value never changes from Svelte's perspective and <code>$inspect</code> only fires once, on init.</li>
		<li><strong>Mutate a nested property like <code>user.name = 'x'</code>.</strong> <code>$inspect(user)</code> fires because <code>$inspect</code> tracks <strong>deeply</strong>. Compare to <code>$effect(() => user)</code>, which only fires when <code>user</code> itself is reassigned — <code>$inspect</code> is the go-to tool for debugging deep state mutations.</li>
		<li><strong>Put <code>$inspect.trace()</code> <em>after</em> the first statement of a <code>$derived.by</code> or <code>$effect</code>.</strong> The trace produces no output — <code>$inspect.trace</code> must be the <em>first</em> statement because it installs the tracing hook before the function body runs.</li>
		<li><strong>Build the app with <code>pnpm build</code> and grep the output for <code>$inspect</code>.</strong> It's gone. The compiler strips <code>$inspect</code> calls entirely from production bundles — zero runtime, zero bytes.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>$inspect</code> is the canonical Svelte 5 debugging rune. It's like <code>console.log</code> but reactive — it fires on every change to its arguments, tracks deeply into objects and arrays, and disappears from production builds. Use it instead of <code>console.log</code> any time you want to watch a reactive value change.</p>
	<p class="prose"><code>$inspect(...).with(callback)</code> gives you full control over what happens on each log — swap in <code>debugger</code> to break in DevTools, <code>console.trace</code> to see the call stack, or a custom handler to route to a logging service. The callback receives <code>'init'</code> or <code>'update'</code> as its first argument plus the inspected values.</p>
	<p class="prose"><code>$inspect.trace(label)</code> answers the debugging question "why did this function re-run?" It must be the first statement inside <code>$effect</code> or <code>$derived.by</code>. The console output names the exact reactive dependency that triggered the run — essential when tracking down unexpected reactive cascades.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-2/project">Module 2 Project — Interactive Dashboard</a> — integrate every rune you've learned.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; }

	.concept { font-size: var(--text-base); line-height: 1.6; color: var(--color-text-muted); margin: 0; }
	.concept code, .concept strong { color: var(--color-text); }

	.note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; font-style: italic; }

	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }

	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; line-height: 1.5; }
	pre code { background: transparent; padding: 0; font-size: inherit; }

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: var(--space-sm);
	}
	.stat {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.stat .label { font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em; }
	.stat .value { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); font-variant-numeric: tabular-nums; font-family: var(--font-mono); }

	.controls { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
	.controls button {
		font: inherit;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: var(--color-surface);
		cursor: pointer;
		font-weight: 600;
		transition: background var(--dur-base) var(--ease-out);
	}
	.controls button:hover { background: color-mix(in oklch, var(--color-brand) 85%, black); }
	.controls button.ghost { background: transparent; color: var(--color-text-muted); }
	.controls button.ghost:hover { background: var(--color-surface-1); color: var(--color-text); }

	.log {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.log h4 { margin: 0 0 var(--space-sm); font-size: var(--text-sm); color: var(--color-text-muted); font-weight: 600; }
	.log ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-xs); max-block-size: 14rem; overflow: auto; }
	.log li { font-size: var(--text-xs); }
	.log li code { display: block; background: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); }
	.log .empty { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); font-style: italic; }

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary { padding: var(--space-md) var(--space-lg); font-weight: 700; font-size: var(--text-base); color: var(--color-warning); background: var(--color-surface-1); cursor: pointer; }
		& > p { padding: var(--space-sm) var(--space-lg); margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }
	}

	@media (min-inline-size: 768px) {
		.page { padding: var(--space-2xl); }
		h1 { font-size: var(--text-hero); }
	}
</style>
