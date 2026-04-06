<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Item {
		id: number;
		title: string;
		body: string;
	}

	const items: Item[] = [
		{ id: 1, title: 'What is a closure?', body: 'A function bundled with the variables from its enclosing scope.' },
		{ id: 2, title: 'Why does each row work independently?', body: 'Each iteration of {#each} creates a fresh scope, so the arrow handler captures that row\'s own item.id.' },
		{ id: 3, title: 'Any stale-closure bugs?', body: 'Not in Svelte. Runes are reactive by reference, so closures always read the current value of $state.' },
		{ id: 4, title: 'When should I worry?', body: 'Almost never here. The trap lives in React hooks land where closures capture stale props.' }
	];

	let openIds = $state<number[]>([]);

	function toggle(id: number): void {
		if (openIds.includes(id)) {
			openIds = openIds.filter((x) => x !== id);
		} else {
			openIds = [...openIds, id];
		}
	}

	function isOpen(id: number): boolean {
		return openIds.includes(id);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Item {\n" +
		"\t\tid: number;\n" +
		"\t\ttitle: string;\n" +
		"\t\tbody: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst items: Item[] = [\n" +
		"\t\t{ id: 1, title: 'What is a closure?', body: 'A function bundled with the variables from its enclosing scope.' },\n" +
		"\t\t{ id: 2, title: 'Why does each row work independently?', body: 'Each iteration of {#each} creates a fresh scope, so the arrow handler captures that row\\'s own item.id.' },\n" +
		"\t\t{ id: 3, title: 'Any stale-closure bugs?', body: 'Not in Svelte. Runes are reactive by reference, so closures always read the current value of $state.' },\n" +
		"\t\t{ id: 4, title: 'When should I worry?', body: 'Almost never here. The trap lives in React hooks land where closures capture stale props.' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet openIds = $state\u003cnumber[]\u003e([]);\n" +
		"\n" +
		"\tfunction toggle(id: number): void {\n" +
		"\t\tif (openIds.includes(id)) {\n" +
		"\t\t\topenIds = openIds.filter((x) =\u003e x !== id);\n" +
		"\t\t} else {\n" +
		"\t\t\topenIds = [...openIds, id];\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tfunction isOpen(id: number): boolean {\n" +
		"\t\treturn openIds.includes(id);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.7 — Closures in handlers\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e A closure is a function that captures variables from its surrounding scope. When\n" +
		"\t\tyou define an arrow handler inside \u003ccode\u003e{'{#each}'}\u003c/code\u003e, each iteration gets its own closure over the\n" +
		"\t\tcurrent item — so clicking one row never affects another. In Svelte this just works: no stale-closure\n" +
		"\t\tbugs from the React world. Why no stale closures in Svelte? Because \u003ccode\u003e$state\u003c/code\u003e returns a\n" +
		"\t\treactive proxy, not a plain value. When you close over \u003ccode\u003eitems\u003c/code\u003e inside an\n" +
		"\t\t\u003ccode\u003e{'{#each}'}\u003c/code\u003e handler, you're closing over the proxy — which always reflects the current\n" +
		"\t\tstate. React closures capture a snapshot; Svelte closures capture a live reference.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eEach button below is a separate closure over its own \u003ccode\u003eitem.id\u003c/code\u003e.\u003c/p\u003e\n" +
		"\t\t\u003cul class=\"accordion\"\u003e\n" +
		"\t\t\t{#each items as item (item.id)}\n" +
		"\t\t\t\t\u003cli class=\"row\" class:open={isOpen(item.id)}\u003e\n" +
		"\t\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\t\tclass=\"head\"\n" +
		"\t\t\t\t\t\taria-expanded={isOpen(item.id)}\n" +
		"\t\t\t\t\t\tonclick={() =\u003e toggle(item.id)}\n" +
		"\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"title\"\u003e{item.title}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"chev\" aria-hidden=\"true\"\u003e{isOpen(item.id) ? '−' : '+'}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\t\t{#if isOpen(item.id)}\n" +
		"\t\t\t\t\t\t\u003cdiv class=\"body\"\u003e{item.body}\u003c/div\u003e\n" +
		"\t\t\t\t\t{/if}\n" +
		"\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/ul\u003e\n" +
		"\t\t\u003cp class=\"state\"\u003eOpen ids: \u003ccode\u003e[{openIds.join(', ')}]\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eEach arrow function inside \u003ccode\u003e{'{#each}'}\u003c/code\u003e closes over its iteration's item.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eTracking open state as an id array avoids nested \u003ccode\u003e$state\u003c/code\u003e inside loops.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSvelte reactivity reads the current value — no stale closure surprises.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.7 — Closures in handlers</h1>
	<p class="concept">
		<strong>Concept.</strong> A closure is a function that captures variables from its surrounding scope. When
		you define an arrow handler inside <code>{'{#each}'}</code>, each iteration gets its own closure over the
		current item — so clicking one row never affects another. In Svelte this just works: no stale-closure
		bugs from the React world. Why no stale closures in Svelte? Because <code>$state</code> returns a
		reactive proxy, not a plain value. When you close over <code>items</code> inside an
		<code>{'{#each}'}</code> handler, you're closing over the proxy — which always reflects the current
		state. React closures capture a snapshot; Svelte closures capture a live reference.
	</p>

	<div class="build">
		<p class="hint">Each button below is a separate closure over its own <code>item.id</code>.</p>
		<ul class="accordion">
			{#each items as item (item.id)}
				<li class="row" class:open={isOpen(item.id)}>
					<button
						type="button"
						class="head"
						aria-expanded={isOpen(item.id)}
						onclick={() => toggle(item.id)}
					>
						<span class="title">{item.title}</span>
						<span class="chev" aria-hidden="true">{isOpen(item.id) ? '−' : '+'}</span>
					</button>
					{#if isOpen(item.id)}
						<div class="body">{item.body}</div>
					{/if}
				</li>
			{/each}
		</ul>
		<p class="state">Open ids: <code>[{openIds.join(', ')}]</code></p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Closures are JavaScript's most powerful and most misunderstood feature. These experiments reveal how they interact with Svelte's reactivity system.
	</p>
	<ol class="experiments">
		<li><strong>Use a loop variable directly in an event handler.</strong> In a standard <code>for</code> loop with <code>var</code>, all handlers would capture the same variable and see its final value. But inside <code>{'{#each}'}</code>, Svelte creates a new block scope for each iteration, so each handler captures its own copy of <code>item</code>. Try it — every row works independently, because <code>{'{#each}'}</code> is essentially a <code>let</code>-scoped loop.</li>
		<li><strong>Close over a <code>$state</code> variable inside a handler.</strong> Create a handler that reads <code>openIds</code> (a <code>$state</code> array). Click several items and log the value inside the handler. The handler always reads the latest value of <code>openIds</code>, not a stale snapshot. This is because <code>$state</code> returns a reactive proxy — the closure captures the proxy reference, which always reflects the current state.</li>
		<li><strong>Create a stale closure by capturing a value in <code>setTimeout</code>.</strong> Inside a handler, capture a plain <code>let</code> variable's value in a <code>setTimeout</code> callback: <code>const snap = count; setTimeout(() =&gt; console.log(snap), 2000)</code>. Change <code>count</code> before the timeout fires. The logged value is stale — it shows the value at capture time, not the current value. This is the classic stale-closure bug.</li>
		<li><strong>Fix the stale closure by reading <code>$state</code> inside the timeout.</strong> Instead of capturing a snapshot, read the <code>$state</code> variable directly inside the <code>setTimeout</code> callback. Because <code>$state</code> is a reactive proxy, the read always returns the current value. This is the fundamental difference between Svelte's reactivity model and React's snapshot-based hooks.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		A closure is a function bundled with the variables from its enclosing scope. When you write <code>{'onclick={() => toggle(item.id)}'}</code> inside an <code>{'{#each}'}</code> block, the arrow function closes over <code>item</code> from that specific iteration. Because <code>{'{#each}'}</code> creates a new block scope per iteration (equivalent to a <code>for...of</code> with <code>let</code>), each handler captures its own independent copy of the loop variable. This is why clicking one accordion row never affects another.
	</p>
	<p class="prose">
		Svelte's reactivity model eliminates the stale-closure problem that plagues React hooks. In React, every render creates new closures that capture snapshot values — if a <code>useEffect</code> or callback reads a state variable, it sees the value from the render when it was created, not the current value. In Svelte, <code>$state</code> returns a reactive proxy. Closures capture the proxy reference, and every read through that proxy always returns the live, current value. This means you almost never need to think about stale closures in Svelte code.
	</p>
	<p class="prose">
		The one exception is when you deliberately snapshot a value — for example, by assigning <code>const snap = count</code> and using <code>snap</code> in a <code>setTimeout</code>. The snapshot is a plain number, not a reactive proxy, so the timeout sees the value at capture time. This is occasionally useful (for animations or comparisons), but when you want the current value, always read the <code>$state</code> variable directly rather than capturing it into a local constant.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-8-debounce-throttle">5.8 — Debounce &amp; throttle</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.accordion {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		/* interpolate-size: allow-keywords — enables animating to/from 'auto' height for accordion items */
		interpolate-size: allow-keywords;
	}
	.row {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}
	.head {
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		background: transparent;
		border: 0;
		color: var(--color-text);
		font-size: var(--text-sm);
		text-align: start;
		cursor: pointer;
		min-block-size: 44px;
	}
	.head:hover {
		background: var(--color-surface);
	}
	.title {
		font-weight: 600;
	}
	.chev {
		font-family: var(--font-mono);
		color: var(--color-brand);
	}
	.body {
		padding: var(--space-sm) var(--space-md) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		border-block-start: 1px solid var(--color-border);
		/* With interpolate-size: allow-keywords on .accordion, height can animate to/from auto */
		height: auto;
		transition: height var(--dur-base) var(--ease-out);
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
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
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
