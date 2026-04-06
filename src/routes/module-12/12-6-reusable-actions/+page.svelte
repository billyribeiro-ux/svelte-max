<script lang="ts">
	import type { Action } from 'svelte/action';

	// --- use:clickOutside ---
	let dropdownOpen = $state(false);

	const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
		function handleClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				callback();
			}
		}
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};

	// --- use:tooltip ---
	const tooltip: Action<HTMLElement, string> = (node, text) => {
		let tip: HTMLDivElement | null = null;
		let currentText = text;

		function show() {
			tip = document.createElement('div');
			tip.textContent = currentText;
			tip.style.cssText = `
				position: fixed;
				background: #333; color: white; padding: 4px 8px;
				border-radius: 4px; font-size: 12px; z-index: 1000;
				pointer-events: none; white-space: nowrap;
			`;
			document.body.appendChild(tip);
			const rect = node.getBoundingClientRect();
			tip.style.left = `${rect.left + rect.width / 2 - tip.offsetWidth / 2}px`;
			tip.style.top = `${rect.top - tip.offsetHeight - 6}px`;
		}

		function hide() {
			tip?.remove();
			tip = null;
		}

		node.addEventListener('mouseenter', show);
		node.addEventListener('mouseleave', hide);
		node.addEventListener('focus', show);
		node.addEventListener('blur', hide);

		return {
			update(newText: string) {
				currentText = newText;
			},
			destroy() {
				hide();
				node.removeEventListener('mouseenter', show);
				node.removeEventListener('mouseleave', hide);
				node.removeEventListener('focus', show);
				node.removeEventListener('blur', hide);
			}
		};
	};

	// --- use:intersect ---
	let visibilityLog = $state<string[]>([]);

	const intersect: Action<HTMLElement, (visible: boolean) => void> = (node, callback) => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					callback(entry.isIntersecting);
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	};

	function handleVisibility(visible: boolean) {
		const timestamp = new Date().toLocaleTimeString();
		visibilityLog = [...visibilityLog.slice(-4), `${timestamp}: ${visible ? 'Visible' : 'Hidden'}`];
	}
</script>

<section class="page">
	<h1>12.6 — Reusable Actions &amp; Attachments</h1>

	<p class="concept">
		Svelte <strong>actions</strong> (<code>use:actionName</code>) attach reusable DOM behavior to
		any element. They receive the node and optional parameters, and return lifecycle hooks
		(<code>update</code> and <code>destroy</code>). In Svelte 5.29+, <strong><code>{'{@attach}'}</code></strong>
		is the modern replacement that works with the component lifecycle rather than just DOM nodes.
	</p>

	<h3>Demo 1: use:clickOutside</h3>
	<div class="build">
		<p class="concept">
			Click the dropdown to open it, then click outside to close it.
			The <code>clickOutside</code> action listens for clicks on <code>document</code>
			and calls the callback if the click target is outside the node.
		</p>
		<div class="dropdown-wrapper" use:clickOutside={() => { dropdownOpen = false; }}>
			<button class="demo-btn" onclick={() => { dropdownOpen = !dropdownOpen; }}>
				{dropdownOpen ? 'Close' : 'Open'} Dropdown
			</button>
			{#if dropdownOpen}
				<div class="dropdown-menu">
					<div class="dropdown-item">Profile</div>
					<div class="dropdown-item">Settings</div>
					<div class="dropdown-item">Logout</div>
				</div>
			{/if}
		</div>
	</div>

	<h3>Demo 2: use:tooltip</h3>
	<div class="build">
		<p class="concept">
			Hover over (or focus) the buttons below to see the tooltip. The action creates a
			positioned element and removes it on mouse leave.
		</p>
		<div class="tooltip-row">
			<button class="demo-btn" use:tooltip={'Save your work'}>Save</button>
			<button class="demo-btn secondary" use:tooltip={'Undo last action'}>Undo</button>
			<button class="demo-btn secondary" use:tooltip={'Open settings panel'}>Settings</button>
		</div>
	</div>

	<h3>Demo 3: use:intersect</h3>
	<div class="build">
		<p class="concept">
			Scroll the box below so the green target enters and leaves the viewport.
			The <code>intersect</code> action wraps <code>IntersectionObserver</code> and calls
			back with the visibility state.
		</p>
		<div class="scroll-container">
			<div class="scroll-spacer">Scroll down to see the target...</div>
			<div class="intersect-target" use:intersect={handleVisibility}>
				Observed Element
			</div>
			<div class="scroll-spacer">Scroll up to hide it...</div>
		</div>
		<div class="log">
			<strong>Visibility log:</strong>
			{#each visibilityLog as entry}
				<p class="log-entry">{entry}</p>
			{/each}
			{#if visibilityLog.length === 0}
				<p class="log-entry">Scroll the box above to generate events.</p>
			{/if}
		</div>
	</div>

	<h3>Modern Alternative: {'{@attach}'}</h3>
	<div class="build">
		<p class="concept">
			Svelte 5.29+ introduces <code>{'{@attach}'}</code> as an evolution of actions.
			Attachments are functions that receive the element and return a cleanup function.
			They integrate with Svelte's ownership model and work with components, not just DOM elements.
		</p>
		<pre>{`// Attachment (Svelte 5.29+)
function myAttach(element: HTMLElement) {
  // setup
  return () => {
    // cleanup
  };
}

// Usage in template:
// {@attach myAttach}
// <div {@attach myAttach}>...</div>`}</pre>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Actions (<code>use:name</code>) attach reusable DOM behavior and return <code>update</code>/<code>destroy</code> lifecycle hooks.</li>
		<li>Common action patterns include <code>clickOutside</code>, <code>tooltip</code>, and <code>IntersectionObserver</code> wrappers.</li>
		<li>Svelte 5.29+ introduces <code>{'{@attach}'}</code> as a modern alternative that integrates with the component lifecycle.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
	}
	.demo-btn.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.dropdown-wrapper {
		position: relative;
		align-self: flex-start;
	}
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: var(--space-xs);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		min-width: 160px;
		z-index: 10;
	}
	.dropdown-item {
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	.dropdown-item:hover {
		background: var(--color-surface-1);
	}
	.tooltip-row {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.scroll-container {
		height: 200px;
		overflow-y: auto;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
	}
	.scroll-spacer {
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.intersect-target {
		margin: var(--space-md);
		padding: var(--space-lg);
		background: #2d8a4e;
		color: white;
		border-radius: var(--radius-md);
		text-align: center;
		font-weight: 600;
	}
	.log {
		background: var(--color-surface-2);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
	}
	.log strong { display: block; margin-bottom: var(--space-xs); }
	.log-entry {
		margin: 0;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
</style>
