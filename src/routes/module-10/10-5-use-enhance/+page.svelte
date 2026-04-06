<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { enhance } from '$app/forms';\n" +
		"	import type { ActionData } from './$types';\n" +
		"\n" +
		"	let { form }: { form: ActionData } = $props();\n" +
		"	let submitting = $state(false);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.5 — use:enhance\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003euse:enhance\u003c/code\u003e from \u003ccode\u003e$app/forms\u003c/code\u003e progressively\n" +
		"		enhances a form — JS intercepts the submit and handles it via \u003ccode\u003efetch\u003c/code\u003e in the background\n" +
		"		without a page reload, but the form still works if JS is disabled. The default enhancement updates\n" +
		"		the page with the action result automatically. Passing a callback gives you pending state,\n" +
		"		success/error handling, and control over whether to apply the default update.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cform\n" +
		"			method=\"POST\"\n" +
		"			use:enhance={() =\u003e {\n" +
		"				submitting = true;\n" +
		"				return async ({ update }) =\u003e {\n" +
		"					await update();\n" +
		"					submitting = false;\n" +
		"				};\n" +
		"			}}\n" +
		"		\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eTask\u003c/span\u003e\n" +
		"				\u003cinput type=\"text\" name=\"task\" placeholder=\"Ship the feature\" required /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003cbutton type=\"submit\" class=\"cta\" disabled={submitting}\u003e\n" +
		"				{submitting ? 'Saving...' : 'Create task'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/form\u003e\n" +
		"\n" +
		"		{#if submitting}\n" +
		"			\u003cp class=\"pill pending\"\u003ePending — server is working...\u003c/p\u003e\n" +
		"		{/if}\n" +
		"		{#if form?.error}\n" +
		"			\u003cp class=\"pill error\"\u003e{form.error}\u003c/p\u003e\n" +
		"		{/if}\n" +
		"		{#if form?.success}\n" +
		"			\u003cp class=\"pill success\"\u003e\n" +
		"				Created \u003cstrong\u003e{form.task}\u003c/strong\u003e at {new Date(form.createdAt).toLocaleTimeString()}\n" +
		"			\u003c/p\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		The outer callback runs \u003cem\u003ebefore\u003c/em\u003e the request is sent — call \u003ccode\u003ecancel()\u003c/code\u003e there to\n" +
		"		abort. The inner callback runs \u003cem\u003eafter\u003c/em\u003e the response; call \u003ccode\u003eupdate()\u003c/code\u003e to apply\n" +
		"		the default behavior (update \u003ccode\u003eform\u003c/code\u003e, invalidate, reset the form).\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCancel and result branches.\u003c/strong\u003e The \u003ccode\u003euse:enhance\u003c/code\u003e callback receives\n" +
		"		\u003ccode\u003e{'{ cancel }'}\u003c/code\u003e — call it to abort submission. The inner callback receives\n" +
		"		\u003ccode\u003e{'{ result }'}\u003c/code\u003e with \u003ccode\u003eresult.type\u003c/code\u003e being \u003ccode\u003e'success'\u003c/code\u003e,\n" +
		"		\u003ccode\u003e'failure'\u003c/code\u003e, \u003ccode\u003e'redirect'\u003c/code\u003e, or \u003ccode\u003e'error'\u003c/code\u003e. Check\n" +
		"		\u003ccode\u003eresult.type\u003c/code\u003e to handle each case differently.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003euse:enhance\u003c/code\u003e turns a native POST form into an AJAX submit with zero extra code.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe callback shape is outer (before submit) returning inner (after response).\u003c/li\u003e\n" +
		"		\u003cli\u003eUse a \u003ccode\u003esubmitting\u003c/code\u003e \u003ccode\u003e$state\u003c/code\u003e flag to render pending UI.\u003c/li\u003e\n" +
		"		\u003cli\u003eCall \u003ccode\u003eawait update()\u003c/code\u003e to apply the default result handling, or skip it to take control.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.5 — use:enhance</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>use:enhance</code> from <code>$app/forms</code> progressively
		enhances a form — JS intercepts the submit and handles it via <code>fetch</code> in the background
		without a page reload, but the form still works if JS is disabled. The default enhancement updates
		the page with the action result automatically. Passing a callback gives you pending state,
		success/error handling, and control over whether to apply the default update.
	</p>

	<div class="build">
		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					await update();
					submitting = false;
				};
			}}
		>
			<label class="field">
				<span>Task</span>
				<input type="text" name="task" placeholder="Ship the feature" required />
			</label>
			<button type="submit" class="cta" disabled={submitting}>
				{submitting ? 'Saving...' : 'Create task'}
			</button>
		</form>

		{#if submitting}
			<p class="pill pending">Pending — server is working...</p>
		{/if}
		{#if form?.error}
			<p class="pill error">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="pill success">
				Created <strong>{form.task}</strong> at {new Date(form.createdAt).toLocaleTimeString()}
			</p>
		{/if}
	</div>

	<p class="concept">
		The outer callback runs <em>before</em> the request is sent — call <code>cancel()</code> there to
		abort. The inner callback runs <em>after</em> the response; call <code>update()</code> to apply
		the default behavior (update <code>form</code>, invalidate, reset the form).
	</p>

	<p class="concept">
		<strong>Cancel and result branches.</strong> The <code>use:enhance</code> callback receives
		<code>{'{ cancel }'}</code> — call it to abort submission. The inner callback receives
		<code>{'{ result }'}</code> with <code>result.type</code> being <code>'success'</code>,
		<code>'failure'</code>, <code>'redirect'</code>, or <code>'error'</code>. Check
		<code>result.type</code> to handle each case differently.
	</p>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>use:enhance</code> turns a native POST form into an AJAX submit with zero extra code.</li>
		<li>The callback shape is outer (before submit) returning inner (after response).</li>
		<li>Use a <code>submitting</code> <code>$state</code> flag to render pending UI.</li>
		<li>Call <code>await update()</code> to apply the default result handling, or skip it to take control.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
		margin-inline: auto;
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
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field > span {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.field input {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
	}
	.field input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	button.cta {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
	}
	button.cta:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button.cta:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.pill {
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}
	.pill.pending {
		background: var(--color-surface-2);
		color: var(--color-warning);
		border: 1px solid var(--color-warning);
	}
	.pill.error {
		background: var(--color-surface-2);
		color: var(--color-error);
		border: 1px solid var(--color-error);
	}
	.pill.success {
		background: var(--color-surface-2);
		color: var(--color-success);
		border: 1px solid var(--color-success);
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

	/* === RESPONSIVE BREAKPOINTS === */
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
