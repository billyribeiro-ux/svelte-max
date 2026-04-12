<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let hamburgerOpen = $state(false);
	let playing = $state(false);
	let isDark = $state(false);
	let arrowUp = $state(false);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let hamburgerOpen = $state(false);\n" +
		"  let playing = $state(false);\n" +
		"  let isDark = $state(false);\n" +
		"  let arrowUp = $state(false);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.3 — Animated Icon Systems\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Icon animation adds life to UI. Build icons\n" +
		"    from simple SVG paths. Animate with CSS transitions on transform and\n" +
		"    opacity. Toggle between states with $state boolean. Update aria-label\n" +
		"    on toggle for accessibility.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"icon-grid\"\u003e\n" +
		"      \u003c!-- Hamburger / X --\u003e\n" +
		"      \u003cdiv class=\"icon-card\"\u003e\n" +
		"        \u003cbutton type=\"button\" class=\"icon-btn\"\n" +
		"          aria-label={hamburgerOpen ? 'Close menu' : 'Open menu'}\n" +
		"          onclick={() =\u003e (hamburgerOpen = !hamburgerOpen)}\u003e\n" +
		"          \u003csvg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n" +
		"            stroke-width=\"2\" stroke-linecap=\"round\"\u003e\n" +
		"            \u003cline x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"\n" +
		"              class=\"ham-line ham-top\" class:open={hamburgerOpen} /\u003e\n" +
		"            \u003cline x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"\n" +
		"              class=\"ham-line ham-mid\" class:open={hamburgerOpen} /\u003e\n" +
		"            \u003cline x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"\n" +
		"              class=\"ham-line ham-bot\" class:open={hamburgerOpen} /\u003e\n" +
		"          \u003c/svg\u003e\n" +
		"        \u003c/button\u003e\n" +
		"        \u003cspan class=\"icon-label\"\u003eHamburger / X\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- Play / Pause --\u003e\n" +
		"      \u003cdiv class=\"icon-card\"\u003e\n" +
		"        \u003cbutton type=\"button\" class=\"icon-btn\"\n" +
		"          aria-label={playing ? 'Pause' : 'Play'}\n" +
		"          onclick={() =\u003e (playing = !playing)}\u003e\n" +
		"          \u003csvg viewBox=\"0 0 24 24\" fill=\"currentColor\"\u003e\n" +
		"            {#if playing}\n" +
		"              \u003crect x=\"6\" y=\"5\" width=\"4\" height=\"14\" rx=\"1\" /\u003e\n" +
		"              \u003crect x=\"14\" y=\"5\" width=\"4\" height=\"14\" rx=\"1\" /\u003e\n" +
		"            {:else}\n" +
		"              \u003cpolygon points=\"6,4 20,12 6,20\" /\u003e\n" +
		"            {/if}\n" +
		"          \u003c/svg\u003e\n" +
		"        \u003c/button\u003e\n" +
		"        \u003cspan class=\"icon-label\"\u003ePlay / Pause\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- Sun / Moon --\u003e\n" +
		"      \u003cdiv class=\"icon-card\"\u003e\n" +
		"        \u003cbutton type=\"button\" class=\"icon-btn\"\n" +
		"          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}\n" +
		"          onclick={() =\u003e (isDark = !isDark)}\u003e\n" +
		"          \u003csvg viewBox=\"0 0 24 24\" class=\"sun-moon\" class:dark={isDark}\u003e\n" +
		"            \u003ccircle cx=\"12\" cy=\"12\" r=\"5\" class=\"sun-core\" /\u003e\n" +
		"            \u003cg class=\"rays\"\u003e\n" +
		"              {#each [0, 45, 90, 135, 180, 225, 270, 315] as angle}\n" +
		"                \u003cline x1=\"12\" y1=\"1\" x2=\"12\" y2=\"4\"\n" +
		"                  transform=\"rotate({angle}, 12, 12)\" /\u003e\n" +
		"              {/each}\n" +
		"            \u003c/g\u003e\n" +
		"            \u003ccircle cx=\"16\" cy=\"8\" r=\"5\" class=\"moon-mask\" /\u003e\n" +
		"          \u003c/svg\u003e\n" +
		"        \u003c/button\u003e\n" +
		"        \u003cspan class=\"icon-label\"\u003eSun / Moon\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- Arrow down / up --\u003e\n" +
		"      \u003cdiv class=\"icon-card\"\u003e\n" +
		"        \u003cbutton type=\"button\" class=\"icon-btn\"\n" +
		"          aria-label={arrowUp ? 'Arrow up' : 'Arrow down'}\n" +
		"          onclick={() =\u003e (arrowUp = !arrowUp)}\u003e\n" +
		"          \u003csvg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n" +
		"            stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n" +
		"            class=\"arrow-icon\" class:flipped={arrowUp}\u003e\n" +
		"            \u003cline x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\" /\u003e\n" +
		"            \u003cpolyline points=\"19 12 12 19 5 12\" /\u003e\n" +
		"          \u003c/svg\u003e\n" +
		"        \u003c/button\u003e\n" +
		"        \u003cspan class=\"icon-label\"\u003eArrow Down / Up\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.3 — Animated Icon Systems</h1>
	<p class="concept">
		<strong>Concept.</strong> Icon animation adds life to UI — a hamburger menu morphing to an X,
		a play button becoming a pause. Build icons from simple SVG paths (not icon fonts). Animate
		with CSS transitions on <code>transform</code> and <code>opacity</code>. Toggle between
		states with a <code>$state&lt;boolean&gt;</code>. Hover animations: scale + color shift on
		<code>mouseenter</code>. Always update <code>aria-label</code> on toggle for accessibility.
	</p>

	<div class="build">
		<div class="icon-grid">
			<!-- Hamburger ↔ X -->
			<div class="icon-card">
				<button
					type="button"
					class="icon-btn"
					aria-label={hamburgerOpen ? 'Close menu' : 'Open menu'}
					onclick={() => (hamburgerOpen = !hamburgerOpen)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
						<line x1="3" y1="6" x2="21" y2="6" class="ham-line ham-top" class:open={hamburgerOpen} />
						<line x1="3" y1="12" x2="21" y2="12" class="ham-line ham-mid" class:open={hamburgerOpen} />
						<line x1="3" y1="18" x2="21" y2="18" class="ham-line ham-bot" class:open={hamburgerOpen} />
					</svg>
				</button>
				<span class="icon-label">Hamburger &harr; X</span>
			</div>

			<!-- Play ↔ Pause -->
			<div class="icon-card">
				<button
					type="button"
					class="icon-btn"
					aria-label={playing ? 'Pause' : 'Play'}
					onclick={() => (playing = !playing)}
				>
					<svg viewBox="0 0 24 24" fill="currentColor">
						{#if playing}
							<rect x="6" y="5" width="4" height="14" rx="1" />
							<rect x="14" y="5" width="4" height="14" rx="1" />
						{:else}
							<polygon points="6,4 20,12 6,20" />
						{/if}
					</svg>
				</button>
				<span class="icon-label">Play &harr; Pause</span>
			</div>

			<!-- Sun ↔ Moon -->
			<div class="icon-card">
				<button
					type="button"
					class="icon-btn"
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					onclick={() => (isDark = !isDark)}
				>
					<svg viewBox="0 0 24 24" class="sun-moon" class:dark={isDark}>
						<circle cx="12" cy="12" r="5" class="sun-core" />
						<g class="rays">
							{#each [0, 45, 90, 135, 180, 225, 270, 315] as angle}
								<line
									x1="12" y1="1" x2="12" y2="4"
									transform="rotate({angle}, 12, 12)"
								/>
							{/each}
						</g>
						<circle cx="16" cy="8" r="5" class="moon-mask" />
					</svg>
				</button>
				<span class="icon-label">Sun &harr; Moon</span>
			</div>

			<!-- Arrow Down ↔ Arrow Up -->
			<div class="icon-card">
				<button
					type="button"
					class="icon-btn"
					aria-label={arrowUp ? 'Arrow up' : 'Arrow down'}
					onclick={() => (arrowUp = !arrowUp)}
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="arrow-icon"
						class:flipped={arrowUp}
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<polyline points="19 12 12 19 5 12" />
					</svg>
				</button>
				<span class="icon-label">Arrow Down &harr; Up</span>
			</div>
		</div>

		<p class="chart-note">
			Click each icon to toggle its state. All animations use CSS transitions on SVG properties.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Icon animation systems rely on the interplay between CSS transitions and Svelte's <code>class:</code> directive. Break individual pieces to understand what each layer contributes.</p>
	<ol class="experiments">
		<li><strong>Remove <code>transform-origin: center</code> from the <code>.ham-line</code> CSS rule.</strong> The hamburger lines rotate around the wrong pivot point, creating a disjointed animation instead of a clean X shape. This proves that transform-origin is critical for rotation-based icon animations.</li>
		<li><strong>Delete the <code>aria-label</code> binding on the hamburger button.</strong> Screen readers will announce a generic "button" with no context about what clicking it does. Toggle the hamburger and check devtools to see the accessibility gap firsthand.</li>
		<li><strong>Change the sun/moon <code>transition</code> duration from <code>400ms</code> to <code>0ms</code>.</strong> The icon snaps instantly between states with no smooth interpolation. This highlights how transition duration creates the perception of a fluid, intentional UI.</li>
		<li><strong>Replace <code>class:open={hamburgerOpen}</code> with a static <code>class="open"</code>.</strong> The hamburger is permanently stuck in the X state because the class no longer responds to state changes. This demonstrates how Svelte's reactive class directive drives the entire animation system.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Icon animations use CSS transitions on SVG properties like <code>transform</code> and <code>opacity</code>, toggled by <code>$state</code> booleans through Svelte's <code>class:</code> directive. The hamburger-to-X pattern rotates the top and bottom lines 45 degrees in opposite directions while fading the middle line to zero opacity. The sun-to-moon pattern scales rays to zero, shifts the core circle, and reveals a mask circle to create the crescent shape.</p>
	<p class="prose">Accessibility is a first-class concern in icon systems. The <code>aria-label</code> attribute must update dynamically so that screen readers announce the current action ("Close menu") rather than describing the icon's visual shape. Without this binding, the icon is semantically meaningless to assistive technology users.</p>
	<p class="prose">Using <code>class:</code> directives with CSS transitions is both simpler and more performant than JavaScript-driven animation for binary state toggles. The browser's compositor handles the interpolation on the GPU, keeping the main thread free for other work.</p>
	<p class="next">Next up: SI.4 morphs between entirely different SVG shapes by interpolating coordinate arrays.</p>
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

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-lg);
	}

	.icon-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 64px;
		block-size: 64px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-text);
		transition: background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}
	.icon-btn:hover {
		background: var(--color-surface);
		transform: scale(1.08);
	}

	.icon-btn svg {
		inline-size: 32px;
		block-size: 32px;
	}

	.icon-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: center;
	}

	/* ── Hamburger → X ── */
	.ham-line {
		transform-origin: center;
		transition: transform 300ms ease, opacity 200ms ease;
	}
	.ham-top.open {
		transform: translateY(6px) rotate(45deg);
	}
	.ham-mid.open {
		opacity: 0;
	}
	.ham-bot.open {
		transform: translateY(-6px) rotate(-45deg);
	}

	/* ── Arrow flip ── */
	.arrow-icon {
		transition: transform 300ms ease;
	}
	.arrow-icon.flipped {
		transform: rotate(180deg);
	}

	/* ── Sun / Moon ── */
	.sun-moon {
		overflow: visible;
	}
	.sun-core {
		fill: oklch(75% 0.18 85);
		transition: transform 400ms ease, cx 400ms ease;
	}
	.sun-moon.dark .sun-core {
		fill: oklch(85% 0.10 250);
		transform: scale(1.2);
	}
	.rays line {
		stroke: oklch(75% 0.18 85);
		stroke-inline-size: 2;
		stroke-linecap: round;
		transition: opacity 300ms ease, transform 300ms ease;
	}
	.sun-moon.dark .rays line {
		opacity: 0;
		transform: scale(0);
		transform-origin: center;
	}
	.moon-mask {
		fill: var(--color-surface-1);
		transition: transform 400ms ease, opacity 300ms ease;
		transform: translateX(10px);
		opacity: 0;
	}
	.sun-moon.dark .moon-mask {
		transform: translateX(0);
		opacity: 1;
	}

	.chart-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
		.icon-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
