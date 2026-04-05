<script lang="ts">
	type Tool = 'pencil' | 'eraser' | 'rect' | 'text';

	let tool = $state<Tool>('pencil');

	function selectPencil(): void {
		tool = 'pencil';
	}
	function selectEraser(): void {
		tool = 'eraser';
	}
	function selectRect(): void {
		tool = 'rect';
	}
	function selectText(): void {
		tool = 'text';
	}
</script>

<section class="page">
	<h1>5.2 — JS functions deeply</h1>
	<p class="concept">
		<strong>Concept.</strong> Function declarations hoist; arrow functions don't but preserve
		<code>this</code> lexically. In Svelte handlers neither matters practically — pick the shorter form.
		Typed parameters make intent clear, and functions-as-values means you pass them into
		<code>onclick</code> without invoking.
	</p>

	<div class="build">
		<div class="toolbar" role="toolbar" aria-label="Drawing tools">
			<button type="button" class:active={tool === 'pencil'} onclick={selectPencil}>Pencil</button>
			<button type="button" class:active={tool === 'eraser'} onclick={selectEraser}>Eraser</button>
			<button type="button" class:active={tool === 'rect'} onclick={selectRect}>Rect</button>
			<button type="button" class:active={tool === 'text'} onclick={selectText}>Text</button>
		</div>
		<p class="selected">
			Selected tool: <strong>{tool}</strong>
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Typed function parameters (e.g. <code>name: Tool</code>) catch typos at compile time.</li>
		<li>Pass functions by reference: <code>onclick={selectPencil}</code>, not with parentheses.</li>
		<li>Toggle classes with <code>class:active={'{'}tool === 'pencil'{'}'}</code>.</li>
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
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.toolbar button {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}
	.toolbar button:hover {
		border-color: var(--color-brand-dim);
	}
	.toolbar button.active {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}
	.selected {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.selected strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
