<svelte:options runes={true} />

<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
	let level = $state<HeadingLevel>(1);

	const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;\n" +
		"\tlet level = $state\u003cHeadingLevel\u003e(1);\n" +
		"\n" +
		"\tconst levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.12 — &lt;svelte:element&gt; and &lt;svelte:options&gt;\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e&lt;svelte:element this={`{tagName}`}&gt;\u003c/code\u003e renders an element whose tag is decided at\n" +
		"\t\truntime — perfect for CMS content (where tag names come from data), configurable heading levels,\n" +
		"\t\tor polymorphic components. \u003ccode\u003e&lt;svelte:options runes={`{true}`} /&gt;\u003c/code\u003e at the top of a\n" +
		"\t\tfile sets per-component compiler options. Together they give you dynamic, strongly-typed DOM\n" +
		"\t\toutput.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eClick a level to change the rendered heading's actual tag name. Inspect the DOM — it's not just styling, the tag itself changes.\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t{#each levels as n (n)}\n" +
		"\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\tclass:active={level === n}\n" +
		"\t\t\t\t\tonclick={() =\u003e (level = n)}\n" +
		"\t\t\t\t\u003e\n" +
		"\t\t\t\t\tH{n}\n" +
		"\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"stage\"\u003e\n" +
		"\t\t\t\u003csvelte:element this={`h${level}`}\u003e\n" +
		"\t\t\t\tThis heading renders as h{level}\n" +
		"\t\t\t\u003c/svelte:element\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"code-hint\"\u003e\n" +
		"\t\t\tCurrent tag: \u003ccode\u003e&lt;h{level}&gt;\u003c/code\u003e\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eSecurity\u003c/h3\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tNever pass user-controlled strings to \u003ccode\u003e&lt;svelte:element this={'{userInput}'}&gt;\u003c/code\u003e.\n" +
		"\t\tAn attacker could inject \u003ccode\u003escript\u003c/code\u003e as the tag name. Always validate against an\n" +
		"\t\tallowlist: \u003ccode\u003econst allowed = ['h1','h2','h3','h4','h5','h6'] as const;\u003c/code\u003e and check\n" +
		"\t\t\u003ccode\u003eallowed.includes(level)\u003c/code\u003e before rendering.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e&lt;svelte:element this={`{...}`}&gt;\u003c/code\u003e picks the tag name at runtime\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eIdeal for polymorphic components: any heading level, any wrapper tag\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e&lt;svelte:options&gt;\u003c/code\u003e sets per-component compiler flags\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDOM inspection confirms the tag — the actual element type changes\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.12 — &lt;svelte:element&gt; and &lt;svelte:options&gt;</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>&lt;svelte:element this={`{tagName}`}&gt;</code> renders an element whose tag is decided at
		runtime — perfect for CMS content (where tag names come from data), configurable heading levels,
		or polymorphic components. <code>&lt;svelte:options runes={`{true}`} /&gt;</code> at the top of a
		file sets per-component compiler options. Together they give you dynamic, strongly-typed DOM
		output.
	</p>

	<div class="build">
		<p class="hint">Click a level to change the rendered heading's actual tag name. Inspect the DOM — it's not just styling, the tag itself changes.</p>

		<div class="controls">
			{#each levels as n (n)}
				<button
					type="button"
					class:active={level === n}
					onclick={() => (level = n)}
				>
					H{n}
				</button>
			{/each}
		</div>

		<div class="stage">
			<svelte:element this={`h${level}`}>
				This heading renders as h{level}
			</svelte:element>
		</div>

		<p class="code-hint">
			Current tag: <code>&lt;h{level}&gt;</code>
		</p>
	</div>

	<h3>Security</h3>
	<p class="concept">
		Never pass user-controlled strings to <code>&lt;svelte:element this={'{userInput}'}&gt;</code>.
		An attacker could inject <code>script</code> as the tag name. Always validate against an
		allowlist: <code>const allowed = ['h1','h2','h3','h4','h5','h6'] as const;</code> and check
		<code>allowed.includes(level)</code> before rendering.
	</p>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;svelte:element this={`{...}`}&gt;</code> picks the tag name at runtime</li>
		<li>Ideal for polymorphic components: any heading level, any wrapper tag</li>
		<li><code>&lt;svelte:options&gt;</code> sets per-component compiler flags</li>
		<li>DOM inspection confirms the tag — the actual element type changes</li>
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
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	.controls {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
	.controls button {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: all var(--dur-fast) var(--ease-out);
	}
	.controls button:hover {
		border-color: var(--color-brand);
	}
	.controls button.active {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.stage {
		padding: var(--space-lg);
		background: var(--color-surface-2);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		min-height: 80px;
		display: flex;
		align-items: center;
	}
	.stage h1,
	.stage h2,
	.stage h3,
	.stage h4,
	.stage h5,
	.stage h6 {
		margin: 0;
		color: var(--color-brand);
	}
	.stage h1 {
		font-size: var(--text-2xl);
	}
	.stage h2 {
		font-size: var(--text-xl);
	}
	.stage h3 {
		font-size: var(--text-lg);
	}
	.stage h4 {
		font-size: var(--text-base);
	}
	.stage h5 {
		font-size: var(--text-sm);
	}
	.stage h6 {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.code-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
