<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { on } from 'svelte/events';

	let listening = $state(false);
	let pressCount = $state(0);

	function toggle(): void {
		listening = !listening;
	}

	$effect(() => {
		if (!listening) return;
		const cleanup = on(window, 'keydown', () => {
			pressCount += 1;
		});
		return cleanup;
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { on } from 'svelte/events';\n" +
		"\n" +
		"\tlet listening = $state(false);\n" +
		"\tlet pressCount = $state(0);\n" +
		"\n" +
		"\tfunction toggle(): void {\n" +
		"\t\tlistening = !listening;\n" +
		"\t}\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tif (!listening) return;\n" +
		"\t\tconst cleanup = on(window, 'keydown', () =\u003e {\n" +
		"\t\t\tpressCount += 1;\n" +
		"\t\t});\n" +
		"\t\treturn cleanup;\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.6 — on() from svelte/events\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Sometimes you need to attach a listener dynamically — only when some\n" +
		"\t\tstate is true, or to \u003ccode\u003ewindow\u003c/code\u003e/\u003ccode\u003edocument\u003c/code\u003e. For conditional/dynamic cases\n" +
		"\t\tuse \u003ccode\u003eon(target, event, handler)\u003c/code\u003e from \u003ccode\u003esvelte/events\u003c/code\u003e: it returns a\n" +
		"\t\tcleanup function and preserves correct event ordering with declarative handlers.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" class=\"toggle\" class:on={listening} onclick={toggle}\u003e\n" +
		"\t\t\t{listening ? 'Stop listening' : 'Start listening'}\n" +
		"\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"status\"\u003e\n" +
		"\t\t\t\u003cp class=\"status-line\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"dot\" class:active={listening} aria-hidden=\"true\"\u003e\u003c/span\u003e\n" +
		"\t\t\t\t{listening ? 'Listening (press any key)' : 'Not listening'}\n" +
		"\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\u003cp class=\"count\"\u003eKey presses: \u003cstrong\u003e{pressCount}\u003c/strong\u003e\u003c/p\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eImport \u003ccode\u003eon\u003c/code\u003e from \u003ccode\u003esvelte/events\u003c/code\u003e for dynamic listeners.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eon()\u003c/code\u003e returns a cleanup — return it from \u003ccode\u003e$effect\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eIdeal for \u003ccode\u003ewindow\u003c/code\u003e/\u003ccode\u003edocument\u003c/code\u003e targets conditional on state.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.6 — on() from svelte/events</h1>
	<p class="concept">
		<strong>Concept.</strong> Sometimes you need to attach a listener dynamically — only when some
		state is true, or to <code>window</code>/<code>document</code>. For conditional/dynamic cases
		use <code>on(target, event, handler)</code> from <code>svelte/events</code>: it returns a
		cleanup function and preserves correct event ordering with declarative handlers.
	</p>

	<div class="build">
		<button type="button" class="toggle" class:on={listening} onclick={toggle}>
			{listening ? 'Stop listening' : 'Start listening'}
		</button>

		<div class="status">
			<p class="status-line">
				<span class="dot" class:active={listening} aria-hidden="true"></span>
				{listening ? 'Listening (press any key)' : 'Not listening'}
			</p>
			<p class="count">Key presses: <strong>{pressCount}</strong></p>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		The <code>on()</code> function exists for cases where declarative attributes are not enough. These experiments show when you need it and what goes wrong without it.
	</p>
	<ol class="experiments">
		<li><strong>Use <code>addEventListener</code> directly without cleanup.</strong> Inside a <code>$effect</code>, call <code>window.addEventListener('keydown', handler)</code> without returning a cleanup function. Toggle the listener on and off several times — each toggle adds another listener, and key presses fire the handler multiple times. This is a classic memory leak caused by forgetting to remove event listeners.</li>
		<li><strong>Use <code>on(window, 'keydown', handler)</code> instead.</strong> Replace the raw <code>addEventListener</code> with <code>on()</code> from <code>svelte/events</code>. It returns a cleanup function automatically. The listener is added once and can be removed by calling the returned function — no manual bookkeeping required.</li>
		<li><strong>Return the cleanup function from <code>$effect</code>.</strong> Write <code>return on(window, 'keydown', handler)</code> inside your effect. Now when the effect re-runs (because <code>listening</code> changed) or the component is destroyed, Svelte calls the cleanup automatically. The listener count stays at zero or one — never accumulating.</li>
		<li><strong>Use <code>on()</code> for events not available as attributes.</strong> Some events — custom events from third-party web components, or events on <code>window</code>/<code>document</code> — cannot be attached via HTML attributes in the template. The <code>on()</code> function is the escape hatch for these cases, giving you programmatic control while still integrating with Svelte's reactive lifecycle.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		The <code>on()</code> function from <code>svelte/events</code> is the programmatic counterpart to declarative event attributes. Where <code>onclick={'{handler}'}</code> works for elements in your template, <code>on(target, 'click', handler)</code> works for any <code>EventTarget</code> — including <code>window</code>, <code>document</code>, third-party web components, or DOM elements obtained via <code>bind:this</code>. It returns a cleanup function that removes the listener, making resource management explicit and composable.
	</p>
	<p class="prose">
		The idiomatic pattern is to use <code>on()</code> inside a <code>$effect</code> and return the cleanup function directly. When the effect's dependencies change or the component is destroyed, Svelte calls the cleanup automatically. This eliminates the manual <code>addEventListener</code>/<code>removeEventListener</code> dance that is both tedious and error-prone. It also preserves correct event ordering with other declarative handlers on the same element, which raw <code>addEventListener</code> does not guarantee.
	</p>
	<p class="prose">
		You should reach for <code>on()</code> in three specific situations: when you need to listen conditionally (only when some state is true), when the target is not a template element (global objects, dynamic references), or when you need to listen to an event name that is not a standard HTML attribute. For everything else — clicks on buttons, input events on fields, submit events on forms — declarative attributes are simpler, more readable, and automatically cleaned up by the compiler.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-7-closures">5.7 — Closures in event handlers</a></p>
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
	.toggle {
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}
	.toggle.on {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}
	.status {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.status-line {
		margin: 0;
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.dot {
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border-radius: var(--radius-full);
		background: var(--color-border);
		transition: background var(--dur-fast) var(--ease-out);
	}
	.dot.active {
		background: var(--color-success);
		box-shadow: 0 0 0 3px var(--color-brand-dim);
	}
	.count {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.count strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
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
