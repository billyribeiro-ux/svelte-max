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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Primitives (string, number, boolean) are the most common kind of state.</li>
		<li><code>count++</code> and similar mutations work because <code>$state</code> is proxy-backed.</li>
		<li>TypeScript infers a primitive type from the initial value; override with a generic when needed.</li>
		<li>Use <code>let</code> for primitive state — you need to reassign it.</li>
		<li>A single boolean can drive an entire piece of UI through CSS and bindings.</li>
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
		width: var(--track-w);
		height: var(--track-h);
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
		top: var(--pad);
		left: var(--pad);
		width: calc(var(--track-h) - var(--pad) * 2 - 2px);
		height: calc(var(--track-h) - var(--pad) * 2 - 2px);
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
	@media (min-width: 480px) {
		.hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.hint { max-inline-size: 80ch; }
	}
</style>
