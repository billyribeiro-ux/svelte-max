<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let open = $state(false);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { fade, fly } from 'svelte/transition';\n" +
		"\timport { backOut } from 'svelte/easing';\n" +
		"\n" +
		"\tlet open = $state(false);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.12 — in and out directives\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Use \u003ccode\u003etransition:\u003c/code\u003e when you want the same animation for\n" +
		"\t\tenter and exit. Use \u003ccode\u003ein:\u003c/code\u003e and \u003ccode\u003eout:\u003c/code\u003e when you want different ones. A modal\n" +
		"\t\tcan fly in from below on mount but fade straight out on close. You can combine them, or use\n" +
		"\t\tonly one of the pair.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" class=\"open-btn\" onclick={() =\u003e (open = true)}\u003eOpen modal\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#if open}\n" +
		"\t\t\t\u003cdiv\n" +
		"\t\t\t\tclass=\"backdrop\"\n" +
		"\t\t\t\ttransition:fade={{ duration: 200 }}\n" +
		"\t\t\t\trole=\"presentation\"\n" +
		"\t\t\t\tonclick={() =\u003e (open = false)}\n" +
		"\t\t\t\u003e\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv\n" +
		"\t\t\t\tclass=\"modal\"\n" +
		"\t\t\t\tin:fly={{ y: 30, duration: 400, easing: backOut }}\n" +
		"\t\t\t\tout:fade={{ duration: 200 }}\n" +
		"\t\t\t\trole=\"dialog\"\n" +
		"\t\t\t\taria-modal=\"true\"\n" +
		"\t\t\t\taria-labelledby=\"modal-title\"\n" +
		"\t\t\t\u003e\n" +
		"\t\t\t\t\u003ch2 id=\"modal-title\"\u003eAsymmetric modal\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cp\u003e\n" +
		"\t\t\t\t\tThis modal flies in from below on open, then fades straight out on close. Notice the\n" +
		"\t\t\t\t\tdifference between the two animations.\n" +
		"\t\t\t\t\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"close-btn\" onclick={() =\u003e (open = false)}\u003eClose\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003etransition:\u003c/code\u003e is bidirectional, \u003ccode\u003ein:\u003c/code\u003e/\u003ccode\u003eout:\u003c/code\u003e are not.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eMix and match functions (fly in, fade out) for expressive UX.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eBoth directives accept the same parameter objects.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.12 — in and out directives</h1>
	<p class="concept">
		<strong>Concept.</strong> Use <code>transition:</code> when you want the same animation for
		enter and exit. Use <code>in:</code> and <code>out:</code> when you want different ones. A modal
		can fly in from below on mount but fade straight out on close. You can combine them, or use
		only one of the pair.
	</p>

	<div class="build">
		<button type="button" class="open-btn" onclick={() => (open = true)}>Open modal</button>

		{#if open}
			<div
				class="backdrop"
				transition:fade={{ duration: 200 }}
				role="presentation"
				onclick={() => (open = false)}
			></div>
			<div
				class="modal"
				in:fly={{ y: 30, duration: 400, easing: backOut }}
				out:fade={{ duration: 200 }}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				<h2 id="modal-title">Asymmetric modal</h2>
				<p>
					This modal flies in from below on open, then fades straight out on close. Notice the
					difference between the two animations.
				</p>
				<button type="button" class="close-btn" onclick={() => (open = false)}>Close</button>
			</div>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Test the constraints and combinations of directional transition directives to master asymmetric animation.</p>
	<ol class="experiments">
		<li><strong>Use both <code>transition:</code> and <code>in:</code> on the same element</strong> — error, pick one. Svelte does not allow mixing bidirectional and directional transition directives on a single element because their lifecycles would conflict.</li>
		<li><strong>Use only <code>in:</code></strong> — element appears animated but disappears instantly. Without an <code>out:</code> directive, the element is removed from the DOM immediately when its condition becomes false, with no exit animation.</li>
		<li><strong>Use only <code>out:</code></strong> — element appears instantly but disappears animated. The element mounts without any entrance animation but plays the out transition when removed, useful for persistent UI that only animates on dismiss.</li>
		<li><strong>Combine <code>in:fly</code> and <code>out:fade</code></strong> — different effects for enter and exit. This asymmetric pattern feels natural because spatial movement draws attention on entrance while opacity change provides a quiet exit.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>in:</code> and <code>out:</code> directives give you independent control over entrance and exit animations, which is essential for creating motion that feels intentional rather than mechanical. A bidirectional <code>transition:</code> plays the same animation forward on enter and backward on exit. While this works for simple effects like fading, it produces unnatural results for spatial animations -- a modal that flies up from below should not fly back down when closed, because the user's mental model is that the modal is being dismissed, not returning to where it came from. A fade-out feels more appropriate because it communicates disappearance rather than movement.</p>
	<p class="prose">The rule that you cannot mix <code>transition:</code> with <code>in:</code> or <code>out:</code> on the same element is a deliberate design constraint. Both systems manage the element's lifecycle -- specifically, when the DOM node is actually removed after the exit animation completes. Having two competing lifecycle managers would create race conditions and unpredictable behavior. You must choose: either use <code>transition:</code> for symmetric animation, or use <code>in:</code> and/or <code>out:</code> for asymmetric animation. You can use just one of the pair if you only need animation in one direction.</p>
	<p class="prose">The parameter objects for <code>in:</code> and <code>out:</code> are identical to those for <code>transition:</code>, accepting <code>duration</code>, <code>delay</code>, and <code>easing</code>. This means you can use completely different easing curves for entrance and exit -- perhaps a bouncy <code>backOut</code> easing on enter for playfulness, and a quick linear fade on exit for efficiency. The modal pattern demonstrated in this lesson (fly-in with <code>backOut</code>, fade-out in 200ms) is a professional-grade animation pattern used in production applications because it creates an entrance that draws attention and an exit that doesn't slow the user down.</p>
	<p class="next"><a href="/module-6/6-13-animate-flip">Next lesson: 6.13 animate:flip</a></p>
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
		position: relative;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.open-btn {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-base);
	}
	.backdrop {
		position: fixed;
		inset: 0;
		background: oklch(0% 0 0 / 0.5);
		z-index: 10;
	}
	.modal {
		position: fixed;
		inset-block-start: 50%;
		inset-inline-start: 50%;
		transform: translate(-50%, -50%);
		z-index: 11;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		padding: var(--space-lg);
		max-inline-size: 90vw;
		inline-size: 380px;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.modal h2 {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--color-text);
	}
	.modal p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-base);
		line-height: 1.6;
	}
	.close-btn {
		align-self: flex-end;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
