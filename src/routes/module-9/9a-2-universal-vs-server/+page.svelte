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
		"	\u003ch1\u003e9A.2 — Universal vs server load\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003e+page.ts\u003c/code\u003e is \u003cem\u003euniversal\u003c/em\u003e — it runs on the server\n" +
		"		during SSR and then \u003cem\u003eagain\u003c/em\u003e in the browser on client-side navigation.\n" +
		"		\u003ccode\u003e+page.server.ts\u003c/code\u003e is \u003cem\u003eserver only\u003c/em\u003e — it never runs in the browser. Both can\n" +
		"		coexist for the same route: the server loader runs first, and the universal loader receives\n" +
		"		its return value as \u003ccode\u003eevent.data\u003c/code\u003e and can merge or extend it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eserverSecret\u003c/span\u003e\n" +
		"			\u003ccode\u003e{data.serverSecret}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eprocessedAt (server, stable)\u003c/span\u003e\n" +
		"			\u003ccode\u003e{data.processedAt}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eclientTs (universal, updates on nav)\u003c/span\u003e\n" +
		"			\u003ccode\u003e{data.clientTs}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003ecombined\u003c/span\u003e\n" +
		"			\u003ccode\u003e{data.combined}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"note\"\u003e\n" +
		"			Navigate away and back client-side: \u003ccode\u003eclientTs\u003c/code\u003e will change but\n" +
		"			\u003ccode\u003eprocessedAt\u003c/code\u003e stays the same because the server loader only ran once during the\n" +
		"			initial SSR.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e+page.server.ts\u003c/code\u003e is server-only — use it for secrets and DB reads.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e+page.ts\u003c/code\u003e is universal — it runs on both server and client.\u003c/li\u003e\n" +
		"		\u003cli\u003eWhen both exist, the universal loader receives server data via \u003ccode\u003eevent.data\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eClient-side navigation re-runs the universal loader but reuses server data from SSR.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.2 — Universal vs server load</h1>

	<p class="concept">
		<strong>Concept.</strong> <code>+page.ts</code> is <em>universal</em> — it runs on the server
		during SSR and then <em>again</em> in the browser on client-side navigation.
		<code>+page.server.ts</code> is <em>server only</em> — it never runs in the browser. Both can
		coexist for the same route: the server loader runs first, and the universal loader receives
		its return value as <code>event.data</code> and can merge or extend it.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">serverSecret</span>
			<code>{data.serverSecret}</code>
		</div>
		<div class="row">
			<span class="label">processedAt (server, stable)</span>
			<code>{data.processedAt}</code>
		</div>
		<div class="row">
			<span class="label">clientTs (universal, updates on nav)</span>
			<code>{data.clientTs}</code>
		</div>
		<div class="row">
			<span class="label">combined</span>
			<code>{data.combined}</code>
		</div>
		<p class="note">
			Navigate away and back client-side: <code>clientTs</code> will change but
			<code>processedAt</code> stays the same because the server loader only ran once during the
			initial SSR.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Move the <code>serverSecret</code> into <code>+page.ts</code> instead of <code>+page.server.ts</code>.</strong> The secret is now bundled into the client JavaScript and visible in the browser's network tab, demonstrating why sensitive data must live in server-only loaders.</li>
		<li><strong>Delete the <code>+page.ts</code> file entirely.</strong> The page still renders using only server data, but <code>clientTs</code> and <code>combined</code> disappear because those were computed by the universal loader.</li>
		<li><strong>Remove <code>event.data</code> from the universal loader and try to access <code>serverSecret</code> directly.</strong> TypeScript errors because the universal loader has no independent access to the server loader's return value without going through <code>event.data</code>.</li>
		<li><strong>Navigate away and back using client-side links, then hard-refresh.</strong> On client-side nav, <code>processedAt</code> stays frozen (server loader did not re-run) but <code>clientTs</code> updates. On hard refresh, both update because the server re-runs.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit gives you two loader flavors for a reason. The server-only loader (<code>+page.server.ts</code>) is the right home for anything that must never reach the browser: database queries, API keys, environment secrets, and file-system reads. Its code is stripped entirely from the client bundle.</p>
	<p class="prose">The universal loader (<code>+page.ts</code>) runs on the server during SSR and then again in the browser on every client-side navigation. When both loaders coexist, the server loader runs first and its return value is passed to the universal loader via <code>event.data</code>, letting you merge, transform, or enrich server-only data with client-safe logic.</p>
	<p class="prose">This two-layer design means you can keep secrets locked on the server while still computing derived values that need to update on every navigation. The pattern is especially powerful for combining auth state (server) with client-side timestamps, preferences, or browser-only APIs.</p>
	<p class="next">Next up: how SvelteKit auto-generates types to keep loaders and components in sync.</p>
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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
