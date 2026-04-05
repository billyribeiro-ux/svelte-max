<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';

	interface Photo {
		id: number;
		title: string;
		color: string;
	}

	const photos: readonly Photo[] = [
		{ id: 1, title: 'Dawn ridge', color: 'oklch(72% 0.14 40)' },
		{ id: 2, title: 'Deep harbor', color: 'oklch(55% 0.12 240)' },
		{ id: 3, title: 'Moss grove', color: 'oklch(68% 0.13 150)' },
		{ id: 4, title: 'Dust road', color: 'oklch(60% 0.10 70)' }
	];

	const activeId = $derived((page.state as { photoId?: number } | undefined)?.photoId);
	const activePhoto = $derived(photos.find((p) => p.id === activeId));

	function open(photo: Photo) {
		pushState('', { photoId: photo.id });
	}

	function close() {
		history.back();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && activeId !== undefined) {
			close();
		}
	}
</script>

<svelte:window onkeydown={onKey} />

<section class="page">
	<h1>8.11 — Shallow routing</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{"pushState('', state)"}</code> and <code>replaceState()</code> from
		<code>$app/navigation</code> update <code>page.state</code> without navigating to a new URL.
		The browser records the history entry, so back/forward still work. This is ideal for modals,
		side panels, and drawers — the URL stays stable while transient UI state participates in
		history.
	</p>

	<div class="build">
		<div class="gallery">
			{#each photos as photo (photo.id)}
				<button
					type="button"
					class="thumb"
					style="background: {photo.color}"
					onclick={() => open(photo)}
				>
					<span>{photo.title}</span>
				</button>
			{/each}
		</div>

		<p class="hint">
			Click a thumbnail to open. Press <code>Esc</code> or use browser back to close.
		</p>
	</div>

	{#if activePhoto}
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-label={activePhoto.title}
		>
			<div class="modal-card" style="background: {activePhoto.color}">
				<h2>{activePhoto.title}</h2>
				<p>Photo #{activePhoto.id}</p>
				<button type="button" onclick={close}>Close</button>
			</div>
		</div>
	{/if}

	<h3>Note on types</h3>
	<p class="note">
		For full TypeScript support, declare <code>interface PageState</code> in
		<code>src/app.d.ts</code>. In this lesson we narrow inline with
		<code>{'(page.state as { photoId?: number } | undefined)?.photoId'}</code>.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li><code>pushState</code> updates history without navigating.</li>
		<li><code>page.state</code> is reactive — derive UI from it.</li>
		<li>Back / forward work for free because it's a real history entry.</li>
		<li>Declare <code>PageState</code> in <code>app.d.ts</code> for type safety.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
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
	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-sm);
	}
	.thumb {
		aspect-ratio: 4 / 3;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		color: var(--color-surface);
		font: inherit;
		font-weight: 600;
		display: flex;
		align-items: end;
		justify-content: start;
		padding: var(--space-sm);
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.thumb:hover {
		transform: scale(1.02);
	}
	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.modal {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, black 70%, transparent);
		display: grid;
		place-items: center;
		padding: var(--space-lg);
		z-index: 10;
	}
	.modal-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-xl);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lg);
		color: var(--color-surface);
		min-inline-size: min(90vw, 30rem);
	}
	.modal-card h2 {
		margin: 0;
	}
	.modal-card button {
		font: inherit;
		background: var(--color-surface);
		color: var(--color-text);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		align-self: start;
	}
	.note {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
		margin: 0;
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.gallery {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
