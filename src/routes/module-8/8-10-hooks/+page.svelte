<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const hooksCode: string = `// src/hooks.server.ts
import type { Handle, HandleServerError, HandleFetch } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const logger: Handle = async ({ event, resolve }) => {
	const started = Date.now();
	const response = await resolve(event);
	console.log(\`[\${event.request.method}] \${event.url.pathname} → \${response.status} (\${Date.now() - started}ms)\`);
	return response;
};

const securityHeaders: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin');
	return response;
};

export const handle = sequence(logger, securityHeaders);

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('Unhandled error', error, 'at', event.url.pathname);
	return { message: 'Something went wrong.' };
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith('https://api.internal/')) {
		request.headers.set('x-trace-id', crypto.randomUUID());
	}
	return fetch(request);
};`;

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"const hooksCode: string = `// src/hooks.server.ts\n" +
		"import type { Handle, HandleServerError, HandleFetch } from '@sveltejs/kit';\n" +
		"import { sequence } from '@sveltejs/kit/hooks';\n" +
		"\n" +
		"const logger: Handle = async ({ event, resolve }) =\u003e {\n" +
		"\tconst started = Date.now();\n" +
		"\tconst response = await resolve(event);\n" +
		"\tconsole.log(\\`[\\${event.request.method}] \\${event.url.pathname} → \\${response.status} (\\${Date.now() - started}ms)\\`);\n" +
		"\treturn response;\n" +
		"};\n" +
		"\n" +
		"const securityHeaders: Handle = async ({ event, resolve }) =\u003e {\n" +
		"\tconst response = await resolve(event);\n" +
		"\tresponse.headers.set('X-Frame-Options', 'DENY');\n" +
		"\tresponse.headers.set('Referrer-Policy', 'strict-origin');\n" +
		"\treturn response;\n" +
		"};\n" +
		"\n" +
		"export const handle = sequence(logger, securityHeaders);\n" +
		"\n" +
		"export const handleError: HandleServerError = ({ error, event }) =\u003e {\n" +
		"\tconsole.error('Unhandled error', error, 'at', event.url.pathname);\n" +
		"\treturn { message: 'Something went wrong.' };\n" +
		"};\n" +
		"\n" +
		"export const handleFetch: HandleFetch = async ({ request, fetch }) =\u003e {\n" +
		"\tif (request.url.startsWith('https://api.internal/')) {\n" +
		"\t\trequest.headers.set('x-trace-id', crypto.randomUUID());\n" +
		"\t}\n" +
		"\treturn fetch(request);\n" +
		"};`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.10 — hooks.server.ts\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003esrc/hooks.server.ts\u003c/code\u003e exports \u003ccode\u003ehandle\u003c/code\u003e, \u003ccode\u003ehandleError\u003c/code\u003e, and\n" +
		"\t\t\u003ccode\u003ehandleFetch\u003c/code\u003e. \u003ccode\u003ehandle\u003c/code\u003e wraps every request — log, authenticate, add\n" +
		"\t\theaders, or rewrite the response. \u003ccode\u003ehandleError\u003c/code\u003e is the server error boundary.\n" +
		"\t\t\u003ccode\u003ehandleFetch\u003c/code\u003e intercepts fetches made inside load functions. Compose multiple\n" +
		"\t\thandle functions with \u003ccode\u003esequence()\u003c/code\u003e from \u003ccode\u003e@sveltejs/kit/hooks\u003c/code\u003e. This is\n" +
		"\t\tyour middleware layer.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cpre\u003e\u003ccode\u003e{hooksCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat each line does\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003elogger\u003c/code\u003e measures request duration and logs method + path + status.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esecurityHeaders\u003c/code\u003e adds defensive headers to every response.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esequence(logger, securityHeaders)\u003c/code\u003e composes them in order.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ehandleError\u003c/code\u003e is your last line of defence — log, then return a safe message.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ehandleFetch\u003c/code\u003e lets you attach trace IDs to internal API calls from loads.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eHooks are SvelteKit's middleware layer — one file, three exports.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esequence()\u003c/code\u003e lets you compose small single-purpose handlers.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003ehandleFetch\u003c/code\u003e is how you add auth headers to internal APIs.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.10 — hooks.server.ts</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>src/hooks.server.ts</code> exports <code>handle</code>, <code>handleError</code>, and
		<code>handleFetch</code>. <code>handle</code> wraps every request — log, authenticate, add
		headers, or rewrite the response. <code>handleError</code> is the server error boundary.
		<code>handleFetch</code> intercepts fetches made inside load functions. Compose multiple
		handle functions with <code>sequence()</code> from <code>@sveltejs/kit/hooks</code>. This is
		your middleware layer.
	</p>

	<div class="build">
		<pre><code>{hooksCode}</code></pre>
	</div>

	<h3>What each line does</h3>
	<ul>
		<li><code>logger</code> measures request duration and logs method + path + status.</li>
		<li><code>securityHeaders</code> adds defensive headers to every response.</li>
		<li><code>sequence(logger, securityHeaders)</code> composes them in order.</li>
		<li><code>handleError</code> is your last line of defence — log, then return a safe message.</li>
		<li><code>handleFetch</code> lets you attach trace IDs to internal API calls from loads.</li>
	</ul>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment exposes a different failure mode of the hooks system. Revert after each one.</p>
	<ol class="experiments">
		<li><strong>In your <code>handle</code> function, forget to call <code>resolve(event)</code> and just return a new <code>Response('hello')</code>.</strong> Every single route in the application returns the string "hello" — pages, API endpoints, everything. This demonstrates that <code>handle</code> wraps the entire request pipeline, and calling <code>resolve</code> is what lets the normal routing continue. Skipping it short-circuits the entire application.</li>
		<li><strong>Reverse the order of handlers in <code>sequence(securityHeaders, logger)</code>.</strong> The logger now measures time including the header-setting work, and the log appears after headers are set. While functionally similar here, in real middleware (auth before logging, for example) order determines whether the downstream handler sees authenticated context. This proves that <code>sequence</code> composes left-to-right like function composition.</li>
		<li><strong>Throw an unhandled error inside <code>handle</code> without a <code>handleError</code> export.</strong> SvelteKit returns its default 500 page with a generic "Internal Error" message. No useful information reaches the user, and the error details only appear in the server console. Adding <code>handleError</code> gives you control over the error shape returned to the client.</li>
		<li><strong>In <code>handleFetch</code>, return a completely fabricated <code>new Response('{"{}"}')</code> instead of calling <code>fetch(request)</code>.</strong> Every server-side fetch inside load functions receives your fake response. Data loading appears to work but returns empty data. This shows that <code>handleFetch</code> is a powerful interception point that can mock, redirect, or tamper with any fetch made during SSR.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit's hooks system is the framework's middleware layer, centralized in a single file at <code>src/hooks.server.ts</code>. The <code>handle</code> export wraps every incoming request and gives you access to the event object (containing the request, URL, locals, and more) and a <code>resolve</code> function that continues to the normal routing pipeline. By choosing when and whether to call <code>resolve</code>, you can log requests, authenticate users, add security headers, rewrite responses, or short-circuit the pipeline entirely.</p>
	<p class="prose">The <code>sequence()</code> helper from <code>@sveltejs/kit/hooks</code> composes multiple handle functions into a single pipeline, executing them left-to-right. Each handler receives the event and a resolve function that calls the next handler in the chain, following the same middleware pattern used by Express, Koa, and other server frameworks. This composability encourages writing small, focused handlers — one for logging, one for auth, one for CORS — rather than a monolithic function that handles everything.</p>
	<p class="prose">The two companion exports, <code>handleError</code> and <code>handleFetch</code>, cover the remaining server-side concerns. <code>handleError</code> is invoked for any uncaught server error and lets you log the full error while returning a safe, user-friendly message to the client. <code>handleFetch</code> intercepts every <code>fetch</code> call made inside load functions during SSR, enabling you to attach authentication headers, rewrite URLs to internal services, or even mock responses during testing. Together, these three exports give you comprehensive control over the server-side request lifecycle.</p>
	<p class="next">Next, you will learn how shallow routing lets you update history state without a full navigation.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 80ch;
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
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
		line-height: 1.5;
	}
	pre code {
		background: none;
		padding: 0;
		font-size: inherit;
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
