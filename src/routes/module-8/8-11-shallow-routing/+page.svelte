<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { pushState } from '$app/navigation';\n" +
		"\timport { page } from '$app/state';\n" +
		"\n" +
		"\tinterface Photo {\n" +
		"\t\tid: number;\n" +
		"\t\ttitle: string;\n" +
		"\t\tcolor: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst photos: readonly Photo[] = [\n" +
		"\t\t{ id: 1, title: 'Dawn ridge', color: 'oklch(72% 0.14 40)' },\n" +
		"\t\t{ id: 2, title: 'Deep harbor', color: 'oklch(55% 0.12 240)' },\n" +
		"\t\t{ id: 3, title: 'Moss grove', color: 'oklch(68% 0.13 150)' },\n" +
		"\t\t{ id: 4, title: 'Dust road', color: 'oklch(60% 0.10 70)' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst activeId = $derived((page.state as { photoId?: number } | undefined)?.photoId);\n" +
		"\tconst activePhoto = $derived(photos.find((p) =\u003e p.id === activeId));\n" +
		"\n" +
		"\tfunction open(photo: Photo) {\n" +
		"\t\tpushState('', { photoId: photo.id });\n" +
		"\t}\n" +
		"\n" +
		"\tfunction close() {\n" +
		"\t\thistory.back();\n" +
		"\t}\n" +
		"\n" +
		"\tfunction onKey(e: KeyboardEvent) {\n" +
		"\t\tif (e.key === 'Escape' && activeId !== undefined) {\n" +
		"\t\t\tclose();\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:window onkeydown={onKey} /\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.11 — Shallow routing\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{\"pushState('', state)\"}\u003c/code\u003e and \u003ccode\u003ereplaceState()\u003c/code\u003e from\n" +
		"\t\t\u003ccode\u003e$app/navigation\u003c/code\u003e update \u003ccode\u003epage.state\u003c/code\u003e without navigating to a new URL.\n" +
		"\t\tThe browser records the history entry, so back/forward still work. This is ideal for modals,\n" +
		"\t\tside panels, and drawers — the URL stays stable while transient UI state participates in\n" +
		"\t\thistory.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"gallery\"\u003e\n" +
		"\t\t\t{#each photos as photo (photo.id)}\n" +
		"\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\tclass=\"thumb\"\n" +
		"\t\t\t\t\tstyle=\"background: {photo.color}\"\n" +
		"\t\t\t\t\tonclick={() =\u003e open(photo)}\n" +
		"\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003e{photo.title}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tClick a thumbnail to open. Press \u003ccode\u003eEsc\u003c/code\u003e or use browser back to close.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t{#if activePhoto}\n" +
		"\t\t\u003cdiv\n" +
		"\t\t\tclass=\"modal\"\n" +
		"\t\t\trole=\"dialog\"\n" +
		"\t\t\taria-modal=\"true\"\n" +
		"\t\t\taria-label={activePhoto.title}\n" +
		"\t\t\u003e\n" +
		"\t\t\t\u003cdiv class=\"modal-card\" style=\"background: {activePhoto.color}\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003e{activePhoto.title}\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cp\u003ePhoto #{activePhoto.id}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" onclick={close}\u003eClose\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t{/if}\n" +
		"\n" +
		"\t\u003ch3\u003eNote on types\u003c/h3\u003e\n" +
		"\t\u003cp class=\"note\"\u003e\n" +
		"\t\tFor full TypeScript support, declare \u003ccode\u003einterface PageState\u003c/code\u003e in\n" +
		"\t\t\u003ccode\u003esrc/app.d.ts\u003c/code\u003e. In this lesson we narrow inline with\n" +
		"\t\t\u003ccode\u003e{'(page.state as { photoId?: number } | undefined)?.photoId'}\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003epushState\u003c/code\u003e updates history without navigating.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003epage.state\u003c/code\u003e is reactive — derive UI from it.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eBack / forward work for free because it's a real history entry.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDeclare \u003ccode\u003ePageState\u003c/code\u003e in \u003ccode\u003eapp.d.ts\u003c/code\u003e for type safety.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
