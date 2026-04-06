<script lang="ts">
	type A11yPattern = {
		id: number;
		name: string;
		description: string;
		example: string;
		reference: string;
	};

	let announcement = $state('');

	function announce(message: string) {
		announcement = '';
		setTimeout(() => {
			announcement = message;
		}, 50);
	}

	let modalOpen = $state(false);
	let modalRef = $state<HTMLDivElement | null>(null);

	function openModal() {
		modalOpen = true;
		setTimeout(() => {
			modalRef?.querySelector<HTMLElement>('[data-focus]')?.focus();
		}, 0);
	}

	function closeModal() {
		modalOpen = false;
	}

	function handleModalKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
			return;
		}
		if (event.key === 'Tab' && modalRef) {
			const focusable = modalRef.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	const patterns: A11yPattern[] = [
		{ id: 1, name: 'Semantic HTML', description: 'Use native HTML elements (button, nav, main, article) instead of div/span with roles.', example: '<button> instead of <div role="button">', reference: 'Module 1 — HTML fundamentals' },
		{ id: 2, name: 'Alt text on images', description: 'Every img needs an alt attribute. Decorative images use alt="".', example: '<img alt="User avatar" />', reference: 'Module 12.2 — Image optimization' },
		{ id: 3, name: 'ARIA labels', description: 'Use aria-label or aria-labelledby for elements without visible text labels.', example: '<button aria-label="Close menu">X</button>', reference: 'Module 8 — Form components' },
		{ id: 4, name: 'Focus management', description: 'Move focus to new content (modals, notifications). Trap focus in modals.', example: 'Focus trap on dialog open', reference: 'Module 12.8 — This lesson (modal demo)' },
		{ id: 5, name: 'Keyboard navigation', description: 'All interactive elements must be reachable and operable via keyboard.', example: 'Tab order, Enter/Space activation', reference: 'Module 6 — Event handling' },
		{ id: 6, name: 'aria-live regions', description: 'Use aria-live="polite" for dynamic content updates that screen readers should announce.', example: '<div aria-live="polite">{status}</div>', reference: 'Module 12.8 — This lesson (live region demo)' },
		{ id: 7, name: 'Skip-to-content link', description: 'A hidden link at the top of the page lets keyboard users skip past navigation.', example: '<a href="#main" class="skip-link">Skip to content</a>', reference: 'Module 4 — Layout components' },
		{ id: 8, name: 'Color contrast', description: 'Text must have at least 4.5:1 contrast ratio against its background (WCAG AA).', example: 'Dark text on light backgrounds', reference: 'Module 3 — CSS design tokens' },
		{ id: 9, name: 'Form labels', description: 'Every input needs an associated label element or aria-label.', example: '<label for="email">Email</label><input id="email" />', reference: 'Module 8 — Form components' },
		{ id: 10, name: 'Error announcements', description: 'Form validation errors should be announced to screen readers and associated with inputs.', example: 'aria-describedby pointing to error message', reference: 'Module 9 — Form validation' }
	];
</script>

<section class="page">
	<h1>12.8 — Accessibility</h1>

	<p class="concept">
		<strong>Accessibility (a11y)</strong> ensures your app is usable by everyone, including people
		who rely on screen readers, keyboard navigation, or other assistive technologies. Svelte
		provides compile-time a11y warnings, but building truly accessible apps requires understanding
		ARIA roles, focus management, and live regions.
	</p>

	<h3>Top 10 A11y Patterns</h3>
	<div class="build">
		<div class="checklist">
			{#each patterns as pattern}
				<div class="check-item">
					<div class="check-header">
						<span class="check-num">{pattern.id}</span>
						<strong>{pattern.name}</strong>
					</div>
					<p class="check-desc">{pattern.description}</p>
					<code>{pattern.example}</code>
					<p class="check-ref">Reference: {pattern.reference}</p>
				</div>
			{/each}
		</div>
	</div>

	<h3>Demo: aria-live Region</h3>
	<div class="build">
		<p class="concept">
			Click the button to update the live region. Screen readers will announce the change
			without the user needing to navigate to it.
		</p>
		<button class="demo-btn" onclick={() => announce('Item added to cart successfully!')}>
			Add to Cart
		</button>
		<button class="demo-btn secondary" onclick={() => announce('3 items selected')}>
			Select Items
		</button>
		<div class="live-region" aria-live="polite" role="status">
			{announcement || 'No announcements yet.'}
		</div>
	</div>

	<h3>Demo: Focus Trap (Modal)</h3>
	<div class="build">
		<p class="concept">
			Open the modal below. Focus is trapped inside — Tab cycles through the modal's
			focusable elements. Press Escape to close.
		</p>
		<button class="demo-btn" onclick={openModal}>Open Modal</button>

		{#if modalOpen}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="modal-backdrop" onkeydown={handleModalKeydown}>
				<div class="modal" bind:this={modalRef} role="dialog" aria-modal="true" aria-label="Example modal dialog">
					<h4>Modal Title</h4>
					<p>Focus is trapped in this modal. Tab between the input and buttons.</p>
					<input data-focus type="text" placeholder="Type something..." aria-label="Example input" />
					<div class="modal-actions">
						<button class="demo-btn" onclick={closeModal}>Confirm</button>
						<button class="demo-btn secondary" onclick={closeModal}>Cancel</button>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<h3>Skip-to-Content Link</h3>
	<div class="build">
		<pre>{`<!-- Place at the very top of your layout -->
<a href="#main" class="skip-link">
  Skip to main content
</a>

<nav>... navigation ...</nav>

<main id="main">
  ... page content ...
</main>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 100;
    padding: 8px;
    background: white;
  }
  .skip-link:focus {
    top: 0;
  }
</style>`}</pre>
	</div>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.checklist {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.check-item {
		padding: var(--space-sm) var(--space-md);
		border-left: 3px solid var(--color-primary);
		background: var(--color-surface-2);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}
	.check-header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-bottom: var(--space-xs);
	}
	.check-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		font-size: 0.75em;
		font-weight: 700;
		flex-shrink: 0;
	}
	.check-desc {
		margin: 0 0 var(--space-xs);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
	}
	.check-ref {
		margin: var(--space-xs) 0 0;
		font-size: 0.8em;
		color: var(--color-text-muted);
		font-style: italic;
	}
	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		align-self: flex-start;
	}
	.demo-btn.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.live-region {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		border-left: 3px solid #2d8a4e;
	}
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}
	.modal {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		max-width: 400px;
		width: 90%;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.modal h4 { margin: 0; }
	.modal p { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }
	.modal input {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.modal-actions {
		display: flex;
		gap: var(--space-sm);
		justify-content: flex-end;
	}
</style>
