<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const name: string = 'Billy';
	const role: string = 'Frontend Engineer';

	/* ── Complete code for CodeCanvas ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // === THE SCRIPT BLOCK ===\n" +
		"  // This runs ONCE when the component is created.\n" +
		"  // Declare all your data (variables) here.\n" +
		"\n" +
		"  // 'const' means this value cannot be reassigned.\n" +
		"  // Think of it as writing with permanent marker on a label.\n" +
		"  // ': string' is a TypeScript type annotation — it says\n" +
		"  // this variable holds text (a 'string' of characters).\n" +
		"  const name: string = 'Billy';\n" +
		"\n" +
		"  // Another constant string — the person's job title.\n" +
		"  const role: string = 'Frontend Engineer';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- === THE MARKUP BLOCK === --\u003e\n" +
		"\u003c!-- This is what the user sees on screen. --\u003e\n" +
		"\u003c!-- It runs reactively — when data changes, it updates. --\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003carticle class=\"name-tag\"\u003e\n" +
		"    \u003cheader class=\"name-tag__header\"\u003e\n" +
		"      \u003cspan\u003eHELLO\u003c/span\u003e\n" +
		"      \u003cspan\u003emy name is\u003c/span\u003e\n" +
		"    \u003c/header\u003e\n" +
		"    \u003cdiv class=\"name-tag__body\"\u003e\n" +
		"      \u003c!-- {name} is a template expression. --\u003e\n" +
		"      \u003c!-- Svelte replaces it with the value of 'name'. --\u003e\n" +
		"      \u003cp class=\"name-tag__name\"\u003e{name}\u003c/p\u003e\n" +
		"      \u003cp class=\"name-tag__role\"\u003e{role}\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/article\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003c!-- === THE STYLE BLOCK === --\u003e\n" +
		"\u003c!-- Compiled at build time. Svelte scopes every selector --\u003e\n" +
		"\u003c!-- so these styles ONLY apply to this component. --\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  .name-tag {\n" +
		"    width: 100%;                  /* take full width of parent */\n" +
		"    max-width: 20rem;             /* but never wider than 20rem (320px) */\n" +
		"    margin-block: var(--space-xl); /* vertical spacing above and below */\n" +
		"    border-radius: var(--radius-lg); /* rounded corners — 1rem */\n" +
		"    overflow: hidden;             /* clip children to rounded corners */\n" +
		"    background: var(--color-surface-1); /* near-white background */\n" +
		"    box-shadow: var(--shadow-md); /* subtle drop shadow for depth */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__header {\n" +
		"    background: var(--color-brand);    /* vivid purple fill */\n" +
		"    color: var(--color-surface-1);     /* white text on purple */\n" +
		"    padding: var(--space-md);          /* inner spacing */\n" +
		"    display: flex;                     /* flexbox for centering */\n" +
		"    flex-direction: column;            /* stack children vertically */\n" +
		"    align-items: center;              /* center horizontally */\n" +
		"    text-transform: uppercase;        /* ALL CAPS text */\n" +
		"    letter-spacing: 0.1em;            /* spread letters apart */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__body {\n" +
		"    padding: var(--space-xl) var(--space-md); /* tall top/bottom, normal sides */\n" +
		"    text-align: center;               /* center all text */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__name {\n" +
		"    margin: 0 0 var(--space-xs) 0;    /* small space below name */\n" +
		"    font-size: var(--text-2xl);        /* large fluid text */\n" +
		"    font-weight: 700;                 /* bold for emphasis */\n" +
		"    color: var(--color-text);          /* dark text */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__role {\n" +
		"    margin: 0;                        /* no default margin */\n" +
		"    color: var(--color-text-muted);    /* dimmed text for secondary info */\n" +
		"    font-size: var(--text-base);       /* normal body text size */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Step snippets ── */
	const stepScript = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // 'const' = permanent label. The value cannot be changed later.\n" +
		"  // 'let' = erasable label. The value CAN be changed later.\n" +
		"  // We use 'const' when we know the value won't change.\n" +
		"\n" +
		"  const name: string = 'Billy';\n" +
		"  // 'string' means text — a sequence of characters.\n" +
		"  // Examples: 'hello', \"world\", 'Billy'\n" +
		"\n" +
		"  const role: string = 'Frontend Engineer';\n" +
		"  // Another string — holds the person's job title.\n" +
		"\u003c/script\u003e";

	const stepMarkup = "\u003c!-- Everything outside script and style is MARKUP (HTML). --\u003e\n" +
		"\u003c!-- Svelte watches for {expressions} and updates them. --\u003e\n" +
		"\n" +
		"\u003carticle class=\"name-tag\"\u003e\n" +
		"  \u003cheader class=\"name-tag__header\"\u003e\n" +
		"    \u003cspan\u003eHELLO\u003c/span\u003e\n" +
		"    \u003cspan\u003emy name is\u003c/span\u003e\n" +
		"  \u003c/header\u003e\n" +
		"  \u003cdiv class=\"name-tag__body\"\u003e\n" +
		"    \u003c!-- {name} inserts the value of the 'name' variable --\u003e\n" +
		"    \u003cp class=\"name-tag__name\"\u003e{name}\u003c/p\u003e\n" +
		"    \u003c!-- {role} inserts the value of the 'role' variable --\u003e\n" +
		"    \u003cp class=\"name-tag__role\"\u003e{role}\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/article\u003e";

	const stepStyle = "\u003cstyle\u003e\n" +
		"  /* Svelte SCOPES these styles — they only apply here. */\n" +
		"\n" +
		"  .name-tag {\n" +
		"    width: 100%;                  /* fill parent width */\n" +
		"    max-width: 20rem;             /* cap at 320px */\n" +
		"    border-radius: var(--radius-lg); /* 1rem rounded corners */\n" +
		"    overflow: hidden;             /* clip to rounded shape */\n" +
		"    background: var(--color-surface-1); /* near-white fill */\n" +
		"    box-shadow: var(--shadow-md); /* 0 4px 12px shadow for depth */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__header {\n" +
		"    background: var(--color-brand);    /* purple fill */\n" +
		"    color: var(--color-surface-1);     /* white text */\n" +
		"    padding: var(--space-md);          /* fluid inner spacing */\n" +
		"    display: flex;                     /* use flexbox layout */\n" +
		"    flex-direction: column;            /* stack vertically */\n" +
		"    align-items: center;              /* center items */\n" +
		"    text-transform: uppercase;        /* force ALL CAPS */\n" +
		"    letter-spacing: 0.1em;            /* spread letters */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__body {\n" +
		"    padding: var(--space-xl) var(--space-md); /* generous top/bottom */\n" +
		"    text-align: center;               /* center text */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__name {\n" +
		"    font-size: var(--text-2xl);        /* large text — clamp(2rem,5vw,3rem) */\n" +
		"    font-weight: 700;                 /* bold */\n" +
		"    color: var(--color-text);          /* dark text */\n" +
		"  }\n" +
		"\n" +
		"  .name-tag__role {\n" +
		"    color: var(--color-text-muted);    /* dimmed secondary text */\n" +
		"    font-size: var(--text-base);       /* normal size */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Example snippets ── */
	const exThreeVars = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const name: string = 'Billy';\n" +
		"  const role: string = 'Frontend Engineer';\n" +
		"  const company: string = 'Acme Corp';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003cdiv class=\"name-tag__body\"\u003e\n" +
		"  \u003cp class=\"name-tag__name\"\u003e{name}\u003c/p\u003e\n" +
		"  \u003cp class=\"name-tag__role\"\u003e{role}\u003c/p\u003e\n" +
		"  \u003cp class=\"name-tag__company\"\u003e{company}\u003c/p\u003e\n" +
		"\u003c/div\u003e";

	const exLetVar = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // 'let' means this value CAN change later.\n" +
		"  // Use 'let' when you need to update a variable.\n" +
		"  let count: number = 0;\n" +
		"\n" +
		"  function increment(): void {\n" +
		"    count += 1; // This reassignment is allowed with 'let'.\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003cbutton onclick={increment}\u003e\n" +
		"  Clicked {count} times\n" +
		"\u003c/button\u003e";

	const exExpression = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const firstName: string = 'Ada';\n" +
		"  const lastName: string = 'Lovelace';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- You can put any JS expression inside { } --\u003e\n" +
		"\u003cp\u003e{firstName + ' ' + lastName}\u003c/p\u003e\n" +
		"\u003cp\u003e{firstName.toUpperCase()}\u003c/p\u003e\n" +
		"\u003cp\u003e{2 + 2}\u003c/p\u003e";

	/* ── Common mistake ── */
	const mistakeWrong = "\u003c!-- WRONG: CSS outside the style block does nothing --\u003e\n" +
		"\u003cdiv style-sheet\u003e\n" +
		"  .card { background: red; }\n" +
		"\u003c/div\u003e\n" +
		"\n" +
		"\u003c!-- The browser sees this as plain text, not CSS! --\u003e";

	const mistakeRight = "\u003c!-- CORRECT: CSS goes inside a style tag --\u003e\n" +
		"\u003cstyle\u003e\n" +
		"  .card {\n" +
		"    background: var(--color-error);\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Practice ── */
	const practiceStarter = "\u003cscript lang=\"ts\">\n" +
		"  const name: string = 'Billy';\n" +
		"  const role: string = 'Frontend Engineer';\n" +
		"  // Add a company variable here\n" +
		"\u003c/script\u003e\n\n" +
		"<div class=\"name-tag__body\">\n" +
		"  <p class=\"name-tag__name\">{name}</p>\n" +
		"  <p class=\"name-tag__role\">{role}</p>\n" +
		"  <!-- Display company here -->\n" +
		"</div>";

	const practiceExpected: readonly string[] = [
		'company',
		'{company}'
	];

	const practiceHints: readonly string[] = [
		"Declare: const company: string = 'Your Company';",
		"Display it with: <p>{company}</p> inside the name-tag__body div."
	];
</script>

<section class="page">
	<!-- 1. TITLE + LEARNING OBJECTIVES -->
	<h1>1.3 — The three blocks</h1>

	<ul class="objectives">
		<li>Know that every <code>.svelte</code> file has three parts: script, markup, and style.</li>
		<li>Understand when each block runs and what it does.</li>
		<li>Use template expressions <code>{'{'}value{'}'}</code> to display data.</li>
		<li>Know the difference between <code>const</code> and <code>let</code>.</li>
	</ul>

	<!-- 2. WHY THIS MATTERS -->
	<h2>Why this matters</h2>

	<div class="analogy">
		<p>
			<strong>Analogy:</strong> A <code>.svelte</code> file is like a recipe card with three sections:
			the <strong>ingredients list</strong> (script — what data you need), the <strong>instructions</strong>
			(markup — what to show on screen), and the <strong>plating guide</strong> (style — how it looks).
			Each section serves a different purpose and runs at a different time.
		</p>
	</div>

	<p class="concept">
		Every Svelte component is built from three blocks. The <code>&lt;script&gt;</code> block runs
		<strong>once per component instance</strong> — this is where you declare variables (your data) and
		write logic (functions). The <strong>markup</strong> is everything between the script and style
		blocks — it is the HTML that the user sees, and it is <strong>reactive</strong>, meaning Svelte
		re-evaluates template expressions when their data changes. The <code>&lt;style&gt;</code> block
		is compiled at <strong>build time</strong> — Svelte scopes every CSS selector to this component
		so styles never leak into other components. Understanding which block runs when is the foundation
		of Svelte development.
	</p>

	<!-- 3. THE COMPLETE CODE -->
	<h2>The complete code</h2>
	<p class="concept">
		Here is the entire name-tag component with detailed comments on every line.
	</p>
	<CodeCanvas filename="+page.svelte" code={fullCode} />

	<!-- 4. STEP-BY-STEP WALKTHROUGH -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1: The script block — declaring data</h3>
	<p class="concept">
		The script block is where you create variables — the data your component needs. Think of
		<code>const</code> as writing a name on a box with permanent marker: the label stays forever.
		Think of <code>let</code> as writing with a dry-erase marker: you can wipe it off and write
		something new. Use <code>const</code> by default; only reach for <code>let</code> when you
		truly need to change the value later.
	</p>
	<CodeCanvas filename="Step 1 — script" code={stepScript} />

	<h3>Step 2: The markup block — displaying data</h3>
	<p class="concept">
		Everything outside <code>&lt;script&gt;</code> and <code>&lt;style&gt;</code> is markup — standard
		HTML with a superpower: <strong>template expressions</strong>. Wrap any JavaScript value in curly
		braces <code>{'{'}...{'}'}</code> and Svelte inserts it into the HTML. When the value changes,
		Svelte updates just that part of the page.
	</p>
	<CodeCanvas filename="Step 2 — markup" code={stepMarkup} />

	<h3>Step 3: The style block — making it look good</h3>
	<p class="concept">
		The style block contains CSS — rules that control appearance. Svelte <strong>scopes</strong> every
		rule to this component by appending a unique hash to class names. This means <code>.name-tag</code>
		here will never accidentally style a <code>.name-tag</code> in another component. Every CSS
		property below is annotated so you can see exactly what it does.
	</p>
	<CodeCanvas filename="Step 3 — style" code={stepStyle} />

	<!-- 5. SEE IT IN ACTION -->
	<h2>See it in action</h2>
	<p class="concept">
		Below is the live name tag. The script block provided the data (<code>name</code> and
		<code>role</code>), the markup displays it with template expressions, and the style block
		makes it look like a real name badge.
	</p>

	<article class="name-tag">
		<header class="name-tag__header">
			<span>HELLO</span>
			<span>my name is</span>
		</header>
		<div class="name-tag__body">
			<p class="name-tag__name">{name}</p>
			<p class="name-tag__role">{role}</p>
		</div>
	</article>

	<!-- 6. YOUR TURN -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge="Add a third variable company: string with value 'Acme Corp' and display it below the role."
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. MORE EXAMPLES -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1: Three variables</summary>
		<p class="detail-text">
			Adding a third variable is exactly the same pattern — declare it in the script, display it in the markup.
		</p>
		<CodeCanvas filename="three-variables.svelte" code={exThreeVars} />
	</details>

	<details>
		<summary>Example 2: Using let for changeable values</summary>
		<p class="detail-text">
			When you need a value that changes (like a counter), use <code>let</code> instead of <code>const</code>.
			Svelte automatically updates the markup whenever a <code>let</code> variable changes.
		</p>
		<CodeCanvas filename="let-counter.svelte" code={exLetVar} />
	</details>

	<details>
		<summary>Example 3: Expressions inside curly braces</summary>
		<p class="detail-text">
			You can put any JavaScript expression inside <code>{'{'}{'}'}</code> — not just variable names.
			String concatenation, method calls, and math all work.
		</p>
		<CodeCanvas filename="expressions.svelte" code={exExpression} />
	</details>

	<!-- 8. COMMON MISTAKES -->
	<h2>Common mistakes</h2>

	<div class="mistake-pair">
		<div class="mistake wrong">
			<h4>Wrong</h4>
			<CodeCanvas filename="wrong.svelte" code={mistakeWrong} />
			<p>CSS written outside a <code>&lt;style&gt;</code> tag is treated as plain text, not styles.</p>
		</div>
		<div class="mistake right">
			<h4>Right</h4>
			<CodeCanvas filename="correct.svelte" code={mistakeRight} />
			<p>Always put CSS inside a <code>&lt;style&gt;</code> block. Svelte compiles and scopes it for you.</p>
		</div>
	</div>

	<!-- 9. HAVING ISSUES? COMPLETE CODE -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>
			If your version is not working, compare it line-by-line with this reference.
		</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- 10. WHAT YOU LEARNED -->
	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;script&gt;</code> runs once per instance — declare data and logic here.</li>
		<li>Markup is reactive — template expressions <code>{'{'}value{'}'}</code> update automatically.</li>
		<li><code>&lt;style&gt;</code> is compiled and scoped at build time — styles never leak.</li>
		<li><code>const</code> = permanent value, <code>let</code> = changeable value.</li>
		<li>You can put any JavaScript expression inside curly braces.</li>
	</ul>

	<!-- 10. NEXT STEPS -->
	<p class="next">
		<strong>Next:</strong> <a href="/module-1/1-4-primitives">1.4 — TypeScript primitives</a> — learn
		the three basic data types.
	</p>
</section>

<style>
	/* ── Objectives list ── */
	.objectives {
		color: var(--color-text);        /* standard text color */
		line-height: 1.8;               /* generous spacing */
		padding-left: var(--space-lg);  /* indent from left */
	}

	/* ── Analogy callout ── */
	.analogy {
		background: var(--color-surface-2);           /* subtle background */
		border-left: 4px solid var(--color-warning);  /* yellow accent */
		padding: var(--space-md);                     /* inner spacing */
		border-radius: var(--radius-md);              /* rounded corners */
		margin-block: var(--space-md);                /* vertical spacing */
		max-width: 60ch;                              /* readable line length */

		& p {
			margin: 0;                                /* no default margin */
			line-height: 1.6;                        /* comfortable reading */
			color: var(--color-text);                 /* standard text */
		}
	}

	/* ── Concept paragraph ── */
	.concept {
		color: var(--color-text-muted);  /* muted for explanatory text */
		max-width: 60ch;                 /* 60-char line length */
		line-height: 1.6;               /* comfortable spacing */
	}

	/* ── Name tag component ── */
	.name-tag {
		width: 100%;                            /* fill parent width */
		max-width: 20rem;                       /* cap at 320px */
		margin-block: var(--space-xl);          /* vertical spacing */
		border-radius: var(--radius-lg);        /* 1rem rounded corners */
		overflow: hidden;                       /* clip to rounded shape */
		background: var(--color-surface-1);     /* near-white background */
		box-shadow: var(--shadow-md);           /* subtle depth shadow */

		@media (min-width: 768px) {
			max-width: 24rem;                   /* wider on desktop */
		}
	}

	.name-tag__header {
		background: var(--color-brand);         /* vivid purple fill */
		color: var(--color-surface-1);          /* white text on purple */
		padding: var(--space-md);               /* inner spacing */
		display: flex;                          /* flexbox layout */
		flex-direction: column;                 /* stack vertically */
		align-items: center;                   /* center horizontally */
		text-transform: uppercase;             /* ALL CAPS */
		letter-spacing: 0.1em;                 /* spread letters apart */

		& span:first-child {
			font-size: var(--text-2xl);        /* large "HELLO" text */
			font-weight: 800;                  /* extra bold */
		}

		& span:last-child {
			font-size: var(--text-sm);         /* smaller "my name is" */
			opacity: 0.85;                     /* slightly transparent */
		}
	}

	.name-tag__body {
		background: var(--color-surface-1);     /* white background */
		padding: var(--space-xl) var(--space-md); /* generous vertical padding */
		text-align: center;                    /* center all text */
	}

	.name-tag__name {
		margin: 0 0 var(--space-xs) 0;          /* small space below name */
		font-size: var(--text-2xl);             /* large text */
		font-weight: 700;                       /* bold */
		color: var(--color-text);               /* dark text */
	}

	.name-tag__role {
		margin: 0;                              /* no margin */
		color: var(--color-text-muted);         /* dimmed secondary text */
		font-size: var(--text-base);            /* normal body size */
	}

	/* ── Mistake comparison ── */
	.mistake-pair {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		margin-block: var(--space-md);

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.mistake {
		padding: var(--space-md);
		border-radius: var(--radius-md);

		& h4 {
			margin: 0 0 var(--space-sm) 0;
			text-transform: uppercase;
			font-size: var(--text-sm);
			letter-spacing: 0.08em;
		}

		& p {
			margin-top: var(--space-sm);
			font-size: var(--text-sm);
			line-height: 1.5;
		}
	}

	.wrong {
		background: oklch(95% 0.03 25);
		& h4 { color: var(--color-error); }
	}

	.right {
		background: oklch(95% 0.03 145);
		& h4 { color: var(--color-success); }
	}

	/* ── Next link ── */
	.next {
		margin-top: var(--space-xl);
		color: var(--color-text);
	}

	/* ── Details elements ── */
	details {
		margin-block: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	summary {
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		color: var(--color-brand);
		cursor: pointer;
		background: var(--color-surface-2);
	}

	details[open] > summary {
		border-bottom: 1px solid var(--color-border);
	}

	.detail-text {
		padding: var(--space-md);
		color: var(--color-text);
		line-height: 1.6;
		margin: 0;

		& code {
			color: var(--color-brand);
		}
	}

	/* ── Lists ── */
	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */

	@media (min-width: 480px) {
		.analogy, .concept { max-inline-size: 65ch; }
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.analogy, .concept { max-inline-size: 72ch; }
		.mistake-pair { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.analogy, .concept { max-inline-size: 80ch; }
	}
</style>
