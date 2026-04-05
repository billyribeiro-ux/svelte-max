<script lang="ts">
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
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Prefer pointer events over touch events — they unify input types.</li>
		<li><code>setPointerCapture</code> ensures you keep getting events during a drag.</li>
		<li>Minimum 44px touch targets for WCAG compliance.</li>
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
