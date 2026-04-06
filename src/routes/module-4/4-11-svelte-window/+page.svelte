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

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Use <code>window.addEventListener</code> directly instead of <code>&lt;svelte:window&gt;</code>.</strong> It works, but you must manually remove the listener in an <code>onDestroy</code> or <code>$effect</code> cleanup function. Forget the cleanup and you have a memory leak that persists across navigations and accumulates duplicate listeners.</li>
		<li><strong>Use <code>&lt;svelte:window onresize={'{handler}'} /&gt;</code> instead.</strong> Svelte wires up the listener on mount and removes it automatically when the component is destroyed. No cleanup code, no leak risk, and the declarative syntax makes it immediately obvious which global events the component cares about.</li>
		<li><strong>Add <code>bind:innerWidth</code> to track the viewport width reactively.</strong> Svelte keeps the bound variable in sync with the window's actual width on every resize event. Use it to implement responsive logic in JavaScript -- like switching between a mobile menu and a desktop nav -- without media queries.</li>
		<li><strong>Add <code>bind:scrollY</code> to track the scroll position.</strong> The value updates continuously as the user scrolls, giving you a reactive number you can use for parallax effects, sticky headers, scroll-to-top buttons, or progress indicators. Combine it with <code>$derived</code> to compute values like "user has scrolled past the hero section."</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>&lt;svelte:window&gt;</code> is Svelte's declarative interface to the global <code>window</code> object. It lets you attach event listeners and property bindings directly in your template markup, and Svelte handles the lifecycle automatically: listeners are added on mount and removed on unmount, with no manual cleanup code required. This eliminates an entire class of memory-leak bugs that plague vanilla JavaScript applications.</p>
	<p class="prose">Property bindings like <code>bind:innerWidth</code> and <code>bind:scrollY</code> turn window properties into reactive state variables. Every time the browser fires a resize or scroll event, Svelte updates the bound variable, which in turn triggers any dependent <code>$derived</code> computations and template updates. This reactive pipeline lets you build scroll-driven animations, responsive layout switches, and viewport-aware components with just a few lines of declarative code.</p>
	<p class="prose">Svelte provides two companion elements: <code>&lt;svelte:document&gt;</code> for document-level events like <code>visibilitychange</code> and bindings like <code>activeElement</code>, and <code>&lt;svelte:body&gt;</code> for body-level events like <code>mouseenter</code> and <code>mouseleave</code> that do not bubble to window. Together, these three special elements give you complete, SSR-safe access to the browser's global objects without ever calling <code>addEventListener</code> directly.</p>
	<p class="next">Next lesson: <a href="/module-4/4-12-svelte-element">4.12 — &lt;svelte:element&gt;</a></p>
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
