<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Message {
		id: number;
		text: string;
	}

	const messages: readonly Message[] = [
		{ id: 1, text: 'Welcome — this card re-mounts on every change.' },
		{ id: 2, text: 'The {#key} block tears down its contents when the expression changes.' },
		{ id: 3, text: 'That means CSS animations re-run from scratch every time.' },
		{ id: 4, text: 'Use it to reset state or retrigger entrance effects.' },
		{ id: 5, text: 'Prefer normal reactivity unless you need full tear-down.' }
	];

	let current = $state(0);

	function prev() {
		current = (current - 1 + messages.length) % messages.length;
	}

	function next() {
		current = (current + 1) % messages.length;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Message {\n" +
		"\t\tid: number;\n" +
		"\t\ttext: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst messages: readonly Message[] = [\n" +
		"\t\t{ id: 1, text: 'Welcome — this card re-mounts on every change.' },\n" +
		"\t\t{ id: 2, text: 'The {#key} block tears down its contents when the expression changes.' },\n" +
		"\t\t{ id: 3, text: 'That means CSS animations re-run from scratch every time.' },\n" +
		"\t\t{ id: 4, text: 'Use it to reset state or retrigger entrance effects.' },\n" +
		"\t\t{ id: 5, text: 'Prefer normal reactivity unless you need full tear-down.' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet current = $state(0);\n" +
		"\n" +
		"\tfunction prev() {\n" +
		"\t\tcurrent = (current - 1 + messages.length) % messages.length;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction next() {\n" +
		"\t\tcurrent = (current + 1) % messages.length;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.6 — {'{#key}'} block\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'{#key expression}'}\u003c/code\u003e destroys and recreates its contents whenever the expression\n" +
		"\t\tchanges. Use it to force a component to re-mount (resetting its local state), to retrigger an\n" +
		"\t\tentrance animation, or to recreate something that can't handle a reactive prop update\n" +
		"\t\tgracefully. It's a big hammer — prefer ordinary reactivity unless you need the full tear-down.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={prev}\u003ePrev\u003c/button\u003e\n" +
		"\t\t\t\u003cspan class=\"counter\"\u003e{current + 1} / {messages.length}\u003c/span\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={next}\u003eNext\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#key current}\n" +
		"\t\t\t\u003carticle class=\"card\"\u003e\n" +
		"\t\t\t\t\u003cp\u003e{messages[current].text}\u003c/p\u003e\n" +
		"\t\t\t\u003c/article\u003e\n" +
		"\t\t{/key}\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tEvery click recreates the \u003ccode\u003e.card\u003c/code\u003e element, so the fade-slide animation runs\n" +
		"\t\t\tfresh each time.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eCombining {'{#key}'} with transitions\u003c/h3\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tIn Module 6, you'll combine \u003ccode\u003e{'{#key}'}\u003c/code\u003e with Svelte transitions. The pattern:\n" +
		"\t\t\u003ccode\u003e{'{#key id}\u003cdiv transition:fly\u003e{content}\u003c/div\u003e{/key}'}\u003c/code\u003e — every key change tears\n" +
		"\t\tdown and recreates the element, triggering the entrance transition fresh. This is how you build\n" +
		"\t\tcontent switchers with smooth animations.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{'{#key expr}'}\u003c/code\u003e destroys and recreates its block on change.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUseful for resetting state and retriggering entrance animations.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003ePrefer normal reactivity unless full tear-down is required.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRespect \u003ccode\u003eprefers-reduced-motion\u003c/code\u003e when keying animations.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.6 — {'{#key}'} block</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#key expression}'}</code> destroys and recreates its contents whenever the expression
		changes. Use it to force a component to re-mount (resetting its local state), to retrigger an
		entrance animation, or to recreate something that can't handle a reactive prop update
		gracefully. It's a big hammer — prefer ordinary reactivity unless you need the full tear-down.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={prev}>Prev</button>
			<span class="counter">{current + 1} / {messages.length}</span>
			<button type="button" onclick={next}>Next</button>
		</div>

		{#key current}
			<article class="card">
				<p>{messages[current].text}</p>
			</article>
		{/key}

		<p class="note">
			Every click recreates the <code>.card</code> element, so the fade-slide animation runs
			fresh each time.
		</p>
	</div>

	<h3>Combining {'{#key}'} with transitions</h3>
	<p class="concept">
		In Module 6, you'll combine <code>{'{#key}'}</code> with Svelte transitions. The pattern:
		<code>{'{#key id}<div transition:fly>{content}</div>{/key}'}</code> — every key change tears
		down and recreates the element, triggering the entrance transition fresh. This is how you build
		content switchers with smooth animations.
	</p>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'{#key expr}'}</code> destroys and recreates its block on change.</li>
		<li>Useful for resetting state and retriggering entrance animations.</li>
		<li>Prefer normal reactivity unless full tear-down is required.</li>
		<li>Respect <code>prefers-reduced-motion</code> when keying animations.</li>
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

	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}
	.controls button {
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
	}
	.controls button:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}
	.counter {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		min-block-size: 6rem;
		display: grid;
		place-items: center;
		animation: fadeSlide var(--dur-slow) var(--ease-expressive);
	}
	.card p {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
		text-align: center;
		max-inline-size: 40ch;
	}

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@keyframes fadeSlide {
		from {
			opacity: 0;
			transform: translateY(var(--space-sm));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card { animation: none; }
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
