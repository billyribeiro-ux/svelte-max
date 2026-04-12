<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface ProductSchema {
		'@context': 'https://schema.org';
		'@type': 'Product';
		name: string;
		description: string;
		offers: {
			'@type': 'Offer';
			price: string;
			priceCurrency: string;
			availability: string;
		};
		aggregateRating: {
			'@type': 'AggregateRating';
			ratingValue: string;
			reviewCount: string;
		};
	}

	interface FaqSchema {
		'@context': 'https://schema.org';
		'@type': 'FAQPage';
		mainEntity: {
			'@type': 'Question';
			name: string;
			acceptedAnswer: { '@type': 'Answer'; text: string };
		}[];
	}

	interface OrganizationSchema {
		'@context': 'https://schema.org';
		'@type': 'Organization';
		name: string;
		url: string;
		logo: string;
		sameAs: string[];
	}

	const product: ProductSchema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'Svelte Max Hoodie',
		description: 'A cozy hoodie for Svelte developers.',
		offers: {
			'@type': 'Offer',
			price: '49.00',
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock'
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.8',
			reviewCount: '132'
		}
	};

	const faq: FaqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'What is Svelte 5?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Svelte 5 is the latest version using runes for reactivity.'
				}
			},
			{
				'@type': 'Question',
				name: 'Do I need Node for SvelteKit?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'SvelteKit runs on any JS runtime via adapters — Node, Cloudflare, Deno, etc.'
				}
			},
			{
				'@type': 'Question',
				name: 'Is Svelte fast?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. Svelte compiles components to minimal JS with no virtual DOM.'
				}
			}
		]
	};

	const organization: OrganizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Svelte Max',
		url: 'https://svelte-max.example',
		logo: 'https://svelte-max.example/logo.png',
		sameAs: [
			'https://twitter.com/sveltejs',
			'https://github.com/sveltejs/svelte'
		]
	};

	const productJson = JSON.stringify(product, null, 2);
	const faqJson = JSON.stringify(faq, null, 2);
	const orgJson = JSON.stringify(organization, null, 2);

	const productScript = `<script type="application/ld+json">${productJson}<\/script>`;
	const faqScript = `<script type="application/ld+json">${faqJson}<\/script>`;
	const orgScript = `<script type="application/ld+json">${orgJson}<\/script>`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface ProductSchema {\n" +
		"		'@context': 'https://schema.org';\n" +
		"		'@type': 'Product';\n" +
		"		name: string;\n" +
		"		description: string;\n" +
		"		offers: {\n" +
		"			'@type': 'Offer';\n" +
		"			price: string;\n" +
		"			priceCurrency: string;\n" +
		"			availability: string;\n" +
		"		};\n" +
		"		aggregateRating: {\n" +
		"			'@type': 'AggregateRating';\n" +
		"			ratingValue: string;\n" +
		"			reviewCount: string;\n" +
		"		};\n" +
		"	}\n" +
		"\n" +
		"	interface FaqSchema {\n" +
		"		'@context': 'https://schema.org';\n" +
		"		'@type': 'FAQPage';\n" +
		"		mainEntity: {\n" +
		"			'@type': 'Question';\n" +
		"			name: string;\n" +
		"			acceptedAnswer: { '@type': 'Answer'; text: string };\n" +
		"		}[];\n" +
		"	}\n" +
		"\n" +
		"	interface OrganizationSchema {\n" +
		"		'@context': 'https://schema.org';\n" +
		"		'@type': 'Organization';\n" +
		"		name: string;\n" +
		"		url: string;\n" +
		"		logo: string;\n" +
		"		sameAs: string[];\n" +
		"	}\n" +
		"\n" +
		"	const product: ProductSchema = {\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'Product',\n" +
		"		name: 'Svelte Max Hoodie',\n" +
		"		description: 'A cozy hoodie for Svelte developers.',\n" +
		"		offers: {\n" +
		"			'@type': 'Offer',\n" +
		"			price: '49.00',\n" +
		"			priceCurrency: 'USD',\n" +
		"			availability: 'https://schema.org/InStock'\n" +
		"		},\n" +
		"		aggregateRating: {\n" +
		"			'@type': 'AggregateRating',\n" +
		"			ratingValue: '4.8',\n" +
		"			reviewCount: '132'\n" +
		"		}\n" +
		"	};\n" +
		"\n" +
		"	const faq: FaqSchema = {\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'FAQPage',\n" +
		"		mainEntity: [\n" +
		"			{\n" +
		"				'@type': 'Question',\n" +
		"				name: 'What is Svelte 5?',\n" +
		"				acceptedAnswer: {\n" +
		"					'@type': 'Answer',\n" +
		"					text: 'Svelte 5 is the latest version using runes for reactivity.'\n" +
		"				}\n" +
		"			},\n" +
		"			{\n" +
		"				'@type': 'Question',\n" +
		"				name: 'Do I need Node for SvelteKit?',\n" +
		"				acceptedAnswer: {\n" +
		"					'@type': 'Answer',\n" +
		"					text: 'SvelteKit runs on any JS runtime via adapters — Node, Cloudflare, Deno, etc.'\n" +
		"				}\n" +
		"			},\n" +
		"			{\n" +
		"				'@type': 'Question',\n" +
		"				name: 'Is Svelte fast?',\n" +
		"				acceptedAnswer: {\n" +
		"					'@type': 'Answer',\n" +
		"					text: 'Yes. Svelte compiles components to minimal JS with no virtual DOM.'\n" +
		"				}\n" +
		"			}\n" +
		"		]\n" +
		"	};\n" +
		"\n" +
		"	const organization: OrganizationSchema = {\n" +
		"		'@context': 'https://schema.org',\n" +
		"		'@type': 'Organization',\n" +
		"		name: 'Svelte Max',\n" +
		"		url: 'https://svelte-max.example',\n" +
		"		logo: 'https://svelte-max.example/logo.png',\n" +
		"		sameAs: [\n" +
		"			'https://twitter.com/sveltejs',\n" +
		"			'https://github.com/sveltejs/svelte'\n" +
		"		]\n" +
		"	};\n" +
		"\n" +
		"	const productJson = JSON.stringify(product, null, 2);\n" +
		"	const faqJson = JSON.stringify(faq, null, 2);\n" +
		"	const orgJson = JSON.stringify(organization, null, 2);\n" +
		"\n" +
		"	const productScript = `\u003cscript type=\"application/ld+json\"\u003e${productJson}\u003c\\/script\u003e`;\n" +
		"	const faqScript = `\u003cscript type=\"application/ld+json\"\u003e${faqJson}\u003c\\/script\u003e`;\n" +
		"	const orgScript = `\u003cscript type=\"application/ld+json\"\u003e${orgJson}\u003c\\/script\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"	{@html productScript}\n" +
		"	{@html faqScript}\n" +
		"	{@html orgScript}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.8 — Product, FAQ, Organization schemas\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Beyond Article, the most commonly-used schemas are\n" +
		"		\u003ccode\u003eProduct\u003c/code\u003e (ecommerce listings with price, availability, rating),\n" +
		"		\u003ccode\u003eFAQPage\u003c/code\u003e (question/answer pairs Google can render as an expandable\n" +
		"		section), and \u003ccode\u003eOrganization\u003c/code\u003e (company info that powers Knowledge\n" +
		"		Panels — name, logo, url, social profiles). Each JSON-LD block goes in\n" +
		"		\u003ccode\u003e{'\u003csvelte:head\u003e'}\u003c/code\u003e. A single page can have multiple.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eProduct schema\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{productJson}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eFAQPage schema\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{faqJson}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eOrganization schema\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{orgJson}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eProduct schema powers rich result cards with price and rating.\u003c/li\u003e\n" +
		"		\u003cli\u003eFAQPage can render Q&amp;A directly under your search result.\u003c/li\u003e\n" +
		"		\u003cli\u003eOrganization schema feeds Google Knowledge Panels.\u003c/li\u003e\n" +
		"		\u003cli\u003eMultiple JSON-LD blocks can live on one page — one per schema type.\u003c/li\u003e\n" +
		"		\u003cli\u003eTyped interfaces keep schema objects honest at compile time.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
	{@html productScript}
	{@html faqScript}
	{@html orgScript}
</svelte:head>

<section class="page">
	<h1>13.8 — Product, FAQ, Organization schemas</h1>
	<p class="concept">
		<strong>Concept.</strong> Beyond Article, the most commonly-used schemas are
		<code>Product</code> (ecommerce listings with price, availability, rating),
		<code>FAQPage</code> (question/answer pairs Google can render as an expandable
		section), and <code>Organization</code> (company info that powers Knowledge
		Panels — name, logo, url, social profiles). Each JSON-LD block goes in
		<code>{'<svelte:head>'}</code>. A single page can have multiple.
	</p>

	<div class="build">
		<h2>Product schema</h2>
		<pre>{productJson}</pre>

		<h2>FAQPage schema</h2>
		<pre>{faqJson}</pre>

		<h2>Organization schema</h2>
		<pre>{orgJson}</pre>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how schema validation affects rich results. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>offers</code> field from the Product schema.</strong> Google's Rich Results Test will report a warning because price and availability are required for the Product rich result. Without <code>offers</code>, the product cannot display price information in SERPs, which is the primary reason to use Product schema in the first place.</li>
		<li><strong>Change the FAQPage <code>mainEntity</code> to contain a single question with an empty <code>text</code> answer.</strong> Google requires non-empty answers for FAQ rich results. An empty answer causes the entire FAQ block to be ignored, and the expandable Q&amp;A section beneath your search result disappears. Every question must have a substantive answer.</li>
		<li><strong>Set the Organization <code>sameAs</code> array to contain URLs that do not actually belong to the organisation.</strong> The <code>sameAs</code> field tells Google which social profiles and external pages belong to the same entity. Incorrect URLs may confuse the Knowledge Graph and associate your organisation with the wrong social accounts or entities.</li>
		<li><strong>Remove the TypeScript interfaces and use plain <code>any</code>-typed objects.</strong> The schemas still work at runtime, but you lose compile-time validation. A typo in a field name (e.g., <code>prce</code> instead of <code>price</code>) would slip through silently and produce invalid structured data that Google ignores without any browser-side error.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Product schema is the backbone of e-commerce SEO. It powers rich result cards that display price, currency, availability, and aggregate ratings directly in search results. The <code>offers</code> field with an Offer type is required for price display, and <code>aggregateRating</code> with <code>ratingValue</code> and <code>reviewCount</code> enables the star-rating snippet that dramatically improves click-through rate on product pages.</p>
	<p class="prose">FAQPage schema allows Google to render expandable question-and-answer pairs directly beneath your search result, potentially doubling the vertical space your listing occupies in the SERP. Each question needs a <code>name</code> and an <code>acceptedAnswer</code> with non-empty <code>text</code>. The content must match what is visible on the page. Organization schema feeds Google's Knowledge Panel with company name, logo, URL, and social profiles via the <code>sameAs</code> array, helping search engines build an authoritative entity profile.</p>
	<p class="prose">TypeScript interfaces are not just a developer convenience here; they are a correctness tool. Schema.org has strict field names and nested type requirements, and a single typo produces silently invalid JSON-LD that Google ignores. Defining interfaces like <code>ProductSchema</code>, <code>FaqSchema</code>, and <code>OrganizationSchema</code> catches errors at compile time, long before they reach a crawler. Multiple JSON-LD blocks can coexist on a single page, one per schema type, all injected via separate <code>{'@html'}</code> expressions in <code>{'<svelte:head>'}</code>.</p>
	<p class="next">Next, you will learn how to serve a <code>robots.txt</code> file from a SvelteKit endpoint to control crawler access.</p>
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
