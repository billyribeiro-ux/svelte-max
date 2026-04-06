<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	// ── Token data for the interactive specimen ──────────────────────────
	const sizes: readonly { token: string; formula: string }[] = [
		{ token: '--text-xs', formula: 'clamp(0.75rem, 1.5vw, 0.875rem)' },
		{ token: '--text-sm', formula: 'clamp(0.875rem, 2vw, 1rem)' },
		{ token: '--text-base', formula: 'clamp(1rem, 2.5vw, 1.125rem)' },
		{ token: '--text-lg', formula: 'clamp(1.125rem, 3vw, 1.5rem)' },
		{ token: '--text-xl', formula: 'clamp(1.5rem, 4vw, 2rem)' },
		{ token: '--text-2xl', formula: 'clamp(2rem, 5vw, 3rem)' },
		{ token: '--text-hero', formula: 'clamp(2.5rem, 8vw, 5rem)' }
	];

	const sample: string = 'The quick brown fox jumps over the lazy dog';

	// ── CodeCanvas strings ──────────────────────────────────────────────
	const fullFileCode: string = `\u003cscript lang="ts"\u003e
  // Each token maps to a clamp() formula already defined in app.css.
  // We list them here so we can render the type specimen dynamically.
  const sizes: readonly { token: string; formula: string }[] = [
    { token: '--text-xs',   formula: 'clamp(0.75rem, 1.5vw, 0.875rem)' },
    { token: '--text-sm',   formula: 'clamp(0.875rem, 2vw, 1rem)' },
    { token: '--text-base', formula: 'clamp(1rem, 2.5vw, 1.125rem)' },
    { token: '--text-lg',   formula: 'clamp(1.125rem, 3vw, 1.5rem)' },
    { token: '--text-xl',   formula: 'clamp(1.5rem, 4vw, 2rem)' },
    { token: '--text-2xl',  formula: 'clamp(2rem, 5vw, 3rem)' },
    { token: '--text-hero', formula: 'clamp(2.5rem, 8vw, 5rem)' }
  ];

  const sample: string = 'The quick brown fox jumps over the lazy dog';
\u003c/script\u003e

<!-- Render one row per token showing its name, formula, and a live sample -->
{#each sizes as { token, formula } (token)}
  <article class="row">
    <div class="label">
      <span class="token">{token}</span>
      <code class="formula">{formula}</code>
    </div>
    <!-- style:font-size dynamically sets the CSS variable as the font size -->
    <p class="sample" style:font-size="var({token})">{sample}</p>
  </article>
{/each}`;

	const appCssTokens: string = `/* ── PE7 fluid type scale (from app.css) ────────────── */
:root {
  /* Extra small — captions, footnotes */
  --text-xs:   clamp(0.75rem, 1.5vw, 0.875rem);

  /* Small — secondary text, labels */
  --text-sm:   clamp(0.875rem, 2vw, 1rem);

  /* Base — body text, default paragraphs */
  --text-base: clamp(1rem, 2.5vw, 1.125rem);

  /* Large — emphasized paragraphs, sub-headings */
  --text-lg:   clamp(1.125rem, 3vw, 1.5rem);

  /* Extra large — section headings */
  --text-xl:   clamp(1.5rem, 4vw, 2rem);

  /* 2XL — page titles */
  --text-2xl:  clamp(2rem, 5vw, 3rem);

  /* Hero — landing pages, big statements */
  --text-hero: clamp(2.5rem, 8vw, 5rem);
}`;

	const stepClampCode: string = `/* clamp() takes exactly 3 arguments: */
font-size: clamp(
  1rem,      /* MINIMUM — never smaller than this */
  2.5vw,     /* PREFERRED — scales with the viewport width */
  1.125rem   /* MAXIMUM — never bigger than this */
);`;

	const stepTokenCode: string = `/* Instead of writing clamp() every time, use the token: */
h2 {
  font-size: var(--text-xl);
  /* At 320px viewport => about 1.5rem */
  /* At 1440px viewport => about 2rem */
  /* Smooth scaling in between — no media queries needed */
}`;

	const stepUsageCode: string = `\u003cscript lang="ts"\u003e
  const title: string = 'Hello, fluid type!';
\u003c/script\u003e

<h1 style:font-size="var(--text-hero)">{title}</h1>
<p style:font-size="var(--text-base)">
  This paragraph scales smoothly from phone to desktop.
</p>`;

	const wrongCode: string = `/* WRONG — raw vw with no bounds */
h1 {
  font-size: 5vw;
  /* On a 320px phone this is 16px — okay */
  /* On a 2560px monitor this is 128px — absurdly large! */
  /* No lower or upper safety rail */
}`;

	const rightCode: string = `/* RIGHT — clamped with min and max bounds */
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  /* Never smaller than 2rem (32px) */
  /* Scales with viewport in between */
  /* Never larger than 4rem (64px) */
}`;

	// ── Practice challenge ──────────────────────────────────────────────
	const practiceChallenge: string =
		'Add a new heading using --text-hero and write a paragraph using --text-sm. Resize the browser and watch both scale.';

	const practiceStarter: string = `<h1 style:font-size="">My Hero Heading</h1>
<p style:font-size="">This is a small note.</p>`;

	const practiceExpected: readonly string[] = [
		'var(--text-hero)',
		'var(--text-sm)'
	];

	const practiceHints: readonly string[] = [
		'Use style:font-size="var(--text-hero)" on the h1.',
		'Use style:font-size="var(--text-sm)" on the p.',
		'Both values go inside var() which reads the CSS custom property.'
	];
</script>

<section class="page">
	<!-- ① Title + Learning Objectives -->
	<h1>1.6 — Fluid Typography</h1>
	<ul class="objectives">
		<li>Understand how CSS <code>clamp()</code> works with three arguments</li>
		<li>Know the complete PE7 fluid type scale and every token name</li>
		<li>See text scaling smoothly without a single media query</li>
	</ul>

	<!-- ② Why this matters -->
	<h2>Why this matters</h2>
	<p class="analogy">
		<strong>Imagine a rubber band with stops at both ends.</strong> It stretches with the viewport
		but can never get smaller than the left stop or bigger than the right stop. That is exactly what
		<code>clamp(min, preferred, max)</code> does for font sizes. The "preferred" value (usually a
		<code>vw</code> unit) makes text grow and shrink with the browser width, while the min and max
		values act as safety rails preventing text from becoming unreadable on phones or absurdly huge
		on ultrawide monitors.
	</p>
	<p class="concept">
		Technically, <code>clamp()</code> evaluates to whichever of its three arguments is the "middle"
		value. If the preferred value is below the minimum, the minimum wins. If it is above the
		maximum, the maximum wins. Otherwise, the preferred value is used as-is. One line of CSS
		replaces an entire stack of <code>@media</code> breakpoints for typography.
	</p>

	<!-- ③ The complete code -->
	<h2>The complete code</h2>
	<CodeCanvas filename="+page.svelte" code={fullFileCode} />
	<CodeCanvas filename="app.css (token definitions)" code={appCssTokens} />

	<!-- ④ Step-by-step walkthrough -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1 — Understand clamp()</h3>
	<p class="step-text">
		The <code>clamp()</code> function takes exactly three arguments. The browser picks whichever is
		the middle value at the current viewport width.
	</p>
	<CodeCanvas filename="clamp() anatomy" code={stepClampCode} />

	<h3>Step 2 — Use a PE7 token instead of raw clamp</h3>
	<p class="step-text">
		The PE7 design system pre-defines seven fluid tokens in <code>app.css</code>. You never need to
		write <code>clamp()</code> by hand — just reference the token.
	</p>
	<CodeCanvas filename="Using a token" code={stepTokenCode} />

	<h3>Step 3 — Apply tokens in Svelte markup</h3>
	<p class="step-text">
		Use <code>style:font-size</code> or a regular CSS rule to apply any token. The text will scale
		smoothly as the user resizes.
	</p>
	<CodeCanvas filename="In a Svelte component" code={stepUsageCode} />

	<!-- ⑤ See it in action -->
	<h2>See it in action</h2>
	<p class="hint">Resize the browser window slowly and watch every row scale in lockstep — no snaps, no jumps.</p>

	<div class="specimen">
		{#each sizes as { token, formula } (token)}
			<article class="row">
				<div class="label">
					<span class="token">{token}</span>
					<code class="formula">{formula}</code>
				</div>
				<p class="sample" style:font-size="var({token})">{sample}</p>
			</article>
		{/each}
	</div>

	<!-- ⑥ Your turn -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge={practiceChallenge}
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- ⑦ More examples -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1 — Fluid hero with subtitle</summary>
		<p class="detail-text">
			A landing page hero that uses <code>--text-hero</code> for the headline and
			<code>--text-lg</code> for the subtitle. Both scale independently within their own bounds.
		</p>
		<CodeCanvas
			filename="Hero example"
			code={`<h1 style:font-size="var(--text-hero)">Welcome</h1>\n<p style:font-size="var(--text-lg)">Build something great today.</p>`}
		/>
	</details>

	<details>
		<summary>Example 2 — Card with mixed sizes</summary>
		<p class="detail-text">
			A card that combines three different scale levels for visual hierarchy.
		</p>
		<CodeCanvas
			filename="Card typography"
			code={`<article class="card">\n  <!-- Heading uses the large token -->\n  <h3 style:font-size="var(--text-xl)">Project Alpha</h3>\n  <!-- Body text uses the base token -->\n  <p style:font-size="var(--text-base)">A real-time collaboration tool.</p>\n  <!-- Caption uses the extra-small token -->\n  <span style:font-size="var(--text-xs)">Updated 2 hours ago</span>\n</article>`}
		/>
	</details>

	<details>
		<summary>Example 3 — Custom clamp for a one-off size</summary>
		<p class="detail-text">
			Sometimes you need a size outside the scale. Write your own <code>clamp()</code> with
			the same pattern: rem minimum, vw preferred, rem maximum.
		</p>
		<CodeCanvas
			filename="Custom clamp"
			code={`/* One-off size not in the PE7 scale */\n.pull-quote {\n  font-size: clamp(1.25rem, 3.5vw, 2.25rem);\n  /* min: 20px on small screens */\n  /* preferred: scales at 3.5% of viewport */\n  /* max: 36px on large screens */\n}`}
		/>
	</details>

	<!-- ⑧ Common mistakes -->
	<h2>Common mistakes</h2>
	<div class="mistakes">
		<div class="mistake-wrong">
			<h4>Wrong — raw vw with no bounds</h4>
			<CodeCanvas filename="wrong.css" code={wrongCode} />
		</div>
		<div class="mistake-right">
			<h4>Right — clamped with safety rails</h4>
			<CodeCanvas filename="right.css" code={rightCode} />
		</div>
	</div>

	<!-- ⑨ What you learned -->
	<h3>What you learned</h3>
	<ul class="learned">
		<li><code>clamp()</code> takes exactly three arguments: min, preferred, max.</li>
		<li>The preferred value mixes <code>rem</code> + <code>vw</code> so it scales with the viewport.</li>
		<li>PE7 tokens (<code>--text-xs</code> through <code>--text-hero</code>) are pre-clamped — just use them.</li>
		<li>Fluid type eliminates the majority of typography media queries.</li>
		<li>Never use a raw <code>vw</code> value without min/max bounds.</li>
	</ul>

	<!-- ⑩ Next steps -->
	<p class="next">
		Next: <a href="/module-1/1-7-scoping">1.7 — Scoped styles</a> — learn how Svelte keeps your
		CSS from leaking into other components.
	</p>
</section>

<style>
	/* ── Page layout ─────────────────────────────────────── */
	.page {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-md);                /* consistent spacing between sections */
	}

	/* ── Learning objectives ─────────────────────────────── */
	.objectives {
		padding-inline-start: 1.25rem;       /* indent bullet list */
		color: var(--color-text-muted);      /* softer than body text */
		line-height: 1.6;                    /* readable line height */

		& li {
			margin-block: 0.25rem;             /* small gap between items */
		}
	}

	/* ── Analogy block ───────────────────────────────────── */
	.analogy {
		font-size: var(--text-lg);           /* slightly larger for emphasis */
		color: var(--color-text);            /* full contrast */
		max-inline-size: 65ch;               /* optimal reading width */
		line-height: 1.6;                    /* comfortable reading */
		border-inline-start: 4px solid var(--color-brand); /* left accent bar */
		padding-inline-start: 1rem;          /* space after the bar */
	}

	/* ── Concept paragraph ───────────────────────────────── */
	.concept {
		font-size: var(--text-base);         /* standard body size */
		color: var(--color-text-muted);      /* secondary emphasis */
		max-inline-size: 65ch;               /* reading width cap */
		line-height: 1.6;                    /* comfortable reading */
	}

	/* ── Headings ────────────────────────────────────────── */
	h2 {
		font-size: var(--text-xl);           /* section heading size */
		margin-block-start: 2rem;            /* breathing room above */
	}

	h3 {
		font-size: var(--text-lg);           /* sub-heading size */
		margin-block-start: 1.5rem;          /* space above */
	}

	/* ── Step text ───────────────────────────────────────── */
	.step-text {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary color */
		max-inline-size: 65ch;               /* reading width */
	}

	/* ── Hint ────────────────────────────────────────────── */
	.hint {
		font-size: var(--text-sm);           /* smaller than body */
		color: var(--color-brand);           /* brand accent color */
		font-style: italic;                  /* visual distinction */
	}

	/* ── Interactive specimen ────────────────────────────── */
	.specimen {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* rows top to bottom */
		gap: 1.5rem;                         /* space between rows */
		margin-block: 2rem;                  /* vertical breathing room */

		& .row {
			border-block-end: 1px solid var(--color-border); /* subtle separator */
			padding-block-end: 1rem;           /* space before the border */

			& .label {
				display: flex;                   /* inline layout */
				flex-direction: column;          /* stack token + formula */
				gap: 0.25rem;                    /* tight gap */
				margin-block-end: 0.5rem;        /* space before sample text */
			}

			& .token {
				font-family: ui-monospace, monospace; /* monospace for code */
				font-size: var(--text-sm);       /* small label size */
				color: var(--color-brand);       /* brand color highlight */
				font-weight: 600;                /* semi-bold for emphasis */
			}

			& .formula {
				font-family: ui-monospace, monospace; /* monospace for code */
				font-size: var(--text-xs);       /* extra-small for formula */
				color: var(--color-text-muted);  /* secondary color */
				word-break: break-word;          /* wrap long formulas */
			}

			& .sample {
				margin: 0;                       /* remove default margin */
				line-height: 1.2;                /* tight line height for display */
				color: var(--color-text);        /* primary text color */
			}
		}
	}

	/* ── Mistakes section ────────────────────────────────── */
	.mistakes {
		display: flex;                       /* side by side on wide screens */
		flex-direction: column;              /* stack on mobile */
		gap: 1.5rem;                         /* space between wrong/right */

		& h4 {
			font-size: var(--text-sm);         /* small heading */
			margin-block-end: 0.5rem;          /* space before code block */
		}
	}

	.mistake-wrong h4 {
		color: oklch(55% 0.15 25);           /* red-ish for "wrong" */
	}

	.mistake-right h4 {
		color: oklch(55% 0.15 145);          /* green-ish for "right" */
	}

	/* ── Details blocks ──────────────────────────────────── */
	details {
		border: 1px solid var(--color-border);  /* visible boundary */
		border-radius: 0.5rem;                  /* rounded corners */
		padding: 1rem;                          /* inner spacing */

		& summary {
			cursor: pointer;                    /* clickable indicator */
			font-weight: 600;                   /* bold label */
			color: var(--color-brand);          /* brand color */
			font-size: var(--text-base);        /* body size */
		}
	}

	.detail-text {
		font-size: var(--text-sm);           /* smaller explanatory text */
		color: var(--color-text-muted);      /* secondary color */
		margin-block: 0.5rem;                /* space above and below */
	}

	/* ── Learned list ────────────────────────────────────── */
	.learned {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* secondary color */

		& li {
			margin-block: 0.25rem;             /* gap between items */
		}
	}

	/* ── Next link ────────────────────────────────────────── */
	.next {
		font-size: var(--text-base);         /* body size */
		margin-block-start: 2rem;            /* space above */
		padding: 1rem;                       /* inner padding */
		background: var(--color-surface);    /* subtle background */
		border-radius: 0.5rem;               /* rounded corners */
		border: 1px solid var(--color-border); /* visible boundary */

		& a {
			color: var(--color-brand);         /* brand link color */
			font-weight: 600;                  /* bold link text */
			text-decoration: underline;        /* underline for clarity */
		}
	}

	/* ── Responsive — tablet and up ──────────────────────── */
	@media (min-width: 768px) {
		.specimen {
			& .row {
				display: grid;                   /* switch to grid for alignment */
				grid-template-columns: 18rem 1fr; /* fixed label, fluid sample */
				align-items: baseline;           /* align text baselines */
				gap: 2rem;                       /* space between columns */

				& .label {
					margin-block-end: 0;           /* no bottom margin in grid */
				}
			}
		}

		.mistakes {
			flex-direction: row;               /* side by side on wider screens */

			& > div {
				flex: 1;                         /* equal width */
			}
		}
	}
</style>
