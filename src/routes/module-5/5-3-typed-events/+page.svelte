<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Shortcut = {
		key: string;
		ctrl: boolean;
		shift: boolean;
		meta: boolean;
	};

	let lastKey = $state<Shortcut | null>(null);

	function handleKey(e: KeyboardEvent): void {
		e.preventDefault();
		lastKey = {
			key: e.key === ' ' ? 'Space' : e.key,
			ctrl: e.ctrlKey,
			shift: e.shiftKey,
			meta: e.metaKey
		};
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Shortcut = {\n" +
		"\t\tkey: string;\n" +
		"\t\tctrl: boolean;\n" +
		"\t\tshift: boolean;\n" +
		"\t\tmeta: boolean;\n" +
		"\t};\n" +
		"\n" +
		"\tlet lastKey = $state\u003cShortcut | null\u003e(null);\n" +
		"\n" +
		"\tfunction handleKey(e: KeyboardEvent): void {\n" +
		"\t\te.preventDefault();\n" +
		"\t\tlastKey = {\n" +
		"\t\t\tkey: e.key === ' ' ? 'Space' : e.key,\n" +
		"\t\t\tctrl: e.ctrlKey,\n" +
		"\t\t\tshift: e.shiftKey,\n" +
		"\t\t\tmeta: e.metaKey\n" +
		"\t\t};\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.3 — Typed DOM events\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e TypeScript gives you \u003ccode\u003eMouseEvent\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003eKeyboardEvent\u003c/code\u003e, \u003ccode\u003eInputEvent\u003c/code\u003e, \u003ccode\u003eFocusEvent\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003eSubmitEvent\u003c/code\u003e. Since \u003ccode\u003ee.target\u003c/code\u003e is\n" +
		"\t\t\u003ccode\u003eEventTarget | null\u003c/code\u003e, narrow with\n" +
		"\t\t\u003ccode\u003einstanceof HTMLInputElement\u003c/code\u003e before reading \u003ccode\u003e.value\u003c/code\u003e — the compiler\n" +
		"\t\tcatches typos.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"capture\" tabindex=\"0\" onkeydown={handleKey} role=\"textbox\" aria-label=\"Shortcut capture zone\"\u003e\n" +
		"\t\t\tClick here to focus, then press any key combination.\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#if lastKey}\n" +
		"\t\t\t\u003cdiv class=\"pills\" aria-live=\"polite\"\u003e\n" +
		"\t\t\t\t{#if lastKey.ctrl}\u003ckbd\u003eCtrl\u003c/kbd\u003e{/if}\n" +
		"\t\t\t\t{#if lastKey.meta}\u003ckbd\u003eMeta\u003c/kbd\u003e{/if}\n" +
		"\t\t\t\t{#if lastKey.shift}\u003ckbd\u003eShift\u003c/kbd\u003e{/if}\n" +
		"\t\t\t\t\u003ckbd class=\"key\"\u003e{lastKey.key}\u003c/kbd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cp class=\"hint\"\u003eNo key captured yet.\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eType handler params with concrete event types like \u003ccode\u003eKeyboardEvent\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRead modifier flags: \u003ccode\u003ee.ctrlKey\u003c/code\u003e, \u003ccode\u003ee.shiftKey\u003c/code\u003e, \u003ccode\u003ee.metaKey\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDivs need \u003ccode\u003etabindex=\"0\"\u003c/code\u003e to receive keyboard focus and events.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.3 — Typed DOM events</h1>
	<p class="concept">
		<strong>Concept.</strong> TypeScript gives you <code>MouseEvent</code>,
		<code>KeyboardEvent</code>, <code>InputEvent</code>, <code>FocusEvent</code>,
		<code>SubmitEvent</code>. Since <code>e.target</code> is
		<code>EventTarget | null</code>, narrow with
		<code>instanceof HTMLInputElement</code> before reading <code>.value</code> — the compiler
		catches typos.
	</p>

	<div class="build">
		<div class="capture" tabindex="0" onkeydown={handleKey} role="textbox" aria-label="Shortcut capture zone">
			Click here to focus, then press any key combination.
		</div>

		{#if lastKey}
			<div class="pills" aria-live="polite">
				{#if lastKey.ctrl}<kbd>Ctrl</kbd>{/if}
				{#if lastKey.meta}<kbd>Meta</kbd>{/if}
				{#if lastKey.shift}<kbd>Shift</kbd>{/if}
				<kbd class="key">{lastKey.key}</kbd>
			</div>
		{:else}
			<p class="hint">No key captured yet.</p>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Type handler params with concrete event types like <code>KeyboardEvent</code>.</li>
		<li>Read modifier flags: <code>e.ctrlKey</code>, <code>e.shiftKey</code>, <code>e.metaKey</code>.</li>
		<li>Divs need <code>tabindex="0"</code> to receive keyboard focus and events.</li>
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
	.capture {
		background: var(--color-surface-2);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		color: var(--color-text-muted);
		text-align: center;
		cursor: text;
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.capture:focus {
		outline: none;
		border-color: var(--color-brand);
		box-shadow: 0 0 0 3px var(--color-brand-dim);
	}
	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}
	kbd {
		display: inline-block;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	kbd.key {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
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
