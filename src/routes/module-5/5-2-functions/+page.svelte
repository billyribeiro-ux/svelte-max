<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Tool = 'pencil' | 'eraser' | 'rect' | 'text';

	let tool = $state<Tool>('pencil');

	function selectPencil(): void {
		tool = 'pencil';
	}
	function selectEraser(): void {
		tool = 'eraser';
	}
	function selectRect(): void {
		tool = 'rect';
	}
	function selectText(): void {
		tool = 'text';
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Tool = 'pencil' | 'eraser' | 'rect' | 'text';\n" +
		"\n" +
		"\tlet tool = $state\u003cTool\u003e('pencil');\n" +
		"\n" +
		"\tfunction selectPencil(): void {\n" +
		"\t\ttool = 'pencil';\n" +
		"\t}\n" +
		"\tfunction selectEraser(): void {\n" +
		"\t\ttool = 'eraser';\n" +
		"\t}\n" +
		"\tfunction selectRect(): void {\n" +
		"\t\ttool = 'rect';\n" +
		"\t}\n" +
		"\tfunction selectText(): void {\n" +
		"\t\ttool = 'text';\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.2 — JS functions deeply\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Function declarations hoist; arrow functions don't but preserve\n" +
		"\t\t\u003ccode\u003ethis\u003c/code\u003e lexically. In Svelte handlers neither matters practically — pick the shorter form.\n" +
		"\t\tTyped parameters make intent clear, and functions-as-values means you pass them into\n" +
		"\t\t\u003ccode\u003eonclick\u003c/code\u003e without invoking.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"toolbar\" role=\"toolbar\" aria-label=\"Drawing tools\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={tool === 'pencil'} onclick={selectPencil}\u003ePencil\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={tool === 'eraser'} onclick={selectEraser}\u003eEraser\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={tool === 'rect'} onclick={selectRect}\u003eRect\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class:active={tool === 'text'} onclick={selectText}\u003eText\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cp class=\"selected\"\u003e\n" +
		"\t\t\tSelected tool: \u003cstrong\u003e{tool}\u003c/strong\u003e\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eTyped function parameters (e.g. \u003ccode\u003ename: Tool\u003c/code\u003e) catch typos at compile time.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003ePass functions by reference: \u003ccode\u003eonclick={selectPencil}\u003c/code\u003e, not with parentheses.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eToggle classes with \u003ccode\u003eclass:active={'{'}tool === 'pencil'{'}'}\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.2 — JS functions deeply</h1>
	<p class="concept">
		<strong>Concept.</strong> Function declarations hoist; arrow functions don't but preserve
		<code>this</code> lexically. In Svelte handlers neither matters practically — pick the shorter form.
		Typed parameters make intent clear, and functions-as-values means you pass them into
		<code>onclick</code> without invoking.
	</p>

	<div class="build">
		<div class="toolbar" role="toolbar" aria-label="Drawing tools">
			<button type="button" class:active={tool === 'pencil'} onclick={selectPencil}>Pencil</button>
			<button type="button" class:active={tool === 'eraser'} onclick={selectEraser}>Eraser</button>
			<button type="button" class:active={tool === 'rect'} onclick={selectRect}>Rect</button>
			<button type="button" class:active={tool === 'text'} onclick={selectText}>Text</button>
		</div>
		<p class="selected">
			Selected tool: <strong>{tool}</strong>
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		Understanding the difference between passing a function and calling a function is one of the most important JavaScript fundamentals. These experiments will make the distinction visceral.
	</p>
	<ol class="experiments">
		<li><strong>Call the function instead of passing it: <code>onclick={'{selectPencil()}'}</code>.</strong> Adding parentheses invokes the function immediately during render, not on click. The tool switches to "pencil" as soon as the component mounts, and clicking the button does nothing afterward because <code>onclick</code> receives the return value (<code>undefined</code>) instead of a function reference.</li>
		<li><strong>Pass with arguments using a closure: <code>{'onclick={() => handler(id)}'}</code>.</strong> When you need to forward data to a handler, wrap it in an arrow function. This creates a new closure each render that captures the current value of <code>id</code>. It is the correct pattern for parameterized handlers in Svelte 5.</li>
		<li><strong>Log <code>event.target</code> versus <code>event.currentTarget</code> in a handler.</strong> Add <code>(e: MouseEvent) =&gt; console.log(e.target, e.currentTarget)</code> to a button click. <code>target</code> is the element the user actually clicked (which might be a child <code>&lt;span&gt;</code>), while <code>currentTarget</code> is always the element the listener is attached to. Confusing the two is a common source of bugs in delegation patterns.</li>
		<li><strong>Type the handler with the wrong event type, e.g. <code>(e: KeyboardEvent)</code> on <code>onclick</code>.</strong> TypeScript immediately flags the mismatch because <code>onclick</code> expects a <code>MouseEvent</code>. This compile-time safety is one of the strongest arguments for using Svelte 5's native attribute syntax — the types are baked into the HTML element definitions.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		The most critical takeaway is the distinction between passing a function by reference and invoking it. Writing <code>onclick={'{selectPencil}'}</code> hands Svelte a function object to call later when the user clicks. Writing <code>onclick={'{selectPencil()}'}</code> calls the function right now and hands Svelte whatever it returns — almost always <code>undefined</code>. This is pure JavaScript, not a Svelte quirk, and misunderstanding it is the number-one source of "my handler fires on mount" bugs across every framework.
	</p>
	<p class="prose">
		When a handler needs arguments, the closure pattern <code>{'onclick={() => handler(id)}'}</code> is the standard approach. Each render creates a fresh arrow function that captures the current scope. In Svelte 5 this is perfectly efficient because the compiler can diff event attributes and only reassign when the closure's dependencies change, so there is no meaningful performance cost to inline arrows in templates.
	</p>
	<p class="prose">
		Finally, understanding <code>event.target</code> versus <code>event.currentTarget</code> is essential for robust event handling. The target is the deepest DOM node that triggered the event; the currentTarget is the node the listener lives on. In delegated or nested layouts, these differ constantly. Svelte's typed events make this explicit — <code>currentTarget</code> is already typed to the element you attached the handler to, while <code>target</code> is the generic <code>EventTarget</code> that requires narrowing.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-3-typed-events">5.3 — Typed events</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
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
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.toolbar button {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}
	.toolbar button:hover {
		border-color: var(--color-brand-dim);
	}
	.toolbar button.active {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}
	.selected {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.selected strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
