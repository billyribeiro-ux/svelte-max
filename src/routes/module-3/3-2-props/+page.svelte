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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$props()</code> replaces <code>export let</code> from Svelte 4.</li>
		<li>Destructure only the props you need; unused ones are tree-shaken.</li>
		<li>Props are passed at the call site as attributes, exactly like HTML.</li>
		<li>Explicit destructuring is what enables type inference and reactive wiring.</li>
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

	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}

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
