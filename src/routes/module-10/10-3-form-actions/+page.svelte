<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { form, data }: { form: ActionData; data: PageData } = $props();


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { ActionData, PageData } from './$types';\n" +
		"\n" +
		"	let { form, data }: { form: ActionData; data: PageData } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e10.3 — Form actions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Form actions live in \u003ccode\u003e+page.server.ts\u003c/code\u003e as an\n" +
		"		\u003ccode\u003eactions\u003c/code\u003e export. Each action is an async function that receives the request event. The\n" +
		"		browser submits the form natively (no JS required) — SvelteKit intercepts server-side, runs the\n" +
		"		action, and either redirects or returns \u003ccode\u003eActionData\u003c/code\u003e that the page renders. This is the\n" +
		"		default pattern for mutations. Progressive enhancement: works without JS, faster with it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cform method=\"POST\"\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eName\u003c/span\u003e\n" +
		"				\u003cinput type=\"text\" name=\"name\" value={form?.name ?? ''} required /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"field\"\u003e\n" +
		"				\u003cspan\u003eMessage\u003c/span\u003e\n" +
		"				\u003ctextarea name=\"body\" rows=\"3\" required\u003e{form?.body ?? ''}\u003c/textarea\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003cbutton type=\"submit\" class=\"cta\"\u003eSend message\u003c/button\u003e\n" +
		"		\u003c/form\u003e\n" +
		"\n" +
		"		{#if form?.error}\n" +
		"			\u003cp class=\"pill error\"\u003e{form.error}\u003c/p\u003e\n" +
		"		{/if}\n" +
		"		{#if form?.success}\n" +
		"			\u003cp class=\"pill success\"\u003eSent! Total messages: {form.messageCount}\u003c/p\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003ch3\u003eRecent messages\u003c/h3\u003e\n" +
		"		{#if data.messages.length === 0}\n" +
		"			\u003cp class=\"muted\"\u003eNo messages yet — send one above.\u003c/p\u003e\n" +
		"		{:else}\n" +
		"			\u003cul class=\"msgs\"\u003e\n" +
		"				{#each data.messages as m (m.id)}\n" +
		"					\u003cli\u003e\n" +
		"						\u003cstrong\u003e{m.name}\u003c/strong\u003e\n" +
		"						\u003cspan class=\"muted\"\u003e· {new Date(m.at).toLocaleTimeString()}\u003c/span\u003e\n" +
		"						\u003cp\u003e{m.body}\u003c/p\u003e\n" +
		"					\u003c/li\u003e\n" +
		"				{/each}\n" +
		"			\u003c/ul\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Try disabling JavaScript in DevTools and submitting — it still works. That is progressive\n" +
		"		enhancement.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eExport \u003ccode\u003eactions\u003c/code\u003e from \u003ccode\u003e+page.server.ts\u003c/code\u003e; the \u003ccode\u003edefault\u003c/code\u003e action handles unnamed submits.\u003c/li\u003e\n" +
		"		\u003cli\u003eRead fields with \u003ccode\u003eawait request.formData()\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eReturn \u003ccode\u003efail(400, {'{...}'})\u003c/code\u003e for validation errors; return a plain object on success.\u003c/li\u003e\n" +
		"		\u003cli\u003eAccess the result on the page via the \u003ccode\u003eform\u003c/code\u003e prop, typed as \u003ccode\u003eActionData\u003c/code\u003e.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>10.3 — Form actions</h1>
	<p class="concept">
		<strong>Concept.</strong> Form actions live in <code>+page.server.ts</code> as an
		<code>actions</code> export. Each action is an async function that receives the request event. The
		browser submits the form natively (no JS required) — SvelteKit intercepts server-side, runs the
		action, and either redirects or returns <code>ActionData</code> that the page renders. This is the
		default pattern for mutations. Progressive enhancement: works without JS, faster with it.
	</p>

	<div class="build">
		<form method="POST">
			<label class="field">
				<span>Name</span>
				<input type="text" name="name" value={form?.name ?? ''} required />
			</label>
			<label class="field">
				<span>Message</span>
				<textarea name="body" rows="3" required>{form?.body ?? ''}</textarea>
			</label>
			<button type="submit" class="cta">Send message</button>
		</form>

		{#if form?.error}
			<p class="pill error">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="pill success">Sent! Total messages: {form.messageCount}</p>
		{/if}

		<h3>Recent messages</h3>
		{#if data.messages.length === 0}
			<p class="muted">No messages yet — send one above.</p>
		{:else}
			<ul class="msgs">
				{#each data.messages as m (m.id)}
					<li>
						<strong>{m.name}</strong>
						<span class="muted">· {new Date(m.at).toLocaleTimeString()}</span>
						<p>{m.body}</p>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<p class="concept">
		Try disabling JavaScript in DevTools and submitting — it still works. That is progressive
		enhancement.
	</p>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Export <code>actions</code> from <code>+page.server.ts</code>; the <code>default</code> action handles unnamed submits.</li>
		<li>Read fields with <code>await request.formData()</code>.</li>
		<li>Return <code>fail(400, {'{...}'})</code> for validation errors; return a plain object on success.</li>
		<li>Access the result on the page via the <code>form</code> prop, typed as <code>ActionData</code>.</li>
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
	.field input,
	.field textarea {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-family: inherit;
	}
	.field input:focus-visible,
	.field textarea:focus-visible {
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
	.pill {
		margin: 0;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
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
	.msgs {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.msgs li {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface);
	}
	.msgs p {
		margin: var(--space-xs) 0 0;
		color: var(--color-text);
	}
	.muted {
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
