<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let likes = $state(0);
	let popping = $state(false);

	function like(): void {
		likes += 1;
		popping = true;
		setTimeout(() => {
			popping = false;
		}, 400);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"let likes = $state(0);\n" +
		"\tlet popping = $state(false);\n" +
		"\n" +
		"\tfunction like(): void {\n" +
		"\t\tlikes += 1;\n" +
		"\t\tpopping = true;\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tpopping = false;\n" +
		"\t\t}, 400);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.1 — Event handlers\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte 5 uses native DOM attribute syntax for event handlers —\n" +
		"\t\t\u003ccode\u003e{'onclick={handler}'}\u003c/code\u003e (not the Svelte 4 directive \u003ccode\u003eon:click\u003c/code\u003e). Inline\n" +
		"\t\tarrow handlers are fine for one-liners; named handlers for anything more. Every handler\n" +
		"\t\treceives a typed DOM event.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" class=\"like\" onclick={like}\u003e\n" +
		"\t\t\t\u003cspan class=\"heart\" class:pop={popping} aria-hidden=\"true\"\u003e&#10084;&#65039;\u003c/span\u003e\n" +
		"\t\t\t\u003cspan class=\"count\"\u003e{likes}\u003c/span\u003e\n" +
		"\t\t\u003c/button\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eClick the heart — state updates and a pop class is applied briefly.\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003e{'onclick={handler}'}\u003c/code\u003e, not \u003ccode\u003eon:click\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eNamed handlers read better for multi-line logic.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eHandlers are just functions passed as props — no invocation at the call site.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.1 — Event handlers</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte 5 uses native DOM attribute syntax for event handlers —
		<code>{'onclick={handler}'}</code> (not the Svelte 4 directive <code>on:click</code>). Inline
		arrow handlers are fine for one-liners; named handlers for anything more. Every handler
		receives a typed DOM event.
	</p>

	<div class="build">
		<button type="button" class="like" onclick={like}>
			<span class="heart" class:pop={popping} aria-hidden="true">&#10084;&#65039;</span>
			<span class="count">{likes}</span>
		</button>
		<p class="hint">Click the heart — state updates and a pop class is applied briefly.</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">
		The best way to internalize how Svelte 5 event handlers work is to deliberately break them and watch what happens. Try each experiment below in your own code, observe the result, then undo the change before moving on.
	</p>
	<ol class="experiments">
		<li><strong>Use <code>on:click</code> instead of <code>onclick</code>.</strong> The <code>on:click</code> directive is the Svelte 4 syntax and is deprecated in runes mode. Svelte will emit a compiler warning telling you to migrate to the native attribute form, confirming that Svelte 5 treats event handlers as standard HTML attributes.</li>
		<li><strong>Switch to <code>onclick</code> (the Svelte 5 way).</strong> Replace the old directive with the native attribute <code>onclick={'{like}'}</code> and verify that the button works exactly the same way. This proves that Svelte 5 event binding is simply native DOM attribute syntax with no special compiler magic beyond type inference.</li>
		<li><strong>Replace the named function with an inline arrow: <code>{'onclick={() => like()}'}</code>.</strong> Both approaches work, but named functions appear with their name in the DevTools call stack, making them far easier to debug. Inline arrows are fine for one-liners, but named handlers are preferable for anything nontrivial.</li>
		<li><strong>Forget to type the event parameter in a handler.</strong> Add a parameter like <code>(e)</code> and hover over it in your editor. TypeScript automatically infers <code>MouseEvent</code> from the <code>onclick</code> attribute, so you get full autocompletion on <code>e.clientX</code>, <code>e.button</code>, and friends without writing a single type annotation.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">
		Svelte 5 abandons the custom <code>on:click</code> directive in favor of plain HTML event attributes like <code>onclick</code>, <code>oninput</code>, and <code>onsubmit</code>. This is not a cosmetic rename — it aligns Svelte with the platform so that everything you already know about DOM events transfers directly. The compiler still does the heavy lifting behind the scenes (attaching listeners with correct timing, batching updates), but the surface syntax is now indistinguishable from what the browser itself understands.
	</p>
	<p class="prose">
		Because these are standard attributes, TypeScript can infer the exact event type for every handler automatically. An <code>onclick</code> handler receives a <code>MouseEvent</code>, an <code>oninput</code> handler receives an <code>InputEvent</code>, and so on — no manual annotation required. This gives you autocompletion on every property of the event object and catches mistakes at compile time rather than at runtime, which is a significant upgrade over stringly-typed custom events.
	</p>
	<p class="prose">
		Svelte also handles listener cleanup automatically. When a component is destroyed, every event handler attached through an attribute is removed — you never need to call <code>removeEventListener</code> yourself. This eliminates an entire class of memory-leak bugs that plague vanilla JavaScript applications and makes Svelte components fully self-contained units of behavior.
	</p>
	<p class="next">Next lesson: <a href="/module-5/5-2-functions">5.2 — Event handler functions</a></p>
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
	.like {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-lg);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.like:hover {
		background: var(--color-surface);
	}
	.heart {
		display: inline-block;
		transform-origin: center;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.heart.pop {
		animation: pop var(--dur-slow) var(--ease-expressive);
	}
	.count {
		font-variant-numeric: tabular-nums;
		color: var(--color-brand);
		font-weight: 600;
	}
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	@keyframes pop {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.6);
		}
		100% {
			transform: scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.heart.pop {
			animation: none;
		}
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
