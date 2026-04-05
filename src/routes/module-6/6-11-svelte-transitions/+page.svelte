<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Notification {
		id: number;
		kind: 'info' | 'success';
		text: string;
	}

	let notifications = $state<Notification[]>([]);

	function add(kind: 'info' | 'success'): void {
		const id = Date.now() + Math.random();
		const text = kind === 'info' ? 'Heads up: something happened.' : 'Success! All good.';
		notifications.push({ id, kind, text });
		setTimeout(() => {
			notifications = notifications.filter((n) => n.id !== id);
		}, 3000);
	}

	function dismiss(id: number): void {
		notifications = notifications.filter((n) => n.id !== id);
	}
</script>

<section class="page">
	<h1>6.11 — Svelte transition directive</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte ships built-in transition functions: <code>fade</code>,
		<code>fly</code>, <code>slide</code>, <code>scale</code>, <code>blur</code>, <code>draw</code>.
		They plug into the <code>transition:</code> directive on any element toggled via
		<code>&lbrace;#if&rbrace;</code> or keyed <code>&lbrace;#each&rbrace;</code>. A
		<code>transition:</code> is bidirectional — the same animation enters and exits. Parameters:
		<code>&lbrace; duration, delay, easing &rbrace;</code>. Easings come from
		<code>svelte/easing</code>.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={() => add('info')}>Add info</button>
			<button type="button" onclick={() => add('success')}>Add success</button>
		</div>

		<div class="stack">
			{#each notifications as n (n.id)}
				<div
					class="toast {n.kind}"
					transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
				>
					<span>{n.text}</span>
					<button type="button" class="close" onclick={() => dismiss(n.id)}>✕</button>
				</div>
			{/each}
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Import transitions from <code>svelte/transition</code>.</li>
		<li><code>transition:</code> runs the same animation in and out.</li>
		<li>Keyed each blocks are required for per-item enter/exit.</li>
		<li>Parameters tune duration, delay, and easing.</li>
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
	.controls {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.controls button {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-height: 60px;
	}
	.toast {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-2);
		color: var(--color-text);
		box-shadow: var(--shadow-sm);
		font-size: var(--text-sm);
	}
	.toast.info {
		border-color: var(--color-brand);
	}
	.toast.success {
		border-color: var(--color-success);
	}
	.close {
		background: transparent;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-base);
		padding: 0 var(--space-xs);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
