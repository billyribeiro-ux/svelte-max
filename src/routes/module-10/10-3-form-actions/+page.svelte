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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>method="POST"</code> attribute from the <code>&lt;form&gt;</code> tag.</strong> The form submits as a GET request, SvelteKit finds no matching GET action, and you get a 405 error because form actions only respond to POST.</li>
		<li><strong>Change <code>fail(400, ...)</code> to a plain <code>return</code> with the same error shape.</strong> The page still renders the data, but SvelteKit treats it as a success response and resets the form fields, so the user loses their partially-entered input.</li>
		<li><strong>Try accessing <code>form.name</code> directly without the optional chain <code>form?.name</code>.</strong> On the first page load <code>form</code> is <code>null</code> because no action has run yet, so your template throws a runtime error trying to read a property of null.</li>
		<li><strong>Disable JavaScript in DevTools and submit the form.</strong> It still works because SvelteKit processes the action server-side and returns a full page reload with the updated <code>form</code> prop, proving progressive enhancement is built in.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Form actions are SvelteKit's answer to the age-old question of how to handle mutations. They live in <code>+page.server.ts</code> as an <code>actions</code> export, and the default action runs whenever a <code>&lt;form method="POST"&gt;</code> on that page is submitted. The browser sends a native form submission, which means it works even with JavaScript disabled.</p>
	<p class="prose">Inside the action you call <code>await request.formData()</code> to read the fields, validate them, and either return <code>fail(status, data)</code> for errors or return a plain success object. The returned data becomes the <code>form</code> prop on the page, fully typed as <code>ActionData</code>, so your template can branch on success or failure with full type safety.</p>
	<p class="prose">The beauty of this pattern is progressive enhancement by default. Without any client-side JavaScript the form does a full round-trip POST and page reload. Add <code>use:enhance</code> later and the same form upgrades to an AJAX-style submit with no structural changes to your code.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-10/10-4-named-actions">10.4 — Named actions</a> — handle multiple forms on a single page.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
