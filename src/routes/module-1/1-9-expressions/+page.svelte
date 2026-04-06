<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	// ── Demo data ───────────────────────────────────────────────────────
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

	const safeHtml: string = '<em>This is safe</em> because you wrote it';
	const dangerousInput: string = '<img src=x onerror="alert(document.cookie)">';

	// ── CodeCanvas strings ──────────────────────────────────────────────
	const fullFileCode: string = `\u003cscript lang="ts"\u003e
  // Define the shape of a pricing plan
  interface Plan {
    name: string;           // plan name like "Studio"
    monthly: number;        // monthly price in dollars
    annual: number;         // annual price in dollars
    features: readonly string[]; // list of included features
    popular: boolean;       // whether to show the "Most popular" badge
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

  // For the @html XSS demonstration
  const safeHtml: string = '<em>This is safe</em> because you wrote it';
  const dangerousInput: string = '<img src=x onerror="alert(document.cookie)">';
\u003c/script\u003e

<!-- Pricing card using template expressions -->
<article class="pricing" class:popular={plan.popular}>
  <!-- Ternary expression: picks text based on a boolean -->
  {#if plan.popular}
    <span class="badge">{plan.popular ? 'Most popular' : ''}</span>
  {/if}

  <!-- Simple expression: renders the plan name -->
  <h2>{plan.name}</h2>

  <!-- Arithmetic expression: dollar sign + number -->
  <p class="price">
    <span class="amount">\${plan.monthly}</span>
    <span class="period">/month</span>
  </p>

  <!-- {@const} declares a local variable right where you need it -->
  {#if plan.annual < plan.monthly * 12}
    {@const savings = plan.monthly * 12 - plan.annual}
    <p class="savings">Save \${savings}/yr with annual</p>
  {/if}

  <!-- {#each} with expressions inside -->
  <ul class="features">
    {#each plan.features as feature (feature)}
      <li>{feature}</li>
    {/each}
  </ul>
</article>`;

	const stepBasicCode: string = `<!-- Template expressions: anything inside {} is real JavaScript -->

<!-- Simple variable -->
<h2>{plan.name}</h2>
<!-- Renders: "Studio" -->

<!-- Arithmetic -->
<p>\${plan.monthly * 12}</p>
<!-- Renders: "$348" (29 * 12) -->

<!-- Method call -->
<p>{plan.name.toUpperCase()}</p>
<!-- Renders: "STUDIO" -->

<!-- String concatenation -->
<p>{'Plan: ' + plan.name}</p>
<!-- Renders: "Plan: Studio" -->`;

	const stepTernaryCode: string = `<!-- Ternaries are yes/no questions inside {} -->

<!-- Simple ternary: condition ? yes : no -->
<span>{plan.popular ? 'Most popular' : 'Standard'}</span>

<!-- Ternary for CSS classes -->
<div class={plan.popular ? 'highlight' : 'normal'}>
  {plan.name}
</div>

<!-- Nested ternary (avoid if possible — use #if instead) -->
<span>{plan.monthly > 50 ? 'Premium' : plan.monthly > 20 ? 'Mid' : 'Budget'}</span>`;

	const stepConstCode: string = `<!-- {@const} creates a local variable inside a block -->

{#if plan.annual < plan.monthly * 12}
  <!-- Calculate savings ONCE, right where we use it -->
  {@const savings = plan.monthly * 12 - plan.annual}
  {@const percentOff = Math.round((savings / (plan.monthly * 12)) * 100)}

  <p>Save \${savings}/yr ({percentOff}% off)</p>
  <!-- Renders: "Save $58/yr (17% off)" -->

  <!-- Without @const, you would need extra $derived() calls
       in the script block for these one-off calculations. -->
{/if}`;

	const stepHtmlCode: string = `<!-- {@html} injects raw HTML without escaping -->

<!-- SAFE: You wrote this HTML yourself -->
{@html '<em>This is safe</em> because you control it'}

<!-- DANGEROUS: Never use @html with user input! -->
<!-- This would execute JavaScript: -->
<!-- {@html '<img src=x onerror="alert(document.cookie)">'} -->

<!-- If you MUST render HTML from an API, sanitize first: -->
<!-- {@html DOMPurify.sanitize(apiResponse)} -->`;

	const wrongCode: string = `<!-- WRONG — @html with user input = XSS attack -->
\u003cscript lang="ts"\u003e
  // Imagine this came from a form, URL, or API
  let userInput: string = $state('');
\u003c/script\u003e

<!-- An attacker submits: <img src=x onerror="alert(document.cookie)"> -->
<!-- The browser executes the onerror handler immediately. -->
<!-- The attacker now has the user's cookies, session tokens, etc. -->
{@html userInput}

<!-- This is called Cross-Site Scripting (XSS).
     It is one of the most common web security vulnerabilities. -->`;

	const rightCode: string = `<!-- RIGHT — escape by default, sanitize if you must -->
\u003cscript lang="ts"\u003e
  import DOMPurify from 'dompurify';
  let userInput: string = $state('');
\u003c/script\u003e

<!-- Option 1: Just use {} — Svelte escapes automatically -->
<p>{userInput}</p>
<!-- Renders the text literally, including < and > as text -->

<!-- Option 2: If you NEED HTML rendering, sanitize first -->
{@html DOMPurify.sanitize(userInput)}
<!-- DOMPurify strips all dangerous tags and attributes -->`;

	// ── Practice challenge ──────────────────────────────────────────────
	const practiceChallenge: string =
		'Add a "discount" field (number, 0-100) to the Plan interface. Use {@const} to calculate the discounted monthly price and display it.';

	const practiceStarter: string = `interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: readonly string[];
  popular: boolean;
  /* Add discount field here (0 to 100) */
}

{#if plan.discount > 0}
  <!-- Use {@const} to calculate discounted price -->
  <!-- Display: "Discounted: $XX.XX/mo" -->
{/if}`;

	const practiceExpected: readonly string[] = [
		'discount',
		'{@const'
	];

	const practiceHints: readonly string[] = [
		'Add "discount: number;" to the interface.',
		'Use {@const discounted = plan.monthly * (1 - plan.discount / 100)} to calculate.',
		'Display it with: <p>Discounted: ${discounted.toFixed(2)}/mo</p>'
	];
</script>

<section class="page">
	<!-- 1. Title + Learning Objectives -->
	<h1>1.9 — Template Expressions</h1>
	<ul class="objectives">
		<li>Use <code>{'{}'}</code> in markup to embed any JavaScript expression</li>
		<li>Use ternaries for inline conditional text</li>
		<li>Use <code>{'{@const}'}</code> to declare local computed values inside blocks</li>
		<li>Understand the <code>{'{@html}'}</code> XSS danger and when sanitization is required</li>
	</ul>

	<!-- 2. Why this matters -->
	<h2>Why this matters</h2>
	<p class="analogy">
		<strong>Template expressions are like fill-in-the-blank sentences.</strong> "Hello,
		{'{name}'}!" fills in whatever <code>name</code> contains. Ternaries are yes/no questions:
		"{'{hungry ? "eat" : "wait"}'}" picks one answer based on the condition. And
		<code>{'{@const}'}</code> is a scratch pad — you jot down a quick calculation right where you
		need it instead of going back to the top of the page.
	</p>
	<p class="concept">
		Anything between <code>{'{'}</code> and <code>{'}'}</code> in Svelte markup is a real
		JavaScript expression — not a special template language. Ternaries, method calls, arithmetic,
		array access: all legal. <code>{'{@const x = ...}'}</code> declares a local value scoped to the
		block it lives in, which beats inventing a new <code>$derived</code> or script-level variable
		for every tiny computation. And <code>{'{@html}'}</code> injects raw HTML without escaping —
		powerful, but the single most common XSS footgun in the ecosystem.
	</p>

	<!-- 3. The complete code -->
	<h2>The complete code</h2>
	<CodeCanvas filename="+page.svelte" code={fullFileCode} />

	<!-- 4. Step-by-step walkthrough -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1 — Basic expressions</h3>
	<p class="step-text">
		Inside curly braces, you can use any JavaScript expression: variables, arithmetic, method
		calls, string concatenation, and more.
	</p>
	<CodeCanvas filename="basic expressions" code={stepBasicCode} />

	<h3>Step 2 — Ternary expressions</h3>
	<p class="step-text">
		A ternary is a compact if/else: <code>condition ? valueIfTrue : valueIfFalse</code>. Use it
		for small, inline decisions. For anything complex, prefer <code>{'{#if}'}</code> blocks.
	</p>
	<CodeCanvas filename="ternaries" code={stepTernaryCode} />

	<h3>Step 3 — {@const} for local calculations</h3>
	<p class="step-text">
		<code>{'{@const}'}</code> lets you compute a value right where you use it, inside an
		<code>{'{#if}'}</code> or <code>{'{#each}'}</code> block. It keeps your script block clean.
	</p>
	<CodeCanvas filename="@const" code={stepConstCode} />

	<h3>Step 4 — {@html} and the XSS danger</h3>
	<p class="step-text">
		<code>{'{@html}'}</code> renders raw HTML without escaping. It is safe only when YOU control the
		HTML string. Never pass user input, API responses, or URL parameters to it without sanitization.
	</p>
	<CodeCanvas filename="@html danger" code={stepHtmlCode} />

	<!-- 5. See it in action -->
	<h2>See it in action</h2>

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
		<h2 class="danger-heading">Danger zone: {@html} and XSS</h2>

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

	<!-- 6. Your turn -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge={practiceChallenge}
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. More examples -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1 — Array methods in expressions</summary>
		<p class="detail-text">
			You can call array methods directly inside expressions.
		</p>
		<CodeCanvas
			filename="array methods"
			code={`<!-- Filter and count in one expression -->\n<p>{plan.features.filter(f => f.includes('support')).length} support features</p>\n\n<!-- Join array items into a comma-separated string -->\n<p>{plan.features.join(', ')}</p>\n\n<!-- First and last items -->\n<p>First: {plan.features[0]}</p>\n<p>Last: {plan.features[plan.features.length - 1]}</p>`}
		/>
	</details>

	<details>
		<summary>Example 2 — Formatting numbers and dates</summary>
		<p class="detail-text">
			Use JavaScript's built-in formatting methods inside expressions.
		</p>
		<CodeCanvas
			filename="formatting"
			code={`<!-- Currency formatting -->\n<p>{plan.monthly.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>\n<!-- Renders: "$29.00" -->\n\n<!-- Date formatting -->\n{@const today = new Date()}\n<p>{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>\n<!-- Renders: "April 6, 2026" -->`}
		/>
	</details>

	<details>
		<summary>Example 3 — Conditional classes with expressions</summary>
		<p class="detail-text">
			Combine ternaries with the <code>class</code> attribute for dynamic styling.
		</p>
		<CodeCanvas
			filename="conditional classes"
			code={`<!-- Ternary in class attribute -->\n<div class={plan.popular ? 'card card-featured' : 'card'}>\n  {plan.name}\n</div>\n\n<!-- class: directive (Svelte shorthand) -->\n<div class="card" class:featured={plan.popular}>\n  {plan.name}\n</div>\n<!-- Adds "featured" class only when plan.popular is true -->`}
		/>
	</details>

	<!-- 8. Common mistakes -->
	<h2>Common mistakes</h2>
	<div class="mistakes">
		<div class="mistake-wrong">
			<h4>Wrong — @html with user input (XSS attack)</h4>
			<CodeCanvas filename="wrong.svelte" code={wrongCode} />
		</div>
		<div class="mistake-right">
			<h4>Right — escape by default, sanitize if needed</h4>
			<CodeCanvas filename="right.svelte" code={rightCode} />
		</div>
	</div>

	<!-- 9. What you learned -->
	<h3>What you learned</h3>
	<ul class="learned">
		<li>Anything inside <code>{'{}'}</code> is a real JavaScript expression.</li>
		<li>Use ternaries inline for small conditional text or class decisions.</li>
		<li><code>{'{@const}'}</code> scopes a computed value to the block it lives in.</li>
		<li><code>{'{@html}'}</code> exists for rendering raw HTML, but never hand it untrusted strings.</li>
		<li>An XSS payload like <code>&lt;img onerror="..."&gt;</code> executes arbitrary JavaScript if rendered via <code>{'{@html}'}</code>.</li>
		<li>Use <strong>DOMPurify</strong> to sanitize any HTML from untrusted sources.</li>
	</ul>

	<!-- 10. Next steps -->
	<p class="next">
		Next: <a href="/module-1/1-10-svelte5-changes">1.10 — Svelte 5 changes</a> — learn the key
		differences between Svelte 4 and 5 runes syntax.
	</p>
</section>

<style>
	/* ── Page layout ─────────────────────────────────────── */
	.page {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent spacing */
	}

	/* ── Learning objectives ─────────────────────────────── */
	.objectives {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* secondary text */
		line-height: 1.6;                    /* readable */

		& li {
			margin-block: 0.25rem;             /* item gap */
		}
	}

	/* ── Analogy block ───────────────────────────────────── */
	.analogy {
		font-size: var(--text-lg);           /* slightly larger */
		color: var(--color-text);            /* full contrast */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
		border-inline-start: 4px solid var(--color-brand); /* accent bar */
		padding-inline-start: 1rem;          /* space after bar */
	}

	/* ── Concept paragraph ───────────────────────────────── */
	.concept {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
	}

	/* ── Headings ────────────────────────────────────────── */
	.page > h2 {
		font-size: var(--text-xl);           /* section heading */
		margin-block-start: 2rem;            /* space above */
	}

	h3 {
		font-size: var(--text-lg);           /* sub-section */
		margin-block-start: 1.5rem;          /* space above */
	}

	/* ── Step text ───────────────────────────────────────── */
	.step-text {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
	}

	/* ── Pricing card (interactive demo) ─────────────────── */
	.pricing {
		position: relative;                  /* for absolute badge */
		margin-block: 2rem;                  /* vertical spacing */
		padding: 2rem 1.5rem;                /* inner spacing */
		border-radius: 1rem;                 /* rounded corners */
		border: 1px solid var(--color-border); /* card border */
		background: var(--color-surface);    /* card background */
		max-inline-size: 24rem;              /* constrain width */

		&.popular {
			border-color: var(--color-brand);  /* highlight border */
			box-shadow: 0 0 0 3px var(--color-brand-dim); /* glow ring */
		}

		& .badge {
			position: absolute;                /* float above card */
			inset-block-start: -0.75rem;       /* overlap top edge */
			inset-inline-start: 1.5rem;        /* offset from left */
			background: var(--color-brand);    /* brand fill */
			color: var(--color-surface);       /* white text */
			font-size: var(--text-xs);         /* small text */
			font-weight: 700;                  /* bold */
			text-transform: uppercase;         /* all caps */
			letter-spacing: 0.08em;            /* slight tracking */
			padding: 0.35rem 0.75rem;          /* pill padding */
			border-radius: 999px;              /* pill shape */
		}

		& h2 {
			font-size: var(--text-2xl);        /* large title */
			margin: 0 0 0.5rem;                /* bottom spacing only */
		}

		& .price {
			margin: 0;                         /* remove default */
			display: flex;                     /* inline layout */
			align-items: baseline;             /* align text baselines */
			gap: 0.25rem;                      /* tight gap */

			& .amount {
				font-size: var(--text-hero);    /* huge price */
				font-weight: 800;                /* extra bold */
				line-height: 1;                  /* tight leading */
				color: var(--color-text);        /* primary color */
			}

			& .period {
				font-size: var(--text-base);    /* body size */
				color: var(--color-text-muted);  /* secondary */
			}
		}

		& .savings {
			margin: 0.25rem 0 1.25rem;         /* vertical spacing */
			color: var(--color-brand);         /* brand accent */
			font-size: var(--text-sm);         /* small text */
			font-weight: 600;                  /* semi-bold */
		}

		& .features {
			list-style: none;                  /* remove bullets */
			padding: 0;                        /* remove padding */
			margin: 0 0 1.5rem;                /* bottom spacing */
			display: flex;                     /* vertical stack */
			flex-direction: column;            /* top to bottom */
			gap: 0.5rem;                       /* space between items */

			& li {
				display: flex;                   /* inline icon + text */
				align-items: center;             /* vertically centered */
				gap: 0.6rem;                     /* icon-text gap */
				font-size: var(--text-base);     /* body size */
				color: var(--color-text);        /* primary text */
			}

			& .check {
				inline-size: 1.1rem;             /* icon width */
				block-size: 1.1rem;              /* icon height */
				color: var(--color-brand);       /* brand color */
				flex-shrink: 0;                  /* never squish */
			}
		}

		& .cta {
			inline-size: 100%;                 /* full width button */
			padding: 0.85rem 1rem;             /* comfortable target */
			border: none;                      /* no border */
			border-radius: 0.6rem;             /* rounded */
			background: var(--color-brand);    /* brand fill */
			color: var(--color-surface);       /* white text */
			font-size: var(--text-base);       /* body size */
			font-weight: 600;                  /* semi-bold */
			cursor: pointer;                   /* hand cursor */
			transition: transform 0.15s ease;  /* smooth hover */

			&:hover {
				transform: translateY(-1px);     /* subtle lift */
			}
		}
	}

	/* ── XSS danger zone ─────────────────────────────────── */
	.build {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent spacing */
		background: var(--color-surface);    /* card background */
		border: 1px solid var(--color-border); /* border */
		border-radius: 1rem;                 /* rounded */
		padding: 1.5rem;                     /* inner spacing */
		margin-block: 2rem;                  /* vertical breathing room */
		max-inline-size: 40rem;              /* constrain width */
	}

	.danger-heading {
		font-size: var(--text-lg);           /* slightly smaller heading */
		margin: 0;                           /* remove default */
		color: var(--color-text);            /* primary text */
	}

	.danger-desc {
		margin: 0;                           /* remove default */
		color: var(--color-text-muted);      /* secondary */
		font-size: var(--text-base);         /* body size */
	}

	.html-output {
		padding: 0.75rem 1rem;               /* inner spacing */
		background: var(--color-surface);    /* subtle bg */
		border: 1px solid var(--color-border); /* border */
		border-radius: 0.5rem;               /* rounded */
		font-size: var(--text-base);         /* body size */
	}

	.xss-example {
		margin: 0;                           /* remove default */
		padding: 0.75rem 1rem;               /* inner spacing */
		background: var(--color-surface);    /* subtle bg */
		border: 1px solid var(--color-border); /* border */
		border-radius: 0.5rem;               /* rounded */
		overflow-x: auto;                    /* scroll long lines */
	}

	.danger-note {
		border-left: 4px solid var(--color-brand); /* accent bar */
		background: var(--color-surface);    /* subtle bg */
		padding: 0.75rem 1rem;               /* inner spacing */
		border-radius: 0.5rem;               /* rounded */
		font-size: var(--text-sm);           /* small text */
		color: var(--color-text-muted);      /* secondary */
		line-height: 1.6;                    /* comfortable */
	}

	/* ── Mistakes section ────────────────────────────────── */
	.mistakes {
		display: flex;                       /* side by side */
		flex-direction: column;              /* stack on mobile */
		gap: 1.5rem;                         /* spacing */

		& h4 {
			font-size: var(--text-sm);         /* small heading */
			margin-block-end: 0.5rem;          /* space before code */
		}
	}

	.mistake-wrong h4 {
		color: oklch(55% 0.15 25);           /* red-ish */
	}

	.mistake-right h4 {
		color: oklch(55% 0.15 145);          /* green-ish */
	}

	/* ── Details blocks ──────────────────────────────────── */
	details {
		border: 1px solid var(--color-border); /* boundary */
		border-radius: 0.5rem;               /* rounded */
		padding: 1rem;                       /* inner spacing */

		& summary {
			cursor: pointer;                   /* clickable */
			font-weight: 600;                  /* bold */
			color: var(--color-brand);         /* accent */
			font-size: var(--text-base);       /* body size */
		}
	}

	.detail-text {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-text-muted);      /* secondary */
		margin-block: 0.5rem;                /* spacing */
	}

	/* ── Learned list ────────────────────────────────────── */
	.learned {
		padding-inline-start: 1.25rem;       /* indent */
		color: var(--color-text-muted);      /* secondary */

		& li {
			margin-block: 0.25rem;             /* item gap */
		}
	}

	/* ── Next link ───────────────────────────────────────── */
	.next {
		font-size: var(--text-base);         /* body size */
		margin-block-start: 2rem;            /* space above */
		padding: 1rem;                       /* inner padding */
		background: var(--color-surface);    /* subtle bg */
		border-radius: 0.5rem;               /* rounded */
		border: 1px solid var(--color-border); /* boundary */

		& a {
			color: var(--color-brand);         /* brand link */
			font-weight: 600;                  /* bold */
			text-decoration: underline;        /* clarity */
		}
	}

	/* ── Responsive ──────────────────────────────────────── */
	@media (min-width: 768px) {
		.pricing {
			padding: 2.5rem 2rem;              /* more padding on wide */
		}

		.mistakes {
			flex-direction: row;               /* side by side */

			& > div {
				flex: 1;                         /* equal width */
			}
		}
	}
</style>
