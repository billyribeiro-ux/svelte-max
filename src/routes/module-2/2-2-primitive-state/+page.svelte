<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let enabled = $state<boolean>(false);

	function toggle(): void {
		enabled = !enabled;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let enabled = $state\u003cboolean\u003e(false);\n" +
		"\n" +
		"\tfunction toggle(): void {\n" +
		"\t\tenabled = !enabled;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.2 — Primitive $state\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"lede\"\u003e\n" +
		"\t\tStrings, numbers, and booleans are the atoms of application state. Most of what a UI\n" +
		"\t\tcares about — counts, flags, single text fields, selected IDs — lives in a primitive.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tWhen you wrap a primitive with \u003ccode\u003e$state\u003c/code\u003e, Svelte gives you back a reactive\n" +
		"\t\tslot. Reading it registers a dependency; writing to it triggers updates. That's why\n" +
		"\t\t\u003ccode\u003ecount++\u003c/code\u003e \u003cem\u003ejust works\u003c/em\u003e: even though \u003ccode\u003ecount\u003c/code\u003e looks like a\n" +
		"\t\tplain number, the compiler has rewritten it into a read–modify–write that flows through\n" +
		"\t\tthe reactive system.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tTypeScript infers the type from the initial value — \u003ccode\u003e$state(0)\u003c/code\u003e is\n" +
		"\t\t\u003ccode\u003enumber\u003c/code\u003e, \u003ccode\u003e$state('')\u003c/code\u003e is \u003ccode\u003estring\u003c/code\u003e. When the initial\n" +
		"\t\tvalue doesn't tell the whole story (for example, a string that will later hold only\n" +
		"\t\tspecific literal values), be explicit: \u003ccode\u003e$state&lt;'idle' | 'loading'&gt;('idle')\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cp\u003e\n" +
		"\t\tFinally, primitives must be declared with \u003ccode\u003elet\u003c/code\u003e, never \u003ccode\u003econst\u003c/code\u003e.\n" +
		"\t\tYou \u003cem\u003ewill\u003c/em\u003e assign new values to them, and \u003ccode\u003econst\u003c/code\u003e would block that at\n" +
		"\t\tthe language level before the proxy ever got a chance.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton\n" +
		"\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\tclass=\"switch\"\n" +
		"\t\t\t\taria-pressed={enabled}\n" +
		"\t\t\t\taria-label=\"Toggle notifications\"\n" +
		"\t\t\t\tonclick={toggle}\n" +
		"\t\t\t\u003e\n" +
		"\t\t\t\t\u003cspan class=\"knob\"\u003e\u003c/span\u003e\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\u003cspan class=\"status\"\u003e\n" +
		"\t\t\t\t{enabled ? 'Notifications on' : 'Notifications off'}\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tA single \u003ccode\u003eboolean\u003c/code\u003e in \u003ccode\u003e$state\u003c/code\u003e drives the colour, the knob\n" +
		"\t\t\tposition, the \u003ccode\u003earia-pressed\u003c/code\u003e value, and the label — all from one\n" +
		"\t\t\tassignment.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003ePrimitives (string, number, boolean) are the most common kind of state.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ecount++\u003c/code\u003e and similar mutations work because \u003ccode\u003e$state\u003c/code\u003e is proxy-backed.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eTypeScript infers a primitive type from the initial value; override with a generic when needed.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003elet\u003c/code\u003e for primitive state — you need to reassign it.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eA single boolean can drive an entire piece of UI through CSS and bindings.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.2 — Primitive $state</h1>

	<p class="lede">
		Strings, numbers, and booleans are the atoms of application state. Most of what a UI
		cares about — counts, flags, single text fields, selected IDs — lives in a primitive.
	</p>

	<p>
		When you wrap a primitive with <code>$state</code>, Svelte gives you back a reactive
		slot. Reading it registers a dependency; writing to it triggers updates. That's why
		<code>count++</code> <em>just works</em>: even though <code>count</code> looks like a
		plain number, the compiler has rewritten it into a read–modify–write that flows through
		the reactive system.
	</p>

	<p>
		TypeScript infers the type from the initial value — <code>$state(0)</code> is
		<code>number</code>, <code>$state('')</code> is <code>string</code>. When the initial
		value doesn't tell the whole story (for example, a string that will later hold only
		specific literal values), be explicit: <code>$state&lt;'idle' | 'loading'&gt;('idle')</code>.
	</p>

	<p>
		Finally, primitives must be declared with <code>let</code>, never <code>const</code>.
		You <em>will</em> assign new values to them, and <code>const</code> would block that at
		the language level before the proxy ever got a chance.
	</p>

	<div class="demo">
		<div class="row">
			<button
				type="button"
				class="switch"
				aria-pressed={enabled}
				aria-label="Toggle notifications"
				onclick={toggle}
			>
				<span class="knob"></span>
			</button>
			<span class="status">
				{enabled ? 'Notifications on' : 'Notifications off'}
			</span>
		</div>
		<p class="hint">
			A single <code>boolean</code> in <code>$state</code> drives the colour, the knob
			position, the <code>aria-pressed</code> value, and the label — all from one
			assignment.
		</p>
	</div>

	<!-- ═══ BREAK IT ON PURPOSE ═══ -->

	<h2>Break it on purpose</h2>

	<p class="prose">
		Primitive state is deceptively simple. These experiments reveal the edges.
	</p>

	<ol class="experiments">
		<li>
			<strong>Destructure a <code>$state</code> object and read the destructured value.</strong>
			Write <code>const val = enabled</code> at the top of the script, then render
			<code>{'{val}'}</code>. It shows the INITIAL value and never updates. Why? Because
			<code>val</code> captured a snapshot of the boolean at that moment — it is not the
			reactive proxy. Only the original <code>enabled</code> variable is reactive.
		</li>
		<li>
			<strong>Use <code>$state</code> with an explicit generic that contradicts the initial value.</strong>
			Write <code>let count = $state&lt;string&gt;(0)</code>. TypeScript errors:
			"Argument of type 'number' is not assignable to parameter of type 'string'." The
			generic must match the initial value — or be a wider union like
			<code>$state&lt;number | null&gt;(0)</code>.
		</li>
		<li>
			<strong>Try <code>count = count + 1</code> vs <code>count++</code>.</strong>
			Both work identically. The compiler rewrites both into proxy writes. There is no
			performance difference. Use whichever reads better in context.
		</li>
		<li>
			<strong>Toggle <code>enabled</code> with <code>enabled = !enabled</code> vs
			<code>enabled ^= true</code>.</strong> Both work. The XOR assignment is a fun trick
			but <code>enabled = !enabled</code> is clearer. Readability beats cleverness.
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
		The three JavaScript primitives — <code>string</code>, <code>number</code>, and
		<code>boolean</code> — are the most common kinds of reactive state. A counter is a number.
		A toggle is a boolean. A search query is a string. When you wrap any of these in
		<code>$state()</code>, the compiler creates a reactive cell: every read is tracked, every
		write triggers an update. The mutation <code>count++</code> works because the compiler
		rewrites it into a proxy-aware read-modify-write.
	</p>

	<p class="prose">
		TypeScript infers the type from the initial value: <code>$state(0)</code> is
		<code>number</code>, <code>$state(false)</code> is <code>boolean</code>,
		<code>$state('')</code> is <code>string</code>. When the inferred type is too narrow —
		say, you start with <code>null</code> but will later hold a <code>User</code> — use an
		explicit generic: <code>$state&lt;User | null&gt;(null)</code>. This tells TypeScript
		the full range of values the state can hold.
	</p>

	<p class="prose">
		A single boolean can drive an entire piece of UI. The toggle switch above uses
		<code>enabled</code> to control: the track color (via CSS binding), the knob position
		(via <code>transform</code>), the <code>aria-pressed</code> attribute (for screen
		readers), and the label text (via a ternary). One state variable, four visual outputs.
		This is the power of reactive primitives — change one value, and everything that depends
		on it updates automatically.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-3-object-state">2.3 — Object $state</a> — reactive objects with deep
		property tracking.
	</p>
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

	.row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.switch {
		--track-w: 3.25rem;
		--track-h: 1.85rem;
		--pad: 0.22rem;
		position: relative;
		inline-size: var(--track-w);
		block-size: var(--track-h);
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-border);
		padding: 0;
		cursor: pointer;
		transition: background var(--dur-base) var(--ease-out);

		&[aria-pressed='true'] {
			background: var(--color-brand);
			border-color: var(--color-brand);
		}

		&:focus-visible {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
		}
	}

	.knob {
		position: absolute;
		inset-block-start: var(--pad);
		inset-inline-start: var(--pad);
		inline-size: calc(var(--track-h) - var(--pad) * 2 - 2px);
		block-size: calc(var(--track-h) - var(--pad) * 2 - 2px);
		border-radius: var(--radius-full);
		background: var(--color-surface-1);
		box-shadow: var(--shadow-sm);
		transition: transform var(--dur-base) var(--ease-spring);
	}

	.switch[aria-pressed='true'] .knob {
		transform: translateX(calc(var(--track-w) - var(--track-h)));
	}

	.status {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
	}

	.hint {
		font-size: var(--text-sm);
	}


	@media (min-inline-size: 768px) {
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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
		& strong { font-weight: 700; }
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
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.hint { max-inline-size: 80ch; }
	}
</style>
