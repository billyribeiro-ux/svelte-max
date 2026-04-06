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

	<p class="lede">
		State is data that changes over time and causes your UI to re-render when it does. A
		user's name, the current tab, whether a dropdown is open, the items in a cart — all state.
		Anything that isn't constant for the life of the page is a candidate.
	</p>

	<p>
		In Svelte 5 you declare state with the <code>$state</code> rune. The compiler sees the
		rune at build time, wraps your value in a proxy, and from that moment on every read is
		tracked and every write schedules the UI to update. There is no <em>setState</em>, no
		dependency array, no hook rules — you just mutate the variable.
	</p>

	<p>
		This is why Svelte uses explicit runes instead of React's implicit model: the compiler
		has to <em>see</em> what is reactive to generate efficient update code. A plain
		<code>let count = 0</code> stays plain; a <code>let count = $state(0)</code> becomes a
		reactive cell. And because <code>$state</code> returns a proxy, the humble
		<code>count++</code> still works — the proxy intercepts the assignment and notifies
		anything that depends on it.
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>State is any value whose change should update the UI.</li>
		<li><code>$state(initial)</code> creates a reactive, proxy-wrapped cell.</li>
		<li>Mutating the variable (<code>count++</code>, reassigning, etc.) triggers re-renders.</li>
		<li><code>$derived(expr)</code> recomputes automatically whenever its inputs change.</li>
		<li>Svelte needs explicit runes so the compiler can generate fine-grained updates.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.lede {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--color-surface-2);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

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

	h3 {
		font-size: var(--text-lg);
		margin-top: var(--space-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-left: var(--space-md);
		color: var(--color-text-muted);
		line-height: 1.6;
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
