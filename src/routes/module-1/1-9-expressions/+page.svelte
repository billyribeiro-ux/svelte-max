<script lang="ts">
	interface Plan {
		name: string;
		monthly: number;
		annual: number;
		features: readonly string[];
		popular: boolean;
	}

	const plan: Plan = {
		name: 'Studio',
		monthly: 29,
		annual: 290,
		popular: true,
		features: [
			'Unlimited projects',
			'Priority email support',
			'Custom domains',
			'Team seats (up to 5)',
			'Advanced analytics'
		]
	};

	const safeHtml = '<em>This is safe</em> because you wrote it';
	const dangerousInput = '<img src=x onerror="alert(document.cookie)">';
</script>

<section class="page">
	<h1>1.9 — Template expressions</h1>

	<p class="concept">
		<strong>Concept.</strong> Anything between <code>&#123;</code> and <code>&#125;</code> in Svelte
		markup is a real JavaScript expression — not a special template language. Ternaries, method
		calls, arithmetic, array access, all legal. <code>&#123;@const x = …&#125;</code> declares a
		local value right where it's used, which beats inventing a new
		<code>$derived</code> or script-level variable for every tiny computation. And
		<code>&#123;@html&#125;</code> injects raw HTML without escaping — powerful, and the single
		most common XSS footgun in the ecosystem. Never feed it untrusted input.
	</p>

	<article class="pricing" class:popular={plan.popular}>
		{#if plan.popular}
			<span class="badge">{plan.popular ? 'Most popular' : ''}</span>
		{/if}

		<h2>{plan.name}</h2>

		<p class="price">
			<span class="amount">${plan.monthly}</span>
			<span class="period">/month</span>
		</p>

		{#if plan.annual < plan.monthly * 12}
			{@const savings = plan.monthly * 12 - plan.annual}
			<p class="savings">Save ${savings}/yr with annual</p>
		{/if}

		<ul class="features">
			{#each plan.features as feature (feature)}
				<li>
					<svg
						class="check"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M4 10l4 4 8-8" />
					</svg>
					<span>{feature}</span>
				</li>
			{/each}
		</ul>

		<button class="cta" type="button">Start free trial</button>
	</article>

	<div class="build">
		<h2 class="danger-heading">Danger zone: {'@html'} and XSS</h2>

		<p class="danger-desc">
			<strong>Safe HTML you control:</strong>
		</p>
		<div class="html-output">{@html safeHtml}</div>

		<p class="danger-desc">
			<strong>Malicious input (shown as text so you can SEE the attack vector):</strong>
		</p>
		<pre class="xss-example"><code>{dangerousInput}</code></pre>

		<aside class="danger-note">
			Never pass user input to <code>{'{@html}'}</code>. If you must render HTML from an API,
			sanitize it with <strong>DOMPurify</strong> first.
		</aside>
	</div>

	<h2>What you learned</h2>
	<ul class="learned">
		<li>Anything inside <code>&#123;&#125;</code> is a real JS expression.</li>
		<li>Use ternaries inline for small conditional text.</li>
		<li><code>&#123;@const&#125;</code> scopes a computed value to the block it lives in.</li>
		<li><code>&#123;@html&#125;</code> exists, but never hand it untrusted strings.</li>
		<li>An XSS payload like <code>&lt;img onerror="..."&gt;</code> executes arbitrary JS if rendered via <code>&#123;@html&#125;</code>.</li>
		<li>Use <strong>DOMPurify</strong> to sanitize any HTML from untrusted sources before rendering.</li>
	</ul>
</section>

<style>
	.page {
		& .concept {
			font-size: var(--text-base);
			color: var(--color-text-muted);
			max-inline-size: 65ch;
		}

		& h2 {
			font-size: var(--text-xl);
			margin-block-start: 2rem;
		}
	}

	.pricing {
		position: relative;
		margin-block: 2rem;
		padding: 2rem 1.5rem;
		border-radius: 1rem;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		max-inline-size: 24rem;

		&.popular {
			border-color: var(--color-brand);
			box-shadow: 0 0 0 3px var(--color-brand-dim);
		}

		& .badge {
			position: absolute;
			inset-block-start: -0.75rem;
			inset-inline-start: 1.5rem;
			background: var(--color-brand);
			color: var(--color-surface);
			font-size: var(--text-xs);
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			padding: 0.35rem 0.75rem;
			border-radius: 999px;
		}

		& h2 {
			font-size: var(--text-2xl);
			margin: 0 0 0.5rem;
		}

		& .price {
			margin: 0;
			display: flex;
			align-items: baseline;
			gap: 0.25rem;

			& .amount {
				font-size: var(--text-hero);
				font-weight: 800;
				line-height: 1;
				color: var(--color-text);
			}

			& .period {
				font-size: var(--text-base);
				color: var(--color-text-muted);
			}
		}

		& .savings {
			margin: 0.25rem 0 1.25rem;
			color: var(--color-brand);
			font-size: var(--text-sm);
			font-weight: 600;
		}

		& .features {
			list-style: none;
			padding: 0;
			margin: 0 0 1.5rem;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			& li {
				display: flex;
				align-items: center;
				gap: 0.6rem;
				font-size: var(--text-base);
				color: var(--color-text);
			}

			& .check {
				inline-size: 1.1rem;
				block-size: 1.1rem;
				color: var(--color-brand);
				flex-shrink: 0;
			}
		}

		& .cta {
			inline-size: 100%;
			padding: 0.85rem 1rem;
			border: none;
			border-radius: 0.6rem;
			background: var(--color-brand);
			color: var(--color-surface);
			font-size: var(--text-base);
			font-weight: 600;
			cursor: pointer;
			transition: transform 0.15s ease;

			&:hover {
				transform: translateY(-1px);
			}
		}
	}

	.learned {
		padding-inline-start: 1.25rem;
		color: var(--color-text-muted);

		& li {
			margin-block: 0.25rem;
		}
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		padding: 1.5rem;
		margin-block: 2rem;
		max-inline-size: 40rem;
	}

	.danger-heading {
		font-size: var(--text-lg);
		margin: 0;
		color: var(--color-text);
	}

	.danger-desc {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	.html-output {
		padding: 0.75rem 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		font-size: var(--text-base);
	}

	.xss-example {
		margin: 0;
		padding: 0.75rem 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	.danger-note {
		border-left: 4px solid var(--color-brand);
		background: var(--color-surface);
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.pricing {
			padding: 2.5rem 2rem;
		}
	}
</style>
