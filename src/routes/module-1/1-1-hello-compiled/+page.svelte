<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const greeting: string = 'Hello, world.';

	/* ── Complete code for CodeCanvas ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // A constant that holds our greeting text.\n" +
		"  // 'const' means this value will never change.\n" +
		"  // ': string' is a TypeScript annotation — it tells\n" +
		"  // the compiler this variable holds text, not a number.\n" +
		"  const greeting: string = 'Hello, world.';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- MARKUP — what the user sees on screen --\u003e\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e1.1 — Hello, compiled\u003c/h1\u003e\n" +
		"\n" +
		"  \u003carticle class=\"card\"\u003e\n" +
		"    \u003c!-- {greeting} is a template expression. --\u003e\n" +
		"    \u003c!-- Svelte replaces it with the value of the variable. --\u003e\n" +
		"    \u003ch2\u003e{greeting}\u003c/h2\u003e\n" +
		"    \u003cp\u003eThis card was compiled, not rendered by a framework.\u003c/p\u003e\n" +
		"  \u003c/article\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* Scoped styles — Svelte adds a hash so these\n" +
		"     ONLY apply to this component, never leak out. */\n" +
		"\n" +
		"  .card {\n" +
		"    /* background: sets the fill color of the card */\n" +
		"    /* var(--color-brand) resolves to oklch(65% 0.22 270) — a vivid purple */\n" +
		"    background: var(--color-brand);\n" +
		"\n" +
		"    /* color: sets the text color inside the card */\n" +
		"    /* var(--color-surface-1) resolves to oklch(99% 0.005 270) — near-white */\n" +
		"    color: var(--color-surface-1);\n" +
		"\n" +
		"    /* padding: adds space INSIDE the card between content and edges */\n" +
		"    /* var(--space-lg) resolves to clamp(1.5rem, 4vw, 2.5rem) — fluid spacing */\n" +
		"    padding: var(--space-lg);\n" +
		"\n" +
		"    /* border-radius: rounds the card corners */\n" +
		"    /* var(--radius-lg) resolves to 1rem — a soft curve */\n" +
		"    border-radius: var(--radius-lg);\n" +
		"\n" +
		"    /* margin-block: adds vertical space above and below the card */\n" +
		"    /* var(--space-xl) resolves to clamp(2rem, 6vw, 4rem) */\n" +
		"    margin-block: var(--space-xl);\n" +
		"\n" +
		"    /* max-width: prevents the card from stretching too wide */\n" +
		"    max-width: 32rem;\n" +
		"  }\n" +
		"\n" +
		"  .card h2 {\n" +
		"    margin: 0 0 var(--space-sm) 0; /* space below heading only */\n" +
		"    font-size: var(--text-xl); /* clamp(1.5rem, 4vw, 2rem) — large fluid text */\n" +
		"  }\n" +
		"\n" +
		"  .card p {\n" +
		"    margin: 0;    /* remove default paragraph margin */\n" +
		"    opacity: 0.9; /* slightly transparent for visual hierarchy */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Step snippets ── */
	const stepScript = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // 'const' declares a variable whose value never changes.\n" +
		"  // Think of it as writing a name on a box with permanent marker.\n" +
		"  // ': string' tells TypeScript this box holds text.\n" +
		"  const greeting: string = 'Hello, world.';\n" +
		"\u003c/script\u003e";

	const stepMarkup = "\u003csection class=\"page\"\u003e\n" +
		"  \u003carticle class=\"card\"\u003e\n" +
		"    \u003c!-- Curly braces { } insert a JavaScript value into HTML. --\u003e\n" +
		"    \u003c!-- Svelte sees {greeting} and replaces it with 'Hello, world.' --\u003e\n" +
		"    \u003ch2\u003e{greeting}\u003c/h2\u003e\n" +
		"    \u003cp\u003eThis card was compiled, not rendered by a framework.\u003c/p\u003e\n" +
		"  \u003c/article\u003e\n" +
		"\u003c/section\u003e";

	const stepStyle = "\u003cstyle\u003e\n" +
		"  .card {\n" +
		"    background: var(--color-brand);   /* fill color — vivid purple */\n" +
		"    color: var(--color-surface-1);    /* text color — near-white */\n" +
		"    padding: var(--space-lg);         /* inner spacing — fluid 1.5-2.5rem */\n" +
		"    border-radius: var(--radius-lg);  /* rounded corners — 1rem */\n" +
		"    margin-block: var(--space-xl);    /* vertical margin — fluid 2-4rem */\n" +
		"    max-width: 32rem;                 /* prevents card from stretching too wide */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Example snippets ── */
	const exTwoVars = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const name: string = 'Ada Lovelace';\n" +
		"  const role: string = 'First Programmer';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003carticle class=\"card\"\u003e\n" +
		"  \u003ch2\u003e{name}\u003c/h2\u003e\n" +
		"  \u003cp\u003e{role}\u003c/p\u003e\n" +
		"\u003c/article\u003e";

	const exTernary = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const hour: number = new Date().getHours();\n" +
		"  // A ternary is a one-line if/else:\n" +
		"  // condition ? valueIfTrue : valueIfFalse\n" +
		"  const greeting: string = hour < 12 ? 'Good morning!' : 'Good afternoon!';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003carticle class=\"card\"\u003e\n" +
		"  \u003ch2\u003e{greeting}\u003c/h2\u003e\n" +
		"  \u003cp\u003eThe current hour is {hour}.\u003c/p\u003e\n" +
		"\u003c/article\u003e";

	/* ── Common mistake ── */
	const mistakeWrong = "\u003cscript\u003e\n" +
		"  // WRONG: no lang=\"ts\" — TypeScript won't check this file!\n" +
		"  const greeting = 'Hello';\n" +
		"\u003c/script\u003e";

	const mistakeRight = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // CORRECT: lang=\"ts\" enables TypeScript checking.\n" +
		"  const greeting: string = 'Hello';\n" +
		"\u003c/script\u003e";

	/* ── Practice challenge ── */
	const practiceStarter = "<article class=\"card\">\n" +
		"  <h2>{greeting}</h2>\n" +
		"  <p>This card was compiled.</p>\n" +
		"</article>\n\n" +
		"<!-- Change the greeting to your name\n" +
		"     and background to var(--color-success) -->";

	const practiceExpected: readonly string[] = [
		'color-success'
	];

	const practiceHints: readonly string[] = [
		'Try adding style=\"background: var(--color-success)\" to the article tag.',
		'The token is called --color-success and goes inside var().'
	];
</script>

<section class="page">
	<!-- 1. TITLE + LEARNING OBJECTIVES -->
	<h1>1.1 — Hello, compiled</h1>

	<ul class="objectives">
		<li>Understand what a compiler does and why it matters.</li>
		<li>Know that Svelte turns <code>.svelte</code> files into vanilla JavaScript.</li>
		<li>See proof of compilation in browser DevTools.</li>
		<li>Write your first Svelte template expression.</li>
	</ul>

	<!-- 2. WHY THIS MATTERS -->
	<h2>Why this matters</h2>

	<div class="analogy">
		<p>
			<strong>Analogy:</strong> Imagine writing a recipe in shorthand. A compiler is like a translator
			who reads your shorthand and writes out the full recipe in plain language that anyone can follow.
			Svelte is that translator — you write simple <code>.svelte</code> files, it translates them into
			optimized JavaScript.
		</p>
	</div>

	<p class="concept">
		Most frameworks (React, Vue) ship a large <strong>runtime</strong> to the browser — a library that
		reads your components and figures out what to display. Svelte takes a different approach: it is a
		<strong>compiler</strong>. A compiler is a program that reads your source code and transforms it into
		a different form <em>before</em> anyone visits your page. The Svelte compiler reads your
		<code>.svelte</code> file at <strong>build time</strong> (when you run <code>pnpm build</code> or
		<code>pnpm dev</code>) and outputs tiny, optimized vanilla JavaScript that updates the DOM directly.
		There is no large framework file shipped to the browser — just the code needed for <em>your</em>
		component. That is why Svelte apps start fast and stay small.
	</p>

	<!-- 3. THE COMPLETE CODE -->
	<h2>The complete code</h2>
	<p class="concept">
		Here is the entire <code>+page.svelte</code> file you will build. Every line is annotated so you
		can understand it even if you have never seen code before.
	</p>
	<CodeCanvas filename="+page.svelte" code={fullCode} />

	<!-- 4. STEP-BY-STEP WALKTHROUGH -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1: The script block — your data</h3>
	<p class="concept">
		The <code>&lt;script&gt;</code> block is where you declare variables — the data your page needs.
		Think of a variable like a labeled box: you put a value inside and the label tells you what is in it.
		Here we create a box labeled <code>greeting</code> and put the text <code>'Hello, world.'</code>
		inside it. The word <code>const</code> means this box is sealed — its value can never change.
	</p>
	<CodeCanvas filename="Step 1 — script" code={stepScript} />

	<h3>Step 2: The markup — what the user sees</h3>
	<p class="concept">
		Everything outside <code>&lt;script&gt;</code> and <code>&lt;style&gt;</code> tags is
		<strong>markup</strong> — the HTML that appears on screen. Curly braces <code>{'{'} {'}'}</code>
		create a <strong>template expression</strong>: Svelte replaces <code>{'{'}greeting{'}'}</code> with
		the value of the <code>greeting</code> variable. This is how data flows from your script into what
		the user sees.
	</p>
	<CodeCanvas filename="Step 2 — markup" code={stepMarkup} />

	<h3>Step 3: The style block — how it looks</h3>
	<p class="concept">
		The <code>&lt;style&gt;</code> block contains CSS (Cascading Style Sheets) — rules that control
		colors, spacing, and layout. Svelte <strong>scopes</strong> every style to this component by
		appending a hash to class names. This means your <code>.card</code> styles here will never
		accidentally affect a <code>.card</code> in another component.
	</p>
	<CodeCanvas filename="Step 3 — style" code={stepStyle} />

	<!-- 5. SEE IT IN ACTION -->
	<h2>See it in action</h2>
	<p class="concept">
		Below is the live, compiled result. Open DevTools (F12) and inspect the card. You will see the class
		name has a hash appended (something like <code>card.svelte-abc123</code>). That hash is proof the
		Svelte compiler scoped these styles at build time.
	</p>

	<article class="card">
		<h2>{greeting}</h2>
		<p>This card was compiled, not rendered by a framework.</p>
	</article>

	<p class="hint">
		Open DevTools &rarr; Elements and inspect the card above. You will see the class name has a hash
		appended (something like <code>card.svelte-abc123</code>). That hash is proof the Svelte compiler
		scoped these styles to this component at build time — no runtime CSS-in-JS required.
	</p>

	<!-- 6. YOUR TURN -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge="Change the greeting text to your own name and the background color to var(--color-success)."
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. MORE EXAMPLES -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1: Two variables (name + role)</summary>
		<p class="concept">
			You can have as many variables as you need. Each one becomes available in the markup via curly braces.
		</p>
		<CodeCanvas filename="two-variables.svelte" code={exTwoVars} />
	</details>

	<details>
		<summary>Example 2: Conditional greeting with a ternary</summary>
		<p class="concept">
			A <strong>ternary</strong> is a one-line if/else:
			<code>condition ? valueIfTrue : valueIfFalse</code>. It lets you choose between two values
			based on a condition — here, the current hour.
		</p>
		<CodeCanvas filename="ternary-greeting.svelte" code={exTernary} />
	</details>

	<!-- 8. COMMON MISTAKES -->
	<h2>Common mistakes</h2>

	<div class="mistake-pair">
		<div class="mistake wrong">
			<h4>Wrong</h4>
			<CodeCanvas filename="wrong.svelte" code={mistakeWrong} />
			<p>Without <code>lang="ts"</code>, TypeScript does not check this file. You lose all type safety.</p>
		</div>
		<div class="mistake right">
			<h4>Right</h4>
			<CodeCanvas filename="correct.svelte" code={mistakeRight} />
			<p>Always add <code>lang="ts"</code> to enable TypeScript checking in every component.</p>
		</div>
	</div>

	<!-- 9. HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference. Every line
			is annotated so you can spot what went wrong.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- 10. WHAT YOU LEARNED -->
	<h3>What you learned</h3>
	<ul>
		<li>Svelte is a <strong>compiler</strong> — it emits vanilla JS at build time.</li>
		<li>There is no framework runtime shipped to the browser.</li>
		<li>Scoped styles get a class-name hash appended by the compiler.</li>
		<li>Template expressions <code>{'{'}value{'}'}</code> insert JavaScript values into HTML.</li>
		<li>Less framework code means faster load and smaller bundles.</li>
	</ul>

	<!-- 10. NEXT STEPS -->
	<p class="next">
		<strong>Next:</strong> <a href="/module-1/1-2-project-setup">1.2 — Project setup</a> — learn the
		tools that power your Svelte project.
	</p>
</section>

<style>
	/* ── Objectives list ── */
	.objectives {
		color: var(--color-text);       /* text color — dark for readability */
		line-height: 1.8;              /* vertical space between lines for readability */
		padding-inline-start: var(--space-lg); /* indent from the left edge */
	}

	/* ── Analogy callout box ── */
	.analogy {
		background: var(--color-surface-2);  /* subtle background to stand out from page */
		border-inline-start: 4px solid var(--color-warning); /* left accent bar in warning-yellow */
		padding: var(--space-md);            /* inner spacing */
		border-radius: var(--radius-md);     /* softly rounded corners */
		margin-block: var(--space-md);       /* vertical spacing above and below */
		max-inline-size: 60ch;                     /* limit line length for readability */

		& p {
			margin: 0;                       /* remove default paragraph margin */
			line-height: 1.6;               /* comfortable line height */
			color: var(--color-text);        /* standard text color */
		}
	}

	/* ── Concept paragraph ── */
	.concept {
		color: var(--color-text-muted);  /* slightly dimmed text for explanatory prose */
		max-inline-size: 60ch;                 /* limit line length — 60 characters is optimal */
		line-height: 1.6;               /* comfortable spacing between lines */
	}

	/* ── Live demo card ── */
	.card {
		background: var(--color-brand);      /* fill color — oklch(65% 0.22 270) vivid purple */
		color: var(--color-surface-1);       /* text color — oklch(99% 0.005 270) near-white */
		padding: var(--space-lg);            /* inner spacing — clamp(1.5rem, 4vw, 2.5rem) */
		border-radius: var(--radius-lg);     /* rounded corners — 1rem */
		margin-block: var(--space-xl);       /* vertical margin — clamp(2rem, 6vw, 4rem) */
		max-inline-size: 32rem;                    /* prevent card from being too wide */

		& h2 {
			margin: 0 0 var(--space-sm) 0;   /* space below heading only */
			font-size: var(--text-xl);       /* clamp(1.5rem, 4vw, 2rem) large fluid text */
		}

		& p {
			margin: 0;        /* remove default margin */
			opacity: 0.9;     /* slightly transparent for visual hierarchy */
		}

		@media (min-inline-size: 768px) {
			padding: var(--space-xl);        /* more padding on wider screens */
		}
	}

	/* ── Hint callout ── */
	.hint {
		background: var(--color-surface-2);          /* subtle background */
		color: var(--color-text);                    /* standard text color */
		padding: var(--space-md);                    /* inner spacing */
		border-radius: var(--radius-md);             /* rounded corners */
		border-inline-start: 4px solid var(--color-brand);   /* left accent bar in brand purple */
		max-inline-size: 60ch;                             /* limit width for readability */

		& code {
			color: var(--color-brand);               /* highlight code in brand color */
		}
	}

	/* ── Mistake comparison ── */
	.mistake-pair {
		display: grid;                        /* side-by-side layout */
		grid-template-columns: 1fr;           /* single column on mobile */
		gap: var(--space-md);                 /* space between wrong/right blocks */
		margin-block: var(--space-md);        /* vertical spacing */

		@media (min-inline-size: 768px) {
			grid-template-columns: 1fr 1fr;   /* two columns on wider screens */
		}
	}

	.mistake {
		padding: var(--space-md);             /* inner spacing */
		border-radius: var(--radius-md);      /* rounded corners */

		& h4 {
			margin: 0 0 var(--space-sm) 0;    /* space below heading */
			text-transform: uppercase;        /* visual label emphasis */
			font-size: var(--text-sm);        /* small label text */
			letter-spacing: 0.08em;           /* spread letters for uppercase readability */
		}

		& p {
			margin-block-start: var(--space-sm);       /* space above explanation */
			font-size: var(--text-sm);        /* smaller explanation text */
			line-height: 1.5;                 /* comfortable reading */
		}
	}

	.wrong {
		background: oklch(95% 0.03 25);       /* light red tint */
		& h4 { color: var(--color-error); }   /* red heading */
	}

	.right {
		background: oklch(95% 0.03 145);      /* light green tint */
		& h4 { color: var(--color-success); } /* green heading */
	}

	/* ── Next-step link ── */
	.next {
		margin-block-start: var(--space-xl);          /* space above */
		color: var(--color-text);             /* standard text */
	}

	/* ── Details elements for more examples ── */
	details {
		margin-block: var(--space-sm);        /* vertical spacing between details */
		border: 1px solid var(--color-border); /* subtle border */
		border-radius: var(--radius-md);      /* rounded corners */
		overflow: hidden;                     /* clip children to rounded corners */
	}

	summary {
		padding: var(--space-sm) var(--space-md); /* clickable area padding */
		font-weight: 600;                    /* bold for visibility */
		color: var(--color-brand);           /* brand color to show it is interactive */
		cursor: pointer;                     /* hand cursor on hover */
		background: var(--color-surface-2);  /* subtle background */
	}

	details[open] > summary {
		border-block-end: 1px solid var(--color-border); /* divider when open */
	}

	details > :not(summary) {
		padding-inline: var(--space-md);     /* horizontal padding for content */
	}

	/* ── Having issues? — collapsible reference code ── */
	.having-issues {
		margin-block: var(--space-xl);        /* generous spacing around */
		border: 2px dashed var(--color-warning); /* dashed border to stand out */
		border-radius: var(--radius-lg);      /* rounded corners */
		overflow: hidden;                     /* clip children to rounded corners */

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

	/* ── General list styling ── */
	ul {
		color: var(--color-text);            /* standard text color */
		line-height: 1.8;                   /* generous line spacing */

		& code {
			color: var(--color-brand);       /* highlight code in brand purple */
		}
	}

	/* ═══════════════════════════════════
	   RESPONSIVE BREAKPOINTS
	   Mobile-first: base is 320px+
	   ═══════════════════════════════════ */

	/* ── 480px — large phones / small tablets ── */
	@media (min-inline-size: 480px) {
		.analogy,
		.concept,
		.hint {
			max-inline-size: 65ch;            /* widen prose slightly */
		}

		.card {
			padding: var(--space-lg);
		}
	}

	/* ── 768px — tablets / small desktops ── */
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);       /* scale heading up */
		}

		h2 {
			font-size: var(--text-xl);
		}

		.analogy,
		.concept,
		.hint {
			max-inline-size: 72ch;            /* wider reading column */
		}

		.mistake-pair {
			grid-template-columns: 1fr 1fr;   /* side-by-side wrong/right */
		}

		.card {
			padding: var(--space-xl);         /* more breathing room */
		}
	}

	/* ── 1024px — desktops ── */
	@media (min-inline-size: 1024px) {
		.analogy,
		.concept,
		.hint {
			max-inline-size: 80ch;            /* full reading width */
		}
	}
</style>
