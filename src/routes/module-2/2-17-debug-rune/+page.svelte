<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let count = $state(0);
	let items = $state<string[]>(['apple', 'banana']);
	let newItem = $state('');

	function increment() {
		count += 1;
	}

	function addItem() {
		if (newItem.trim()) {
			items = [...items, newItem.trim()];
			newItem = '';
		}
	}

	function removeItem(index: number) {
		items = items.filter((_, i) => i !== index);
	}

	/* -- Complete code for CodeCanvas -- */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let count = $state(0);\n" +
		"  let items = $state<string[]>(['apple', 'banana']);\n" +
		"  let newItem = $state('');\n" +
		"\n" +
		"  function increment() {\n" +
		"    count += 1;\n" +
		"  }\n" +
		"\n" +
		"  function addItem() {\n" +
		"    if (newItem.trim()) {\n" +
		"      items = [...items, newItem.trim()];\n" +
		"      newItem = '';\n" +
		"    }\n" +
		"  }\n" +
		"\n" +
		"  function removeItem(index: number) {\n" +
		"    items = items.filter((_, i) => i !== index);\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<!-- Pauses the debugger whenever count or items change -->\n" +
		"{@debug count, items}\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>{@debug} tag</h1>\n" +
		"\n" +
		"  <div class=\"build\">\n" +
		"    <p>Count: {count}</p>\n" +
		"    <button type=\"button\" onclick={increment}>count++</button>\n" +
		"\n" +
		"    <ul>\n" +
		"      {#each items as item, i}\n" +
		"        <li>{item} <button onclick={() => removeItem(i)}>x</button></li>\n" +
		"      {/each}\n" +
		"    </ul>\n" +
		"\n" +
		"    <input bind:value={newItem} placeholder=\"New item\" />\n" +
		"    <button type=\"button\" onclick={addItem}>Add</button>\n" +
		"  </div>\n" +
		"</section>";
</script>

<!-- Pauses the debugger whenever count or items change -->
{@debug count, items}

<section class="page">
	<h1>2.17 — The <code>{'{@debug}'}</code> tag</h1>

	<p class="prose">
		Imagine you are watching a cooking show. <code>$inspect</code> is like the host narrating
		every step aloud to the camera — you see a running log of what is happening. The
		<code>{'{@debug}'}</code> tag is different: it is the director yelling "CUT!" and freezing
		the entire set so you can walk around, examine every pot, and check every ingredient before
		filming resumes. It literally pauses execution in the browser's debugger whenever the
		watched variables change.
	</p>

	<p class="prose">
		The <code>{'{@debug}'}</code> tag is placed in your markup (not in the script block). It
		accepts a comma-separated list of variable names — not expressions, not property accesses,
		just bare variable names. When any of those variables change, Svelte hits a
		<code>debugger</code> statement, which pauses execution if DevTools are open. If DevTools
		are closed, it does nothing at all.
	</p>

	<h2>Syntax overview</h2>

	<div class="build">
		<pre>{`<!-- Debug specific variables -->
{@debug count, items}

<!-- Debug a single variable -->
{@debug user}

<!-- Bare {@debug} with no arguments -->
<!-- Triggers on ANY state change -->
{@debug}

<!-- These WON'T compile: -->
<!-- {@debug user.name}       (no property access) -->
<!-- {@debug items[0]}        (no index access) -->
<!-- {@debug !isReady}        (no expressions) -->`}</pre>

		<p class="prose">
			The tag must contain only top-level variable names. This constraint exists because
			<code>{'{@debug}'}</code> is a compiler directive, not a runtime function — the compiler
			needs to know exactly which reactive bindings to watch at compile time.
		</p>
	</div>

	<h2>Live demo</h2>
	<p class="prose">
		Open DevTools before interacting with the buttons below. Every time <code>count</code> or
		<code>items</code> changes, the debugger will pause and you can inspect the call stack, local
		variables, and the full component state. Close DevTools if you want to interact without pausing.
	</p>

	<div class="build">
		<div class="stats">
			<div class="stat">
				<span class="label">count</span>
				<span class="value">{count}</span>
			</div>
			<div class="stat">
				<span class="label">items</span>
				<span class="value">{items.length} items</span>
			</div>
		</div>

		<div class="controls">
			<button type="button" onclick={increment}>count++</button>
		</div>

		<ul class="item-list">
			{#each items as item, i (item)}
				<li>
					<span>{item}</span>
					<button type="button" class="remove" onclick={() => removeItem(i)}>x</button>
				</li>
			{/each}
		</ul>

		<div class="add-row">
			<input type="text" bind:value={newItem} placeholder="New item..." />
			<button type="button" onclick={addItem}>Add</button>
		</div>
	</div>

	<h2><code>{'{@debug}'}</code> vs <code>$inspect</code></h2>

	<div class="build">
		<div class="comparison">
			<div class="compare-col">
				<h3><code>{'{@debug}'}</code></h3>
				<ul class="compare-list">
					<li>Goes in <strong>markup</strong>, not script</li>
					<li>Pauses execution (breakpoint)</li>
					<li>Only fires when DevTools are open</li>
					<li>Only accepts bare variable names</li>
					<li>No output to console by default</li>
					<li>Stripped from production builds</li>
				</ul>
			</div>
			<div class="compare-col">
				<h3><code>$inspect</code></h3>
				<ul class="compare-list">
					<li>Goes in <strong>script</strong> block</li>
					<li>Logs to console (no pause)</li>
					<li>Always fires in dev mode</li>
					<li>Accepts any reactive expression</li>
					<li>Has <code>.with()</code> for custom handling</li>
					<li>Stripped from production builds</li>
				</ul>
			</div>
		</div>

		<p class="prose">
			Use <code>$inspect</code> when you want a running log of how a value evolves over time.
			Use <code>{'{@debug}'}</code> when you need to freeze the world and poke around — checking
			the call stack, hovering over variables in the Sources panel, or stepping through code
			line by line. They complement each other: <code>$inspect</code> is the flight recorder,
			<code>{'{@debug}'}</code> is the emergency stop button.
		</p>
	</div>

	<h2>Step-by-step</h2>

	<div class="build">
		<CodeCanvas
			filename="+page.svelte"
			code={`<` + `script lang="ts">
  let count = $state(0);
  let items = $state<string[]>(['apple', 'banana']);
</` + `script>

<!-- Step 1: Add {@debug} to watch count and items -->
{@debug count, items}

<p>Count: {count}</p>
<button onclick={() => count++}>count++</button>`}
		/>

		<p class="prose">
			Step 1: Declare the variables you want to watch. Step 2: Add <code>{'{@debug count, items}'}</code>
			anywhere in the markup. Step 3: Open DevTools. Step 4: Click a button — the debugger
			pauses immediately, and you can inspect the new values in the Scope panel.
		</p>
	</div>

	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Use a property access: <code>{'{@debug items.length}'}</code>.</strong> The
			Svelte compiler throws an error — <code>{'{@debug}'}</code> only accepts bare variable
			names. This is a compile-time constraint, not a runtime one. If you need to debug
			a computed value, assign it to a <code>$derived</code> variable and debug that instead.
		</li>
		<li>
			<strong>Add <code>{'{@debug}'}</code> with no arguments.</strong> Now every single
			state change in the component triggers the debugger — clicking any button, typing
			in the input, anything. This is useful for "what just changed?" moments, but
			overwhelming for components with frequent updates.
		</li>
		<li>
			<strong>Close DevTools entirely and click the buttons.</strong> Nothing pauses.
			The <code>debugger</code> statement is silently ignored when DevTools are closed.
			The app runs at full speed with zero overhead — the tag is effectively invisible
			unless you are actively debugging.
		</li>
		<li>
			<strong>Replace <code>{'{@debug count}'}</code> with <code>$inspect(count)</code> in the script block.</strong>
			Now clicking the button logs to the console instead of pausing. Both are dev-only and
			stripped from production — the difference is purely in how they interrupt your workflow:
			a log entry vs a full debugger breakpoint.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		The <code>{'{@debug}'}</code> tag is Svelte's built-in breakpoint mechanism. Place it in
		your markup with one or more variable names, and whenever those variables change the browser
		debugger pauses — giving you full access to the call stack, the scope chain, and every local
		variable. It only fires when DevTools are open, and it is stripped from production builds,
		so there is no cost to leaving it in place during development.
	</p>

	<p class="prose">
		Unlike <code>$inspect</code>, which logs to the console and keeps running, <code>{'{@debug}'}</code>
		stops the world. This makes it the right tool when you need to understand <em>exactly</em>
		what the component state looks like at the moment a change happens — not just what value
		was logged, but the entire execution context. Think of it as placing a conditional breakpoint
		in your Svelte template without opening the Sources panel.
	</p>

	<p class="prose">
		The two debugging tools pair well: use <code>$inspect</code> to watch a value evolve over
		a sequence of interactions (the flight recorder), and switch to <code>{'{@debug}'}</code>
		when something unexpected appears and you need to freeze the frame (the emergency stop).
		Both are dev-only, both are zero-cost in production, and choosing the right one for the
		situation is what separates a productive debugging session from a frustrating one.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-17-inspect-debugging">2.17 — $inspect & $inspect.trace</a> — reactive
		console logging that complements <code>{'{@debug}'}</code>.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
		line-height: 1.5;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}

	.stat {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.stat .label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat .value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
		font-family: var(--font-mono);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}

	.controls button {
		font: inherit;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: var(--color-surface);
		cursor: pointer;
		font-weight: 600;
	}

	.controls button:hover {
		opacity: 0.9;
	}

	.item-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-block-end: var(--space-md);
	}

	.item-list li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--color-surface-2);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
	}

	.remove {
		font: inherit;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		cursor: pointer;
		padding: 0 var(--space-xs);
		font-size: var(--text-xs);
	}

	.remove:hover {
		color: var(--color-text);
		background: var(--color-surface);
	}

	.add-row {
		display: flex;
		gap: var(--space-sm);
	}

	.add-row input {
		flex: 1;
		font: inherit;
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
	}

	.add-row button {
		font: inherit;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: var(--color-surface);
		cursor: pointer;
		font-weight: 600;
	}

	.comparison {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.compare-col {
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.compare-col h3 {
		margin: 0 0 var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-base);
	}

	.compare-list {
		font-size: var(--text-sm);
		padding-inline-start: var(--space-md);
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		line-height: 1.5;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-width: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
		.comparison { grid-template-columns: 1fr 1fr; }
	}
</style>
