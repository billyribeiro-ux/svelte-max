<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const css = `.btn {
  transition:
    background var(--dur-fast) var(--ease-expressive),
    color var(--dur-fast) var(--ease-expressive),
    border-color var(--dur-fast) var(--ease-expressive),
    box-shadow var(--dur-fast) var(--ease-expressive),
    transform var(--dur-fast) var(--ease-expressive);
}`;

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"const css = `.btn {\n" +
		"  transition:\n" +
		"    background var(--dur-fast) var(--ease-expressive),\n" +
		"    color var(--dur-fast) var(--ease-expressive),\n" +
		"    border-color var(--dur-fast) var(--ease-expressive),\n" +
		"    box-shadow var(--dur-fast) var(--ease-expressive),\n" +
		"    transform var(--dur-fast) var(--ease-expressive);\n" +
		"}`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.10 — CSS transitions with motion tokens\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003etransition: property var(--dur-base) var(--ease-out)\u003c/code\u003e is the canonical pattern. Always\n" +
		"\t\tuse motion tokens for durations and easings so animations feel consistent across the app. You can\n" +
		"\t\ttransition multiple properties simultaneously by comma-separating. \u003ccode\u003etransition-delay\u003c/code\u003e\n" +
		"\t\tstaggers effects. \u003ccode\u003eprefers-reduced-motion\u003c/code\u003e must be respected — the course's\n" +
		"\t\t\u003ccode\u003eapp.css\u003c/code\u003e already zeroes out animations globally via a\n" +
		"\t\t\u003ccode\u003e@media (prefers-reduced-motion: reduce)\u003c/code\u003e rule.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton class=\"btn\" type=\"button\"\u003eHover, focus, click me\u003c/button\u003e\n" +
		"\t\t\u003cbutton class=\"btn\" type=\"button\" disabled\u003eDisabled state\u003c/button\u003e\n" +
		"\t\t\u003cpre\u003e{css}\u003c/pre\u003e\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tReduced motion is handled globally in \u003ccode\u003eapp.css\u003c/code\u003e — no per-component work needed.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eUse motion tokens (\u003ccode\u003e--dur-*\u003c/code\u003e, \u003ccode\u003e--ease-*\u003c/code\u003e) for every transition.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eComma-separate to transition multiple properties at once.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003etransition-delay\u003c/code\u003e staggers parts of an animation.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRespect \u003ccode\u003eprefers-reduced-motion\u003c/code\u003e globally in \u003ccode\u003eapp.css\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.10 — CSS transitions with motion tokens</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>transition: property var(--dur-base) var(--ease-out)</code> is the canonical pattern. Always
		use motion tokens for durations and easings so animations feel consistent across the app. You can
		transition multiple properties simultaneously by comma-separating. <code>transition-delay</code>
		staggers effects. <code>prefers-reduced-motion</code> must be respected — the course's
		<code>app.css</code> already zeroes out animations globally via a
		<code>@media (prefers-reduced-motion: reduce)</code> rule.
	</p>

	<div class="build">
		<button class="btn" type="button">Hover, focus, click me</button>
		<button class="btn" type="button" disabled>Disabled state</button>
		<pre>{css}</pre>
		<p class="note">
			Reduced motion is handled globally in <code>app.css</code> — no per-component work needed.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Explore the boundaries of CSS transitions to understand which properties can animate and what happens when they cannot.</p>
	<ol class="experiments">
		<li><strong>Transition <code>display:none</code> to <code>display:block</code></strong> — doesn't work (discrete property). Display is not interpolatable, so the transition has no intermediate frames to animate through.</li>
		<li><strong>Use <code>@starting-style</code></strong> — now it animates from <code>display:none</code>. The <code>@starting-style</code> at-rule defines initial values for elements entering the DOM, enabling transitions on first render.</li>
		<li><strong>Transition <code>all</code></strong> — works but animates things you didn't intend. Using <code>transition: all</code> catches every property change, including ones like <code>height</code> or <code>color</code> that you may not want to animate.</li>
		<li><strong>Use <code>interpolate-size: allow-keywords</code></strong> — transition height to/from <code>auto</code>. This modern CSS feature lets you smoothly animate between a fixed height and the <code>auto</code> keyword.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">CSS transitions are the foundation of motion in web interfaces, providing smooth interpolation between property values triggered by state changes like hover, focus, and active. The canonical pattern <code>transition: property var(--dur-fast) var(--ease-out)</code> uses motion tokens for duration and easing, ensuring that every animated interaction in the application feels cohesive. By comma-separating multiple properties, you can orchestrate complex multi-property transitions -- background, color, transform, and box-shadow can all animate simultaneously with different durations and delays if needed.</p>
	<p class="prose">Motion tokens are as essential to a design system as color or typography tokens. Centralizing durations (<code>--dur-instant</code> through <code>--dur-slower</code>) and easings (<code>--ease-out</code>, <code>--ease-expressive</code>) in your token layer means every developer on the team uses the same timing vocabulary. This prevents the common problem where one developer uses 200ms ease-out while another uses 350ms cubic-bezier, creating a jarring mix of fast and slow transitions across the interface. When the design team decides that all interactions should feel snappier, a single token change accomplishes it globally.</p>
	<p class="prose">Respecting <code>prefers-reduced-motion</code> is a non-negotiable accessibility requirement. Users who experience vestibular disorders, motion sickness, or seizure conditions enable this OS-level preference to indicate that they need reduced or eliminated animation. The course's <code>app.css</code> handles this globally with a media query that zeroes out transition durations and animation iterations, but developers must still ensure that essential state changes remain visible -- a button should still change color on hover, just without the animated interpolation. Modern CSS features like <code>@starting-style</code> and <code>interpolate-size: allow-keywords</code> are expanding what transitions can do, enabling animation of previously discrete properties and the long-requested height-to-auto transition.</p>
	<p class="next"><a href="/module-6/6-11-svelte-transitions">Next lesson: 6.11 Svelte transitions</a></p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.btn {
		font-size: var(--text-lg);
		padding: var(--space-md) var(--space-xl);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		transform: translateY(0);
		transition:
			background var(--dur-fast) var(--ease-expressive),
			color var(--dur-fast) var(--ease-expressive),
			border-color var(--dur-fast) var(--ease-expressive),
			box-shadow var(--dur-fast) var(--ease-expressive),
			transform var(--dur-fast) var(--ease-expressive);
	}
	.btn:hover {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}
	.btn:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.btn:active {
		transform: translateY(0);
		box-shadow: var(--shadow-sm);
	}
	.btn[disabled] {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border-color: var(--color-border);
		box-shadow: none;
		cursor: not-allowed;
		opacity: 0.6;
	}
	pre {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		margin: 0;
		color: var(--color-text);
	}
	.note {
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
