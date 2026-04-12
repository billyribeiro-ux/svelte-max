<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type A11yPattern = {\n" +
		"		id: number;\n" +
		"		name: string;\n" +
		"		description: string;\n" +
		"		example: string;\n" +
		"		reference: string;\n" +
		"	};\n" +
		"\n" +
		"	let announcement = $state('');\n" +
		"\n" +
		"	function announce(message: string) {\n" +
		"		announcement = '';\n" +
		"		setTimeout(() =\u003e {\n" +
		"			announcement = message;\n" +
		"		}, 50);\n" +
		"	}\n" +
		"\n" +
		"	let modalOpen = $state(false);\n" +
		"	let modalRef = $state\u003cHTMLDivElement | null\u003e(null);\n" +
		"\n" +
		"	function openModal() {\n" +
		"		modalOpen = true;\n" +
		"		setTimeout(() =\u003e {\n" +
		"			modalRef?.querySelector\u003cHTMLElement\u003e('[data-focus]')?.focus();\n" +
		"		}, 0);\n" +
		"	}\n" +
		"\n" +
		"	function closeModal() {\n" +
		"		modalOpen = false;\n" +
		"	}\n" +
		"\n" +
		"	function handleModalKeydown(event: KeyboardEvent) {\n" +
		"		if (event.key === 'Escape') {\n" +
		"			closeModal();\n" +
		"			return;\n" +
		"		}\n" +
		"		if (event.key === 'Tab' && modalRef) {\n" +
		"			const focusable = modalRef.querySelectorAll\u003cHTMLElement\u003e(\n" +
		"				'button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])'\n" +
		"			);\n" +
		"			const first = focusable[0];\n" +
		"			const last = focusable[focusable.length - 1];\n" +
		"			if (event.shiftKey && document.activeElement === first) {\n" +
		"				event.preventDefault();\n" +
		"				last.focus();\n" +
		"			} else if (!event.shiftKey && document.activeElement === last) {\n" +
		"				event.preventDefault();\n" +
		"				first.focus();\n" +
		"			}\n" +
		"		}\n" +
		"	}\n" +
		"\n" +
		"	const patterns: A11yPattern[] = [\n" +
		"		{ id: 1, name: 'Semantic HTML', description: 'Use native HTML elements (button, nav, main, article) instead of div/span with roles.', example: '\u003cbutton\u003e instead of \u003cdiv role=\"button\"\u003e', reference: 'Module 1 — HTML fundamentals' },\n" +
		"		{ id: 2, name: 'Alt text on images', description: 'Every img needs an alt attribute. Decorative images use alt=\"\".', example: '\u003cimg alt=\"User avatar\" /\u003e', reference: 'Module 12.2 — Image optimization' },\n" +
		"		{ id: 3, name: 'ARIA labels', description: 'Use aria-label or aria-labelledby for elements without visible text labels.', example: '\u003cbutton aria-label=\"Close menu\"\u003eX\u003c/button\u003e', reference: 'Module 8 — Form components' },\n" +
		"		{ id: 4, name: 'Focus management', description: 'Move focus to new content (modals, notifications). Trap focus in modals.', example: 'Focus trap on dialog open', reference: 'Module 12.8 — This lesson (modal demo)' },\n" +
		"		{ id: 5, name: 'Keyboard navigation', description: 'All interactive elements must be reachable and operable via keyboard.', example: 'Tab order, Enter/Space activation', reference: 'Module 6 — Event handling' },\n" +
		"		{ id: 6, name: 'aria-live regions', description: 'Use aria-live=\"polite\" for dynamic content updates that screen readers should announce.', example: '\u003cdiv aria-live=\"polite\"\u003e{status}\u003c/div\u003e', reference: 'Module 12.8 — This lesson (live region demo)' },\n" +
		"		{ id: 7, name: 'Skip-to-content link', description: 'A hidden link at the top of the page lets keyboard users skip past navigation.', example: '\u003ca href=\"#main\" class=\"skip-link\"\u003eSkip to content\u003c/a\u003e', reference: 'Module 4 — Layout components' },\n" +
		"		{ id: 8, name: 'Color contrast', description: 'Text must have at least 4.5:1 contrast ratio against its background (WCAG AA).', example: 'Dark text on light backgrounds', reference: 'Module 3 — CSS design tokens' },\n" +
		"		{ id: 9, name: 'Form labels', description: 'Every input needs an associated label element or aria-label.', example: '\u003clabel for=\"email\"\u003eEmail\u003c/label\u003e\u003cinput id=\"email\" /\u003e', reference: 'Module 8 — Form components' },\n" +
		"		{ id: 10, name: 'Error announcements', description: 'Form validation errors should be announced to screen readers and associated with inputs.', example: 'aria-describedby pointing to error message', reference: 'Module 9 — Form validation' }\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.8 — Accessibility\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eAccessibility (a11y)\u003c/strong\u003e ensures your app is usable by everyone, including people\n" +
		"		who rely on screen readers, keyboard navigation, or other assistive technologies. Svelte\n" +
		"		provides compile-time a11y warnings, but building truly accessible apps requires understanding\n" +
		"		ARIA roles, focus management, and live regions.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eTop 10 A11y Patterns\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"checklist\"\u003e\n" +
		"			{#each patterns as pattern}\n" +
		"				\u003cdiv class=\"check-item\"\u003e\n" +
		"					\u003cdiv class=\"check-header\"\u003e\n" +
		"						\u003cspan class=\"check-num\"\u003e{pattern.id}\u003c/span\u003e\n" +
		"						\u003cstrong\u003e{pattern.name}\u003c/strong\u003e\n" +
		"					\u003c/div\u003e\n" +
		"					\u003cp class=\"check-desc\"\u003e{pattern.description}\u003c/p\u003e\n" +
		"					\u003ccode\u003e{pattern.example}\u003c/code\u003e\n" +
		"					\u003cp class=\"check-ref\"\u003eReference: {pattern.reference}\u003c/p\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo: aria-live Region\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Click the button to update the live region. Screen readers will announce the change\n" +
		"			without the user needing to navigate to it.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cbutton class=\"demo-btn\" onclick={() =\u003e announce('Item added to cart successfully!')}\u003e\n" +
		"			Add to Cart\n" +
		"		\u003c/button\u003e\n" +
		"		\u003cbutton class=\"demo-btn secondary\" onclick={() =\u003e announce('3 items selected')}\u003e\n" +
		"			Select Items\n" +
		"		\u003c/button\u003e\n" +
		"		\u003cdiv class=\"live-region\" aria-live=\"polite\" role=\"status\"\u003e\n" +
		"			{announcement || 'No announcements yet.'}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo: Focus Trap (Modal)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Open the modal below. Focus is trapped inside — Tab cycles through the modal's\n" +
		"			focusable elements. Press Escape to close.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cbutton class=\"demo-btn\" onclick={openModal}\u003eOpen Modal\u003c/button\u003e\n" +
		"\n" +
		"		{#if modalOpen}\n" +
		"			\u003c!-- svelte-ignore a11y_no_static_element_interactions --\u003e\n" +
		"			\u003cdiv class=\"modal-backdrop\" onkeydown={handleModalKeydown}\u003e\n" +
		"				\u003cdiv class=\"modal\" bind:this={modalRef} role=\"dialog\" aria-modal=\"true\" aria-label=\"Example modal dialog\"\u003e\n" +
		"					\u003ch4\u003eModal Title\u003c/h4\u003e\n" +
		"					\u003cp\u003eFocus is trapped in this modal. Tab between the input and buttons.\u003c/p\u003e\n" +
		"					\u003cinput data-focus type=\"text\" placeholder=\"Type something...\" aria-label=\"Example input\" /\u003e\n" +
		"					\u003cdiv class=\"modal-actions\"\u003e\n" +
		"						\u003cbutton class=\"demo-btn\" onclick={closeModal}\u003eConfirm\u003c/button\u003e\n" +
		"						\u003cbutton class=\"demo-btn secondary\" onclick={closeModal}\u003eCancel\u003c/button\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSkip-to-Content Link\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e{`\u003c!-- Place at the very top of your layout --\u003e\n" +
		"\u003ca href=\"#main\" class=\"skip-link\"\u003e\n" +
		"  Skip to main content\n" +
		"\u003c/a\u003e\n" +
		"\n" +
		"\u003cnav\u003e... navigation ...\u003c/nav\u003e\n" +
		"\n" +
		"\u003cmain id=\"main\"\u003e\n" +
		"  ... page content ...\n" +
		"\u003c/main\u003e";
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
    inset-block-start: -40px;
    inset-inline-start: 0;
    z-index: 100;
    padding: 8px;
    background: white;
  }
  .skip-link:focus {
    inset-block-start: 0;
  }
</style>`}</pre>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>aria-live="polite"</code> from a dynamic region and test with a screen reader.</strong> Content changes silently — the screen reader does not announce the update, so users who cannot see the screen miss the new information entirely.</li>
		<li><strong>Remove focus trapping from a modal and press Tab repeatedly.</strong> Focus escapes behind the modal to invisible page elements, creating a confusing experience where keyboard users interact with content they cannot see.</li>
		<li><strong>Replace a <code>&lt;button&gt;</code> with a <code>&lt;div onclick&gt;</code> and try pressing Enter on it.</strong> The click does not fire because <code>div</code> elements are not keyboard-focusable or activatable by default, breaking keyboard navigation.</li>
		<li><strong>Remove all <code>alt</code> attributes from images and run a Lighthouse accessibility audit.</strong> The score drops because screen readers announce images without alt text as "image" with no description, and Svelte's compile-time warnings flag the missing attributes.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>aria-live</code> regions are how you announce dynamic content changes to screen readers. Setting <code>aria-live="polite"</code> on a container means the screen reader will announce its new content after finishing its current task, while <code>"assertive"</code> interrupts immediately. This is essential for toast notifications, form validation messages, and real-time updates.</p>
	<p class="prose">Modal dialogs require focus trapping to prevent keyboard users from tabbing into invisible background content. The pattern uses <code>role="dialog"</code>, <code>aria-modal="true"</code>, Tab key cycling between the first and last focusable elements, and Escape to close. Without these, keyboard and screen reader users cannot reliably interact with modals.</p>
	<p class="prose">Svelte provides compile-time accessibility warnings for common issues like missing alt text, non-interactive elements with click handlers, and missing form labels. However, these warnings are a starting point, not a complete solution. Semantic HTML, ARIA attributes, keyboard navigation, colour contrast, and screen reader testing all require deliberate implementation and manual verification.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-9-vitest-unit-tests">12.9 — Vitest unit tests</a> — test your reactive stores and load functions.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	.checklist {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.check-item {
		padding: var(--space-sm) var(--space-md);
		border-inline-start: 3px solid var(--color-primary);
		background: var(--color-surface-2);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}
	.check-header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-block-end: var(--space-xs);
	}
	.check-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 24px;
		block-size: 24px;
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
		border-inline-start: 3px solid var(--color-success);
	}
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: oklch(0% 0 0 / 0.5);
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
		max-inline-size: 400px;
		inline-size: 90%;
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
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
