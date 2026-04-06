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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>bind:value={'{getter, setter}'}</code> lets you transform values as they cross the boundary.</li>
		<li>The child sees formatted strings; the parent keeps a clean typed value.</li>
		<li>No extra <code>$effect</code> is needed — the binding itself does the work.</li>
		<li>Function bindings also unlock readonly props like <code>clientWidth</code>.</li>
	</ul>
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

	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}

	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
