<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';

	let name = $state('');
	let email = $state('');
</script>

<section class="page">
	<h1>3.5 — $bindable()</h1>
	<p class="concept">
		<strong>Concept.</strong> Props flow down by default. When a child needs to update state that
		lives in the parent, mark the prop with <code>$bindable()</code>. The parent then writes
		<code>&lt;TextField bind:value={'{myState}'} /&gt;</code>, and any mutation inside
		<code>TextField</code> propagates back up. This replaces the dispatch-event-and-handle-it
		dance from Svelte 4. Use <code>$bindable</code> sparingly — one-way data flow is still
		clearer when the child doesn't own the state.
	</p>

	<div class="build">
		<TextField label="Your name" bind:value={name} placeholder="Ada Rivera" />
		<TextField label="Email" type="email" bind:value={email} placeholder="ada@example.com" />

		<div class="preview">
			<p>Hello, <strong>{name || 'stranger'}</strong>!</p>
			<p class="muted">
				We'll reach you at <strong>{email || 'nowhere yet'}</strong>.
			</p>
		</div>
	</div>

	<h3>When to bind vs when to callback</h3>
	<div class="comparison">
		<p>
			<strong>Bind (<code>$bindable</code>):</strong> When the child IS the editor of the value
			(TextField, Select, Slider). The child owns the UI for editing; the parent owns the source of truth.
		</p>
		<p>
			<strong>Callback prop:</strong> When the child NOTIFIES the parent of an event
			(Button click, item selection). The child doesn't own the value — it reports what happened.
		</p>

		<table class="compare-table">
			<thead>
				<tr>
					<th>Pattern</th>
					<th>When</th>
					<th>Example</th>
					<th>Module ref</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>$bindable</code></td>
					<td>Child edits the value</td>
					<td>TextField, Slider, Select</td>
					<td>3.5</td>
				</tr>
				<tr>
					<td>Callback prop</td>
					<td>Child reports an event</td>
					<td>Button onclick, list onselect</td>
					<td>3.3</td>
				</tr>
			</tbody>
		</table>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$bindable()</code> lets a child write back to a parent-owned piece of state.</li>
		<li>The parent opts in with <code>bind:value={'{state}'}</code> at the call site.</li>
		<li>No dispatchers, no <code>on:change</code> + setter pairs — it just flows.</li>
		<li>Prefer one-way props when the child is purely presentational.</li>
	</ul>
</section>

<style>
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

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview p {
		margin: 0;
		font-size: var(--text-base);
	}

	.preview .muted {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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

	.comparison {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.comparison p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	.compare-table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		margin-block-start: var(--space-sm);
	}

	.compare-table th,
	.compare-table td {
		padding: var(--space-sm) var(--space-md);
		text-align: start;
		border-block-end: 1px solid var(--color-border);
	}

	.compare-table th {
		font-weight: 600;
		color: var(--color-text);
		background: var(--color-surface-2);
	}

	.compare-table td {
		color: var(--color-text-muted);
	}

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
