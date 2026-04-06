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
		"	\u003ch1\u003e9A.10 — SSG prerender\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eexport const prerender = true\u003c/code\u003e at the top of a\n" +
		"		\u003ccode\u003e+page.ts\u003c/code\u003e or \u003ccode\u003e+page.server.ts\u003c/code\u003e tells SvelteKit to render this route once at\n" +
		"		build time and serve the static HTML forever. Perfect for blog posts, documentation, landing pages —\n" +
		"		anything whose content does not change per request. Dynamic routes can still be prerendered if you\n" +
		"		export \u003ccode\u003eentries()\u003c/code\u003e from the loader returning the list of slugs to render.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eNote\u003c/span\u003e\n" +
		"			\u003cspan\u003e{data.buildInfo.note}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eBuilt at\u003c/span\u003e\n" +
		"			\u003cspan class=\"ts\"\u003e{data.buildInfo.builtAt}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"hint\"\u003e\n" +
		"			The \u003ccode\u003ebuiltAt\u003c/code\u003e timestamp is the \u003cstrong\u003ebuild\u003c/strong\u003e time, not the current time. Every\n" +
		"			visitor sees the same timestamp until the next \u003ccode\u003epnpm build\u003c/code\u003e.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e{`export const prerender = true;\n" +
		"\n" +
		"export const load: PageLoad = async () =\u003e ({\n" +
		"  buildInfo: { note: '...', builtAt: new Date().toISOString() }\n" +
		"});`}\u003c/pre\u003e\n" +
		"		\u003cp class=\"warn\"\u003e\n" +
		"			\u003cstrong\u003eDo not prerender\u003c/strong\u003e anything that varies per user (dashboards, account pages) or changes\n" +
		"			frequently (live data, search results).\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eexport const prerender = true\u003c/code\u003e renders once at build time\u003c/li\u003e\n" +
		"		\u003cli\u003eThe output is static HTML — fast, cacheable, CDN-friendly\u003c/li\u003e\n" +
		"		\u003cli\u003eDynamic routes need \u003ccode\u003eentries()\u003c/code\u003e to enumerate paths\u003c/li\u003e\n" +
		"		\u003cli\u003eAvoid for per-user or frequently changing content\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.10 — SSG prerender</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>export const prerender = true</code> at the top of a
		<code>+page.ts</code> or <code>+page.server.ts</code> tells SvelteKit to render this route once at
		build time and serve the static HTML forever. Perfect for blog posts, documentation, landing pages —
		anything whose content does not change per request. Dynamic routes can still be prerendered if you
		export <code>entries()</code> from the loader returning the list of slugs to render.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">Note</span>
			<span>{data.buildInfo.note}</span>
		</div>
		<div class="row">
			<span class="label">Built at</span>
			<span class="ts">{data.buildInfo.builtAt}</span>
		</div>
		<p class="hint">
			The <code>builtAt</code> timestamp is the <strong>build</strong> time, not the current time. Every
			visitor sees the same timestamp until the next <code>pnpm build</code>.
		</p>
		<pre>{`export const prerender = true;

export const load: PageLoad = async () => ({
  buildInfo: { note: '...', builtAt: new Date().toISOString() }
});`}</pre>
		<p class="warn">
			<strong>Do not prerender</strong> anything that varies per user (dashboards, account pages) or changes
			frequently (live data, search results).
		</p>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>export const prerender = true</code> renders once at build time</li>
		<li>The output is static HTML — fast, cacheable, CDN-friendly</li>
		<li>Dynamic routes need <code>entries()</code> to enumerate paths</li>
		<li>Avoid for per-user or frequently changing content</li>
	</ul>
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
	.ts {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.6;
	}
	.hint strong,
	.warn strong {
		color: var(--color-text);
	}
	.warn {
		font-size: var(--text-sm);
		color: var(--color-warning);
		margin: 0;
		line-height: 1.6;
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
		color: var(--color-text);
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
