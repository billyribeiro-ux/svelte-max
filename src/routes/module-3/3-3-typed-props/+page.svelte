<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import Button from '$lib/components/Button.svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface ButtonSample {
		variant: Variant;
		size: Size;
		label: string;
	}

	const variants: readonly Variant[] = ['primary', 'secondary', 'ghost', 'danger'];
	const sizes: readonly Size[] = ['sm', 'md', 'lg'];

	const samples: ButtonSample[] = variants.flatMap((variant) =>
		sizes.map((size) => ({ variant, size, label: `${variant} ${size}` }))
	);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Button from '$lib/components/Button.svelte';\n" +
		"\n" +
		"\ttype Variant = 'primary' | 'secondary' | 'ghost' | 'danger';\n" +
		"\ttype Size = 'sm' | 'md' | 'lg';\n" +
		"\n" +
		"\tinterface ButtonSample {\n" +
		"\t\tvariant: Variant;\n" +
		"\t\tsize: Size;\n" +
		"\t\tlabel: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst variants: readonly Variant[] = ['primary', 'secondary', 'ghost', 'danger'];\n" +
		"\tconst sizes: readonly Size[] = ['sm', 'md', 'lg'];\n" +
		"\n" +
		"\tconst samples: ButtonSample[] = variants.flatMap((variant) =\u003e\n" +
		"\t\tsizes.map((size) =\u003e ({ variant, size, label: `${variant} ${size}` }))\n" +
		"\t);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.3 — Typed props with interfaces\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Every component gets an \u003ccode\u003einterface Props\u003c/code\u003e describing its\n" +
		"\t\tshape, and you destructure into it:\n" +
		"\t\t\u003ccode\u003elet {'{ variant, size }'}: Props = $props()\u003c/code\u003e. TypeScript then catches mismatches\n" +
		"\t\tat compile time — a typo like \u003ccode\u003evariant=\"prmary\"\u003c/code\u003e becomes an error instead of a\n" +
		"\t\tsilent visual bug. Union string literals give you exhaustive, autocompleted variants, and\n" +
		"\t\tchanging the interface lights up every call site that's wrong.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tFour variants &times; three sizes = twelve buttons, all driven by a typed\n" +
		"\t\t\t\u003ccode\u003eButtonSample[]\u003c/code\u003e.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t{#each samples as sample (sample.label)}\n" +
		"\t\t\t\t\u003cButton variant={sample.variant} size={sample.size}\u003e\n" +
		"\t\t\t\t\t{sample.label}\n" +
		"\t\t\t\t\u003c/Button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cp class=\"ts-note\"\u003e\n" +
		"\t\t\tIf you wrote \u003ccode\u003evariant=\"primry\"\u003c/code\u003e, TypeScript would flag:\n" +
		"\t\t\t\u003cem\u003eType '\"primry\"' is not assignable to type '\"primary\" | \"secondary\" | \"ghost\" | \"danger\"'\u003c/em\u003e.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eDeclare an \u003ccode\u003einterface Props\u003c/code\u003e and destructure \u003ccode\u003e$props()\u003c/code\u003e into it.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUnion string literals create exhaustive, autocompleted variants.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eTypos in prop values become compile errors instead of runtime surprises.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRenaming or narrowing a prop cascades through every consumer at once.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.3 — Typed props with interfaces</h1>
	<p class="concept">
		<strong>Concept.</strong> Every component gets an <code>interface Props</code> describing its
		shape, and you destructure into it:
		<code>let {'{ variant, size }'}: Props = $props()</code>. TypeScript then catches mismatches
		at compile time — a typo like <code>variant="prmary"</code> becomes an error instead of a
		silent visual bug. Union string literals give you exhaustive, autocompleted variants, and
		changing the interface lights up every call site that's wrong.
	</p>

	<div class="build">
		<p class="note">
			Four variants &times; three sizes = twelve buttons, all driven by a typed
			<code>ButtonSample[]</code>.
		</p>
		<div class="grid">
			{#each samples as sample (sample.label)}
				<Button variant={sample.variant} size={sample.size}>
					{sample.label}
				</Button>
			{/each}
		</div>
		<p class="ts-note">
			If you wrote <code>variant="primry"</code>, TypeScript would flag:
			<em>Type '"primry"' is not assignable to type '"primary" | "secondary" | "ghost" | "danger"'</em>.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments reveal how TypeScript and Svelte collaborate to enforce your component contracts at compile time.</p>
	<ol class="experiments">
		<li><strong>Pass a string where the interface expects a number.</strong> TypeScript immediately flags the mismatch at the call site. The component never even runs with bad data, because the type system catches it before the code reaches the browser.</li>
		<li><strong>Omit a required prop when using the component.</strong> TypeScript reports that the property is missing. Required props have no <code>?</code> in the interface, so the compiler treats their absence as an error — you cannot forget to pass them.</li>
		<li><strong>Add a union type to a prop and use <code>{'{#if}'}</code> to narrow it.</strong> Inside the branch, TypeScript knows the exact variant, so you get full autocomplete on variant-specific fields. This shows that Svelte's template blocks participate in TypeScript's control-flow analysis.</li>
		<li><strong>Pass an object prop that is missing a field from the interface.</strong> TypeScript produces a field-level error telling you exactly which property is absent. The interface acts as a contract, and every field must be satisfied for the call site to compile.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Every Svelte 5 component should declare an <code>interface Props</code> that describes the exact shape of the data it accepts, and then destructure <code>$props()</code> into that type. This single declaration serves as a living contract: it tells consumers what to pass, tells the compiler what to check, and tells your editor what to autocomplete.</p>
	<p class="prose">Union string literals are especially powerful for props like <code>variant</code> or <code>size</code>. Instead of accepting any string, the interface enumerates every legal value, so a typo like <code>"prmary"</code> becomes a compile error rather than a silent visual bug. The compiler ensures exhaustive coverage, which means adding a new variant to the union instantly highlights every call site that needs updating.</p>
	<p class="prose">Typed props have zero runtime cost. The interface exists only at compile time — it is erased before the code reaches the browser. You get full safety, full autocomplete, and full refactoring confidence without adding a single byte to the bundle.</p>
	<p class="next">Next lesson: <a href="/module-3/3-4-optional-props">3.4 — Optional props and defaults</a></p>
</section>

<style>
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

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		align-items: center;
		justify-items: start;
	}

	.ts-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		margin: 0;
	}

	.ts-note em {
		color: var(--color-error);
		font-style: normal;
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}

		.grid {
			grid-template-columns: repeat(3, auto);
			justify-items: center;
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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

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
