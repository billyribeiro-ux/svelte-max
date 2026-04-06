<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	let startX = $state(0);
	let deltaX = $state(0);
	let dragging = $state(false);
	let revealed = $state(false);

	const REVEAL_THRESHOLD = 100;

	function handleDown(e: PointerEvent): void {
		const target = e.currentTarget as HTMLElement;
		target.setPointerCapture(e.pointerId);
		dragging = true;
		startX = e.clientX;
		deltaX = revealed ? -140 : 0;
	}

	function handleMove(e: PointerEvent): void {
		if (!dragging) return;
		const raw = e.clientX - startX + (revealed ? -140 : 0);
		// Clamp: drag left only.
		deltaX = Math.min(0, Math.max(-200, raw));
	}

	function handleUp(e: PointerEvent): void {
		if (!dragging) return;
		const target = e.currentTarget as HTMLElement;
		target.releasePointerCapture(e.pointerId);
		dragging = false;
		if (prefersReducedMotion.current) {
			// Skip animated translateX — instantly reveal or hide
			if (deltaX < -REVEAL_THRESHOLD) {
				revealed = true;
			} else {
				revealed = false;
			}
			deltaX = revealed ? -140 : 0;
			return;
		}
		if (deltaX < -REVEAL_THRESHOLD) {
			revealed = true;
			deltaX = -140;
		} else {
			revealed = false;
			deltaX = 0;
		}
	}

	function reset(): void {
		revealed = false;
		deltaX = 0;
	}

	function deleteCard(): void {
		alert('Card deleted (demo).');
		reset();
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"\tlet startX = $state(0);\n" +
		"\tlet deltaX = $state(0);\n" +
		"\tlet dragging = $state(false);\n" +
		"\tlet revealed = $state(false);\n" +
		"\n" +
		"\tconst REVEAL_THRESHOLD = 100;\n" +
		"\n" +
		"\tfunction handleDown(e: PointerEvent): void {\n" +
		"\t\tconst target = e.currentTarget as HTMLElement;\n" +
		"\t\ttarget.setPointerCapture(e.pointerId);\n" +
		"\t\tdragging = true;\n" +
		"\t\tstartX = e.clientX;\n" +
		"\t\tdeltaX = revealed ? -140 : 0;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleMove(e: PointerEvent): void {\n" +
		"\t\tif (!dragging) return;\n" +
		"\t\tconst raw = e.clientX - startX + (revealed ? -140 : 0);\n" +
		"\t\t// Clamp: drag left only.\n" +
		"\t\tdeltaX = Math.min(0, Math.max(-200, raw));\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleUp(e: PointerEvent): void {\n" +
		"\t\tif (!dragging) return;\n" +
		"\t\tconst target = e.currentTarget as HTMLElement;\n" +
		"\t\ttarget.releasePointerCapture(e.pointerId);\n" +
		"\t\tdragging = false;\n" +
		"\t\tif (prefersReducedMotion.current) {\n" +
		"\t\t\t// Skip animated translateX — instantly reveal or hide\n" +
		"\t\t\tif (deltaX \u003c -REVEAL_THRESHOLD) {\n" +
		"\t\t\t\trevealed = true;\n" +
		"\t\t\t} else {\n" +
		"\t\t\t\trevealed = false;\n" +
		"\t\t\t}\n" +
		"\t\t\tdeltaX = revealed ? -140 : 0;\n" +
		"\t\t\treturn;\n" +
		"\t\t}\n" +
		"\t\tif (deltaX \u003c -REVEAL_THRESHOLD) {\n" +
		"\t\t\trevealed = true;\n" +
		"\t\t\tdeltaX = -140;\n" +
		"\t\t} else {\n" +
		"\t\t\trevealed = false;\n" +
		"\t\t\tdeltaX = 0;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tfunction reset(): void {\n" +
		"\t\trevealed = false;\n" +
		"\t\tdeltaX = 0;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction deleteCard(): void {\n" +
		"\t\talert('Card deleted (demo).');\n" +
		"\t\treset();\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.11 — Touch and pointer\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Touch events (\u003ccode\u003eontouchstart\u003c/code\u003e) are mobile-only. Pointer events\n" +
		"\t\t(\u003ccode\u003eonpointerdown\u003c/code\u003e, \u003ccode\u003eonpointermove\u003c/code\u003e, \u003ccode\u003eonpointerup\u003c/code\u003e) unify mouse, touch,\n" +
		"\t\tand stylus — prefer pointer events. \u003ccode\u003esetPointerCapture\u003c/code\u003e keeps receiving events even if the\n" +
		"\t\tfinger leaves the element. \u003ccode\u003e@media (hover: hover)\u003c/code\u003e detects hover-capable devices. WCAG\n" +
		"\t\tmandates 44px minimum touch targets.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eDrag the card to the left to reveal a hidden action.\u003c/p\u003e\n" +
		"\t\t\u003cdiv class=\"swipe\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"actions\" aria-hidden={!revealed}\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"delete\" onclick={deleteCard}\u003eDelete\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv\n" +
		"\t\t\t\tclass=\"card\"\n" +
		"\t\t\t\trole=\"button\"\n" +
		"\t\t\t\ttabindex=\"0\"\n" +
		"\t\t\t\tstyle:transform=\"translateX({deltaX}px)\"\n" +
		"\t\t\t\tstyle:transition={dragging ? 'none' : 'transform var(--dur-base) var(--ease-out)'}\n" +
		"\t\t\t\tonpointerdown={handleDown}\n" +
		"\t\t\t\tonpointermove={handleMove}\n" +
		"\t\t\t\tonpointerup={handleUp}\n" +
		"\t\t\t\tonpointercancel={handleUp}\n" +
		"\t\t\t\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"card-inner\"\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eSwipe me left\u003c/strong\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"sub\"\u003edeltaX: {deltaX.toFixed(0)}px\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"btn\" onclick={reset}\u003eReset\u003c/button\u003e\n" +
		"\t\t\t\u003cspan class=\"state\"\u003erevealed: \u003ccode\u003e{revealed}\u003c/code\u003e\u003c/span\u003e\n" +
		"\t\t\t\u003cspan class=\"pill\" class:active={prefersReducedMotion.current}\u003e\n" +
		"\t\t\t\tReduced motion: {prefersReducedMotion.current ? 'on' : 'off'}\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003ePrefer pointer events over touch events — they unify input types.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003esetPointerCapture\u003c/code\u003e ensures you keep getting events during a drag.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eMinimum 44px touch targets for WCAG compliance.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRespect \u003ccode\u003eprefersReducedMotion\u003c/code\u003e — skip animated transitions when the user prefers reduced motion.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>5.11 — Touch and pointer</h1>
	<p class="concept">
		<strong>Concept.</strong> Touch events (<code>ontouchstart</code>) are mobile-only. Pointer events
		(<code>onpointerdown</code>, <code>onpointermove</code>, <code>onpointerup</code>) unify mouse, touch,
		and stylus — prefer pointer events. <code>setPointerCapture</code> keeps receiving events even if the
		finger leaves the element. <code>@media (hover: hover)</code> detects hover-capable devices. WCAG
		mandates 44px minimum touch targets.
	</p>

	<div class="build">
		<p class="hint">Drag the card to the left to reveal a hidden action.</p>
		<div class="swipe">
			<div class="actions" aria-hidden={!revealed}>
				<button type="button" class="delete" onclick={deleteCard}>Delete</button>
			</div>
			<div
				class="card"
				role="button"
				tabindex="0"
				style:transform="translateX({deltaX}px)"
				style:transition={dragging ? 'none' : 'transform var(--dur-base) var(--ease-out)'}
				onpointerdown={handleDown}
				onpointermove={handleMove}
				onpointerup={handleUp}
				onpointercancel={handleUp}
			>
				<div class="card-inner">
					<strong>Swipe me left</strong>
					<span class="sub">deltaX: {deltaX.toFixed(0)}px</span>
				</div>
			</div>
		</div>

		<div class="controls">
			<button type="button" class="btn" onclick={reset}>Reset</button>
			<span class="state">revealed: <code>{revealed}</code></span>
			<span class="pill" class:active={prefersReducedMotion.current}>
				Reduced motion: {prefersReducedMotion.current ? 'on' : 'off'}
			</span>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Prefer pointer events over touch events — they unify input types.</li>
		<li><code>setPointerCapture</code> ensures you keep getting events during a drag.</li>
		<li>Minimum 44px touch targets for WCAG compliance.</li>
		<li>Respect <code>prefersReducedMotion</code> — skip animated transitions when the user prefers reduced motion.</li>
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
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.swipe {
		position: relative;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--color-surface-2);
		min-block-size: 80px;
		touch-action: pan-y;
	}
	.actions {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		display: flex;
		align-items: center;
		padding-inline: var(--space-md);
		background: var(--color-error);
	}
	.delete {
		background: transparent;
		border: 0;
		color: var(--color-surface);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
		min-inline-size: 80px;
	}
	.card {
		position: relative;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		min-block-size: 80px;
		user-select: none;
		touch-action: pan-y;
		cursor: grab;
	}
	.card:active {
		cursor: grabbing;
	}
	.card:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.card-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--color-text);
	}
	.sub {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}
	.btn {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
	}
	.state {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.pill {
		font-size: var(--text-xs);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
	}
	.pill.active {
		background: var(--color-warning);
		color: var(--color-surface);
		border-color: var(--color-warning);
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
