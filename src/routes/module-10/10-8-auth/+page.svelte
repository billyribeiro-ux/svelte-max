<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();
</script>

<section class="page">
	<h1>10.8 — Cookie-based authentication</h1>
	<p class="concept">
		<strong>Concept.</strong> A session cookie is just a random token. On login, the server creates
		the token, maps it to a user in memory (or a database), and calls
		<code>cookies.set('session', token, &lbrace; httpOnly, secure, sameSite, maxAge &rbrace;)</code>.
		On every later request, <code>cookies.get('session')</code> yields the token and the server
		looks the user back up. Real apps put this lookup in <code>hooks.server.ts</code> so every load
		and action sees <code>locals.user</code>. This demo has no password — the point is the cookie
		flow, not credential handling.
	</p>

	<div class="build">
		{#if data.user}
			<h3>Signed in</h3>
			<p>Hi, <strong>{data.user.name}</strong> — your session cookie is set.</p>
			<form method="POST" action="?/logout">
				<button class="cta" type="submit">Log out</button>
			</form>
			{#if form && 'loggedOut' in form && form.loggedOut}
				<span class="success-pill">Session cleared.</span>
			{/if}
		{:else}
			<h3>Log in</h3>
			<form method="POST" action="?/login" class="stack">
				<label class="field">
					<span>Email</span>
					<input
						type="email"
						name="email"
						list="known-emails"
						value={form && 'email' in form ? (form.email ?? '') : ''}
						placeholder="ada@example.com"
					/>
					<datalist id="known-emails">
						{#each data.availableEmails as e (e)}
							<option value={e}></option>
						{/each}
					</datalist>
				</label>
				{#if form && 'error' in form && form.error}
					<span class="error-pill">{form.error}</span>
				{/if}
				<button class="cta" type="submit">Log in</button>
			</form>
		{/if}

		<h3>Cookie attributes</h3>
		<ul>
			<li><code>httpOnly: true</code> — JS in the page cannot read the cookie (blocks XSS theft).</li>
			<li><code>sameSite: 'lax'</code> — cookie is not sent on cross-site POSTs (blocks CSRF).</li>
			<li><code>secure: true</code> — only sent over HTTPS. Enable in production.</li>
			<li><code>maxAge</code> — seconds until expiry. Omit for a session cookie.</li>
			<li><code>path: '/'</code> — scope so every route receives the cookie.</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Session cookies hold opaque tokens, not user data.</li>
		<li>The server-side map is the source of truth — losing it logs everyone out.</li>
		<li>Named actions <code>?/login</code> and <code>?/logout</code> let one page own both flows.</li>
		<li>With no <code>use:enhance</code>, the page still works — the form does a full POST and reload.</li>
	</ul>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.stack { display: flex; flex-direction: column; gap: var(--space-md); }
	.field { display: flex; flex-direction: column; gap: var(--space-xs); }
	.field > span { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); font-weight: 600; }
	.field input { font: inherit; font-size: var(--text-sm); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); }
	.field input:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }
	.error-pill { background: var(--color-error); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	.success-pill { background: var(--color-success); color: var(--color-surface); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); font-size: var(--text-sm); align-self: flex-start; }
	button.cta { background: var(--color-brand); color: var(--color-surface); border: none; border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; cursor: pointer; align-self: flex-start; }
	button.cta:hover:not(:disabled) { background: var(--color-brand-dim); }
	p { color: var(--color-text-muted); margin: 0; line-height: 1.6; }
	p strong { color: var(--color-text); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
