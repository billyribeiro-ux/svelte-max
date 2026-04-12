<script lang="ts">
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.8 — error() and redirect()\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003ethrow error(status, message)\u003c/code\u003e from \u003ccode\u003e@sveltejs/kit\u003c/code\u003e\n" +
		"		in a load function causes SvelteKit to render the closest \u003ccode\u003e+error.svelte\u003c/code\u003e with that status\n" +
		"		and message. \u003ccode\u003ethrow redirect(status, location)\u003c/code\u003e sends the user to another URL. Common patterns:\n" +
		"		\u003ccode\u003eerror(404, 'Not found')\u003c/code\u003e for missing resources, \u003ccode\u003eredirect(302, '/login')\u003c/code\u003e for\n" +
		"		auth gates. SvelteKit catches these throws and handles them correctly.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"status\"\u003e{data.normal}\u003c/p\u003e\n" +
		"		\u003cdiv class=\"links\"\u003e\n" +
		"			\u003ca href=\"/module-9/9a-8-error-redirect\"\u003eNormal (no params)\u003c/a\u003e\n" +
		"			\u003ca href=\"/module-9/9a-8-error-redirect?mode=error\"\u003eTrigger error (?mode=error)\u003c/a\u003e\n" +
		"			\u003ca href=\"/module-9/9a-8-error-redirect?mode=redirect\"\u003eTrigger redirect (?mode=redirect)\u003c/a\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cul class=\"explain\"\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003eNormal:\u003c/strong\u003e loads this page as you see it.\u003c/li\u003e\n" +
		"			\u003cli\u003e\n" +
		"				\u003cstrong\u003eError:\u003c/strong\u003e the loader throws \u003ccode\u003eerror(418, ...)\u003c/code\u003e. Since this lesson has\n" +
		"				no \u003ccode\u003e+error.svelte\u003c/code\u003e, SvelteKit's default framework error page appears with status\n" +
		"				418.\n" +
		"			\u003c/li\u003e\n" +
		"			\u003cli\u003e\n" +
		"				\u003cstrong\u003eRedirect:\u003c/strong\u003e the loader throws \u003ccode\u003eredirect(302, ...)\u003c/code\u003e and you land on\n" +
		"				lesson 9A.1.\n" +
		"			\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ethrow error(status, message)\u003c/code\u003e renders the nearest error page\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ethrow redirect(status, location)\u003c/code\u003e navigates elsewhere\u003c/li\u003e\n" +
		"		\u003cli\u003eBoth are imported from \u003ccode\u003e@sveltejs/kit\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eUse 302/307 for temporary, 301/308 for permanent redirects\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.8 — error() and redirect()</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>throw error(status, message)</code> from <code>@sveltejs/kit</code>
		in a load function causes SvelteKit to render the closest <code>+error.svelte</code> with that status
		and message. <code>throw redirect(status, location)</code> sends the user to another URL. Common patterns:
		<code>error(404, 'Not found')</code> for missing resources, <code>redirect(302, '/login')</code> for
		auth gates. SvelteKit catches these throws and handles them correctly.
	</p>

	<div class="build">
		<p class="status">{data.normal}</p>
		<div class="links">
			<a href="/module-9/9a-8-error-redirect">Normal (no params)</a>
			<a href="/module-9/9a-8-error-redirect?mode=error">Trigger error (?mode=error)</a>
			<a href="/module-9/9a-8-error-redirect?mode=redirect">Trigger redirect (?mode=redirect)</a>
		</div>
		<ul class="explain">
			<li><strong>Normal:</strong> loads this page as you see it.</li>
			<li>
				<strong>Error:</strong> the loader throws <code>error(418, ...)</code>. Since this lesson has
				no <code>+error.svelte</code>, SvelteKit's default framework error page appears with status
				418.
			</li>
			<li>
				<strong>Redirect:</strong> the loader throws <code>redirect(302, ...)</code> and you land on
				lesson 9A.1.
			</li>
		</ul>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Throw a plain <code>new Error('boom')</code> instead of using <code>error()</code> from <code>@sveltejs/kit</code>.</strong> SvelteKit treats unrecognized throws as unexpected 500 errors. The error page shows a generic message instead of your custom one because SvelteKit hides unexpected error details in production.</li>
		<li><strong>Change <code>error(418, ...)</code> to <code>error(200, ...)</code>.</strong> SvelteKit rejects the call because 200 is not an error status code. The <code>error()</code> helper requires a 4xx or 5xx code.</li>
		<li><strong>Change the redirect status from 302 to 301.</strong> The browser caches a 301 redirect permanently. Even after you revert the code, the browser keeps redirecting until you clear the cache. This is why 302 (temporary) is safer during development.</li>
		<li><strong>Add a <code>+error.svelte</code> file next to this page.</strong> Now when you trigger the error, your custom error component renders instead of SvelteKit's default. Remove it again to see the default return. This proves that error boundaries are resolved by walking up the layout tree.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit provides two special throw helpers for load functions: <code>error(status, message)</code> and <code>redirect(status, location)</code>, both imported from <code>@sveltejs/kit</code>. When a loader throws <code>error()</code>, SvelteKit walks up the layout tree looking for the nearest <code>+error.svelte</code> component and renders it with the status and message you provided.</p>
	<p class="prose">Redirects work similarly: throwing <code>redirect(302, '/login')</code> sends the user to another URL before the page component ever renders. Use 302 or 307 for temporary redirects, and 301 or 308 for permanent ones. Be careful with permanent redirects during development because browsers cache them aggressively.</p>
	<p class="prose">Both helpers must be thrown, not returned. SvelteKit catches these specific throw types and handles them through its internal routing logic. Any other thrown value is treated as an unexpected error and triggers a 500 response with sanitized details in production.</p>
	<p class="next">Next up: streaming slow data while showing fast data instantly.</p>
</section>

<style>
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
	.status {
		color: var(--color-text);
		margin: 0;
		line-height: 1.6;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.links a {
		color: var(--color-brand);
		text-decoration: none;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
	.links a:hover {
		border-color: var(--color-brand);
	}
	.explain {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	.explain strong {
		color: var(--color-text);
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
	@media (min-inline-size: 768px) {
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
