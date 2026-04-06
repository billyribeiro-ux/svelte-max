<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let submitted = $state<boolean>(false);
	let toggled = $state<boolean>(false);
	let liked = $state<boolean>(false);
	let copied = $state<boolean>(false);
	let deleted = $state<boolean>(false);
	let refreshed = $state<boolean>(false);
	let expanded = $state<boolean>(false);
	let bookmarked = $state<boolean>(false);

	function trigger(setter: (v: boolean) => void, getter: () => boolean): void {
		if (getter()) return;
		setter(true);
		setTimeout(() => setter(false), 1500);
	}

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  let submitted = $state\u003cboolean\u003e(false);\n" +
		"  let toggled = $state\u003cboolean\u003e(false);\n" +
		"  let liked = $state\u003cboolean\u003e(false);\n" +
		"  let copied = $state\u003cboolean\u003e(false);\n" +
		"  let deleted = $state\u003cboolean\u003e(false);\n" +
		"  let refreshed = $state\u003cboolean\u003e(false);\n" +
		"  let expanded = $state\u003cboolean\u003e(false);\n" +
		"  let bookmarked = $state\u003cboolean\u003e(false);\n" +
		"\n" +
		"  function trigger(setter: (v: boolean) =\u003e void, getter: () =\u003e boolean): void {\n" +
		"    if (getter()) return;\n" +
		"    setter(true);\n" +
		"    setTimeout(() =\u003e setter(false), 1500);\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.7 — Micro-Interaction Patterns\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"micro-grid\"\u003e\n" +
		"      \u003c!-- 8 micro-interaction buttons --\u003e\n" +
		"      \u003c!-- Each uses $state\u003cboolean\u003e + setTimeout reset --\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.7 — Micro-Interaction Patterns</h1>
	<p class="concept">
		<strong>Concept.</strong> Micro-interactions are tiny animated responses to user actions
		— they make UI feel alive without being distracting. Each follows the pattern:
		<strong>trigger</strong> (click) &rarr; <strong>animation</strong> (CSS transition/keyframe)
		&rarr; <strong>feedback</strong> (visual confirmation). Build these from SVG paths + CSS
		transitions. Each button uses <code>$state&lt;boolean&gt;</code> to toggle and
		<code>setTimeout</code> to auto-reset after 1.5 seconds.
	</p>

	<div class="build">
		<div class="micro-grid">
			<!-- 1. Submit — checkmark draws on click -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={submitted ? 'Submitted' : 'Submit'}
					onclick={() => trigger((v) => (submitted = v), () => submitted)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						{#if submitted}
							<path d="M5 12 L10 17 L19 7" class="check-draw" />
						{:else}
							<path d="M5 12 L12 12 M12 7 L12 17" />
						{/if}
					</svg>
				</button>
				<span class="micro-label">Submit</span>
			</div>

			<!-- 2. Toggle — switch thumb slides -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={toggled ? 'Toggle off' : 'Toggle on'}
					onclick={() => (toggled = !toggled)}
				>
					<svg viewBox="0 0 36 20" fill="none">
						<rect x="1" y="1" width="34" height="18" rx="9" fill={toggled ? 'oklch(65% 0.22 150)' : 'oklch(70% 0.03 270)'} class="track-fill" />
						<circle cx={toggled ? 26 : 10} cy="10" r="7" fill="white" class="thumb" />
					</svg>
				</button>
				<span class="micro-label">Toggle</span>
			</div>

			<!-- 3. Like — heart fills + scales -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={liked ? 'Unlike' : 'Like'}
					onclick={() => trigger((v) => (liked = v), () => liked)}
				>
					<svg viewBox="0 0 24 24" class="heart-icon" class:liked stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 14 12 21 12 21Z"
							fill={liked ? 'oklch(60% 0.25 15)' : 'none'}
							stroke={liked ? 'oklch(60% 0.25 15)' : 'currentColor'}
						/>
					</svg>
				</button>
				<span class="micro-label">Like</span>
			</div>

			<!-- 4. Copy — clipboard to checkmark -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={copied ? 'Copied' : 'Copy'}
					onclick={() => trigger((v) => (copied = v), () => copied)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						{#if copied}
							<path d="M5 12 L10 17 L19 7" class="check-draw" style="stroke: oklch(65% 0.22 150);" />
						{:else}
							<rect x="9" y="9" width="11" height="11" rx="2" />
							<path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
						{/if}
					</svg>
				</button>
				<span class="micro-label">Copy</span>
			</div>

			<!-- 5. Delete — trash shakes then fades -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={deleted ? 'Deleted' : 'Delete'}
					onclick={() => trigger((v) => (deleted = v), () => deleted)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class:shake={deleted} class:fading={deleted}>
						<path d="M3 6h18" />
						<path d="M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2" />
						<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
						<line x1="10" y1="11" x2="10" y2="17" />
						<line x1="14" y1="11" x2="14" y2="17" />
					</svg>
				</button>
				<span class="micro-label">Delete</span>
			</div>

			<!-- 6. Refresh — arrow rotates 360 -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label="Refresh"
					onclick={() => trigger((v) => (refreshed = v), () => refreshed)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
						class:rotate-once={refreshed}>
						<path d="M1 4v6h6" />
						<path d="M23 20v-6h-6" />
						<path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
					</svg>
				</button>
				<span class="micro-label">Refresh</span>
			</div>

			<!-- 7. Expand — chevron rotates 180 -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={expanded ? 'Collapse' : 'Expand'}
					onclick={() => (expanded = !expanded)}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
						class="chevron-icon" class:rotated={expanded}>
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</button>
				<span class="micro-label">Expand</span>
			</div>

			<!-- 8. Bookmark — ribbon fills from bottom -->
			<div class="micro-card">
				<button
					type="button"
					class="micro-btn"
					aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
					onclick={() => trigger((v) => (bookmarked = v), () => bookmarked)}
				>
					<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
							fill={bookmarked ? 'oklch(65% 0.22 270)' : 'none'}
							stroke={bookmarked ? 'oklch(65% 0.22 270)' : 'currentColor'}
							class="bookmark-path"
							class:filled={bookmarked}
						/>
					</svg>
				</button>
				<span class="micro-label">Bookmark</span>
			</div>
		</div>

		<p class="chart-note">
			Click each button to trigger its micro-interaction. All interactions auto-reset after 1.5 seconds (except Toggle and Expand which are persistent toggles).
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Micro-interactions follow the <strong>trigger &rarr; animation &rarr; feedback</strong> pattern — a boolean state drives each one.</li>
		<li>Path drawing (<code>stroke-dasharray</code>/<code>stroke-dashoffset</code>) creates the checkmark "draw-on" effect from SI.2.</li>
		<li>CSS <code>@keyframes</code> handle shake, rotate, and scale animations without JavaScript animation libraries.</li>
		<li><code>setTimeout</code> auto-resets each interaction, so the user can trigger it again without manual clearing.</li>
		<li>Persistent toggles (Toggle, Expand) use direct boolean flip; one-shot interactions (Submit, Copy) use the trigger-then-reset pattern.</li>
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

	.micro-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}
	.micro-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}
	.micro-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-text);
		transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
	}
	.micro-btn:hover {
		background: var(--color-surface);
		transform: scale(1.08);
	}
	.micro-btn svg {
		width: 32px;
		height: 32px;
	}
	.micro-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: center;
		font-weight: 600;
	}

	/* ── Checkmark draw ── */
	.check-draw {
		stroke-dasharray: 30;
		stroke-dashoffset: 30;
		animation: draw-check 400ms ease forwards;
	}
	@keyframes draw-check {
		to { stroke-dashoffset: 0; }
	}

	/* ── Toggle switch ── */
	.track-fill {
		transition: fill 300ms ease;
	}
	.thumb {
		transition: cx 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* ── Heart like ── */
	.heart-icon {
		transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.heart-icon.liked {
		transform: scale(1.2);
	}
	.heart-icon path {
		transition: fill 200ms ease, stroke 200ms ease;
	}

	/* ── Shake + fade ── */
	.shake {
		animation: shake-anim 400ms ease;
	}
	.fading {
		animation: shake-anim 400ms ease, fade-out 600ms ease 400ms forwards;
	}
	@keyframes shake-anim {
		0%, 100% { transform: translateX(0); }
		20% { transform: translateX(-3px); }
		40% { transform: translateX(3px); }
		60% { transform: translateX(-2px); }
		80% { transform: translateX(2px); }
	}
	@keyframes fade-out {
		to { opacity: 0.3; }
	}

	/* ── Rotate once ── */
	.rotate-once {
		animation: rotate-full 600ms ease;
	}
	@keyframes rotate-full {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* ── Chevron expand ── */
	.chevron-icon {
		transition: transform 300ms ease;
	}
	.chevron-icon.rotated {
		transform: rotate(180deg);
	}

	/* ── Bookmark fill ── */
	.bookmark-path {
		transition: fill 300ms ease, stroke 300ms ease;
	}
	.bookmark-path.filled {
		animation: bookmark-pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes bookmark-pop {
		0% { transform: scale(1); }
		50% { transform: scale(1.15); }
		100% { transform: scale(1); }
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
		.micro-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
