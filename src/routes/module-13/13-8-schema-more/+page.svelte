<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>Product schema powers rich result cards with price and rating.</li>
		<li>FAQPage can render Q&amp;A directly under your search result.</li>
		<li>Organization schema feeds Google Knowledge Panels.</li>
		<li>Multiple JSON-LD blocks can live on one page — one per schema type.</li>
		<li>Typed interfaces keep schema objects honest at compile time.</li>
	</ul>
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
