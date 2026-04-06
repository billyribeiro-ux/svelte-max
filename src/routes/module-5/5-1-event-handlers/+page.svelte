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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Use <code>{'onclick={handler}'}</code>, not <code>on:click</code>.</li>
		<li>Named handlers read better for multi-line logic.</li>
		<li>Handlers are just functions passed as props — no invocation at the call site.</li>
	</ul>
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
