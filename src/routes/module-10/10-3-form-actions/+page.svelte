<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();
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
</style>
