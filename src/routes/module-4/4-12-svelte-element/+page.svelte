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

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Pass an invalid tag name like <code>'notarealtag'</code>.</strong> Svelte renders a generic element with that name, which the browser treats as an unknown inline element with no special semantics. It will not crash, but it will not behave like any standard HTML element either -- no default styles, no accessibility role, no browser behavior.</li>
		<li><strong>Pass <code>null</code> or <code>undefined</code> as the tag name.</strong> Svelte renders nothing at all -- the element and all its children are omitted from the DOM. This is useful as a conditional rendering escape hatch: set the tag to <code>null</code> when you want the element to disappear entirely.</li>
		<li><strong>Change the tag name dynamically and inspect the DOM.</strong> Svelte destroys the old element and creates a new one with the new tag name. This is a full teardown, not a mutation -- the previous element is removed and a fresh one is inserted, so any local state (like input values) resets on every tag change.</li>
		<li><strong>Pass attributes and event handlers to the dynamic element.</strong> They apply to whatever tag is currently rendered. A <code>class</code>, <code>onclick</code>, or <code>aria-label</code> attribute works the same whether the element is an <code>h1</code>, a <code>div</code>, or a <code>button</code>. This makes <code>&lt;svelte:element&gt;</code> ideal for building polymorphic "as" props.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>&lt;svelte:element this={'{tag}'}&gt;</code> renders a DOM element whose tag name is determined at runtime. Instead of hardcoding <code>&lt;h1&gt;</code> or <code>&lt;div&gt;</code>, you pass a string variable and Svelte creates the corresponding element. This is the foundation for polymorphic components -- components that let the consumer decide the rendered element, like a <code>Heading</code> component that accepts a <code>level</code> prop and renders the appropriate <code>h1</code> through <code>h6</code> tag.</p>
	<p class="prose">When the tag name changes, Svelte performs a full destroy-and-recreate cycle, not an in-place mutation. The old element is removed from the DOM and a new one with the new tag is inserted. All attributes, event listeners, and children are reattached to the new element. This behavior means that dynamic tag changes are heavier than normal prop updates, so avoid rapidly toggling between tags in tight loops or animations.</p>
	<p class="prose">Security is a critical concern with dynamic elements. Never pass user-controlled strings directly to the <code>this</code> attribute, because an attacker could inject dangerous tag names. Always validate against a strict allowlist of permitted tags -- <code>const allowed = ['h1','h2','h3','h4','h5','h6'] as const</code> -- and check membership before rendering. Combined with <code>&lt;svelte:options&gt;</code> for setting per-component compiler flags like <code>runes={'{true}'}</code>, these special elements give you fine-grained control over both what Svelte renders and how it compiles.</p>
	<p class="next">Next lesson: <a href="/module-4/project">Module 4 project</a></p>
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
		min-block-size: 80px;
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
	@media (min-inline-size: 768px) {
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

	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
