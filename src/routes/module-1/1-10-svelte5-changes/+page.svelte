<script lang="ts">
	const rows: { svelte4: string; svelte5: string; notes: string }[] = [
		{
			svelte4: 'export let count',
			svelte5: 'let { count } = $props()',
			notes: 'Props are destructured from the $props() rune. Defaults use JS defaults: { count = 0 } = $props().'
		},
		{
			svelte4: '$: doubled = count * 2',
			svelte5: 'const doubled = $derived(count * 2)',
			notes: 'Single-expression reactivity. For multi-statement, use $derived.by(() => { ... }).'
		},
		{
			svelte4: '$: { console.log(count) }',
			svelte5: '$effect(() => { console.log(count) })',
			notes: 'Side effects. Runs after DOM update. Use $effect.pre for before-update timing.'
		},
		{
			svelte4: 'on:click={handler}',
			svelte5: 'onclick={handler}',
			notes: 'Standard DOM event attributes replace the on: directive. Works with all events.'
		},
		{
			svelte4: '<slot />\n<slot name="header" />',
			svelte5: '{@render children()}\n{@render header()}',
			notes: 'Parent passes {#snippet children()} or uses implicit children. Named slots become named snippets.'
		},
		{
			svelte4: 'createEventDispatcher()',
			svelte5: 'Callback props',
			notes: 'Pass an onclick or onchange prop (a plain function) instead of dispatch("click"). Simpler, type-safe.'
		},
		{
			svelte4: 'import { writable } from "svelte/store"',
			svelte5: '.svelte.ts files with $state',
			notes: 'Create a .svelte.ts module, export let count = $state(0). Importers get reactive state without subscribe.'
		}
	];
</script>

<section class="page">
	<h1>1.10 — Svelte 5 changes</h1>

	<p class="concept">
		<strong>Reference.</strong> Svelte 5 replaced most of Svelte 4's special syntax with
		<em>runes</em> — explicit, composable primitives that work inside and outside components.
		This page maps every major Svelte 4 pattern to its Svelte 5 equivalent.
	</p>

	<div class="build">
		<div class="table-wrap">
			<table>
				<thead>
					<tr>
						<th>Svelte 4</th>
						<th>Svelte 5</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as row}
						<tr>
							<td><code>{row.svelte4}</code></td>
							<td><code>{row.svelte5}</code></td>
							<td>{row.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$props()</code> replaces <code>export let</code> for receiving props.</li>
		<li><code>$derived</code> and <code>$derived.by</code> replace <code>$:</code> reactive statements.</li>
		<li><code>$effect</code> replaces <code>{'$: { ... }'}</code> reactive blocks for side effects.</li>
		<li>Native event attributes (<code>onclick</code>) replace the <code>on:</code> directive.</li>
		<li><code>{'{#snippet}'}</code> and <code>{'{@render}'}</code> replace <code>&lt;slot&gt;</code>.</li>
		<li>Callback props replace <code>createEventDispatcher</code>.</li>
		<li><code>.svelte.ts</code> rune files replace stores for shared reactive state.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72rem;
		margin-inline: auto;
		color: var(--color-text);
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
	.table-wrap {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	th {
		text-align: start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-block-end: 2px solid var(--color-border);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--color-text-muted);
		white-space: nowrap;
	}
	td {
		padding: var(--space-sm) var(--space-md);
		border-block-end: 1px solid var(--color-border);
		vertical-align: top;
		line-height: 1.5;
	}
	td:last-child {
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		max-inline-size: 28ch;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
		white-space: pre-wrap;
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
	}
</style>
