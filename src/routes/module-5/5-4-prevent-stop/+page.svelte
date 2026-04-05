<script lang="ts">
	let open = $state(false);
	let draft = $state('');
	let submitted = $state<string | null>(null);
	let panelEl: HTMLDivElement | null = $state(null);

	function toggle(e: MouseEvent): void {
		e.stopPropagation();
		open = !open;
	}

	function handleInput(e: Event): void {
		if (e.target instanceof HTMLInputElement) {
			draft = e.target.value;
		}
	}

	function handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		submitted = draft;
		draft = '';
	}

	$effect(() => {
		function onDocClick(e: MouseEvent): void {
			if (!open) return;
			if (panelEl && e.target instanceof Node && panelEl.contains(e.target)) {
				return;
			}
			open = false;
		}
		document.addEventListener('click', onDocClick);
		return () => document.removeEventListener('click', onDocClick);
	});
</script>

<section class="page">
	<h1>5.4 — preventDefault and stopPropagation</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>e.preventDefault()</code> cancels browser defaults (form
		submission, link navigation, spacebar scroll). <code>e.stopPropagation()</code> halts bubbling
		to ancestor handlers. Use them surgically — blindly calling both breaks accessibility and
		keyboard behavior.
	</p>

	<div class="build">
		<div class="dropdown">
			<button type="button" class="trigger" onclick={toggle}>
				{open ? 'Close' : 'Open'} menu
			</button>

			{#if open}
				<div class="panel" bind:this={panelEl}>
					<p class="panel-title">Quick action</p>
					<form onsubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Type something"
							value={draft}
							oninput={handleInput}
						/>
						<button type="submit">Save</button>
					</form>
					<p class="panel-hint">Click outside to close. Clicking inside does not close.</p>
				</div>
			{/if}
		</div>

		{#if submitted}
			<p class="result">Last submitted: <code>{submitted}</code></p>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>e.preventDefault()</code> stops the form from navigating on submit.</li>
		<li>
			<code>e.stopPropagation()</code> on the trigger button keeps the outside-click handler from
			closing the panel immediately after opening it.
		</li>
		<li>
			For the panel itself, the cleaner pattern is to check <code>panelEl.contains(e.target)</code>
			in the document handler — no click listener on the panel div needed.
		</li>
		<li>Attach global listeners via <code>$effect</code> and return a cleanup.</li>
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
	.dropdown {
		position: relative;
		align-self: flex-start;
	}
	.trigger {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
	}
	.panel {
		position: absolute;
		inset-block-start: calc(100% + var(--space-sm));
		inset-inline-start: 0;
		min-inline-size: 18rem;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 10;
	}
	.panel-title {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 600;
	}
	.panel form {
		display: flex;
		gap: var(--space-sm);
	}
	.panel input {
		flex: 1;
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
	}
	.panel button[type='submit'] {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
		cursor: pointer;
	}
	.panel-hint {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.result {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
