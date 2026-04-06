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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Hooks are SvelteKit's middleware layer — one file, three exports.</li>
		<li><code>sequence()</code> lets you compose small single-purpose handlers.</li>
		<li><code>handleFetch</code> is how you add auth headers to internal APIs.</li>
	</ul>
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
