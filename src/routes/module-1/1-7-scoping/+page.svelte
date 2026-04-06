<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	// ── Demo data ───────────────────────────────────────────────────────
	const labelA: string = 'Primary action';
	const labelB: string = 'Ghost action';

	// ── CodeCanvas strings ──────────────────────────────────────────────
	const fullFileCode: string = `\u003cscript lang="ts"\u003e
  // Two buttons with the SAME class name ".button"
  // but completely different styles — scoping keeps them separate.
  const labelA: string = 'Primary action';
  const labelB: string = 'Ghost action';
\u003c/script\u003e

<div class="demo">
  <!-- Card A: solid brand button -->
  <div class="card card-a">
    <h2>Card A</h2>
    <p>This card uses the brand look.</p>
    <button class="button" type="button">{labelA}</button>
  </div>

  <!-- Card B: ghost/outline button -->
  <div class="card card-b">
    <h2>Card B</h2>
    <p>This card uses a ghost look.</p>
    <button class="button" type="button">{labelB}</button>
  </div>
</div>

<style>
  /* Svelte adds a unique hash (e.g. .button.svelte-abc123)
     to every selector in this block at compile time.
     Both .button rules coexist without any collision. */

  .card-a .button {
    background: var(--color-brand);  /* solid fill */
    color: var(--color-surface);     /* white text */
    border: none;                    /* no border */
    padding: 0.65rem 1.2rem;        /* comfortable click target */
    border-radius: 0.5rem;          /* rounded corners */
  }

  .card-b .button {
    background: transparent;         /* no fill */
    color: var(--color-brand);       /* brand-colored text */
    border: 2px solid var(--color-brand); /* outline only */
    padding: 0.55rem 1.1rem;        /* slightly smaller */
    border-radius: 999px;           /* pill shape */
  }
</style>`;

	const stepHashCode: string = `/* What you write: */
.button {
  background: var(--color-brand);
}

/* What Svelte compiles it to: */
.button.svelte-abc123 {
  background: var(--color-brand);
}
/* The hash "svelte-abc123" is unique to THIS component.
   Another component's .button gets a DIFFERENT hash. */`;

	const stepHtmlCode: string = `<!-- What you write: -->
<button class="button">Click</button>

<!-- What Svelte renders in the DOM: -->
<button class="button svelte-abc123">Click</button>
<!-- The hash class is added automatically — you never type it. -->`;

	const stepDevtoolsCode: string = `/* Open DevTools (F12) > Elements tab > click a button.
   You will see something like:

   <button class="button svelte-a1b2c3">Primary action</button>

   The "svelte-a1b2c3" hash proves scoping is active.
   Each component gets its OWN unique hash. */`;

	const globalHtmlCode: string = `\u003cscript lang="ts"\u003e
  // Content from a CMS or markdown renderer
  const html: string = '<p class="intro">Hello from the API</p>';
\u003c/script\u003e

<!-- {'{@html}'} injects raw HTML — it has NO Svelte hash classes -->
<div class="prose">
  {@html html}
</div>

<style>
  .prose :global(.intro) {
    /* :global() removes the hash from .intro so it can match
       the un-hashed HTML injected by {'{@html}'}.
       The .prose wrapper keeps it scoped to this component. */
    font-size: var(--text-lg);
    color: var(--color-brand);
  }
</style>`;

	const globalSvgCode: string = `\u003cscript lang="ts"\u003e
  import { onMount } from 'svelte';
  // D3 or another library creates SVG elements at runtime.
  // Those elements have no Svelte hash classes.
\u003c/script\u003e

<div class="chart-wrapper">
  <svg bind:this={svgEl}></svg>
</div>

<style>
  .chart-wrapper :global(path) {
    /* Matches <path> elements created by D3 at runtime.
       The .chart-wrapper prefix keeps it scoped. */
    stroke: var(--color-brand);
    stroke-width: 2;
  }
</style>`;

	const globalLibCode: string = `<!-- Wrapping a third-party date picker -->
<div class="datepicker-wrapper">
  <ThirdPartyDatePicker />
</div>

<style>
  .datepicker-wrapper :global(.dp-header) {
    /* The date picker library creates .dp-header internally.
       :global() lets us style it. The wrapper keeps us safe. */
    background: var(--color-surface);
    color: var(--color-text);
  }
</style>`;

	const wrongGlobalCode: string = `/* WRONG — unnecessary :global() breaks scoping */
:global(.button) {
  background: red;
  /* This styles EVERY .button on the ENTIRE page,
     including buttons in other components.
     You almost never want this. */
}`;

	const rightGlobalCode: string = `/* RIGHT — scoped class, no :global() needed */
.button {
  background: var(--color-brand);
  /* Svelte automatically adds the hash.
     Only THIS component's .button is affected. */
}`;

	// ── Practice challenge ──────────────────────────────────────────────
	const practiceChallenge: string =
		'Add a third card with its own .button style (a different color, e.g., orange). Verify that all three buttons are independently styled by scoping.';

	const practiceStarter: string = `<div class="card card-c">
  <h2>Card C</h2>
  <p>This card has a unique button.</p>
  <button class="button" type="button">Custom action</button>
</div>

<style>
  .card-c .button {
    /* Add your styles here */
  }
</style>`;

	const practiceExpected: readonly string[] = [
		'background:',
		'.card-c .button'
	];

	const practiceHints: readonly string[] = [
		'Set a background color on .card-c .button, like background: orange.',
		'Add padding, border-radius, and other properties to complete the button.',
		'Svelte will hash your .card-c .button selector automatically — no :global() needed.'
	];
</script>

<section class="page">
	<!-- 1. Title + Learning Objectives -->
	<h1>1.7 — Scoped Styles</h1>
	<ul class="objectives">
		<li>Understand how Svelte's hash-based scoping prevents CSS collisions</li>
		<li>Know when <code>:global()</code> is correct and the three valid use cases</li>
		<li>Verify scoping in DevTools by inspecting the compiled class names</li>
	</ul>

	<!-- 2. Why this matters -->
	<h2>Why this matters</h2>
	<p class="analogy">
		<strong>Imagine you and your friend both have a cat named "Whiskers."</strong> Without scoping,
		calling "Whiskers!" would confuse both cats. Svelte adds a unique tag to each component's
		Whiskers so they never get mixed up. Your <code>.button</code> and another component's
		<code>.button</code> can have completely different styles without any conflict.
	</p>
	<p class="concept">
		At build time, Svelte rewrites every selector inside a component's <code>&lt;style&gt;</code>
		block with a unique hash suffix. A plain <code>.button</code> becomes
		<code>.button.svelte-abc123</code> in the compiled output. It also adds the same hash class to
		the corresponding HTML elements. This means two components can both define <code>.button</code>
		with entirely different styles, and they will never collide.
	</p>

	<!-- 3. The complete code -->
	<h2>The complete code</h2>
	<CodeCanvas filename="+page.svelte" code={fullFileCode} />

	<!-- 4. Step-by-step walkthrough -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1 — How the hash works in CSS</h3>
	<p class="step-text">
		Svelte's compiler reads your <code>&lt;style&gt;</code> block and appends a unique hash to
		every selector. You write normal CSS; the compiler does the rest.
	</p>
	<CodeCanvas filename="CSS compilation" code={stepHashCode} />

	<h3>Step 2 — How the hash works in HTML</h3>
	<p class="step-text">
		The same hash is added as an extra class on every element that matches a scoped selector.
	</p>
	<CodeCanvas filename="HTML compilation" code={stepHtmlCode} />

	<h3>Step 3 — Verify in DevTools</h3>
	<p class="step-text">
		Open your browser's DevTools, inspect one of the buttons below, and look for the hash class.
		This is proof that scoping is active.
	</p>
	<CodeCanvas filename="DevTools inspection" code={stepDevtoolsCode} />

	<!-- 5. See it in action -->
	<h2>See it in action</h2>
	<p class="hint">
		Both buttons below use the class name <code>.button</code>, but they look completely different.
		Inspect them in DevTools to see the hash.
	</p>

	<div class="demo">
		<div class="card card-a">
			<h2>Card A</h2>
			<p>This card uses the brand look.</p>
			<button class="button" type="button">{labelA}</button>
		</div>

		<div class="card card-b">
			<h2>Card B</h2>
			<p>This card uses a ghost look.</p>
			<button class="button" type="button">{labelB}</button>
		</div>
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
		<summary>Valid :global() use case 1 — {'{@html}'} injected content</summary>
		<p class="detail-text">
			Content injected via <code>{'{@html}'}</code> has no Svelte hash classes, so you need
			<code>:global()</code> inside a scoped wrapper to style it.
		</p>
		<CodeCanvas filename="global-html.svelte" code={globalHtmlCode} />
	</details>

	<details>
		<summary>Valid :global() use case 2 — SVG internals</summary>
		<p class="detail-text">
			Dynamically created SVG elements (e.g., from D3) bypass Svelte's compiler and have no
			hash classes.
		</p>
		<CodeCanvas filename="global-svg.svelte" code={globalSvgCode} />
	</details>

	<details>
		<summary>Valid :global() use case 3 — Third-party library DOM</summary>
		<p class="detail-text">
			When your component wraps a library that creates its own DOM (date pickers, rich-text
			editors, map tiles), <code>:global()</code> scoped to a wrapper class keeps styles targeted
			without leaking.
		</p>
		<CodeCanvas filename="global-library.svelte" code={globalLibCode} />
	</details>

	<!-- 8. Common mistakes -->
	<h2>Common mistakes</h2>
	<div class="mistakes">
		<div class="mistake-wrong">
			<h4>Wrong — using :global() when you do not need it</h4>
			<CodeCanvas filename="wrong.svelte" code={wrongGlobalCode} />
		</div>
		<div class="mistake-right">
			<h4>Right — let Svelte scope it for you</h4>
			<CodeCanvas filename="right.svelte" code={rightGlobalCode} />
		</div>
	</div>
	<p class="concept">
		Using <code>:global()</code> when you do not need it is the number-one scoping mistake.
		It removes the hash protection entirely and your styles leak to every matching element on
		the page. Only reach for it in the three cases above.
	</p>

	<!-- 9. What you learned -->
	<h3>What you learned</h3>
	<ul class="learned">
		<li>Svelte hashes every class in a component's <code>&lt;style&gt;</code> block at compile time.</li>
		<li>Identical class names in different components cannot collide.</li>
		<li>DevTools shows the hash suffix on the element — go look.</li>
		<li><code>:global()</code> is an escape hatch for three specific cases: <code>{'{@html}'}</code>, SVG internals, and third-party library DOM.</li>
		<li>Always wrap <code>:global()</code> inside a scoped parent selector (e.g., <code>.wrapper :global(.target)</code>) to prevent leaking.</li>
	</ul>

	<!-- 10. Next steps -->
	<p class="next">
		Next: <a href="/module-1/1-8-interfaces">1.8 — Interfaces</a> — define the shape of your data
		with TypeScript interfaces.
	</p>
</section>

<style>
	/* ── Page layout ─────────────────────────────────────── */
	.page {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent section spacing */
	}

	/* ── Learning objectives ─────────────────────────────── */
	.objectives {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* softer text */
		line-height: 1.6;                    /* readable spacing */

		& li {
			margin-block: 0.25rem;             /* gap between items */
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
	h2 {
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

	/* ── Hint ────────────────────────────────────────────── */
	.hint {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-brand);           /* accent */
		font-style: italic;                  /* visual distinction */
	}

	/* ── Interactive demo ────────────────────────────────── */
	.demo {
		display: flex;                       /* horizontal on wide */
		flex-direction: column;              /* stack on mobile */
		gap: 1.5rem;                         /* space between cards */
		margin-block: 2rem;                  /* vertical breathing room */
	}

	.card {
		padding: 1.5rem;                     /* inner spacing */
		border-radius: 0.75rem;              /* rounded corners */
		border: 1px solid var(--color-border); /* subtle border */

		& h2 {
			font-size: var(--text-lg);         /* card heading */
			margin-block: 0 0.5rem;            /* no top, small bottom */
		}

		& p {
			font-size: var(--text-base);       /* body text */
			color: var(--color-text-muted);    /* secondary */
			margin-block: 0 1rem;              /* space before button */
		}
	}

	.card-a {
		background: var(--color-surface);    /* card background */

		& .button {
			background: var(--color-brand);    /* solid brand fill */
			color: var(--color-surface);       /* white text on brand */
			border: none;                      /* no border */
			padding: 0.65rem 1.2rem;           /* comfortable target */
			border-radius: 0.5rem;             /* rounded corners */
			font-size: var(--text-base);       /* body text size */
			font-weight: 600;                  /* semi-bold */
			cursor: pointer;                   /* hand cursor */
			transition: transform 0.15s ease;  /* smooth hover */

			&:hover {
				transform: translateY(-1px);     /* subtle lift */
			}
		}
	}

	.card-b {
		background: var(--color-surface);    /* card background */

		& .button {
			background: transparent;           /* no fill — ghost style */
			color: var(--color-brand);         /* brand-colored text */
			border: 2px solid var(--color-brand); /* outline border */
			padding: 0.55rem 1.1rem;           /* slightly smaller */
			border-radius: 999px;              /* pill shape */
			font-size: var(--text-base);       /* body text size */
			font-weight: 600;                  /* semi-bold */
			cursor: pointer;                   /* hand cursor */
			letter-spacing: 0.02em;            /* slight tracking */

			&:hover {
				background: var(--color-brand-dim); /* subtle fill on hover */
			}
		}
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
		color: oklch(55% 0.15 25);           /* red-ish warning */
	}

	.mistake-right h4 {
		color: oklch(55% 0.15 145);          /* green-ish success */
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
		font-size: var(--text-sm);           /* smaller text */
		color: var(--color-text-muted);      /* secondary */
		margin-block: 0.5rem;                /* spacing */
	}

	/* ── Learned list ────────────────────────────────────── */
	.learned {
		padding-inline-start: 1.25rem;       /* indent */
		color: var(--color-text-muted);      /* secondary */

		& li {
			margin-block: 0.25rem;             /* gap between items */
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
		.demo {
			flex-direction: row;               /* side by side */

			& .card {
				flex: 1;                         /* equal width */
			}
		}

		.mistakes {
			flex-direction: row;               /* side by side */

			& > div {
				flex: 1;                         /* equal width */
			}
		}
	}
</style>
