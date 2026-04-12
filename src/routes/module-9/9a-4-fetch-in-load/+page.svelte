<script lang="ts">
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();

	const loaderSnippet = `import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/tip');
  const body = await res.json();
  return { tip: body };
};`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\n" +
		"	const loaderSnippet = `import type { PageLoad } from './$types';\n" +
		"\n" +
		"export const load: PageLoad = async ({ fetch }) =\u003e {\n" +
		"  const res = await fetch('/api/tip');\n" +
		"  const body = await res.json();\n" +
		"  return { tip: body };\n" +
		"};`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.4 — Enhanced fetch in load\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e The \u003ccode\u003efetch\u003c/code\u003e argument you destructure from the load event\n" +
		"		is SvelteKit's \u003cem\u003eenhanced\u003c/em\u003e fetch. It inherits credentials from the current request, is\n" +
		"		SSR-aware (short-circuiting same-origin calls to avoid a real HTTP round-trip during SSR), and\n" +
		"		inlines responses into the SSR HTML so the client doesn't refetch on hydration. Always use the\n" +
		"		destructured \u003ccode\u003efetch\u003c/code\u003e, never \u003ccode\u003eglobalThis.fetch\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"tip-headline\"\u003e{data.tip.tip}\u003c/p\u003e\n" +
		"		\u003cp class=\"tip-kind\"\u003e\n" +
		"			Using \u003ccode\u003e{data.tip.fetchType}\u003c/code\u003e\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e{loaderSnippet}\u003c/pre\u003e\n" +
		"		\u003cp class=\"why\"\u003e\n" +
		"			Why it matters: during SSR, a call to \u003ccode\u003e/api/data\u003c/code\u003e through the enhanced\n" +
		"			\u003ccode\u003efetch\u003c/code\u003e skips the network entirely — SvelteKit invokes the endpoint handler\n" +
		"			directly. On hydration the client reuses the inlined response, so the user never sees a\n" +
		"			flash of loading state for the initial render.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eDestructure \u003ccode\u003efetch\u003c/code\u003e from the load event — don't import a global.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe enhanced fetch inherits credentials and is SSR-aware.\u003c/li\u003e\n" +
		"		\u003cli\u003eSSR responses are inlined so the client doesn't re-request on hydration.\u003c/li\u003e\n" +
		"		\u003cli\u003eSame-origin requests short-circuit directly to the endpoint handler.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.4 — Enhanced fetch in load</h1>

	<p class="concept">
		<strong>Concept.</strong> The <code>fetch</code> argument you destructure from the load event
		is SvelteKit's <em>enhanced</em> fetch. It inherits credentials from the current request, is
		SSR-aware (short-circuiting same-origin calls to avoid a real HTTP round-trip during SSR), and
		inlines responses into the SSR HTML so the client doesn't refetch on hydration. Always use the
		destructured <code>fetch</code>, never <code>globalThis.fetch</code>.
	</p>

	<div class="build">
		<p class="tip-headline">{data.tip.tip}</p>
		<p class="tip-kind">
			Using <code>{data.tip.fetchType}</code>
		</p>
		<pre>{loaderSnippet}</pre>
		<p class="why">
			Why it matters: during SSR, a call to <code>/api/data</code> through the enhanced
			<code>fetch</code> skips the network entirely — SvelteKit invokes the endpoint handler
			directly. On hydration the client reuses the inlined response, so the user never sees a
			flash of loading state for the initial render.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Replace the destructured <code>fetch</code> with <code>globalThis.fetch</code>.</strong> During SSR the call to <code>/api/tip</code> fails because <code>globalThis.fetch</code> does not know the server's origin. The enhanced fetch resolves same-origin URLs automatically.</li>
		<li><strong>Use an absolute URL like <code>http://localhost:5173/api/tip</code> in the loader.</strong> It works in dev but breaks in production because the port and host differ. The enhanced fetch handles relative URLs portably across environments.</li>
		<li><strong>Inspect the SSR HTML source and look for the inlined response.</strong> You will see the fetched JSON embedded in a <code>script</code> tag. Delete that tag manually in DevTools and reload client-side to watch the client re-fetch, proving the inline prevents a redundant request.</li>
		<li><strong>Add <code>credentials: 'omit'</code> to the fetch options.</strong> Cookies are no longer forwarded to the API endpoint, so any auth-gated endpoint returns 401 during SSR. The default behavior inherits credentials from the incoming request.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>fetch</code> you destructure from the load event is not the browser's native <code>fetch</code>. It is SvelteKit's enhanced version that inherits cookies and credentials from the incoming request, resolves relative URLs correctly during SSR, and short-circuits same-origin calls by invoking your API endpoint handler directly instead of making a real HTTP round trip.</p>
	<p class="prose">On top of that, responses from the enhanced fetch are inlined into the SSR HTML. When the client hydrates, it reuses the inlined data instead of re-fetching, which eliminates the flash of loading state that plagues many SSR frameworks. This is why the page feels instant on first load.</p>
	<p class="prose">Always use the destructured <code>fetch</code> inside load functions. Using <code>globalThis.fetch</code> or importing <code>fetch</code> from somewhere else bypasses all of these optimizations and breaks SSR for same-origin routes.</p>
	<p class="next">Next up: sharing data across routes with layout loaders.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
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
	.tip-headline {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-brand);
	}
	.tip-kind {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.why {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
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
