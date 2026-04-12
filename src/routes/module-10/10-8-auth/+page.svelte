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
		"	\u003ch1\u003e10.8 — Cookie-based authentication\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A session cookie is just a random token. On login, the server creates\n" +
		"		the token, maps it to a user in memory (or a database), and calls\n" +
		"		\u003ccode\u003ecookies.set('session', token, &lbrace; httpOnly, secure, sameSite, maxAge &rbrace;)\u003c/code\u003e.\n" +
		"		On every later request, \u003ccode\u003ecookies.get('session')\u003c/code\u003e yields the token and the server\n" +
		"		looks the user back up. Real apps put this lookup in \u003ccode\u003ehooks.server.ts\u003c/code\u003e so every load\n" +
		"		and action sees \u003ccode\u003elocals.user\u003c/code\u003e. This demo has no password — the point is the cookie\n" +
		"		flow, not credential handling.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		{#if data.user}\n" +
		"			\u003ch3\u003eSigned in\u003c/h3\u003e\n" +
		"			\u003cp\u003eHi, \u003cstrong\u003e{data.user.name}\u003c/strong\u003e — your session cookie is set.\u003c/p\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/logout\"\u003e\n" +
		"				\u003cbutton class=\"cta\" type=\"submit\"\u003eLog out\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"			{#if form && 'loggedOut' in form && form.loggedOut}\n" +
		"				\u003cspan class=\"success-pill\"\u003eSession cleared.\u003c/span\u003e\n" +
		"			{/if}\n" +
		"		{:else}\n" +
		"			\u003ch3\u003eLog in\u003c/h3\u003e\n" +
		"			\u003cform method=\"POST\" action=\"?/login\" class=\"stack\"\u003e\n" +
		"				\u003clabel class=\"field\"\u003e\n" +
		"					\u003cspan\u003eEmail\u003c/span\u003e\n" +
		"					\u003cinput\n" +
		"						type=\"email\"\n" +
		"						name=\"email\"\n" +
		"						list=\"known-emails\"\n" +
		"						value={form && 'email' in form ? (form.email ?? '') : ''}\n" +
		"						placeholder=\"ada@example.com\"\n" +
		"					/\u003e\n" +
		"					\u003cdatalist id=\"known-emails\"\u003e\n" +
		"						{#each data.availableEmails as e (e)}\n" +
		"							\u003coption value={e}\u003e\u003c/option\u003e\n" +
		"						{/each}\n" +
		"					\u003c/datalist\u003e\n" +
		"				\u003c/label\u003e\n" +
		"				{#if form && 'error' in form && form.error}\n" +
		"					\u003cspan class=\"error-pill\"\u003e{form.error}\u003c/span\u003e\n" +
		"				{/if}\n" +
		"				\u003cbutton class=\"cta\" type=\"submit\"\u003eLog in\u003c/button\u003e\n" +
		"			\u003c/form\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003ch3\u003eCookie attributes\u003c/h3\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003ehttpOnly: true\u003c/code\u003e — JS in the page cannot read the cookie (blocks XSS theft).\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003esameSite: 'lax'\u003c/code\u003e — cookie is not sent on cross-site POSTs (blocks CSRF).\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003esecure: true\u003c/code\u003e — only sent over HTTPS. Enable in production.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003emaxAge\u003c/code\u003e — seconds until expiry. Omit for a session cookie.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003epath: '/'\u003c/code\u003e — scope so every route receives the cookie.\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eSecurity in production.\u003c/strong\u003e (1) \u003ccode\u003ehttpOnly: true\u003c/code\u003e prevents JavaScript from\n" +
		"		reading the cookie — protects against XSS. (2) \u003ccode\u003esecure: true\u003c/code\u003e ensures the cookie only\n" +
		"		travels over HTTPS. (3) \u003ccode\u003esameSite: 'lax'\u003c/code\u003e blocks cross-site request forgery.\n" +
		"		(4) Set \u003ccode\u003emaxAge\u003c/code\u003e to limit session lifetime. This demo skips the password — real auth\n" +
		"		uses bcrypt hashing and never stores plaintext.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eSession cookies hold opaque tokens, not user data.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe server-side map is the source of truth — losing it logs everyone out.\u003c/li\u003e\n" +
		"		\u003cli\u003eNamed actions \u003ccode\u003e?/login\u003c/code\u003e and \u003ccode\u003e?/logout\u003c/code\u003e let one page own both flows.\u003c/li\u003e\n" +
		"		\u003cli\u003eWith no \u003ccode\u003euse:enhance\u003c/code\u003e, the page still works — the form does a full POST and reload.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<p class="concept">
		<strong>Security in production.</strong> (1) <code>httpOnly: true</code> prevents JavaScript from
		reading the cookie — protects against XSS. (2) <code>secure: true</code> ensures the cookie only
		travels over HTTPS. (3) <code>sameSite: 'lax'</code> blocks cross-site request forgery.
		(4) Set <code>maxAge</code> to limit session lifetime. This demo skips the password — real auth
		uses bcrypt hashing and never stores plaintext.
	</p>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>httpOnly: true</code> from the <code>cookies.set()</code> call.</strong> Now run <code>document.cookie</code> in the browser console and you can see the session token, proving that without <code>httpOnly</code> any XSS script could steal the session.</li>
		<li><strong>Set <code>path</code> to the current route instead of <code>'/'</code>.</strong> The cookie is scoped to this lesson's URL, so navigating to another page and back loses the session because the browser does not send the cookie outside that path.</li>
		<li><strong>Delete the server-side session map entry but keep the cookie.</strong> The cookie still arrives on the next request, but the server cannot find a matching session, so it treats the user as logged out, proving the server map is the source of truth.</li>
		<li><strong>Store the user object directly in the cookie value instead of an opaque token.</strong> The data is visible in DevTools Application tab, and a user could forge a cookie with any email, bypassing authentication entirely because the server trusts the cookie contents.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Cookie-based authentication follows a simple flow: on login the server generates a random opaque token, stores a mapping from that token to the user record, and sets the token as an <code>httpOnly</code> cookie. On every subsequent request the server reads the cookie, looks up the token, and populates <code>locals.user</code> so that load functions and actions can check who is making the request.</p>
	<p class="prose">The cookie attributes are your security controls. <code>httpOnly</code> prevents JavaScript from reading the token (mitigating XSS theft), <code>sameSite: 'lax'</code> blocks cross-site request forgery, <code>secure</code> ensures the cookie only travels over HTTPS, and <code>path: '/'</code> makes the cookie available to every route in your application.</p>
	<p class="prose">In production you would move the session lookup into <code>hooks.server.ts</code> so every request is authenticated before any load function or action runs. The session store would be a database or Redis rather than an in-memory map, and passwords would be hashed with bcrypt or argon2 rather than stored in plaintext.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-10/10-9-file-uploads">10.9 — File uploads</a> — handle multipart form data on the server.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
