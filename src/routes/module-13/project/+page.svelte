<script lang="ts">
	import { page } from '$app/state';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface ArticleSchema {
		'@context': 'https://schema.org';
		'@type': 'Article';
		headline: string;
		description: string;
		image: string;
		datePublished: string;
		dateModified: string;
		author: { '@type': 'Person'; name: string; url: string };
		publisher: {
			'@type': 'Organization';
			name: string;
			logo: { '@type': 'ImageObject'; url: string };
		};
	}

	interface BreadcrumbSchema {
		'@context': 'https://schema.org';
		'@type': 'BreadcrumbList';
		itemListElement: {
			'@type': 'ListItem';
			position: number;
			name: string;
			item: string;
		}[];
	}

	interface RelatedArticle {
		title: string;
		href: string;
		summary: string;
	}

	const siteBase = 'https://svelte-max.example';
	const title = 'Why OKLCH Is the Right Color Space for the Modern Web';
	const description =
		'A perceptually uniform color space, finally native to CSS — here is why OKLCH should replace hex and HSL in every new design system.';
	const heroImage = `${siteBase}/og/oklch.png`;
	const published = '2026-03-18';
	const modified = '2026-04-02';
	const authorName = 'Ada Renner';
	const authorUrl = `${siteBase}/authors/ada-renner`;
	const readTime = '6 min read';

	const canonical = $derived(`${siteBase}${page.url.pathname}`);

	const hreflangs: { code: string; href: string }[] = [
		{ code: 'en-US', href: `${siteBase}/en-US/articles/oklch` },
		{ code: 'de-DE', href: `${siteBase}/de-DE/articles/oklch` },
		{ code: 'ja-JP', href: `${siteBase}/ja-JP/articles/oklch` },
		{ code: 'x-default', href: `${siteBase}/articles/oklch` }
	];

	const article: ArticleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		image: heroImage,
		datePublished: published,
		dateModified: modified,
		author: { '@type': 'Person', name: authorName, url: authorUrl },
		publisher: {
			'@type': 'Organization',
			name: 'Svelte Max',
			logo: { '@type': 'ImageObject', url: `${siteBase}/logo.png` }
		}
	};

	const breadcrumb: BreadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteBase}/` },
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Articles',
				item: `${siteBase}/articles`
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: 'OKLCH',
				item: `${siteBase}/articles/oklch`
			}
		]
	};

	const articleScript = `<script type="application/ld+json">${JSON.stringify(article)}<\/script>`;
	const breadcrumbScript = `<script type="application/ld+json">${JSON.stringify(breadcrumb)}<\/script>`;

	const related: RelatedArticle[] = [
		{
			title: 'Designing Dark Mode with OKLCH Tokens',
			href: '/articles/oklch-dark-mode',
			summary: 'Hold L constant, flip surfaces — a dark theme in 30 lines of CSS.'
		},
		{
			title: 'Accessible Contrast Without a Calculator',
			href: '/articles/oklch-contrast',
			summary: 'Why perceptual uniformity makes WCAG pairs trivial to generate.'
		},
		{
			title: 'Migrating from HSL to OKLCH',
			href: '/articles/hsl-to-oklch',
			summary: 'A pragmatic, PR-by-PR path away from the legacy color space.'
		}
	];

	const builtWith: string[] = [
		'<svelte:head> for meta',
		'Open Graph + Twitter Cards',
		'Canonical URL from page.url',
		'Article JSON-LD',
		'BreadcrumbList JSON-LD',
		'hreflang alternates'
	];


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { page } from '$app/state';\n" +
		"\n" +
		"	interface ArticleSchema {\n" +
		"		'@context': 'https://schema.org';\n" +
		"		'@type': 'Article';\n" +
		"		headline: string;\n" +
		"		description: string;\n" +
		"		image: string;\n" +
		"		datePublished: string;\n" +
		"		dateModified: string;\n" +
		"		author: { '@type': 'Person'; name: string; url: string };\n" +
		"		publisher: {\n" +
		"			'@type': 'Organization';\n" +
		"			name: string;\n" +
		"			logo: { '@type': 'ImageObject'; url: string };\n" +
		"		};\n" +
		"	}\n" +
		"\n" +
		"	interface BreadcrumbSchema {\n" +
		"		'@context': 'https://schema.org';\n" +
		"		'@type': 'BreadcrumbList';\n" +
		"		itemListElement: {\n" +
		"			'@type': 'ListItem';\n" +
		"			position: number;\n" +
		"			name: string;\n" +
		"			item: string;\n" +
		"		}[];\n" +
		"	}\n" +
		"\n" +
		"	interface RelatedArticle {\n" +
		"		title: string;\n" +
		"		href: string;\n" +
		"		summary: string;\n" +
		"	}\n" +
		"\n" +
		"	const siteBase = 'https://svelte-max.example';\n" +
		"	const title = 'Why OKLCH Is the Right Color Space for the Modern Web';\n" +
		"	const description =\n" +
		"		'A perceptually uniform color space, finally native to CSS — here is why OKLCH should replace hex and HSL in every new design system.';\n" +
		"	const heroImage = `${siteBase}/og/oklch.png`;\n" +
		"	const published = '2026-03-18';\n" +
		"	const modified = '2026-04-02';\n" +
		"	const authorName = 'Ada Renner';\n" +
		"	const authorUrl = `${siteBase}/authors/ada-renner`;\n" +
		"	const readTime = '6 min read';\n" +
		"\n" +
		"	const canonical = $derived(`${siteBase}${page.url.pathname}`);\n" +
		"\n" +
		"	const hreflangs: { code: string; href: string }[] = [\n" +
		"		{ code: 'en-US', href: `${siteBase}/en-US/articles/oklch` },\n" +
		"		{ code: 'de-DE', href: `${siteBase}/de-DE/articles/oklch` },\n" +
		"		{ code: 'ja-JP', href: `${siteBase}/ja-JP/articles/oklch` },\n" +
		"		{ code: 'x-default', href: `${siteBase}/articles/oklch` }\n" +
		"	];\n" +
		"\n" +
		"	const article: ArticleSchema = {\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'Article',\n" +
		"		headline: title,\n" +
		"		description,\n" +
		"		image: heroImage,\n" +
		"		datePublished: published,\n" +
		"		dateModified: modified,\n" +
		"		author: { '@type': 'Person', name: authorName, url: authorUrl },\n" +
		"		publisher: {\n" +
		"			'@type': 'Organization',\n" +
		"			name: 'Svelte Max',\n" +
		"			logo: { '@type': 'ImageObject', url: `${siteBase}/logo.png` }\n" +
		"		}\n" +
		"	};\n" +
		"\n" +
		"	const breadcrumb: BreadcrumbSchema = {\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'BreadcrumbList',\n" +
		"		itemListElement: [\n" +
		"			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteBase}/` },\n" +
		"			{\n" +
		"				'@type': 'ListItem',\n" +
		"				position: 2,\n" +
		"				name: 'Articles',\n" +
		"				item: `${siteBase}/articles`\n" +
		"			},\n" +
		"			{\n" +
		"				'@type': 'ListItem',\n" +
		"				position: 3,\n" +
		"				name: 'OKLCH',\n" +
		"				item: `${siteBase}/articles/oklch`\n" +
		"			}\n" +
		"		]\n" +
		"	};\n" +
		"\n" +
		"	const articleScript = `\u003cscript type=\"application/ld+json\"\u003e${JSON.stringify(article)}\u003c\\/script\u003e`;\n" +
		"	const breadcrumbScript = `\u003cscript type=\"application/ld+json\"\u003e${JSON.stringify(breadcrumb)}\u003c\\/script\u003e`;\n" +
		"\n" +
		"	const related: RelatedArticle[] = [\n" +
		"		{\n" +
		"			title: 'Designing Dark Mode with OKLCH Tokens',\n" +
		"			href: '/articles/oklch-dark-mode',\n" +
		"			summary: 'Hold L constant, flip surfaces — a dark theme in 30 lines of CSS.'\n" +
		"		},\n" +
		"		{\n" +
		"			title: 'Accessible Contrast Without a Calculator',\n" +
		"			href: '/articles/oklch-contrast',\n" +
		"			summary: 'Why perceptual uniformity makes WCAG pairs trivial to generate.'\n" +
		"		},\n" +
		"		{\n" +
		"			title: 'Migrating from HSL to OKLCH',\n" +
		"			href: '/articles/hsl-to-oklch',\n" +
		"			summary: 'A pragmatic, PR-by-PR path away from the legacy color space.'\n" +
		"		}\n" +
		"	];\n" +
		"\n" +
		"	const builtWith: string[] = [\n" +
		"		'\u003csvelte:head\u003e for meta',\n" +
		"		'Open Graph + Twitter Cards',\n" +
		"		'Canonical URL from page.url',\n" +
		"		'Article JSON-LD',\n" +
		"		'BreadcrumbList JSON-LD',\n" +
		"		'hreflang alternates'\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"	\u003ctitle\u003e{title} | Svelte Max\u003c/title\u003e\n" +
		"	\u003cmeta name=\"description\" content={description} /\u003e\n" +
		"	\u003clink rel=\"canonical\" href={canonical} /\u003e\n" +
		"\n" +
		"	\u003cmeta property=\"og:type\" content=\"article\" /\u003e\n" +
		"	\u003cmeta property=\"og:title\" content={title} /\u003e\n" +
		"	\u003cmeta property=\"og:description\" content={description} /\u003e\n" +
		"	\u003cmeta property=\"og:image\" content={heroImage} /\u003e\n" +
		"	\u003cmeta property=\"og:url\" content={canonical} /\u003e\n" +
		"\n" +
		"	\u003cmeta name=\"twitter:card\" content=\"summary_large_image\" /\u003e\n" +
		"	\u003cmeta name=\"twitter:title\" content={title} /\u003e\n" +
		"	\u003cmeta name=\"twitter:description\" content={description} /\u003e\n" +
		"	\u003cmeta name=\"twitter:image\" content={heroImage} /\u003e\n" +
		"\n" +
		"	{#each hreflangs as h (h.code)}\n" +
		"		\u003clink rel=\"alternate\" hreflang={h.code} href={h.href} /\u003e\n" +
		"	{/each}\n" +
		"\n" +
		"	{@html articleScript}\n" +
		"	{@html breadcrumbScript}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page content-site\"\u003e\n" +
		"	\u003ch1\u003eModule 13 Project — SEO Content Site\u003c/h1\u003e\n" +
		"\n" +
		"	\u003carticle class=\"article\"\u003e\n" +
		"		\u003cnav aria-label=\"Breadcrumb\" class=\"crumbs\"\u003e\n" +
		"			\u003col\u003e\n" +
		"				\u003cli\u003e\u003ca href=\"/\"\u003eHome\u003c/a\u003e\u003c/li\u003e\n" +
		"				\u003cli aria-hidden=\"true\"\u003e/\u003c/li\u003e\n" +
		"				\u003cli\u003e\u003ca href=\"/articles\"\u003eArticles\u003c/a\u003e\u003c/li\u003e\n" +
		"				\u003cli aria-hidden=\"true\"\u003e/\u003c/li\u003e\n" +
		"				\u003cli aria-current=\"page\"\u003eOKLCH\u003c/li\u003e\n" +
		"			\u003c/ol\u003e\n" +
		"		\u003c/nav\u003e\n" +
		"\n" +
		"		\u003cheader class=\"hero\"\u003e\n" +
		"			\u003ch2 class=\"headline\"\u003e{title}\u003c/h2\u003e\n" +
		"			\u003cp class=\"byline\"\u003e\n" +
		"				By \u003ca href={authorUrl}\u003e{authorName}\u003c/a\u003e · \u003ctime datetime={published}\u003e\n" +
		"					March 18, 2026\n" +
		"				\u003c/time\u003e · {readTime}\n" +
		"			\u003c/p\u003e\n" +
		"		\u003c/header\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"layout\"\u003e\n" +
		"			\u003cdiv class=\"body\"\u003e\n" +
		"				\u003cp\u003e\n" +
		"					For twenty years, the web has used color spaces inherited from\n" +
		"					cathode-ray tubes. Hex and HSL are simple and familiar, but they\n" +
		"					share a flaw: equal numeric steps do not produce equal visual\n" +
		"					steps. A jump from \u003ccode\u003e#333\u003c/code\u003e to \u003ccode\u003e#444\u003c/code\u003e looks\n" +
		"					different than a jump from \u003ccode\u003e#aaa\u003c/code\u003e to \u003ccode\u003e#bbb\u003c/code\u003e,\n" +
		"					which makes building a consistent design token scale frustrating.\n" +
		"				\u003c/p\u003e\n" +
		"\n" +
		"				\u003cp\u003e\n" +
		"					OKLCH fixes this. It is a perceptually uniform color space defined\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<svelte:head>
	<title>{title} | Svelte Max</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={heroImage} />
	<meta property="og:url" content={canonical} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={heroImage} />

	{#each hreflangs as h (h.code)}
		<link rel="alternate" hreflang={h.code} href={h.href} />
	{/each}

	{@html articleScript}
	{@html breadcrumbScript}
</svelte:head>

<section class="page content-site">
	<h1>Module 13 Project — SEO Content Site</h1>

	<article class="article">
		<nav aria-label="Breadcrumb" class="crumbs">
			<ol>
				<li><a href="/">Home</a></li>
				<li aria-hidden="true">/</li>
				<li><a href="/articles">Articles</a></li>
				<li aria-hidden="true">/</li>
				<li aria-current="page">OKLCH</li>
			</ol>
		</nav>

		<header class="hero">
			<h2 class="headline">{title}</h2>
			<p class="byline">
				By <a href={authorUrl}>{authorName}</a> · <time datetime={published}>
					March 18, 2026
				</time> · {readTime}
			</p>
		</header>

		<div class="layout">
			<div class="body">
				<p>
					For twenty years, the web has used color spaces inherited from
					cathode-ray tubes. Hex and HSL are simple and familiar, but they
					share a flaw: equal numeric steps do not produce equal visual
					steps. A jump from <code>#333</code> to <code>#444</code> looks
					different than a jump from <code>#aaa</code> to <code>#bbb</code>,
					which makes building a consistent design token scale frustrating.
				</p>

				<p>
					OKLCH fixes this. It is a perceptually uniform color space defined
					in CIE Lab, which means a 10% change in lightness feels like a 10%
					change in lightness regardless of hue or chroma. Designers get
					predictable token ramps; engineers get a single mental model that
					survives contact with both light and dark themes. The CSS Color 4
					specification <a
						href="https://www.w3.org/TR/css-color-4/#ok-lab"
					>formalized OKLCH</a>, and every evergreen browser has shipped
					support since 2023.
				</p>

				<p>
					The practical payoff shows up in accessibility work. Fixing L and
					varying C gives you accessible contrast pairs by construction, with
					no trial-and-error against a WCAG calculator. That alone makes
					OKLCH worth adopting for any new design system — and upgrades from
					HSL are refactor-friendly, because the two spaces share a mental
					model of hue plus saturation plus lightness.
				</p>
			</div>

			<aside class="sidebar">
				<div class="bio">
					<h3>About the author</h3>
					<p class="bio-name">{authorName}</p>
					<p class="bio-role">Design Systems Lead, Svelte Max</p>
					<p class="bio-text">
						Ada has shipped OKLCH-native design systems for three Fortune
						500 companies and writes about color on the web.
					</p>
					<a class="bio-link" href={authorUrl}>View full bio</a>
				</div>

				<div class="related">
					<h3>Related articles</h3>
					<ul>
						{#each related as r (r.href)}
							<li>
								<a href={r.href}>{r.title}</a>
								<p>{r.summary}</p>
							</li>
						{/each}
					</ul>
				</div>
			</aside>
		</div>

		<footer class="footer">
			<h3>Built with</h3>
			<ul class="chips">
				{#each builtWith as b (b)}
					<li>{b}</li>
				{/each}
			</ul>
		</footer>
	</article>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.content-site {
		--color-brand: oklch(60% 0.14 140);
		--color-brand-dim: oklch(50% 0.12 140);
	}
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 1100px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	.article {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}
	.crumbs ol {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.crumbs a {
		color: var(--color-brand);
		text-decoration: none;
	}
	.crumbs [aria-current='page'] {
		color: var(--color-text);
		font-weight: 600;
	}
	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding-block-end: var(--space-md);
		border-block-end: 2px solid var(--color-brand);
	}
	.headline {
		margin: 0;
		font-size: var(--text-xl);
		line-height: 1.2;
		color: var(--color-text);
	}
	.byline {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.byline a {
		color: var(--color-brand);
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.body p {
		margin: 0;
		line-height: 1.7;
		color: var(--color-text);
	}
	.body a {
		color: var(--color-brand);
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.bio,
	.related {
		padding: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.bio h3,
	.related h3 {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-base);
	}
	.bio-name {
		margin: 0;
		font-weight: 700;
		color: var(--color-brand);
	}
	.bio-role {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.bio-text {
		margin-block-start: var(--space-sm);
		margin-block-end: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.bio-link {
		color: var(--color-brand);
		font-size: var(--text-sm);
	}
	.related ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.related a {
		display: block;
		color: var(--color-text);
		font-weight: 600;
		text-decoration: none;
	}
	.related a:hover {
		color: var(--color-brand);
	}
	.related p {
		margin: var(--space-xs) 0 0 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.footer {
		padding-block-start: var(--space-md);
		border-block-start: 1px solid var(--color-border);
	}
	.footer h3 {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
	.chips {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
	.chips li {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-brand-dim);
		color: var(--color-surface);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.headline {
			font-size: var(--text-2xl);
		}
		.layout {
			grid-template-columns: 2fr 1fr;
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
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
	}
</style>
