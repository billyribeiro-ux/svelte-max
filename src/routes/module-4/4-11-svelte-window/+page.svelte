<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let showHelp = $state(false);
	let width = $state(0);
	let scrollY = $state(0);

	function handleKey(e: KeyboardEvent): void {
		if (e.key === '?' && (e.shiftKey || e.metaKey)) {
			showHelp = !showHelp;
			e.preventDefault();
		} else if (e.key === 'Escape') {
			showHelp = false;
		}
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let showHelp = $state(false);\n" +
		"\tlet width = $state(0);\n" +
		"\tlet scrollY = $state(0);\n" +
		"\n" +
		"\tfunction handleKey(e: KeyboardEvent): void {\n" +
		"\t\tif (e.key === '?' && (e.shiftKey || e.metaKey)) {\n" +
		"\t\t\tshowHelp = !showHelp;\n" +
		"\t\t\te.preventDefault();\n" +
		"\t\t} else if (e.key === 'Escape') {\n" +
		"\t\t\tshowHelp = false;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:window bind:innerWidth={width} bind:scrollY onkeydown={handleKey} /\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.11 — &lt;svelte:window&gt; and friends\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e&lt;svelte:window&gt;\u003c/code\u003e, \u003ccode\u003e&lt;svelte:document&gt;\u003c/code\u003e, and\n" +
		"\t\t\u003ccode\u003e&lt;svelte:body&gt;\u003c/code\u003e are Svelte's SSR-safe way to attach listeners and bindings to\n" +
		"\t\tglobal DOM objects. Svelte wires up the listeners on mount and cleans them up automatically on\n" +
		"\t\tunmount — no manual \u003ccode\u003e$effect\u003c/code\u003e needed. You can also \u003ccode\u003ebind:\u003c/code\u003e to properties\n" +
		"\t\tlike \u003ccode\u003einnerWidth\u003c/code\u003e, \u003ccode\u003escrollY\u003c/code\u003e, or \u003ccode\u003eactiveElement\u003c/code\u003e and Svelte\n" +
		"\t\tkeeps them reactive.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tPress \u003ckbd\u003eShift\u003c/kbd\u003e + \u003ckbd\u003e?\u003c/kbd\u003e to toggle the shortcut overlay. Press\n" +
		"\t\t\t\u003ckbd\u003eEscape\u003c/kbd\u003e to dismiss it. Resize the window and scroll the page to see the live bindings.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"live\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"metric\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"label\"\u003einnerWidth\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"value\"\u003e{width}px\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"metric\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"label\"\u003escrollY\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"value\"\u003e{Math.round(scrollY)}px\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" onclick={() =\u003e (showHelp = !showHelp)}\u003e\n" +
		"\t\t\t{showHelp ? 'Hide' : 'Show'} shortcuts\n" +
		"\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#if showHelp}\n" +
		"\t\t\t\u003cdiv class=\"overlay\" role=\"dialog\" aria-label=\"Keyboard shortcuts\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003eKeyboard shortcuts\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cdl\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ckbd\u003eShift\u003c/kbd\u003e + \u003ckbd\u003e?\u003c/kbd\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003eToggle this overlay\u003c/dd\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ckbd\u003eEscape\u003c/kbd\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003eClose overlay\u003c/dd\u003e\n" +
		"\t\t\t\t\u003c/dl\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e&lt;svelte:window&gt;\u003c/code\u003e attaches listeners and bindings to \u003ccode\u003ewindow\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSvelte auto-cleans listeners on unmount — no manual teardown\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ebind:innerWidth\u003c/code\u003e and \u003ccode\u003ebind:scrollY\u003c/code\u003e stay reactive as the user interacts\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e&lt;svelte:document&gt;\u003c/code\u003e exposes \u003ccode\u003evisibilitychange\u003c/code\u003e, \u003ccode\u003eactiveElement\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e&lt;svelte:body&gt;\u003c/code\u003e handles \u003ccode\u003emouseenter\u003c/code\u003e / \u003ccode\u003emouseleave\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:window bind:innerWidth={width} bind:scrollY onkeydown={handleKey} />

<section class="page">
	<h1>4.11 — &lt;svelte:window&gt; and friends</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>&lt;svelte:window&gt;</code>, <code>&lt;svelte:document&gt;</code>, and
		<code>&lt;svelte:body&gt;</code> are Svelte's SSR-safe way to attach listeners and bindings to
		global DOM objects. Svelte wires up the listeners on mount and cleans them up automatically on
		unmount — no manual <code>$effect</code> needed. You can also <code>bind:</code> to properties
		like <code>innerWidth</code>, <code>scrollY</code>, or <code>activeElement</code> and Svelte
		keeps them reactive.
	</p>

	<div class="build">
		<p class="hint">
			Press <kbd>Shift</kbd> + <kbd>?</kbd> to toggle the shortcut overlay. Press
			<kbd>Escape</kbd> to dismiss it. Resize the window and scroll the page to see the live bindings.
		</p>

		<div class="live">
			<div class="metric">
				<span class="label">innerWidth</span>
				<span class="value">{width}px</span>
			</div>
			<div class="metric">
				<span class="label">scrollY</span>
				<span class="value">{Math.round(scrollY)}px</span>
			</div>
		</div>

		<button type="button" onclick={() => (showHelp = !showHelp)}>
			{showHelp ? 'Hide' : 'Show'} shortcuts
		</button>

		{#if showHelp}
			<div class="overlay" role="dialog" aria-label="Keyboard shortcuts">
				<h2>Keyboard shortcuts</h2>
				<dl>
					<dt><kbd>Shift</kbd> + <kbd>?</kbd></dt>
					<dd>Toggle this overlay</dd>
					<dt><kbd>Escape</kbd></dt>
					<dd>Close overlay</dd>
				</dl>
			</div>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;svelte:window&gt;</code> attaches listeners and bindings to <code>window</code></li>
		<li>Svelte auto-cleans listeners on unmount — no manual teardown</li>
		<li><code>bind:innerWidth</code> and <code>bind:scrollY</code> stay reactive as the user interacts</li>
		<li><code>&lt;svelte:document&gt;</code> exposes <code>visibilitychange</code>, <code>activeElement</code></li>
		<li><code>&lt;svelte:body&gt;</code> handles <code>mouseenter</code> / <code>mouseleave</code></li>
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
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
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	kbd {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-xs);
		color: var(--color-text);
	}
	.live {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.metric {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		min-width: 120px;
	}
	.label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.value {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		color: var(--color-brand);
	}
	button {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.overlay {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
	}
	.overlay h2 {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-lg);
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-xs) var(--space-md);
		margin: 0;
	}
	dt {
		margin: 0;
	}
	dd {
		margin: 0;
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
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
