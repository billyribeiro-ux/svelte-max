<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Locale {
		code: string;
		label: string;
	}

	const locales: Locale[] = [
		{ code: 'en-US', label: 'English (US)' },
		{ code: 'en-GB', label: 'English (UK)' },
		{ code: 'de-DE', label: 'German' },
		{ code: 'ja-JP', label: 'Japanese' }
	];

	let current = $state<string>('en-US');

	const base = 'https://svelte-max.example';
	const path = '/articles/oklch';

	const tags = $derived([
		...locales.map((l) => ({
			hreflang: l.code,
			href: `${base}/${l.code}${path}`
		})),
		{ hreflang: 'x-default', href: `${base}${path}` }
	]);

	const rendered = $derived(
		tags
			.map((t) => `<link rel="alternate" hreflang="${t.hreflang}" href="${t.href}" />`)
			.join('\n')
	);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface Locale {\n" +
		"		code: string;\n" +
		"		label: string;\n" +
		"	}\n" +
		"\n" +
		"	const locales: Locale[] = [\n" +
		"		{ code: 'en-US', label: 'English (US)' },\n" +
		"		{ code: 'en-GB', label: 'English (UK)' },\n" +
		"		{ code: 'de-DE', label: 'German' },\n" +
		"		{ code: 'ja-JP', label: 'Japanese' }\n" +
		"	];\n" +
		"\n" +
		"	let current = $state\u003cstring\u003e('en-US');\n" +
		"\n" +
		"	const base = 'https://svelte-max.example';\n" +
		"	const path = '/articles/oklch';\n" +
		"\n" +
		"	const tags = $derived([\n" +
		"		...locales.map((l) =\u003e ({\n" +
		"			hreflang: l.code,\n" +
		"			href: `${base}/${l.code}${path}`\n" +
		"		})),\n" +
		"		{ hreflang: 'x-default', href: `${base}${path}` }\n" +
		"	]);\n" +
		"\n" +
		"	const rendered = $derived(\n" +
		"		tags\n" +
		"			.map((t) =\u003e `\u003clink rel=\"alternate\" hreflang=\"${t.hreflang}\" href=\"${t.href}\" /\u003e`)\n" +
		"			.join('\\n')\n" +
		"	);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"	{#each tags as t (t.hreflang)}\n" +
		"		\u003clink rel=\"alternate\" hreflang={t.hreflang} href={t.href} /\u003e\n" +
		"	{/each}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.14 — International SEO\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"		\u003ccode\u003ehreflang\u003c/code\u003e tags tell Google which language/region versions of a\n" +
		"		page exist. Format:\n" +
		"		\u003ccode\u003e{'\u003clink rel=\"alternate\" hreflang=\"en-US\" href=\"...\" /\u003e'}\u003c/code\u003e. Always\n" +
		"		include \u003ccode\u003ex-default\u003c/code\u003e as the fallback. Every language version of\n" +
		"		every page should list every other language version AND itself. The\n" +
		"		\u003ccode\u003e{'\u003chtml lang=\"...\"\u003e'}\u003c/code\u003e\n" +
		"		attribute also matters — SvelteKit sets it via\n" +
		"		\u003ccode\u003esrc/app.html\u003c/code\u003e (static) or dynamically via\n" +
		"		\u003ccode\u003edocument.documentElement.lang\u003c/code\u003e in an \u003ccode\u003e$effect\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003clabel class=\"field\"\u003e\n" +
		"			\u003cspan\u003eCurrent locale\u003c/span\u003e\n" +
		"			\u003cselect bind:value={current}\u003e\n" +
		"				{#each locales as l (l.code)}\n" +
		"					\u003coption value={l.code}\u003e{l.label} ({l.code})\u003c/option\u003e\n" +
		"				{/each}\n" +
		"			\u003c/select\u003e\n" +
		"		\u003c/label\u003e\n" +
		"\n" +
		"		\u003cp class=\"echo\"\u003e\n" +
		"			Active: \u003cstrong\u003e{current}\u003c/strong\u003e\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003ch2\u003eRendered into &lt;svelte:head&gt;\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{rendered}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003cp class=\"note\"\u003e\n" +
		"			In production, each language version also sets \u003ccode\u003elang\u003c/code\u003e on\n" +
		"			\u003ccode\u003e{'\u003chtml\u003e'}\u003c/code\u003e — SvelteKit does this via \u003ccode\u003eapp.html\u003c/code\u003e\n" +
		"			(static) or \u003ccode\u003edocument.documentElement.lang\u003c/code\u003e via\n" +
		"			\u003ccode\u003e$effect\u003c/code\u003e (dynamic).\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ehreflang\u003c/code\u003e tags enumerate every language/region variant.\u003c/li\u003e\n" +
		"		\u003cli\u003eAlways include \u003ccode\u003ex-default\u003c/code\u003e as the fallback URL.\u003c/li\u003e\n" +
		"		\u003cli\u003eEach variant page lists every variant, including itself.\u003c/li\u003e\n" +
		"		\u003cli\u003e\n" +
		"			The \u003ccode\u003e{'\u003chtml lang\u003e'}\u003c/code\u003e attribute complements hreflang for accessibility\n" +
		"			and search.\n" +
		"		\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
	{#each tags as t (t.hreflang)}
		<link rel="alternate" hreflang={t.hreflang} href={t.href} />
	{/each}
</svelte:head>

<section class="page">
	<h1>13.14 — International SEO</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>hreflang</code> tags tell Google which language/region versions of a
		page exist. Format:
		<code>{'<link rel="alternate" hreflang="en-US" href="..." />'}</code>. Always
		include <code>x-default</code> as the fallback. Every language version of
		every page should list every other language version AND itself. The
		<code>{'<html lang="...">'}</code>
		attribute also matters — SvelteKit sets it via
		<code>src/app.html</code> (static) or dynamically via
		<code>document.documentElement.lang</code> in an <code>$effect</code>.
	</p>

	<div class="build">
		<label class="field">
			<span>Current locale</span>
			<select bind:value={current}>
				{#each locales as l (l.code)}
					<option value={l.code}>{l.label} ({l.code})</option>
				{/each}
			</select>
		</label>

		<p class="echo">
			Active: <strong>{current}</strong>
		</p>

		<h2>Rendered into &lt;svelte:head&gt;</h2>
		<pre>{rendered}</pre>

		<p class="note">
			In production, each language version also sets <code>lang</code> on
			<code>{'<html>'}</code> — SvelteKit does this via <code>app.html</code>
			(static) or <code>document.documentElement.lang</code> via
			<code>$effect</code> (dynamic).
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how hreflang misconfiguration affects international search. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>x-default</code> entry from the tags array.</strong> Without a fallback, users in regions not covered by any hreflang tag may be shown no result at all, or Google may pick an arbitrary variant. The <code>x-default</code> hreflang is the safety net that ensures every user has a landing page regardless of their locale.</li>
		<li><strong>Remove the self-referencing hreflang tag (the one pointing to the current page's own locale).</strong> The hreflang specification requires that every page lists itself among the variants. If a page omits its own self-reference, Google may interpret the incomplete set as an error and ignore all hreflang annotations on that page.</li>
		<li><strong>Add a hreflang tag pointing to a URL that does not exist (returns 404).</strong> Google attempts to crawl the target URL, discovers a 404, and flags a hreflang error in Search Console. Over time, repeated broken hreflang targets cause Google to lose confidence in the entire hreflang set, potentially ignoring all variant annotations.</li>
		<li><strong>Use language-only codes like <code>en</code> instead of language-region codes like <code>en-US</code>.</strong> This is valid but less precise. Google may serve the English variant to users in any English-speaking region (US, UK, Australia, India) instead of distinguishing between them. For sites with regional content differences (spelling, pricing, legal terms), the region qualifier is essential.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">International SEO with hreflang tags tells Google which language and region versions of a page exist so it can serve the right version to the right user. Each variant page emits a set of <code>{'<link rel="alternate" hreflang="..." href="...">'}</code> tags listing every variant including itself plus an <code>x-default</code> fallback. In SvelteKit, these tags are injected into <code>{'<svelte:head>'}</code> using an <code>{'{#each}'}</code> block over a derived tags array.</p>
	<p class="prose">The hreflang system is bidirectional: every page in the set must reference every other page, including itself. If the English page lists the German page but the German page does not list the English page back, Google may discard the annotation. This bidirectional requirement makes hreflang one of the most error-prone SEO features. Automating the tag generation from a shared locales array (as this lesson demonstrates) eliminates the risk of asymmetric references.</p>
	<p class="prose">The <code>{'<html lang>'}</code> attribute complements hreflang by telling browsers and screen readers the language of the current page's content. SvelteKit sets this via <code>src/app.html</code> for static configurations or dynamically via <code>document.documentElement.lang</code> in an <code>$effect</code> for multi-language apps. Together, hreflang and the lang attribute ensure that search engines index the correct variant, browsers apply the right text rendering rules, and assistive technologies use the correct pronunciation engine.</p>
	<p class="next">Next, you will apply everything from this module in the SEO project to build a fully optimised page with all the meta tags, structured data, and performance practices covered in Module 13.</p>
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
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	h2 {
		font-size: var(--text-lg);
		margin: 0;
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
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field span {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	select {
		padding: var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-size: var(--text-base);
	}
	.echo {
		margin: 0;
		color: var(--color-text-muted);
	}
	.echo strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.note {
		margin: 0;
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
