<script lang="ts">
	interface Option {
		id: number;
		label: string;
	}

	const options: Option[] = [
		{ id: 1, label: 'Svelte' },
		{ id: 2, label: 'SvelteKit' },
		{ id: 3, label: 'Vite' },
		{ id: 4, label: 'TypeScript' },
		{ id: 5, label: 'Tailwind' }
	];

	let open = $state(false);
	let selected = $state<number>(1);
	let activeIndex = $state(0);

	let triggerEl: HTMLButtonElement | null = $state(null);
	let listboxEl: HTMLUListElement | null = $state(null);

	function currentLabel(): string {
		return options.find((o) => o.id === selected)?.label ?? '';
	}

	function openList(): void {
		open = true;
		activeIndex = options.findIndex((o) => o.id === selected);
		if (activeIndex < 0) activeIndex = 0;
		queueMicrotask(() => listboxEl?.focus());
	}

	function closeList(restoreFocus: boolean): void {
		open = false;
		if (restoreFocus) triggerEl?.focus();
	}

	function selectAt(i: number): void {
		const opt = options[i];
		if (!opt) return;
		selected = opt.id;
		closeList(true);
	}

	function handleTriggerKey(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openList();
		}
	}

	function handleListKey(e: KeyboardEvent): void {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = (activeIndex + 1) % options.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = (activeIndex - 1 + options.length) % options.length;
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = 0;
				break;
			case 'End':
				e.preventDefault();
				activeIndex = options.length - 1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				selectAt(activeIndex);
				break;
			case 'Escape':
				e.preventDefault();
				closeList(true);
				break;
		}
	}
</script>

<section class="page">
	<h1>5.12 — Keyboard accessibility</h1>
	<p class="concept">
		<strong>Concept.</strong> Every interaction must be reachable without a mouse. <code>tabindex="0"</code>
		makes a non-semantic element focusable (but prefer native buttons). <code>aria-*</code> attributes
		describe intent (<code>aria-expanded</code>, <code>aria-selected</code>,
		<code>aria-controls</code>). Focus management: when a popup opens, move focus in; when it closes,
		return focus to the trigger. Conventions: Escape closes, arrows navigate, Enter activates.
	</p>

	<div class="build">
		<p class="hint">Keyboard: Enter/Space or ↓ opens. ↑↓ Home End navigate. Enter selects. Esc closes.</p>
		<div class="select-wrap">
			<span id="lbl" class="sr-label">Framework</span>
			<button
				bind:this={triggerEl}
				type="button"
				class="trigger"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-labelledby="lbl"
				aria-controls="lb-list"
				onclick={() => (open ? closeList(false) : openList())}
				onkeydown={handleTriggerKey}
			>
				<span>{currentLabel()}</span>
				<span class="chev" aria-hidden="true">▾</span>
			</button>

			{#if open}
				<ul
					bind:this={listboxEl}
					id="lb-list"
					class="listbox"
					role="listbox"
					tabindex="-1"
					aria-labelledby="lbl"
					aria-activedescendant={`lb-opt-${options[activeIndex].id}`}
					onkeydown={handleListKey}
				>
					{#each options as opt, i (opt.id)}
						<li
							id={`lb-opt-${opt.id}`}
							class="option"
							class:active={i === activeIndex}
							class:selected={opt.id === selected}
							role="option"
							aria-selected={opt.id === selected}
							onclick={() => selectAt(i)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									selectAt(i);
								}
							}}
							onmousemove={() => (activeIndex = i)}
						>
							<span>{opt.label}</span>
							{#if opt.id === selected}
								<span aria-hidden="true">✓</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<p class="state">Selected id: <code>{selected}</code></p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Implement <code>role="listbox"</code>/<code>role="option"</code> for custom selects.</li>
		<li>Handle Arrow, Home, End, Enter, Space, and Escape keys.</li>
		<li>Restore focus to the trigger when the popup closes.</li>
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
	.select-wrap {
		position: relative;
		max-inline-size: 18rem;
	}
	.sr-label {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.trigger {
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
	}
	.trigger:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.chev {
		color: var(--color-text-muted);
	}
	.listbox {
		position: absolute;
		inset-block-start: calc(100% + var(--space-xs));
		inset-inline: 0;
		list-style: none;
		padding: var(--space-xs);
		margin: 0;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.listbox:focus {
		outline: none;
	}
	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
		cursor: pointer;
		min-block-size: 40px;
	}
	.option.active {
		background: var(--color-brand-dim);
		outline: 2px solid var(--color-brand);
		outline-offset: -2px;
	}
	.option.selected {
		color: var(--color-brand);
		font-weight: 600;
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
