<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const fullName: string = 'Ada Lovelace';
	const age: number = 36;
	const active: boolean = true;

	/* ── Complete code ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // === THE THREE PRIMITIVE TYPES ===\n" +
		"  // TypeScript has three basic (primitive) types.\n" +
		"  // Think of types as labels on storage containers —\n" +
		"  // each label says what kind of value goes inside.\n" +
		"\n" +
		"  // STRING: holds text — any sequence of characters.\n" +
		"  // Wrap text in single quotes 'like this' or double quotes.\n" +
		"  const fullName: string = 'Ada Lovelace';\n" +
		"\n" +
		"  // NUMBER: holds any numeric value — integers or decimals.\n" +
		"  // No quotes around numbers! 36 is a number, '36' is a string.\n" +
		"  const age: number = 36;\n" +
		"\n" +
		"  // BOOLEAN: holds exactly two possible values: true or false.\n" +
		"  // Like a light switch — it is either on (true) or off (false).\n" +
		"  const active: boolean = true;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003carticle class=\"stats-card\"\u003e\n" +
		"    \u003ch2\u003e{fullName}\u003c/h2\u003e\n" +
		"    \u003cp class=\"age\"\u003eAge: \u003cstrong\u003e{age}\u003c/strong\u003e\u003c/p\u003e\n" +
		"\n" +
		"    \u003c!-- class:pill--active={active} adds the class when active is true --\u003e\n" +
		"    \u003c!-- class:pill--away={!active} adds the class when active is false --\u003e\n" +
		"    \u003cspan class=\"pill\"\n" +
		"      class:pill--active={active}\n" +
		"      class:pill--away={!active}\u003e\n" +
		"      {active ? 'Active' : 'Away'}\n" +
		"    \u003c/span\u003e\n" +
		"    \u003c!-- The ternary above: condition ? ifTrue : ifFalse --\u003e\n" +
		"  \u003c/article\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  .stats-card {\n" +
		"    background: var(--color-surface-2);  /* subtle grey fill */\n" +
		"    padding: var(--space-lg);            /* inner spacing — fluid 1.5-2.5rem */\n" +
		"    border-radius: var(--radius-lg);     /* rounded corners — 1rem */\n" +
		"    margin-block: var(--space-xl);       /* vertical margin — fluid 2-4rem */\n" +
		"    max-width: 24rem;                    /* prevent stretching too wide */\n" +
		"    display: flex;                       /* flexbox layout */\n" +
		"    flex-direction: column;              /* stack children vertically */\n" +
		"    gap: var(--space-sm);                /* space between children */\n" +
		"    align-items: flex-start;             /* left-align children */\n" +
		"  }\n" +
		"\n" +
		"  .stats-card h2 {\n" +
		"    margin: 0;                           /* remove default h2 margin */\n" +
		"    color: var(--color-text);            /* dark text */\n" +
		"    font-size: var(--text-xl);           /* fluid 1.5-2rem */\n" +
		"  }\n" +
		"\n" +
		"  .age {\n" +
		"    margin: 0;                           /* remove default p margin */\n" +
		"    color: var(--color-text-muted);      /* muted label text */\n" +
		"  }\n" +
		"  .age strong {\n" +
		"    color: var(--color-text);            /* emphasize the number */\n" +
		"  }\n" +
		"\n" +
		"  .pill {\n" +
		"    display: inline-block;               /* inline element with block sizing */\n" +
		"    padding: var(--space-xs) var(--space-md); /* small vertical, medium horizontal */\n" +
		"    border-radius: var(--radius-full);   /* 9999px — fully rounded pill shape */\n" +
		"    font-size: var(--text-sm);           /* smaller text */\n" +
		"    font-weight: 600;                    /* semi-bold */\n" +
		"    text-transform: uppercase;           /* ALL CAPS */\n" +
		"    letter-spacing: 0.05em;              /* slight letter spread */\n" +
		"  }\n" +
		"\n" +
		"  .pill--active {\n" +
		"    background: var(--color-success);    /* green — oklch(65% 0.18 145) */\n" +
		"    color: var(--color-surface-1);       /* white text on green */\n" +
		"  }\n" +
		"\n" +
		"  .pill--away {\n" +
		"    background: var(--color-text-muted); /* grey for away status */\n" +
		"    color: var(--color-surface-1);       /* white text on grey */\n" +
		"  }\n" +
		"\u003c/style\u003e";

	/* ── Step snippets ── */
	const stepString = "// === STRING ===\n" +
		"// A string is TEXT — any sequence of characters.\n" +
		"// Wrap strings in quotes: 'single' or \"double\".\n" +
		"\n" +
		"const fullName: string = 'Ada Lovelace';\n" +
		"// 'Ada Lovelace' is a string literal — actual text.\n" +
		"// ': string' is a type annotation — it tells TypeScript\n" +
		"// this variable will ALWAYS hold text, never a number.\n" +
		"\n" +
		"// TypeScript can also INFER the type without the annotation:\n" +
		"const greeting = 'Hello';  // TypeScript knows this is a string\n" +
		"// Use inference when the type is obvious from the value.";

	const stepNumber = "// === NUMBER ===\n" +
		"// A number holds any numeric value — integers or decimals.\n" +
		"// NO quotes around numbers! 36 is a number, '36' is a string.\n" +
		"\n" +
		"const age: number = 36;\n" +
		"// ': number' tells TypeScript this holds a numeric value.\n" +
		"\n" +
		"const price: number = 9.99;    // decimals are numbers too\n" +
		"const negative: number = -10;  // negative numbers work\n" +
		"\n" +
		"// DANGER: '36' + 1 = '361' (string concatenation!)\n" +
		"//         36  + 1 = 37   (number addition)\n" +
		"// This is WHY types matter.";

	const stepBoolean = "// === BOOLEAN ===\n" +
		"// A boolean is either true or false — nothing else.\n" +
		"// Think of it as a light switch: on (true) or off (false).\n" +
		"\n" +
		"const active: boolean = true;\n" +
		"// ': boolean' tells TypeScript this is a true/false value.\n" +
		"\n" +
		"// Booleans power conditional logic:\n" +
		"// active ? 'Active' : 'Away'\n" +
		"// This is a TERNARY — a one-line if/else.\n" +
		"// If active is true, use 'Active'. Otherwise, use 'Away'.";

	const stepConstLet = "// === const vs let ===\n" +
		"// const = the value CANNOT be reassigned.\n" +
		"//   Think: permanent marker on a label.\n" +
		"const name: string = 'Ada';\n" +
		"// name = 'Bob'; // ERROR! const cannot be reassigned.\n" +
		"\n" +
		"// let = the value CAN be reassigned.\n" +
		"//   Think: dry-erase marker — you can wipe and rewrite.\n" +
		"let score: number = 0;\n" +
		"score = 10; // OK! let allows reassignment.\n" +
		"\n" +
		"// RULE: Use const by default.\n" +
		"// Only use let when you NEED to change the value later.";

	/* ── Examples ── */
	const exInference = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // TypeScript INFERS the type from the value.\n" +
		"  // You don't need to write the annotation.\n" +
		"  const name = 'Ada';      // TypeScript knows: string\n" +
		"  const age = 36;           // TypeScript knows: number\n" +
		"  const active = true;      // TypeScript knows: boolean\n" +
		"\n" +
		"  // Use explicit annotations when:\n" +
		"  // 1. The type isn't obvious from the value\n" +
		"  // 2. Function parameters (always annotate these)\n" +
		"  // 3. Empty arrays: const items: string[] = [];\n" +
		"\u003c/script\u003e";

	const exConditionalClass = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const score: number = 95;\n" +
		"  const passing: boolean = score >= 70;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003cspan class=\"grade\"\n" +
		"  class:grade--pass={passing}\n" +
		"  class:grade--fail={!passing}\u003e\n" +
		"  {passing ? 'PASS' : 'FAIL'} ({score}%)\n" +
		"\u003c/span\u003e";

	const exAllThree = "\u003cscript lang=\"ts\"\u003e\n" +
		"  const product: string = 'Laptop';\n" +
		"  const price: number = 999.99;\n" +
		"  const inStock: boolean = true;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003carticle\u003e\n" +
		"  \u003ch3\u003e{product}\u003c/h3\u003e\n" +
		"  \u003cp\u003e${price}\u003c/p\u003e\n" +
		"  \u003cp\u003e{inStock ? 'In stock' : 'Sold out'}\u003c/p\u003e\n" +
		"\u003c/article\u003e";

	/* ── Common mistake ── */
	const mistakeWrong = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // WRONG: '25' is a STRING, not a number!\n" +
		"  let age = '25';\n" +
		"\n" +
		"  // This does STRING concatenation, not addition:\n" +
		"  // age + 1 = '251' (not 26!)\n" +
		"\u003c/script\u003e";

	const mistakeRight = "\u003cscript lang=\"ts\"\u003e\n" +
		"  // CORRECT: 25 without quotes is a number.\n" +
		"  let age = 25;\n" +
		"\n" +
		"  // Now addition works correctly:\n" +
		"  // age + 1 = 26\n" +
		"\u003c/script\u003e";

	/* ── Practice ── */
	const practiceStarter = "\u003cscript lang=\"ts\">\n" +
		"  const fullName: string = 'Ada Lovelace';\n" +
		"  const age: number = 36;\n" +
		"  const active: boolean = true;\n" +
		"  // Add score: number = 98 here\n" +
		"\u003c/script\u003e\n\n" +
		"<article class=\"stats-card\">\n" +
		"  <h2>{fullName}</h2>\n" +
		"  <p>Age: {age}</p>\n" +
		"  <!-- Add a pill for score that turns green above 90 -->\n" +
		"</article>";

	const practiceExpected: readonly string[] = [
		'score',
		'90'
	];

	const practiceHints: readonly string[] = [
		"Declare: const score: number = 98;",
		"Display: <span class=\"pill\">{score > 90 ? 'Excellent' : 'Good'}</span>",
		"Use a ternary: score > 90 ? value1 : value2"
	];
</script>

<section class="page">
	<!-- 1. TITLE + LEARNING OBJECTIVES -->
	<h1>1.4 — TypeScript primitives</h1>

	<ul class="objectives">
		<li>Know the three primitive types: <code>string</code>, <code>number</code>, <code>boolean</code>.</li>
		<li>Understand type annotations vs type inference.</li>
		<li>Know when to use <code>const</code> vs <code>let</code>.</li>
		<li>Use conditional class directives to change styles based on data.</li>
	</ul>

	<!-- 2. WHY THIS MATTERS -->
	<h2>Why this matters</h2>

	<div class="analogy">
		<p>
			<strong>Analogy:</strong> Types are like labels on storage containers. A container labeled
			"string" can only hold text. One labeled "number" can only hold numbers. TypeScript is the
			organizer who enforces these labels — if you try to put a number in a string container, it
			tells you immediately. This catches bugs before your code ever runs.
		</p>
	</div>

	<p class="concept">
		TypeScript gives you three <strong>primitive types</strong> — the simplest building blocks of data.
		A <strong>string</strong> holds text (any sequence of characters wrapped in quotes). A
		<strong>number</strong> holds numeric values (integers like <code>36</code> or decimals like
		<code>9.99</code>). A <strong>boolean</strong> holds exactly two possible values: <code>true</code>
		or <code>false</code>. The value of typing variables is not bureaucracy — it means that a mistake
		like adding a number to a string, or calling <code>.toUpperCase()</code> on something that might be
		<code>undefined</code>, is caught by the compiler <em>before</em> the browser ever sees it.
	</p>

	<!-- 3. THE COMPLETE CODE -->
	<h2>The complete code</h2>
	<p class="concept">
		Here is the full component file showing all three primitive types in action, with the active/away
		status pill and complete annotated CSS.
	</p>
	<CodeCanvas filename="+page.svelte" code={fullCode} />

	<!-- 4. STEP-BY-STEP WALKTHROUGH -->
	<h2>Step-by-step walkthrough</h2>

	<h3>Step 1: String — text data</h3>
	<p class="concept">
		A <strong>string</strong> is text. Any sequence of characters wrapped in quotes is a string:
		<code>'Ada Lovelace'</code>, <code>"hello"</code>, even <code>'123'</code> (that is text, not
		a number!). The type annotation <code>: string</code> after the variable name tells TypeScript
		"this box only holds text."
	</p>
	<CodeCanvas filename="Step 1 — string" code={stepString} />

	<h3>Step 2: Number — numeric data</h3>
	<p class="concept">
		A <strong>number</strong> holds any numeric value — whole numbers (integers) like <code>36</code>
		or decimals like <code>9.99</code>. The critical difference from strings: <code>36 + 1</code>
		gives you <code>37</code> (math), but <code>'36' + 1</code> gives you <code>'361'</code>
		(text concatenation). Types prevent this mistake.
	</p>
	<CodeCanvas filename="Step 2 — number" code={stepNumber} />

	<h3>Step 3: Boolean — true/false data</h3>
	<p class="concept">
		A <strong>boolean</strong> is the simplest type: it is either <code>true</code> or
		<code>false</code>. Think of it as a light switch. Booleans power conditional logic — they
		let your component change what it shows based on a condition. The <strong>ternary operator</strong>
		<code>condition ? valueIfTrue : valueIfFalse</code> is a one-line if/else that uses a boolean.
	</p>
	<CodeCanvas filename="Step 3 — boolean" code={stepBoolean} />

	<h3>Step 4: const vs let</h3>
	<p class="concept">
		Use <code>const</code> by default — it means the value cannot be reassigned after creation.
		Use <code>let</code> only when you need to change the value later (like a counter or a form
		input). This is not just style preference — <code>const</code> helps you and your team know
		which values are stable and which might change.
	</p>
	<CodeCanvas filename="Step 4 — const vs let" code={stepConstLet} />

	<!-- 5. SEE IT IN ACTION -->
	<h2>See it in action</h2>
	<p class="concept">
		Below is the live stats card. The name is a <code>string</code>, the age is a <code>number</code>,
		and the active status is a <code>boolean</code> that controls the pill color through conditional
		class directives.
	</p>

	<article class="stats-card">
		<h2>{fullName}</h2>
		<p class="age">Age: <strong>{age}</strong></p>
		<span class="pill" class:pill--active={active} class:pill--away={!active}>
			{active ? 'Active' : 'Away'}
		</span>
	</article>

	<!-- 6. YOUR TURN -->
	<h2>Your turn</h2>
	<CodeEditor
		challenge="Add a score: number variable with value 98 and display it in a pill that shows 'Excellent' if above 90, otherwise 'Good'."
		starter={practiceStarter}
		expected={practiceExpected}
		hints={practiceHints}
	/>

	<!-- 7. MORE EXAMPLES -->
	<h2>More examples</h2>

	<details>
		<summary>Example 1: Type inference — let TypeScript guess</summary>
		<p class="detail-text">
			When the type is obvious from the value, you can skip the annotation and let TypeScript
			<strong>infer</strong> it. <code>const name = 'Ada'</code> — TypeScript automatically knows
			this is a string.
		</p>
		<CodeCanvas filename="inference.svelte" code={exInference} />
	</details>

	<details>
		<summary>Example 2: Conditional classes with a score</summary>
		<p class="detail-text">
			Use <code>class:classname={'{'}condition{'}'}</code> to add a CSS class only when a boolean
			condition is true. This is how you change styles based on data.
		</p>
		<CodeCanvas filename="conditional-class.svelte" code={exConditionalClass} />
	</details>

	<details>
		<summary>Example 3: All three types in a product card</summary>
		<p class="detail-text">
			A real-world example: a product name (string), price (number), and availability (boolean).
		</p>
		<CodeCanvas filename="product-card.svelte" code={exAllThree} />
	</details>

	<!-- 8. COMMON MISTAKES -->
	<h2>Common mistakes</h2>

	<div class="mistake-pair">
		<div class="mistake wrong">
			<h4>Wrong</h4>
			<CodeCanvas filename="wrong.svelte" code={mistakeWrong} />
			<p><code>'25'</code> is a string, not a number. <code>'25' + 1</code> produces <code>'251'</code> (text concatenation), not <code>26</code>.</p>
		</div>
		<div class="mistake right">
			<h4>Right</h4>
			<CodeCanvas filename="correct.svelte" code={mistakeRight} />
			<p><code>25</code> without quotes is a number. <code>25 + 1</code> produces <code>26</code> (correct math).</p>
		</div>
	</div>

	<!-- 9. WHAT YOU LEARNED -->
	<h3>What you learned</h3>
	<ul>
		<li>The three primitives: <code>string</code> (text), <code>number</code> (numeric), <code>boolean</code> (true/false).</li>
		<li><strong>Annotations</strong> are explicit (<code>: string</code>); <strong>inference</strong> is implicit — use inference when obvious.</li>
		<li><code>const</code> by default, <code>let</code> only when reassignment is needed.</li>
		<li>TypeScript catches type mismatches at compile time, not in the browser.</li>
		<li>Conditional class directives (<code>class:name={'{'}bool{'}'}</code>) toggle CSS classes based on data.</li>
	</ul>

	<!-- 10. NEXT STEPS -->
	<p class="next">
		<strong>Next:</strong> <a href="/module-1/1-5-layers-tokens">1.5 — @layer & tokens</a> — learn
		the CSS architecture that powers every component.
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
		border-left: 4px solid var(--color-warning);  /* yellow accent bar */
		padding: var(--space-md);                     /* inner spacing */
		border-radius: var(--radius-md);              /* rounded corners */
		margin-block: var(--space-md);                /* vertical spacing */
		max-width: 60ch;                              /* readable line length */

		& p {
			margin: 0;                                /* no margin */
			line-height: 1.6;                        /* comfortable reading */
			color: var(--color-text);                 /* standard text */
		}
	}

	/* ── Concept paragraph ── */
	.concept {
		color: var(--color-text-muted);  /* muted explanatory text */
		max-width: 60ch;                 /* 60-char readable width */
		line-height: 1.6;               /* comfortable spacing */
	}

	/* ── Stats card (live demo) ── */
	.stats-card {
		background: var(--color-surface-2);  /* subtle grey fill */
		padding: var(--space-lg);            /* inner spacing — fluid 1.5-2.5rem */
		border-radius: var(--radius-lg);     /* rounded corners — 1rem */
		margin-block: var(--space-xl);       /* vertical margin — fluid 2-4rem */
		max-width: 24rem;                    /* limit width */
		display: flex;                       /* flexbox layout */
		flex-direction: column;              /* stack children vertically */
		gap: var(--space-sm);                /* space between children — fluid 0.5-1rem */
		align-items: flex-start;             /* left-align children */

		& h2 {
			margin: 0;                       /* remove default heading margin */
			color: var(--color-text);        /* dark text */
			font-size: var(--text-xl);       /* fluid 1.5-2rem */
		}

		@media (min-width: 768px) {
			padding: var(--space-xl);        /* more padding on desktop */
		}
	}

	.age {
		margin: 0;                           /* remove default margin */
		color: var(--color-text-muted);      /* muted label text */

		& strong {
			color: var(--color-text);        /* emphasize the number */
		}
	}

	.pill {
		display: inline-block;                     /* inline with block sizing */
		padding: var(--space-xs) var(--space-md);  /* small vert, medium horiz */
		border-radius: var(--radius-full);         /* 9999px — full pill shape */
		font-size: var(--text-sm);                 /* smaller text */
		font-weight: 600;                          /* semi-bold */
		text-transform: uppercase;                 /* ALL CAPS */
		letter-spacing: 0.05em;                    /* slight spread */
	}

	.pill--active {
		background: var(--color-success);    /* green — oklch(65% 0.18 145) */
		color: var(--color-surface-1);       /* white text on green */
	}

	.pill--away {
		background: var(--color-text-muted); /* grey pill for away */
		color: var(--color-surface-1);       /* white text on grey */
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

	/* ── Details ── */
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
</style>
