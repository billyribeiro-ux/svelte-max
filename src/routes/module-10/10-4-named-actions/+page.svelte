<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const loginForm = $derived(form?.action === 'login' ? form : null);
	const registerForm = $derived(form?.action === 'register' ? form : null);
</script>

<section class="page">
	<h1>10.4 — Named actions</h1>
	<p class="concept">
		<strong>Concept.</strong> A page can have multiple forms — login, register, delete-account, etc.
		Give each a named action:
		<code>{"actions: { login: async (e) => {}, register: async (e) => {} }"}</code>. Route a form to a
		named action with <code>{'action="?/login"'}</code>. The default action is called
		<code>default</code>. Only ONE action runs per submit.
	</p>

	<div class="build">
		<div class="forms">
			<form method="POST" action="?/login">
				<h3>Log in</h3>
				<label class="field">
					<span>Email</span>
					<input type="email" name="email" value={loginForm?.email ?? ''} required />
				</label>
				<label class="field">
					<span>Password</span>
					<input type="password" name="password" required />
				</label>
				<button type="submit" class="cta">Log in</button>
				<p class="hint">Try password: <code>demo</code></p>
				{#if loginForm?.error}
					<p class="pill error">{loginForm.error}</p>
				{/if}
				{#if loginForm?.success}
					<p class="pill success">{loginForm.message}</p>
				{/if}
			</form>

			<form method="POST" action="?/register">
				<h3>Register</h3>
				<label class="field">
					<span>Email</span>
					<input type="email" name="email" value={registerForm?.email ?? ''} required />
				</label>
				<label class="field">
					<span>Password</span>
					<input type="password" name="password" required minlength="6" />
				</label>
				<button type="submit" class="cta">Create account</button>
				<p class="hint">At least 6 characters.</p>
				{#if registerForm?.error}
					<p class="pill error">{registerForm.error}</p>
				{/if}
				{#if registerForm?.success}
					<p class="pill success">{registerForm.message}</p>
				{/if}
			</form>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Name actions inside the <code>actions</code> object — any key other than <code>default</code>.</li>
		<li>Target them with <code>{'action="?/name"'}</code> on the <code>&lt;form&gt;</code>.</li>
		<li>Return a discriminant like <code>{"{ action: 'login' as const }"}</code> so TS narrows correctly.</li>
		<li>Only one action runs per submit — the rest are untouched.</li>
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
	.forms {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		flex: 1;
	}
	form h3 {
		margin: 0 0 var(--space-xs);
		color: var(--color-text);
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
		background: var(--color-surface-1);
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
	.hint {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.forms {
			flex-direction: row;
		}
	}
</style>
