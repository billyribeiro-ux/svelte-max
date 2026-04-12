<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CurrencyInput from '$lib/components/CurrencyInput.svelte';

	let price = $state(1250);

	const displayFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import CurrencyInput from '$lib/components/CurrencyInput.svelte';\n" +
		"\n" +
		"\tlet price = $state(1250);\n" +
		"\n" +
		"\tconst displayFormatter = new Intl.NumberFormat('en-US', {\n" +
		"\t\tstyle: 'currency',\n" +
		"\t\tcurrency: 'USD'\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.6 — Function bindings\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Since Svelte 5.9, \u003ccode\u003ebind:\u003c/code\u003e accepts a tuple of a getter and\n" +
		"\t\ta setter instead of a plain variable:\n" +
		"\t\t\u003ccode\u003ebind:value={'{() =\u003e state, (v) =\u003e state = v.toLowerCase()}'}\u003c/code\u003e. That lets you\n" +
		"\t\ttransform values on read, on write, or both — without stitching together a separate\n" +
		"\t\t\u003ccode\u003e$effect\u003c/code\u003e. It's ideal for masking, formatting, and sanitizing user input, and\n" +
		"\t\tworks for readonly bindings too (a null getter with a setter for things like\n" +
		"\t\t\u003ccode\u003eclientWidth\u003c/code\u003e).\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cCurrencyInput label=\"Monthly cost\" bind:value={price} /\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"preview\"\u003e\n" +
		"\t\t\t\u003cp\u003e\n" +
		"\t\t\t\t\u003cspan class=\"label\"\u003eStored value\u003c/span\u003e\n" +
		"\t\t\t\t\u003ccode\u003e{price}\u003c/code\u003e\n" +
		"\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\u003cp\u003e\n" +
		"\t\t\t\t\u003cspan class=\"label\"\u003eFormatted\u003c/span\u003e\n" +
		"\t\t\t\t\u003cstrong\u003e{displayFormatter.format(price)}\u003c/strong\u003e\n" +
		"\t\t\t\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tThe input shows a formatted currency string, but the parent's \u003ccode\u003eprice\u003c/code\u003e stays a\n" +
		"\t\t\tplain \u003ccode\u003enumber\u003c/code\u003e — the getter formats on read and the setter parses on write.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ebind:value={'{getter, setter}'}\u003c/code\u003e lets you transform values as they cross the boundary.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThe child sees formatted strings; the parent keeps a clean typed value.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eNo extra \u003ccode\u003e$effect\u003c/code\u003e is needed — the binding itself does the work.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eFunction bindings also unlock readonly props like \u003ccode\u003eclientWidth\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.6 — Function bindings</h1>
	<p class="concept">
		<strong>Concept.</strong> Since Svelte 5.9, <code>bind:</code> accepts a tuple of a getter and
		a setter instead of a plain variable:
		<code>bind:value={'{() => state, (v) => state = v.toLowerCase()}'}</code>. That lets you
		transform values on read, on write, or both — without stitching together a separate
		<code>$effect</code>. It's ideal for masking, formatting, and sanitizing user input, and
		works for readonly bindings too (a null getter with a setter for things like
		<code>clientWidth</code>).
	</p>

	<div class="build">
		<CurrencyInput label="Monthly cost" bind:value={price} />

		<div class="preview">
			<p>
				<span class="label">Stored value</span>
				<code>{price}</code>
			</p>
			<p>
				<span class="label">Formatted</span>
				<strong>{displayFormatter.format(price)}</strong>
			</p>
		</div>

		<p class="note">
			The input shows a formatted currency string, but the parent's <code>price</code> stays a
			plain <code>number</code> — the getter formats on read and the setter parses on write.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments show how function bindings differ from plain bindings and where the edges are.</p>
	<ol class="experiments">
		<li><strong>Pass a function whose argument types do not match the expected signature.</strong> TypeScript catches the mismatch immediately. Function props are fully typed end-to-end, so the compiler verifies that the parent's handler matches the contract the child expects.</li>
		<li><strong>Call a callback inside <code>$derived</code> instead of <code>$effect</code>.</strong> Derived values must be pure computations with no side effects. Invoking a callback (which typically mutates state or performs I/O) inside <code>$derived</code> violates this contract — use <code>$effect</code> for side-effectful reactions.</li>
		<li><strong>Pass an async function as a callback prop.</strong> It works at runtime, but if the async function throws, the error is swallowed unless you wrap the call in a <code>try/catch</code>. Unhandled promise rejections are silent by default in most environments.</li>
		<li><strong>Render <code>{'{onclick}'}</code> in markup instead of calling <code>{'{onclick()}'}</code>.</strong> Svelte will render the function's string representation — something like <code>function() {'{ ... }'}</code> — instead of its return value. This is a common mistake when switching between event handlers and inline expressions.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Function bindings let you intercept values as they cross the parent-child boundary. Instead of passing a plain variable to <code>bind:</code>, you pass a getter-setter tuple: the getter transforms the value on read (e.g. formatting a number as currency), and the setter transforms it on write (e.g. parsing the string back to a number). This eliminates the need for a separate <code>$effect</code> to keep formatted and raw values in sync.</p>
	<p class="prose">The child component sees only the transformed value — in the currency example, it displays and edits a formatted string. Meanwhile, the parent retains a clean typed number that is ready for computation, validation, or persistence. The transformation logic lives at the binding site, not scattered across effects or derived values.</p>
	<p class="prose">Function bindings also work for readonly scenarios. You can pass a <code>null</code> getter with a setter to capture values the child produces (like <code>clientWidth</code>) without feeding anything back down. This pattern replaces the old <code>bind:clientWidth</code> shorthand with a more explicit, more flexible mechanism.</p>
	<p class="next">Next lesson: <a href="/module-3/3-7-snippets">3.7 — Snippets</a></p>
</section>

<style>
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

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview p {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		margin: 0;
		font-size: var(--text-sm);
	}

	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.preview code {
		background: var(--color-surface-1);
	}

	@media (min-inline-size: 768px) {
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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
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
