<script lang="ts">
	const css = `.btn {
  transition:
    background var(--dur-fast) var(--ease-expressive),
    color var(--dur-fast) var(--ease-expressive),
    border-color var(--dur-fast) var(--ease-expressive),
    box-shadow var(--dur-fast) var(--ease-expressive),
    transform var(--dur-fast) var(--ease-expressive);
}`;
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

	<h3>What you learned</h3>
	<ul>
		<li>Use motion tokens (<code>--dur-*</code>, <code>--ease-*</code>) for every transition.</li>
		<li>Comma-separate to transition multiple properties at once.</li>
		<li><code>transition-delay</code> staggers parts of an animation.</li>
		<li>Respect <code>prefers-reduced-motion</code> globally in <code>app.css</code>.</li>
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
