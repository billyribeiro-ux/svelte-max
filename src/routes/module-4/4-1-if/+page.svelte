<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let password = $state('');

	const length = $derived(password.length);
	const hasUpper = $derived(/[A-Z]/.test(password));
	const hasDigit = $derived(/\d/.test(password));
	const hasSymbol = $derived(/[^a-zA-Z0-9]/.test(password));
	const score = $derived(
		[length >= 8, hasUpper, hasDigit, hasSymbol].filter(Boolean).length
	);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let password = $state('');\n" +
		"\n" +
		"\tconst length = $derived(password.length);\n" +
		"\tconst hasUpper = $derived(/[A-Z]/.test(password));\n" +
		"\tconst hasDigit = $derived(/\\d/.test(password));\n" +
		"\tconst hasSymbol = $derived(/[^a-zA-Z0-9]/.test(password));\n" +
		"\tconst score = $derived(\n" +
		"\t\t[length \u003e= 8, hasUpper, hasDigit, hasSymbol].filter(Boolean).length\n" +
		"\t);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.1 — {'{#if}'} and boolean logic\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'{#if condition}'}\u003c/code\u003e conditionally renders a block when its expression is\n" +
		"\t\ttruthy. JavaScript treats \u003ccode\u003e''\u003c/code\u003e, \u003ccode\u003e0\u003c/code\u003e, \u003ccode\u003enull\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003eundefined\u003c/code\u003e, \u003ccode\u003eNaN\u003c/code\u003e, and \u003ccode\u003efalse\u003c/code\u003e as falsy; everything else is truthy.\n" +
		"\t\tUse strict equality (\u003ccode\u003e===\u003c/code\u003e) to avoid surprising type coercion, and combine\n" +
		"\t\tconditions with \u003ccode\u003e&&\u003c/code\u003e, \u003ccode\u003e||\u003c/code\u003e, and \u003ccode\u003e!\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003clabel class=\"field\"\u003e\n" +
		"\t\t\t\u003cspan\u003ePassword\u003c/span\u003e\n" +
		"\t\t\t\u003cinput type=\"password\" bind:value={password} placeholder=\"Type a password…\" /\u003e\n" +
		"\t\t\u003c/label\u003e\n" +
		"\n" +
		"\t\t{#if score === 0}\n" +
		"\t\t\t\u003cp class=\"status weak\"\u003eToo short — start typing.\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\t{#if score === 1}\n" +
		"\t\t\t\u003cp class=\"status weak\"\u003eWeak\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\t{#if score === 2}\n" +
		"\t\t\t\u003cp class=\"status ok\"\u003eOkay\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\t{#if score === 3}\n" +
		"\t\t\t\u003cp class=\"status good\"\u003eGood\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\t\t{#if score === 4}\n" +
		"\t\t\t\u003cp class=\"status strong\"\u003eStrong\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cul class=\"checks\"\u003e\n" +
		"\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t{#if length \u003e= 8}\u003cspan class=\"tick\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t{#if !(length \u003e= 8)}\u003cspan class=\"cross\"\u003e•\u003c/span\u003e{/if}\n" +
		"\t\t\t\tAt least 8 characters\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t{#if hasUpper}\u003cspan class=\"tick\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t{#if !hasUpper}\u003cspan class=\"cross\"\u003e•\u003c/span\u003e{/if}\n" +
		"\t\t\t\tAn uppercase letter\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t{#if hasDigit}\u003cspan class=\"tick\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t{#if !hasDigit}\u003cspan class=\"cross\"\u003e•\u003c/span\u003e{/if}\n" +
		"\t\t\t\tA digit\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t{#if hasSymbol}\u003cspan class=\"tick\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t{#if !hasSymbol}\u003cspan class=\"cross\"\u003e•\u003c/span\u003e{/if}\n" +
		"\t\t\t\tA symbol\n" +
		"\t\t\t\u003c/li\u003e\n" +
		"\t\t\u003c/ul\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tNotice the repetition — five separate \u003ccode\u003e{'{#if}'}\u003c/code\u003e blocks. Lesson 4.2 shows how\n" +
		"\t\t\t\u003ccode\u003e{':else if'}\u003c/code\u003e collapses this.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{'{#if expr}'}\u003c/code\u003e renders when \u003ccode\u003eexpr\u003c/code\u003e is truthy.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eFalsy values: \u003ccode\u003e''\u003c/code\u003e, \u003ccode\u003e0\u003c/code\u003e, \u003ccode\u003enull\u003c/code\u003e, \u003ccode\u003eundefined\u003c/code\u003e, \u003ccode\u003eNaN\u003c/code\u003e, \u003ccode\u003efalse\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003ePrefer \u003ccode\u003e===\u003c/code\u003e and \u003ccode\u003e!==\u003c/code\u003e for comparisons.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eBoolean operators \u003ccode\u003e&&\u003c/code\u003e, \u003ccode\u003e||\u003c/code\u003e, \u003ccode\u003e!\u003c/code\u003e combine conditions.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.1 — {'{#if}'} and boolean logic</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#if condition}'}</code> conditionally renders a block when its expression is
		truthy. JavaScript treats <code>''</code>, <code>0</code>, <code>null</code>,
		<code>undefined</code>, <code>NaN</code>, and <code>false</code> as falsy; everything else is truthy.
		Use strict equality (<code>===</code>) to avoid surprising type coercion, and combine
		conditions with <code>&&</code>, <code>||</code>, and <code>!</code>.
	</p>

	<div class="build">
		<label class="field">
			<span>Password</span>
			<input type="password" bind:value={password} placeholder="Type a password…" />
		</label>

		{#if score === 0}
			<p class="status weak">Too short — start typing.</p>
		{/if}
		{#if score === 1}
			<p class="status weak">Weak</p>
		{/if}
		{#if score === 2}
			<p class="status ok">Okay</p>
		{/if}
		{#if score === 3}
			<p class="status good">Good</p>
		{/if}
		{#if score === 4}
			<p class="status strong">Strong</p>
		{/if}

		<ul class="checks">
			<li>
				{#if length >= 8}<span class="tick">✓</span>{/if}
				{#if !(length >= 8)}<span class="cross">•</span>{/if}
				At least 8 characters
			</li>
			<li>
				{#if hasUpper}<span class="tick">✓</span>{/if}
				{#if !hasUpper}<span class="cross">•</span>{/if}
				An uppercase letter
			</li>
			<li>
				{#if hasDigit}<span class="tick">✓</span>{/if}
				{#if !hasDigit}<span class="cross">•</span>{/if}
				A digit
			</li>
			<li>
				{#if hasSymbol}<span class="tick">✓</span>{/if}
				{#if !hasSymbol}<span class="cross">•</span>{/if}
				A symbol
			</li>
		</ul>

		<p class="note">
			Notice the repetition — five separate <code>{'{#if}'}</code> blocks. Lesson 4.2 shows how
			<code>{':else if'}</code> collapses this.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'{#if expr}'}</code> renders when <code>expr</code> is truthy.</li>
		<li>Falsy values: <code>''</code>, <code>0</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>false</code>.</li>
		<li>Prefer <code>===</code> and <code>!==</code> for comparisons.</li>
		<li>Boolean operators <code>&&</code>, <code>||</code>, <code>!</code> combine conditions.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong { color: var(--color-text); }

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

	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.field input {
		font-family: inherit;
		font-size: var(--text-base);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.field input:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	.status {
		font-size: var(--text-sm);
		font-weight: 600;
		margin: 0;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		display: inline-block;
		width: fit-content;
	}
	.weak { color: var(--color-error); background: var(--color-surface-2); }
	.ok { color: var(--color-warning); background: var(--color-surface-2); }
	.good { color: var(--color-brand); background: var(--color-surface-2); }
	.strong { color: var(--color-success); background: var(--color-surface-2); }

	.checks {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.tick { color: var(--color-success); font-weight: 700; margin-inline-end: var(--space-xs); }
	.cross { color: var(--color-text-muted); margin-inline-end: var(--space-xs); }

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
