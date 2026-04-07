<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  let title = $state('Title & meta description — svelte-max');
  let description = $state(
    'Learn the most impactful SEO elements: the title tag and meta description. Best practices for length, phrasing, and SERP click-through.'
  );

  const titleLen = $derived(title.length);
  const descLen = $derived(description.length);

  const titleOk = $derived(titleLen > 0 && titleLen <= 60);
  const descOk = $derived(descLen > 0 && descLen <= 160);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let title = $state('Title & meta description — svelte-max');\n" +
		"  let description = $state(\n" +
		"    'Learn the most impactful SEO elements: the title tag and meta description. Best practices for length, phrasing, and SERP click-through.'\n" +
		"  );\n" +
		"\n" +
		"  const titleLen = $derived(title.length);\n" +
		"  const descLen = $derived(description.length);\n" +
		"\n" +
		"  const titleOk = $derived(titleLen \u003e 0 && titleLen \u003c= 60);\n" +
		"  const descOk = $derived(descLen \u003e 0 && descLen \u003c= 160);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003e{title}\u003c/title\u003e\n" +
		"  \u003cmeta name=\"description\" content={description} /\u003e\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.3 — Title &amp; meta description\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e The \u003ccode\u003e{'\u003ctitle\u003e'}\u003c/code\u003e tag is the single most impactful SEO\n" +
		"    element. Best practices: unique per page, 50–60 characters (longer gets truncated in SERPs),\n" +
		"    important words front-loaded, brand at the end (\"Product feature — Brand\"). Meta description\n" +
		"    is the snippet shown in search results — 120–160 characters, compelling, includes a call to\n" +
		"    action, and uses the main keyword naturally.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eSERP preview\u003c/h2\u003e\n" +
		"\n" +
		"    \u003clabel for=\"title-field\"\u003eTitle\u003c/label\u003e\n" +
		"    \u003cinput id=\"title-field\" type=\"text\" bind:value={title} /\u003e\n" +
		"    \u003cp class=\"counter\" class:ok={titleOk} class:bad={!titleOk}\u003e\n" +
		"      {titleLen} / 60 characters\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003clabel for=\"desc-field\"\u003eMeta description\u003c/label\u003e\n" +
		"    \u003ctextarea id=\"desc-field\" rows=\"3\" bind:value={description}\u003e\u003c/textarea\u003e\n" +
		"    \u003cp class=\"counter\" class:ok={descOk} class:bad={!descOk}\u003e\n" +
		"      {descLen} / 160 characters\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"serp\"\u003e\n" +
		"      \u003cdiv class=\"serp-url\"\u003esvelte-max.example &gt; module-13 &gt; 13-3-title-meta\u003c/div\u003e\n" +
		"      \u003cdiv class=\"serp-title\"\u003e{title}\u003c/div\u003e\n" +
		"      \u003cdiv class=\"serp-desc\"\u003e{description}\u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eTitle tags should be 50–60 chars, front-loaded, brand at the end.\u003c/li\u003e\n" +
		"    \u003cli\u003eMeta descriptions should be 120–160 chars and persuasive.\u003c/li\u003e\n" +
		"    \u003cli\u003eBoth render in the SERP card — treat them like ad copy.\u003c/li\u003e\n" +
		"    \u003cli\u003eEvery page needs a unique title and description.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<section class="page">
  <h1>13.3 — Title &amp; meta description</h1>
  <p class="concept">
    <strong>Concept.</strong> The <code>{'<title>'}</code> tag is the single most impactful SEO
    element. Best practices: unique per page, 50–60 characters (longer gets truncated in SERPs),
    important words front-loaded, brand at the end ("Product feature — Brand"). Meta description
    is the snippet shown in search results — 120–160 characters, compelling, includes a call to
    action, and uses the main keyword naturally.
  </p>

  <div class="build">
    <h2>SERP preview</h2>

    <label for="title-field">Title</label>
    <input id="title-field" type="text" bind:value={title} />
    <p class="counter" class:ok={titleOk} class:bad={!titleOk}>
      {titleLen} / 60 characters
    </p>

    <label for="desc-field">Meta description</label>
    <textarea id="desc-field" rows="3" bind:value={description}></textarea>
    <p class="counter" class:ok={descOk} class:bad={!descOk}>
      {descLen} / 160 characters
    </p>

    <div class="serp">
      <div class="serp-url">svelte-max.example &gt; module-13 &gt; 13-3-title-meta</div>
      <div class="serp-title">{title}</div>
      <div class="serp-desc">{description}</div>
    </div>
  </div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how title and description choices affect SERP appearance. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Set the title to a 120-character string and watch the SERP preview.</strong> Google truncates titles at roughly 60 characters (or 600 pixels), so the excess is replaced with an ellipsis. The most important keywords at the end are lost, proving why front-loading matters more than stuffing keywords at the tail.</li>
		<li><strong>Set the meta description to a single word like <code>"SEO"</code>.</strong> The SERP preview looks barren and unprofessional. Google may decide to ignore it entirely and generate its own snippet from the page body, which means you lose control of the message a searcher sees before clicking.</li>
		<li><strong>Use the exact same title and description on this page and another page.</strong> Both pages now compete for the same search query with identical SERP cards. Google may choose to display only one, effectively de-indexing the other. Unique titles and descriptions per page are how you differentiate pages in the index.</li>
		<li><strong>Remove the <code>$derived</code> character counters and type beyond the limits without feedback.</strong> Without real-time validation, it is easy to write titles and descriptions that exceed the recommended lengths. The SERP preview still clips them, but the author has no warning during editing, showing why reactive length validation is a practical SEO tool.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>{'<title>'}</code> tag is the single most impactful on-page SEO element. Best practice is to keep it between 50 and 60 characters, front-load the most important keywords, and place the brand name at the end after a separator. Google uses the title as the primary clickable headline in search results, so every character counts. A well-crafted title acts like ad copy: it must be specific, compelling, and accurate.</p>
	<p class="prose">The meta description serves a different purpose. It does not directly affect ranking, but it is the snippet shown beneath the title in search results. Keeping it between 120 and 160 characters ensures it displays fully without truncation. A persuasive description with a clear call to action can dramatically increase click-through rate, which is an indirect ranking signal. Think of it as the elevator pitch for the page.</p>
	<p class="prose">In SvelteKit, both values live inside <code>{'<svelte:head>'}</code> and can be driven by reactive state. The SERP preview builder in this lesson demonstrates how <code>$state</code> and <code>$derived</code> create a real-time editing experience with character-count validation. This pattern is directly reusable in CMS admin panels or blog editors where content authors need immediate feedback on their SEO metadata.</p>
	<p class="next">Next, you will learn how Open Graph and Twitter Card meta tags create rich share cards when your pages are posted on social platforms.</p>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0 0 var(--space-sm) 0; font-size: var(--text-lg); color: var(--color-text); }
  label { font-size: var(--text-sm); color: var(--color-text); }
  input, textarea { padding: var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-surface-2); color: var(--color-text); font: inherit; resize: vertical; }
  .counter { margin: 0; font-size: var(--text-xs); font-family: var(--font-mono); }
  .counter.ok { color: var(--color-success); }
  .counter.bad { color: var(--color-error); }
  .serp { margin-top: var(--space-md); padding: var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: oklch(98% 0 0); display: flex; flex-direction: column; gap: var(--space-xs); }
  .serp-url { color: oklch(45% 0.12 150); font-size: var(--text-xs); }
  .serp-title { color: oklch(35% 0.2 265); font-size: var(--text-lg); line-height: 1.2; overflow: hidden; text-overflow: ellipsis; }
  .serp-desc { color: oklch(40% 0 0); font-size: var(--text-sm); line-height: 1.5; }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
