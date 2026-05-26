<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface ErrorExample {
		id: string;
		source: string;
		message: string;
		status: number;
		stack: string;
	}

	const errorExamples: readonly ErrorExample[] = [
		{
			id: crypto.randomUUID?.() ?? 'err-001',
			source: 'server',
			message: 'Cannot read properties of undefined (reading "email")',
			status: 500,
			stack: 'TypeError: Cannot read properties of undefined\n  at load (/src/routes/dashboard/+page.server.ts:12:18)\n  at render_page (internal)\n  at respond (internal)'
		},
		{
			id: crypto.randomUUID?.() ?? 'err-002',
			source: 'client',
			message: 'Failed to fetch /api/users',
			status: 0,
			stack: 'TypeError: Failed to fetch\n  at fetch_data (client.js:42)\n  at Dashboard.svelte:8:12'
		},
		{
			id: crypto.randomUUID?.() ?? 'err-003',
			source: 'server',
			message: 'ECONNREFUSED 127.0.0.1:5432',
			status: 500,
			stack: 'Error: connect ECONNREFUSED 127.0.0.1:5432\n  at TCPConnectWrap.afterConnect\n  at load (/src/routes/+page.server.ts:5:20)'
		}
	];

	let selectedError = $state<string>(errorExamples[0].id);
	let showStack = $state<boolean>(false);

	const currentError = $derived(errorExamples.find((e) => e.id === selectedError));

	const safeResponse = $derived(
		currentError
			? JSON.stringify(
					{
						message: 'An unexpected error occurred. Please try again.',
						errorId: currentError.id
					},
					null,
					2
				)
			: ''
	);

	const dangerousResponse = $derived(
		currentError
			? JSON.stringify(
					{
						message: currentError.message,
						stack: currentError.stack
					},
					null,
					2
				)
			: ''
	);

	/* ── Code snippets ── */
	const hooksServerCode = `// src/hooks.server.ts
import * as Sentry from '@sentry/sveltekit';
import type { HandleServerError } from '@sveltejs/kit';

// Initialize Sentry for server-side error tracking
Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE
});

// The init hook runs once when the server starts.
// Use it for database connections, service initialization.
export async function init() {
  console.log('[server] Initializing...');
  // await connectDatabase();
  // await warmCaches();
}

// handleError runs for every unhandled server error.
// Return a safe error object — never expose internals.
export const handleError: HandleServerError = async ({
  error,
  event,
  status,
  message
}) => {
  const errorId = crypto.randomUUID();

  // Log the full error for debugging (server-side only)
  console.error(\`[server] Error \${errorId}:\`, {
    status,
    message: (error as Error)?.message,
    stack: (error as Error)?.stack,
    url: event.url.pathname,
    method: event.request.method
  });

  // Report to Sentry with context
  Sentry.captureException(error, {
    extra: {
      errorId,
      url: event.url.pathname,
      method: event.request.method,
      status
    }
  });

  // Return a SAFE error to the client
  // Never return error.message or error.stack!
  return {
    message: 'An unexpected error occurred.',
    errorId
  };
};`;

	const hooksClientCode = `// src/hooks.client.ts
import * as Sentry from '@sentry/sveltekit';
import type { HandleClientError } from '@sveltejs/kit';

// Initialize Sentry for client-side error tracking
Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()]
});

// handleError runs for every unhandled client error.
export const handleError: HandleClientError = async ({
  error,
  event,
  status,
  message
}) => {
  const errorId = crypto.randomUUID();

  console.error(\`[client] Error \${errorId}:\`, error);

  Sentry.captureException(error, {
    extra: {
      errorId,
      url: event.url.pathname,
      status
    }
  });

  return {
    message: 'Something went wrong. Please try again.',
    errorId
  };
};`;

	const appDtsCode = `// src/app.d.ts
declare global {
  namespace App {
    // Shape of the error object returned by handleError
    // and available in $page.error
    interface Error {
      message: string;
      errorId: string;
    }

    interface Locals {
      // Set by hooks.server.ts handle()
      userId?: string;
    }

    interface PageData {
      // Shared data from root layout load
    }
  }
}

export {};`;

	const errorHtmlCode = `<!-- src/error.html -->
<!-- This is the FALLBACK error page. It renders when -->
<!-- SvelteKit itself crashes and cannot render +error.svelte. -->
<!-- Keep it simple — no components, no JS, no imports. -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>%sveltekit.error.message%</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        background: #111;
        color: #eee;
      }
      .error {
        text-align: center;
        padding: 2rem;
      }
      h1 { font-size: 3rem; margin: 0 0 1rem; }
      p { color: #999; max-width: 40ch; }
    </style>
  </head>
  <body>
    <div class="error">
      <h1>%sveltekit.status%</h1>
      <p>%sveltekit.error.message%</p>
    </div>
  </body>
</html>`;

	const errorSvelteCode = `<!-- src/routes/+error.svelte -->
${"<"}script lang="ts">
  import { page } from '$app/state';
${"<"}/script>

<section>
  <h1>{page.status}</h1>
  <p>{page.error?.message}</p>

  {#if page.error?.errorId}
    <p class="error-id">
      Reference: <code>{page.error.errorId}</code>
    </p>
  {/if}

  <a href="/">Go home</a>
</section>`;

	const structuredLoggingCode = `// Structured logging hook pattern
// Add to your handle() in hooks.server.ts

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const start = performance.now();

  const response = await resolve(event);

  const duration = Math.round(performance.now() - start);

  // Structured JSON log — parseable by log aggregators
  // (Datadog, Grafana Loki, CloudWatch, etc.)
  console.log(
    JSON.stringify({
      level: response.status >= 500 ? 'error'
           : response.status >= 400 ? 'warn'
           : 'info',
      method: event.request.method,
      path: event.url.pathname,
      status: response.status,
      duration_ms: duration,
      timestamp: new Date().toISOString(),
      user_agent: event.request.headers.get('user-agent'),
      ip: event.getClientAddress()
    })
  );

  return response;
};`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"\timport CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"\n" +
		"\tinterface ErrorExample {\n" +
		"\t\tid: string;\n" +
		"\t\tsource: string;\n" +
		"\t\tmessage: string;\n" +
		"\t\tstatus: number;\n" +
		"\t\tstack: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst errorExamples: readonly ErrorExample[] = [\n" +
		"\t\t{ id: 'err-001', source: 'server', message: 'Cannot read properties of undefined', status: 500, stack: '...' },\n" +
		"\t\t{ id: 'err-002', source: 'client', message: 'Failed to fetch /api/users', status: 0, stack: '...' },\n" +
		"\t\t{ id: 'err-003', source: 'server', message: 'ECONNREFUSED 127.0.0.1:5432', status: 500, stack: '...' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet selectedError = $state<string>('err-001');\n" +
		"\tlet showStack = $state<boolean>(false);\n" +
		"\tconst currentError = $derived(errorExamples.find((e) => e.id === selectedError));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\">\n" +
		"\t\u003ch1\u003e12.16 — Error monitoring\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\">A security camera for your code — you see every crash, even when no one reports it.\u003c/p\u003e\n" +
		"\t\u003c!-- ...error explorer, hooks code, logging, error pages... --\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>12.16 — Error monitoring in production</h1>

	<p class="concept">
		<strong>Concept.</strong>
		Users do not report bugs — they leave. A <code>console.error</code> on the server logs to
		nowhere unless someone is watching. Error monitoring is a security camera for your code: it
		captures every crash, every unhandled promise rejection, every failed API call — even when
		no user reports it. Without it, you are flying blind in production.
	</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 1: Why it matters                   -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Why error monitoring matters</h2>
	<p class="prose">In development, errors appear in your terminal and browser console. You see them immediately, fix them, and move on. In production, your server might be running on a Vercel function that spins up and dies in milliseconds — its console output is ephemeral. Client-side errors happen on your users' devices, in browsers you have never tested, on network connections you cannot control. Without a monitoring system, these errors are invisible.</p>

	<p class="prose">The goal is simple: when something breaks in production, you should know about it before your users do. A monitoring service like Sentry captures the error, the stack trace, the browser, the URL, the user's actions leading up to the crash, and groups duplicate errors together. Instead of a support ticket saying "it doesn't work," you get a detailed report with the exact line of code that failed.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 2: The handleError hook             -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>The handleError hook</h2>
	<p class="prose">SvelteKit provides a <code>handleError</code> hook in both <code>src/hooks.server.ts</code> and <code>src/hooks.client.ts</code>. Every unhandled error — a thrown exception in a load function, a failed API route, a runtime crash in a component — passes through this hook. The hook receives four arguments: <code>error</code> (the thrown value), <code>event</code> (the request/navigation event), <code>status</code> (HTTP status code), and <code>message</code> (the status text).</p>

	<p class="prose">The return value of <code>handleError</code> becomes the <code>$page.error</code> object available in your <code>+error.svelte</code> pages. This is where you control what the user sees. The critical rule: <strong>never return the raw error message or stack trace</strong>. Internal paths, database connection strings, and implementation details have no place in a user-facing error page. Instead, generate a unique <code>errorId</code> using <code>crypto.randomUUID()</code>, log the full error server-side, and return only the errorId and a generic message to the client.</p>

	<p class="prose">Type safety comes from the <code>App.Error</code> interface in <code>src/app.d.ts</code>. By declaring the shape of your error object there, TypeScript ensures that every <code>+error.svelte</code> page and every <code>$page.error</code> access is correctly typed. If your error object has an <code>errorId</code> field, TypeScript will catch any misspelling.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Error explorer                              -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Error explorer</h2>
	<p class="prose">Select an error below to see how a safe vs. dangerous response differs. Toggle the stack trace to see what you should never expose to users.</p>

	<div class="build">
		<div class="error-selector">
			{#each errorExamples as err (err.id)}
				<button
					class="error-btn"
					class:active={selectedError === err.id}
					onclick={() => (selectedError = err.id)}
				>
					<span class="error-source" class:server={err.source === 'server'} class:client={err.source === 'client'}>{err.source}</span>
					<span class="error-msg">{err.message.slice(0, 40)}...</span>
				</button>
			{/each}
		</div>

		{#if currentError}
			<div class="error-detail">
				<div class="detail-row">
					<span class="detail-label">Error ID</span>
					<code>{currentError.id}</code>
				</div>
				<div class="detail-row">
					<span class="detail-label">Source</span>
					<span>{currentError.source}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Status</span>
					<span>{currentError.status}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Message</span>
					<span>{currentError.message}</span>
				</div>
			</div>

			<div class="response-comparison">
				<div class="response-col safe">
					<h4>Safe response (what you should return)</h4>
					<pre>{safeResponse}</pre>
				</div>
				<div class="response-col dangerous">
					<h4>Dangerous response (never do this)</h4>
					<pre>{dangerousResponse}</pre>
				</div>
			</div>

			<button class="toggle-stack" onclick={() => (showStack = !showStack)}>
				{showStack ? 'Hide' : 'Show'} stack trace (server-side only)
			</button>

			{#if showStack}
				<pre class="stack-trace">{currentError.stack}</pre>
			{/if}
		{/if}
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 3: Sentry integration               -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Sentry integration</h2>
	<p class="prose">Sentry is the industry standard for error monitoring. The <code>@sentry/sveltekit</code> package provides first-class integration: install it with <code>pnpm add @sentry/sveltekit</code>, then initialize Sentry in both hooks files. The server hooks capture SSR errors, load function failures, and API route crashes. The client hooks capture unhandled promise rejections, component errors, and failed fetches. Source maps are uploaded during the build so Sentry shows you the original TypeScript source, not minified JavaScript.</p>

	<p class="prose">Sentry's Session Replay integration records user sessions leading up to a crash — mouse movements, clicks, page navigations — so you can see exactly what the user did before the error occurred. The <code>replaysOnErrorSampleRate: 1.0</code> setting ensures every error session is recorded, while <code>replaysSessionSampleRate: 0.1</code> samples 10% of normal sessions for performance baselines.</p>

	<div class="build">
		<h3>hooks.server.ts</h3>
		<pre>{hooksServerCode}</pre>
	</div>

	<div class="build">
		<h3>hooks.client.ts</h3>
		<pre>{hooksClientCode}</pre>
	</div>

	<div class="build">
		<h3>src/app.d.ts (type the error object)</h3>
		<pre>{appDtsCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 4: Structured logging               -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Structured logging</h2>
	<p class="prose">Console.log with strings is fine for development. In production, you need structured JSON logs that log aggregators (Datadog, Grafana Loki, CloudWatch Logs, Elasticsearch) can parse, index, and query. Every log line should include the HTTP method, path, status code, response duration, timestamp, and — where available — a user identifier. The <code>handle</code> hook in <code>hooks.server.ts</code> is the ideal place to add request logging because it wraps every single request.</p>

	<p class="prose">Log levels matter: <code>info</code> for successful requests (200-399), <code>warn</code> for client errors (400-499), and <code>error</code> for server errors (500+). This lets you set up alerts on error-level logs without being flooded by normal traffic. In Vercel, structured JSON logs are automatically parsed and displayed in the Functions tab. In Docker/Node deployments, pipe stdout to your log aggregator.</p>

	<div class="build">
		<h3>Structured logging in handle()</h3>
		<pre>{structuredLoggingCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 5: Custom error pages               -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Custom error pages</h2>
	<p class="prose">SvelteKit has two levels of error pages. The first is <code>+error.svelte</code> — a Svelte component that renders when a route throws an error or returns an error status. It has access to <code>$page.error</code> (your custom error object from <code>handleError</code>) and <code>$page.status</code>. Place it at <code>src/routes/+error.svelte</code> for a global error page, or in any route directory for route-specific error pages.</p>

	<p class="prose">The second is <code>src/error.html</code> — a plain HTML file that renders when SvelteKit itself crashes and cannot render <code>+error.svelte</code>. This happens during catastrophic failures like a syntax error in your root layout or a broken build. The file uses template variables (<code>%sveltekit.status%</code>, <code>%sveltekit.error.message%</code>) but no Svelte components, no JavaScript imports, no CSS frameworks. Keep it dead simple — it is your last line of defense.</p>

	<div class="build">
		<h3>src/error.html (fallback)</h3>
		<pre>{errorHtmlCode}</pre>
	</div>

	<div class="build">
		<h3>src/routes/+error.svelte (route-level)</h3>
		<pre>{errorSvelteCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 6: The init hook                    -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>The init hook</h2>
	<p class="prose">The <code>init</code> function in <code>hooks.server.ts</code> runs exactly once when the server starts — before any request is handled. This is the place for one-time setup: establishing database connection pools, warming caches, initializing third-party SDKs, or verifying that required environment variables are present. If <code>init</code> throws, the server does not start, which is exactly what you want if a critical dependency is unavailable.</p>

	<p class="prose">On serverless platforms (Vercel, Netlify), <code>init</code> runs once per function cold start. On long-running Node servers (adapter-node), it runs once at process startup. Either way, it guarantees that your setup code executes before any request handler, making it safe to rely on initialized resources in your load functions and API routes.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Break it on purpose                        -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a real-world error handling mistake. Try each one, observe the failure, then revert.</p>
	<ol class="experiments">
		<li><strong>Throw an error inside the <code>handleError</code> hook itself.</strong> SvelteKit has no fallback for an error in the error handler — the server crashes with an unhandled exception and the user sees a blank page or a generic platform error (like Vercel's 502). The lesson: <code>handleError</code> must be bulletproof. Wrap everything in <code>try/catch</code> and always return a valid error object, even if your logging service is down.</li>
		<li><strong>Return <code>error.message</code> directly to users in the <code>handleError</code> return value.</strong> The error message often contains internal paths (<code>/src/routes/dashboard/+page.server.ts:12:18</code>), database connection strings (<code>ECONNREFUSED 127.0.0.1:5432</code>), or SQL queries with table names. Exposing this information gives attackers a detailed map of your application's internals. Always return a generic message and a tracking ID.</li>
		<li><strong>Implement <code>handleError</code> in <code>hooks.server.ts</code> but forget <code>hooks.client.ts</code>.</strong> Server errors are captured, but client-side errors — failed fetches, runtime TypeErrors in components, unhandled promise rejections — are silently swallowed. The default client <code>handleError</code> only logs to the console, which is invisible in production. You need both hooks to get full coverage.</li>
		<li><strong>Do not generate an <code>errorId</code> in your error responses.</strong> A user contacts support saying "the page is broken." Without an error ID, the support team has no way to find the specific error in Sentry or the logs. They have to search by time range and URL, which is slow and error-prone. An error ID like <code>c3f8a2b1-...</code> gives them a direct link to the exact error, its stack trace, and the user's session replay.</li>
	</ol>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Having issues?                             -->
	<!-- ═══════════════════════════════════════════ -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- ═══════════════════════════════════════════ -->
	<!-- What you learned                           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>What you learned</h2>
	<p class="prose">Error monitoring in production is not optional — it is the difference between knowing your app is broken and finding out from a tweet. SvelteKit's <code>handleError</code> hook in <code>hooks.server.ts</code> and <code>hooks.client.ts</code> is the central point for capturing every unhandled error. The hook receives the raw error, the request event, the HTTP status, and the status message. Your job is to log the full error server-side (with structured JSON logs that your aggregator can parse), report it to a monitoring service like Sentry (with context: URL, method, user, errorId), and return a safe error object that exposes nothing about your internals.</p>
	<p class="prose">The <code>App.Error</code> interface in <code>src/app.d.ts</code> types your error object across the entire application. When <code>handleError</code> returns <code>{'{ message, errorId }'}</code>, that exact shape is available in <code>$page.error</code> in your <code>+error.svelte</code> pages. This type safety eliminates guesswork — you always know what fields the error object has. The errorId pattern is critical for support workflows: a user can provide a short ID, and your team can jump directly to the exact error in Sentry with its full stack trace, session replay, and request context.</p>
	<p class="prose">SvelteKit has two error page levels: <code>+error.svelte</code> for normal route errors (a Svelte component with full access to your layout and styling), and <code>src/error.html</code> for catastrophic failures when SvelteKit itself cannot render. The <code>init</code> hook in <code>hooks.server.ts</code> runs once at server startup, making it the right place for database connections, SDK initialization, and environment variable validation. Together, these hooks give you complete control over error handling from server startup to user-facing error pages.</p>
	<p class="next"><strong>Next:</strong> Apply these patterns to your production app — set up Sentry, add structured logging, and create custom error pages.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 { font-size: var(--text-xl); margin: 0; }
	h2 { font-size: var(--text-lg); margin: 0; margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text-muted); }
	h4 { font-size: var(--text-sm); margin: 0; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; word-wrap: break-word; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── Error selector ── */
	.error-selector {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.error-btn {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		cursor: pointer;
		text-align: left;
		font-size: var(--text-sm);
		transition: all 0.15s;
	}
	.error-btn:hover { background: var(--color-surface); }
	.error-btn.active { border-color: var(--color-brand); background: var(--color-surface); }
	.error-source {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
	}
	.error-source.server { background: oklch(0.35 0.15 25); color: oklch(0.85 0.12 25); }
	.error-source.client { background: oklch(0.35 0.15 250); color: oklch(0.85 0.12 250); }
	.error-msg { color: var(--color-text-muted); }

	/* ── Error detail ── */
	.error-detail {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}
	.detail-row {
		display: flex;
		gap: var(--space-sm);
		align-items: baseline;
		font-size: var(--text-sm);
	}
	.detail-label {
		min-inline-size: 5rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: var(--text-xs);
	}

	/* ── Response comparison ── */
	.response-comparison {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	@media (min-inline-size: 768px) {
		.response-comparison { grid-template-columns: 1fr 1fr; }
	}
	.response-col { display: flex; flex-direction: column; gap: var(--space-xs); }
	.response-col.safe pre { border-color: oklch(0.6 0.15 145); }
	.response-col.dangerous pre { border-color: oklch(0.6 0.15 25); }

	/* ── Stack trace toggle ── */
	.toggle-stack {
		align-self: flex-start;
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		cursor: pointer;
	}
	.toggle-stack:hover { color: var(--color-text); }
	.stack-trace {
		color: oklch(0.7 0.12 25);
		border-color: oklch(0.5 0.12 25);
		font-size: var(--text-xs);
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
