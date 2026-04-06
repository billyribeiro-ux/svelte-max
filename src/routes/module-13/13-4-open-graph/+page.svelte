<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  let ogTitle = $state('Svelte 5 + SvelteKit 2: the definitive course');
  let ogDescription = $state(
    'A hands-on journey through runes, snippets, and the modern web. Build production-grade apps with the new Svelte.'
  );
  let ogImage = $state('https://svelte-max.example/og/cover.png');
  const ogUrl = 'https://svelte-max.example/module-13/13-4-open-graph';


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let ogTitle = $state('Svelte 5 + SvelteKit 2: the definitive course');\n" +
		"  let ogDescription = $state(\n" +
		"    'A hands-on journey through runes, snippets, and the modern web. Build production-grade apps with the new Svelte.'\n" +
		"  );\n" +
		"  let ogImage = $state('https://svelte-max.example/og/cover.png');\n" +
		"  const ogUrl = 'https://svelte-max.example/module-13/13-4-open-graph';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003eOpen Graph &amp; Twitter Cards — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta name=\"description\" content=\"How to render beautiful share cards on Facebook, LinkedIn, Slack, and X using og: and twitter: meta tags.\" /\u003e\n" +
		"  \u003cmeta property=\"og:type\" content=\"article\" /\u003e\n" +
		"  \u003cmeta property=\"og:title\" content={ogTitle} /\u003e\n" +
		"  \u003cmeta property=\"og:description\" content={ogDescription} /\u003e\n" +
		"  \u003cmeta property=\"og:image\" content={ogImage} /\u003e\n" +
		"  \u003cmeta property=\"og:url\" content={ogUrl} /\u003e\n" +
		"  \u003cmeta name=\"twitter:card\" content=\"summary_large_image\" /\u003e\n" +
		"  \u003cmeta name=\"twitter:title\" content={ogTitle} /\u003e\n" +
		"  \u003cmeta name=\"twitter:description\" content={ogDescription} /\u003e\n" +
		"  \u003cmeta name=\"twitter:image\" content={ogImage} /\u003e\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.4 — Open Graph + Twitter Cards\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Open Graph (\u003ccode\u003eog:\u003c/code\u003e) tags tell Facebook, LinkedIn, and Slack\n" +
		"    how to render your link as a rich card when shared. Twitter Cards do the same for X. The most\n" +
		"    important OG tags are \u003ccode\u003eog:title\u003c/code\u003e, \u003ccode\u003eog:description\u003c/code\u003e,\n" +
		"    \u003ccode\u003eog:image\u003c/code\u003e (summary card 1200×630), \u003ccode\u003eog:url\u003c/code\u003e, \u003ccode\u003eog:type\u003c/code\u003e.\n" +
		"    Twitter Cards overlap but use \u003ccode\u003etwitter:card\u003c/code\u003e, \u003ccode\u003etwitter:title\u003c/code\u003e,\n" +
		"    \u003ccode\u003etwitter:description\u003c/code\u003e, \u003ccode\u003etwitter:image\u003c/code\u003e.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eOG preview builder\u003c/h2\u003e\n" +
		"\n" +
		"    \u003clabel for=\"og-title\"\u003eog:title\u003c/label\u003e\n" +
		"    \u003cinput id=\"og-title\" type=\"text\" bind:value={ogTitle} /\u003e\n" +
		"\n" +
		"    \u003clabel for=\"og-desc\"\u003eog:description\u003c/label\u003e\n" +
		"    \u003ctextarea id=\"og-desc\" rows=\"2\" bind:value={ogDescription}\u003e\u003c/textarea\u003e\n" +
		"\n" +
		"    \u003clabel for=\"og-image\"\u003eog:image URL\u003c/label\u003e\n" +
		"    \u003cinput id=\"og-image\" type=\"text\" bind:value={ogImage} /\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"og-card\"\u003e\n" +
		"      \u003cdiv class=\"og-image\" style:background-image=\"url({ogImage})\"\u003e\u003c/div\u003e\n" +
		"      \u003cdiv class=\"og-body\"\u003e\n" +
		"        \u003cdiv class=\"og-domain\"\u003esvelte-max.example\u003c/div\u003e\n" +
		"        \u003cdiv class=\"og-title\"\u003e{ogTitle}\u003c/div\u003e\n" +
		"        \u003cdiv class=\"og-desc\"\u003e{ogDescription}\u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      Real validation requires a public URL and a tool like opengraph.xyz — this preview is a\n" +
		"      visual approximation. The actual \u003ccode\u003eog:\u003c/code\u003e and \u003ccode\u003etwitter:\u003c/code\u003e meta tags for\n" +
		"      this page are being injected into \u003ccode\u003e{'\u003csvelte:head\u003e'}\u003c/code\u003e right now.\n" +
		"    \u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eOpen Graph powers rich share cards on Facebook, LinkedIn, Slack, Discord.\u003c/li\u003e\n" +
		"    \u003cli\u003eTwitter Cards mirror OG but use the \u003ccode\u003etwitter:\u003c/code\u003e prefix.\u003c/li\u003e\n" +
		"    \u003cli\u003eog:image should be 1200×630 for summary_large_image.\u003c/li\u003e\n" +
		"    \u003cli\u003eValidate with opengraph.xyz or the platform-specific debuggers.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>Open Graph &amp; Twitter Cards — svelte-max</title>
  <meta name="description" content="How to render beautiful share cards on Facebook, LinkedIn, Slack, and X using og: and twitter: meta tags." />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={ogUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ogTitle} />
  <meta name="twitter:description" content={ogDescription} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<section class="page">
  <h1>13.4 — Open Graph + Twitter Cards</h1>
  <p class="concept">
    <strong>Concept.</strong> Open Graph (<code>og:</code>) tags tell Facebook, LinkedIn, and Slack
    how to render your link as a rich card when shared. Twitter Cards do the same for X. The most
    important OG tags are <code>og:title</code>, <code>og:description</code>,
    <code>og:image</code> (summary card 1200×630), <code>og:url</code>, <code>og:type</code>.
    Twitter Cards overlap but use <code>twitter:card</code>, <code>twitter:title</code>,
    <code>twitter:description</code>, <code>twitter:image</code>.
  </p>

  <div class="build">
    <h2>OG preview builder</h2>

    <label for="og-title">og:title</label>
    <input id="og-title" type="text" bind:value={ogTitle} />

    <label for="og-desc">og:description</label>
    <textarea id="og-desc" rows="2" bind:value={ogDescription}></textarea>

    <label for="og-image">og:image URL</label>
    <input id="og-image" type="text" bind:value={ogImage} />

    <div class="og-card">
      <div class="og-image" style:background-image="url({ogImage})"></div>
      <div class="og-body">
        <div class="og-domain">svelte-max.example</div>
        <div class="og-title">{ogTitle}</div>
        <div class="og-desc">{ogDescription}</div>
      </div>
    </div>

    <p class="hint">
      Real validation requires a public URL and a tool like opengraph.xyz — this preview is a
      visual approximation. The actual <code>og:</code> and <code>twitter:</code> meta tags for
      this page are being injected into <code>{'<svelte:head>'}</code> right now.
    </p>
  </div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Open Graph powers rich share cards on Facebook, LinkedIn, Slack, Discord.</li>
    <li>Twitter Cards mirror OG but use the <code>twitter:</code> prefix.</li>
    <li>og:image should be 1200×630 for summary_large_image.</li>
    <li>Validate with opengraph.xyz or the platform-specific debuggers.</li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0 0 var(--space-sm) 0; font-size: var(--text-lg); color: var(--color-text); }
  label { font-size: var(--text-sm); color: var(--color-text); }
  input, textarea { padding: var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-surface-2); color: var(--color-text); font: inherit; resize: vertical; }
  .og-card { margin-top: var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface-2); }
  .og-image { aspect-ratio: 1200 / 630; background-color: var(--color-surface); background-size: cover; background-position: center; border-bottom: 1px solid var(--color-border); }
  .og-body { padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs); }
  .og-domain { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; }
  .og-title { font-size: var(--text-base); color: var(--color-text); font-weight: 600; }
  .og-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.4; }
  .hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
