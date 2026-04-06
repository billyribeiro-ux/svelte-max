<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let submitting = $state(false);
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
</style>
