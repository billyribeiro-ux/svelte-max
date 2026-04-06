<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import Avatar from '$lib/components/Avatar.svelte';

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import Avatar from '$lib/components/Avatar.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.2 — $props()\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003e$props()\u003c/code\u003e is how a Svelte 5 component receives data from\n" +
		"\t\tits parent. You destructure the values you want at the top of the script:\n" +
		"\t\t\u003ccode\u003elet {'{ src, alt, size }'} = $props();\u003c/code\u003e. At the call site you pass them as\n" +
		"\t\tattributes — \u003ccode\u003e&lt;Avatar src=\"...\" alt=\"...\" size=\"lg\" /&gt;\u003c/code\u003e — which replaces the\n" +
		"\t\told \u003ccode\u003eexport let\u003c/code\u003e pattern. Explicit destructuring lets the compiler tree-shake unused\n" +
		"\t\tprops, infer types, and wire fine-grained reactivity.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"note\"\u003eFour avatars — three sizes plus one \u003ccode\u003esrc={'{null}'}\u003c/code\u003e initials fallback.\u003c/p\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"cell\"\u003e\n" +
		"\t\t\t\t\u003cAvatar src={null} alt=\"Ada Rivera\" name=\"Ada Rivera\" size=\"sm\" /\u003e\n" +
		"\t\t\t\t\u003cspan class=\"caption\"\u003esm\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"cell\"\u003e\n" +
		"\t\t\t\t\u003cAvatar src={null} alt=\"Kai Thompson\" name=\"Kai Thompson\" size=\"md\" /\u003e\n" +
		"\t\t\t\t\u003cspan class=\"caption\"\u003emd\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"cell\"\u003e\n" +
		"\t\t\t\t\u003cAvatar src={null} alt=\"Mira Okafor\" name=\"Mira Okafor\" size=\"lg\" /\u003e\n" +
		"\t\t\t\t\u003cspan class=\"caption\"\u003elg\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"cell\"\u003e\n" +
		"\t\t\t\t\u003cAvatar src={null} alt=\"Jun Park\" name=\"Jun Park\" size=\"md\" /\u003e\n" +
		"\t\t\t\t\u003cspan class=\"caption\"\u003efallback\u003c/span\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$props()\u003c/code\u003e replaces \u003ccode\u003eexport let\u003c/code\u003e from Svelte 4.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDestructure only the props you need; unused ones are tree-shaken.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eProps are passed at the call site as attributes, exactly like HTML.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eExplicit destructuring is what enables type inference and reactive wiring.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.2 — $props()</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>$props()</code> is how a Svelte 5 component receives data from
		its parent. You destructure the values you want at the top of the script:
		<code>let {'{ src, alt, size }'} = $props();</code>. At the call site you pass them as
		attributes — <code>&lt;Avatar src="..." alt="..." size="lg" /&gt;</code> — which replaces the
		old <code>export let</code> pattern. Explicit destructuring lets the compiler tree-shake unused
		props, infer types, and wire fine-grained reactivity.
	</p>

	<div class="build">
		<p class="note">Four avatars — three sizes plus one <code>src={'{null}'}</code> initials fallback.</p>
		<div class="row">
			<div class="cell">
				<Avatar src={null} alt="Ada Rivera" name="Ada Rivera" size="sm" />
				<span class="caption">sm</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Kai Thompson" name="Kai Thompson" size="md" />
				<span class="caption">md</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Mira Okafor" name="Mira Okafor" size="lg" />
				<span class="caption">lg</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Jun Park" name="Jun Park" size="md" />
				<span class="caption">fallback</span>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments to understand how Svelte's prop system behaves at the edges.</p>
	<ol class="experiments">
		<li><strong>Access a prop that was never passed by the parent.</strong> The destructured variable will be <code>undefined</code> at runtime, with no error unless you have added a TypeScript type annotation. This shows that without types, Svelte does not enforce required props — it is the type system that makes them mandatory.</li>
		<li><strong>Destructure <code>$props()</code> without curly braces — write <code>let props = $props()</code>.</strong> This is actually valid and gives you the entire props object, but you lose fine-grained reactivity and tree-shaking. The compiler cannot track which individual props are used, so every prop change triggers an update.</li>
		<li><strong>Try to mutate a prop value from inside the child component.</strong> The mutation appears to work locally, but the parent's state does not change. This demonstrates one-way data flow: props flow down, and the child's local mutation is an isolated side effect that will be overwritten the next time the parent re-renders.</li>
		<li><strong>Pass an extra prop that the component does not declare in its interface.</strong> TypeScript will warn that the property "does not exist on type Props." At runtime Svelte silently ignores it, but the type error protects you from typos and dead code.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">In Svelte 5 the <code>$props()</code> rune replaces the old <code>export let</code> pattern for receiving data from a parent component. You call <code>$props()</code> at the top of the script and destructure the values you need, which tells the compiler exactly which props the component consumes. This explicit destructuring is what enables tree-shaking of unused props and fine-grained reactive updates.</p>
	<p class="prose">Props flow in one direction: from parent to child. The parent passes them as attributes on the component tag, exactly the way you set attributes on a native HTML element. The child reads them but does not own them — the parent is the single source of truth, and any change to the parent's data automatically propagates downward.</p>
	<p class="prose">Because the destructuring happens at the top of the script, TypeScript can infer or check every prop's type without extra annotations. If you later rename a prop or change its type, every consumer that passes the wrong value lights up with a compile error, giving you confidence to refactor across files.</p>
	<p class="next">Next lesson: <a href="/module-3/3-3-typed-props">3.3 — Typed props</a></p>
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

	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.cell {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.caption {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
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

		.row {
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}

		.cell {
			flex-direction: column;
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
