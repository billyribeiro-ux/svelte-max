<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let open = $state(false);
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

	<h3>What you learned</h3>
	<ul>
		<li><code>transition:</code> is bidirectional, <code>in:</code>/<code>out:</code> are not.</li>
		<li>Mix and match functions (fly in, fade out) for expressive UX.</li>
		<li>Both directives accept the same parameter objects.</li>
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
		position: relative;
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
		background: rgba(0, 0, 0, 0.5);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
