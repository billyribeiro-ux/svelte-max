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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Import <code>on</code> from <code>svelte/events</code> for dynamic listeners.</li>
		<li><code>on()</code> returns a cleanup — return it from <code>$effect</code>.</li>
		<li>Ideal for <code>window</code>/<code>document</code> targets conditional on state.</li>
	</ul>
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
