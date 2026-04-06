<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let text = $state<string>('');
	const count = $derived<number>(text.length);
	const status = $derived<'ok' | 'long'>(count < 80 ? 'ok' : 'long');

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let text = $state\u003cstring\u003e('');\n" +
		"\tconst count = $derived\u003cnumber\u003e(text.length);\n" +
		"\tconst status = $derived\u003c'ok' | 'long'\u003e(count \u003c 80 ? 'ok' : 'long');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.1 — What state is\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"lede\"\u003e\n" +
		"\t\tState is data that changes over time and causes your UI to re-render when it does. A\n" +
		"\t\tuser's name, the current tab, whether a dropdown is open, the items in a cart — all state.\n" +
		"\t\tAnything that isn't constant for the life of the page is a candidate.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tIn Svelte 5 you declare state with the \u003ccode\u003e$state\u003c/code\u003e rune. The compiler sees the\n" +
		"\t\trune at build time, wraps your value in a proxy, and from that moment on every read is\n" +
		"\t\ttracked and every write schedules the UI to update. There is no \u003cem\u003esetState\u003c/em\u003e, no\n" +
		"\t\tdependency array, no hook rules — you just mutate the variable.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tThis is why Svelte uses explicit runes instead of React's implicit model: the compiler\n" +
		"\t\thas to \u003cem\u003esee\u003c/em\u003e what is reactive to generate efficient update code. A plain\n" +
		"\t\t\u003ccode\u003elet count = 0\u003c/code\u003e stays plain; a \u003ccode\u003elet count = $state(0)\u003c/code\u003e becomes a\n" +
		"\t\treactive cell. And because \u003ccode\u003e$state\u003c/code\u003e returns a proxy, the humble\n" +
		"\t\t\u003ccode\u003ecount++\u003c/code\u003e still works — the proxy intercepts the assignment and notifies\n" +
		"\t\tanything that depends on it.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003clabel class=\"field\" for=\"note\"\u003eWrite a note\u003c/label\u003e\n" +
		"\t\t\u003ctextarea\n" +
		"\t\t\tid=\"note\"\n" +
		"\t\t\tbind:value={text}\n" +
		"\t\t\trows=\"4\"\n" +
		"\t\t\tplaceholder=\"Start typing and watch the counter react…\"\n" +
		"\t\t\u003e\u003c/textarea\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"readout\"\u003e\n" +
		"\t\t\t\u003cspan class=\"count\"\u003e{count} character{count === 1 ? '' : 's'}\u003c/span\u003e\n" +
		"\t\t\t\u003cspan class=\"pill\" data-status={status}\u003e\n" +
		"\t\t\t\t{status === 'ok' ? 'Nice and short' : 'Getting long'}\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eState is any value whose change should update the UI.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state(initial)\u003c/code\u003e creates a reactive, proxy-wrapped cell.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eMutating the variable (\u003ccode\u003ecount++\u003c/code\u003e, reassigning, etc.) triggers re-renders.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$derived(expr)\u003c/code\u003e recomputes automatically whenever its inputs change.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSvelte needs explicit runes so the compiler can generate fine-grained updates.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.1 — What state is</h1>

	<!-- ═══ WHY THIS MATTERS ═══ -->

	<p class="prose">
		Everything you built in Module 1 was static. You declared a variable, rendered it, and it
		never changed. Real applications are not static. A user types into a search box — the results
		update. A button is clicked — a counter increments. An item is added to a cart — the total
		recalculates. The data that drives these changes is called <strong>state</strong>.
	</p>

	<p class="prose">
		Think of state like a whiteboard in a meeting room. Anyone can walk in and change what is
		written on it. When they do, everyone looking at the whiteboard sees the new content
		immediately. In Svelte, <code>$state</code> is that whiteboard. You write a value to it, and
		every part of your UI that reads from it automatically updates. You do not need to tell the
		UI to refresh. You do not call a function. You just change the value, and Svelte handles the
		rest.
	</p>

	<p class="prose">
		This is fundamentally different from how React works. In React, you call
		<code>setState(newValue)</code> — an explicit function call that schedules a re-render. In
		Svelte, you write <code>count++</code> and the proxy that <code>$state</code> created
		intercepts the mutation and schedules the update for you. The result is the same (the UI
		updates), but the developer experience is radically simpler: you just write normal JavaScript.
	</p>

	<!-- ═══ THE MENTAL MODEL ═══ -->

	<h2>The mental model</h2>

	<p class="prose">
		There are two kinds of data in Svelte. Understanding the difference is the foundation of
		everything in this module.
	</p>

	<table class="model-table">
		<thead>
			<tr>
				<th>Kind</th>
				<th>Declaration</th>
				<th>When it changes</th>
				<th>Does the UI update?</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><strong>Constant</strong></td>
				<td><code>const name = 'Billy'</code></td>
				<td>Never — it is sealed</td>
				<td>No — nothing to react to</td>
			</tr>
			<tr>
				<td><strong>Plain variable</strong></td>
				<td><code>let count = 0</code></td>
				<td>You can reassign it</td>
				<td><strong>No</strong> — Svelte does not track plain variables</td>
			</tr>
			<tr>
				<td><strong>Reactive state</strong></td>
				<td><code>let count = $state(0)</code></td>
				<td>You can reassign or mutate it</td>
				<td><strong>Yes</strong> — Svelte tracks every read and write</td>
			</tr>
		</tbody>
	</table>

	<p class="prose">
		The critical row is the second one. A plain <code>let count = 0</code> is NOT reactive in
		Svelte 5. If you increment it, nothing happens on screen. You <em>must</em> use
		<code>$state</code> to opt into reactivity. This is intentional: the compiler needs to know
		which variables to track. Wrapping a value in <code>$state()</code> is how you tell it:
		"Watch this one."
	</p>

	<!-- ═══ THE DEMO ═══ -->

	<h2>See it in action</h2>

	<p class="prose">
		Below is a textarea bound to a <code>$state</code> string. As you type, the character count
		and status pill update instantly — because <code>text</code> is reactive and both
		<code>count</code> and <code>status</code> are derived from it.
	</p>

	<div class="demo">
		<label class="field" for="note">Write a note</label>
		<textarea
			id="note"
			bind:value={text}
			rows="4"
			placeholder="Start typing and watch the counter react…"
		></textarea>

		<div class="readout">
			<span class="count">{count} character{count === 1 ? '' : 's'}</span>
			<span class="pill" data-status={status}>
				{status === 'ok' ? 'Nice and short' : 'Getting long'}
			</span>
		</div>
	</div>

	<!-- ═══ BREAK IT ON PURPOSE ═══ -->

	<h2>Break it on purpose</h2>

	<p class="prose">
		Reactivity only works if you understand its boundaries. Try these experiments.
	</p>

	<ol class="experiments">
		<li>
			<strong>Remove <code>$state</code> from the declaration.</strong> Change
			<code>let text = $state('')</code> to <code>let text = ''</code>. Now type in the
			textarea. The character count stays at 0. The status pill never changes. The UI is
			dead — because <code>text</code> is no longer reactive. Svelte has no way to know
			it changed. Put <code>$state</code> back.
		</li>
		<li>
			<strong>Use <code>const</code> instead of <code>let</code>.</strong> Change to
			<code>const text = $state('')</code>. TypeScript does not error (the proxy object
			itself is constant). But you cannot reassign <code>text = 'new value'</code> —
			the variable is sealed. For primitive state that you reassign (strings, numbers,
			booleans), you must use <code>let</code>.
		</li>
		<li>
			<strong>Read <code>text</code> in the console.</strong> Open DevTools and type
			<code>text</code> in the console. You will not find it — module-scoped variables
			are not on <code>window</code>. Use <code>$inspect(text)</code> in the script
			block instead. This rune logs reactive values to the console whenever they change —
			a dev-only debugging tool.
		</li>
		<li>
			<strong>Assign <code>text</code> to a plain variable and read THAT.</strong>
			Write <code>const snapshot = text</code> at the top of the script. Then render
			<code>{'{snapshot}'}</code> in the markup. It shows the INITIAL value and never
			updates. Why? Because <code>snapshot</code> captured the value at that moment —
			it is not reactive. Only the original <code>$state</code> variable is tracked.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- ═══ WHAT YOU LEARNED ═══ -->

	<h2>What you learned</h2>

	<p class="prose">
		State is any data whose change should cause the UI to update. In Svelte 5, you create
		reactive state with the <code>$state</code> rune: <code>let count = $state(0)</code>.
		The compiler wraps the value in a proxy that intercepts every read and every write. When
		you write <code>count++</code>, the proxy detects the mutation and schedules an update
		for every part of the markup that reads <code>count</code>. You do not call a function.
		You do not pass a dependency array. You just change the variable.
	</p>

	<p class="prose">
		<code>$derived(expr)</code> creates a computed value that recalculates whenever any
		reactive dependency inside <code>expr</code> changes. It is pure — no side effects, no
		fetch calls, no DOM writes. In this lesson, <code>count</code> and <code>status</code>
		are both derived from <code>text</code>. When <code>text</code> changes, they both
		recompute automatically. You will explore <code>$derived</code> deeply in lesson 2.7.
	</p>

	<p class="prose">
		The reason Svelte requires explicit <code>$state</code> runes (instead of making
		everything reactive by default) is efficiency. The compiler generates update code only
		for the variables you mark as reactive. A plain <code>let x = 5</code> produces no
		tracking overhead. A <code>let x = $state(5)</code> produces the proxy wrapper and
		dependency tracking. You opt in per variable, and the compiler optimizes accordingly.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-2-primitive-state">2.2 — Primitive $state</a> — deep dive into
		reactive strings, numbers, and booleans.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

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
		& strong { font-weight: 700; }
	}

	.model-table {
		inline-size: 100%;
		max-inline-size: 68ch;
		border-collapse: collapse;
		margin-block: var(--space-md);
		font-size: var(--text-sm);
		& th {
			background: var(--color-surface-2);
			color: var(--color-text);
			font-weight: 700;
			text-align: start;
			padding: var(--space-xs) var(--space-sm);
			border-block-end: 2px solid var(--color-border);
		}
		& td {
			padding: var(--space-xs) var(--space-sm);
			border-block-end: 1px solid var(--color-border);
			color: var(--color-text);
			vertical-align: top;
		}
		& code {
			font-family: var(--font-mono);
			font-size: 0.85em;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.field {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	textarea {
		width: 100%;
		font: inherit;
		font-size: var(--text-base);
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		resize: vertical;
		transition: border-color var(--dur-fast) var(--ease-out);

		&:focus {
			outline: none;
			border-color: var(--color-brand);
		}
	}

	.readout {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.pill {
		font-size: var(--text-xs);
		font-weight: 600;
		padding: 0.3em 0.8em;
		border-radius: var(--radius-full);
		transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);

		&[data-status='ok'] {
			background: oklch(92% 0.09 145);
			color: oklch(30% 0.12 145);
		}

		&[data-status='long'] {
			background: oklch(90% 0.12 60);
			color: oklch(35% 0.14 60);
		}
	}

	@media (min-width: 768px) {
		.demo {
			padding: var(--space-lg);
		}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
