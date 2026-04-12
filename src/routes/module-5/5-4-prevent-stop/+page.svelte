<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let open = $state(false);
	let draft = $state('');
	let submitted = $state<string | null>(null);
	let panelEl: HTMLDivElement | null = $state(null);

	function toggle(e: MouseEvent): void {
		e.stopPropagation();
		open = !open;
	}

	function handleInput(e: Event): void {
		if (e.target instanceof HTMLInputElement) {
			draft = e.target.value;
		}
	}

	function handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		submitted = draft;
		draft = '';
	}

	$effect(() => {
		function onDocClick(e: MouseEvent): void {
			if (!open) return;
			if (panelEl && e.target instanceof Node && panelEl.contains(e.target)) {
				return;
			}
			open = false;
		}
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let open = $state(false);\n" +
		"\tlet draft = $state('');\n" +
		"\tlet submitted = $state\u003cstring | null\u003e(null);\n" +
		"\tlet panelEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"\tfunction toggle(e: MouseEvent): void {\n" +
		"\t\te.stopPropagation();\n" +
		"\t\topen = !open;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleInput(e: Event): void {\n" +
		"\t\tif (e.target instanceof HTMLInputElement) {\n" +
		"\t\t\tdraft = e.target.value;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleSubmit(e: SubmitEvent): void {\n" +
		"\t\te.preventDefault();\n" +
		"\t\tsubmitted = draft;\n" +
		"\t\tdraft = '';\n" +
		"\t}\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tfunction onDocClick(e: MouseEvent): void {\n" +
		"\t\t\tif (!open) return;\n" +
		"\t\t\tif (panelEl && e.target instanceof Node && panelEl.contains(e.target)) {\n" +
		"\t\t\t\treturn;\n" +
		"\t\t\t}\n" +
		"\t\t\topen = false;\n" +
		"\t\t}\n" +
		"\t\tdocument.addEventListener('click', onDocClick);\n" +
		"\t\treturn () =\u003e document.removeEventListener('click', onDocClick);\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.4 — preventDefault and stopPropagation\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003ee.preventDefault()\u003c/code\u003e cancels browser defaults (form\n" +
		"\t\tsubmission, link navigation, spacebar scroll). \u003ccode\u003ee.stopPropagation()\u003c/code\u003e halts bubbling\n" +
		"\t\tto ancestor handlers. Use them surgically — blindly calling both breaks accessibility and\n" +
		"\t\tkeyboard behavior.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"dropdown\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"trigger\" onclick={toggle}\u003e\n" +
		"\t\t\t\t{open ? 'Close' : 'Open'} menu\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t\t{#if open}\n" +
		"\t\t\t\t\u003cdiv class=\"panel\" bind:this={panelEl}\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"panel-title\"\u003eQuick action\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cform onsubmit={handleSubmit}\u003e\n" +
		"\t\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\t\ttype=\"text\"\n" +
		"\t\t\t\t\t\t\tplaceholder=\"Type something\"\n" +
		"\t\t\t\t\t\t\tvalue={draft}\n" +
		"\t\t\t\t\t\t\toninput={handleInput}\n" +
		"\t\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"submit\"\u003eSave\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/form\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"panel-hint\"\u003eClick outside to close. Clicking inside does not close.\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#if submitted}\n" +
		"\t\t\t\u003cp class=\"result\"\u003eLast submitted: \u003ccode\u003e{submitted}\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ee.preventDefault()\u003c/code\u003e stops the form from navigating on submit.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003ee.stopPropagation()\u003c/code\u003e on the trigger button keeps the outside-click handler from\n" +
		"\t\t\tclosing the panel immediately after opening it.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tFor the panel itself, the cleaner pattern is to check \u003ccode\u003epanelEl.contains(e.target)\u003c/code\u003e\n" +
		"\t\t\tin the document handler — no click listener on the panel div needed.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAttach global listeners via \u003ccode\u003e$effect\u003c/code\u003e and return a cleanup.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.4 — preventDefault and stopPropagation</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>e.preventDefault()</code> cancels browser defaults (form
		submission, link navigation, spacebar scroll). <code>e.stopPropagation()</code> halts bubbling
		to ancestor handlers. Use them surgically — blindly calling both breaks accessibility and
		keyboard behavior.
	</p>

	<div class="build">
		<div class="dropdown">
			<button type="button" class="trigger" onclick={toggle}>
				{open ? 'Close' : 'Open'} menu
			</button>

			{#if open}
				<div class="panel" bind:this={panelEl}>
					<p class="panel-title">Quick action</p>
					<form onsubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Type something"
							value={draft}
							oninput={handleInput}
						/>
						<button type="submit">Save</button>
					</form>
					<p class="panel-hint">Click outside to close. Clicking inside does not close.</p>
				</div>
			{/if}
		</div>

		{#if submitted}
			<p class="result">Last submitted: <code>{submitted}</code></p>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		These two methods — <code>preventDefault</code> and <code>stopPropagation</code> — control fundamentally different aspects of event flow. Break each one to see the distinction clearly.
	</p>
	<ol class="experiments">
		<li><strong>Submit the form without calling <code>preventDefault</code>.</strong> Remove the <code>e.preventDefault()</code> line from the submit handler and press Save. The browser performs a full-page navigation (its default behavior for form submission), wiping out all client-side state. This is the default you are overriding — and the reason single-page apps always call <code>preventDefault</code> on form submissions.</li>
		<li><strong>Add <code>preventDefault</code> back.</strong> Restore the call and submit again. The page stays put, your JavaScript handler processes the data, and state is preserved. You have told the browser "I will handle this myself" — the form still fires the <code>submit</code> event, but the browser no longer acts on it.</li>
		<li><strong>Click the toggle button without <code>stopPropagation</code>.</strong> Remove <code>e.stopPropagation()</code> from the toggle handler and click "Open menu." The panel flashes open and immediately closes because the click event bubbles up to the document-level outside-click listener, which sees it as a click outside the panel and closes it. The event reaches two handlers when you only wanted one.</li>
		<li><strong>Add <code>stopPropagation</code> back to the toggle button.</strong> Now clicking the button opens the panel and stays open. The click event is stopped at the button — it never reaches the document listener. Only a genuine click outside the panel (or pressing Escape, if you add that) closes it. This is the surgical use of <code>stopPropagation</code>: preventing a specific ancestor from seeing an event.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		<code>preventDefault</code> and <code>stopPropagation</code> operate on orthogonal axes. <code>preventDefault</code> cancels the browser's built-in response to an event — form submission, link navigation, spacebar scrolling, context-menu display. The event still fires and still bubbles; you are only suppressing the browser's default side effect. This is the correct tool when you want JavaScript to own the behavior that the browser would normally perform.
	</p>
	<p class="prose">
		<code>stopPropagation</code> halts the event's journey up the DOM tree. After you call it, no ancestor element's event handler will see the event. This is the correct tool when a parent listener would misinterpret a child's event — as in the dropdown pattern, where a document-level click listener must not treat the toggle button's click as an "outside" click. Note that Svelte 5 has no event modifiers (<code>|preventDefault</code>, <code>|stopPropagation</code>); you call the methods directly in your handler, which is more explicit and easier to reason about.
	</p>
	<p class="prose">
		A cleaner alternative to <code>stopPropagation</code> for many patterns is containment checking: in the document handler, test <code>panelEl.contains(e.target)</code> and bail out if the click landed inside the panel. This avoids stopping propagation entirely, which can interfere with analytics, third-party libraries, or other listeners higher in the tree. The general rule is to reach for <code>stopPropagation</code> only when containment checks are insufficient.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-5-forwarding">5.5 — Event forwarding</a></p>
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
	.dropdown {
		position: relative;
		align-self: flex-start;
	}
	.trigger {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
	}
	.panel {
		position: absolute;
		inset-block-start: calc(100% + var(--space-sm));
		inset-inline-start: 0;
		min-inline-size: 18rem;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 10;
		/* Smooth entry transition */
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	/* @starting-style — entry animation when panel goes from display:none to visible */
	@starting-style {
		.panel {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
	}
	.panel-title {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 600;
	}
	.panel form {
		display: flex;
		gap: var(--space-sm);
	}
	.panel input {
		flex: 1;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
	}
	.panel button[type='submit'] {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
		cursor: pointer;
	}
	.panel-hint {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.result {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
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
