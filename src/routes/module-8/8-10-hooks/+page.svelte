<script lang="ts">
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
</style>
