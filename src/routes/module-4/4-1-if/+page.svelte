<script lang="ts">
	let password = $state('');

	const length = $derived(password.length);
	const hasUpper = $derived(/[A-Z]/.test(password));
	const hasDigit = $derived(/\d/.test(password));
	const hasSymbol = $derived(/[^a-zA-Z0-9]/.test(password));
	const score = $derived(
		[length >= 8, hasUpper, hasDigit, hasSymbol].filter(Boolean).length
	);
</script>

<section class="page">
	<h1>4.1 — {'{#if}'} and boolean logic</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#if condition}'}</code> conditionally renders a block when its expression is
		truthy. JavaScript treats <code>''</code>, <code>0</code>, <code>null</code>,
		<code>undefined</code>, <code>NaN</code>, and <code>false</code> as falsy; everything else is truthy.
		Use strict equality (<code>===</code>) to avoid surprising type coercion, and combine
		conditions with <code>&&</code>, <code>||</code>, and <code>!</code>.
	</p>

	<div class="build">
		<label class="field">
			<span>Password</span>
			<input type="password" bind:value={password} placeholder="Type a password…" />
		</label>

		{#if score === 0}
			<p class="status weak">Too short — start typing.</p>
		{/if}
		{#if score === 1}
			<p class="status weak">Weak</p>
		{/if}
		{#if score === 2}
			<p class="status ok">Okay</p>
		{/if}
		{#if score === 3}
			<p class="status good">Good</p>
		{/if}
		{#if score === 4}
			<p class="status strong">Strong</p>
		{/if}

		<ul class="checks">
			<li>
				{#if length >= 8}<span class="tick">✓</span>{/if}
				{#if !(length >= 8)}<span class="cross">•</span>{/if}
				At least 8 characters
			</li>
			<li>
				{#if hasUpper}<span class="tick">✓</span>{/if}
				{#if !hasUpper}<span class="cross">•</span>{/if}
				An uppercase letter
			</li>
			<li>
				{#if hasDigit}<span class="tick">✓</span>{/if}
				{#if !hasDigit}<span class="cross">•</span>{/if}
				A digit
			</li>
			<li>
				{#if hasSymbol}<span class="tick">✓</span>{/if}
				{#if !hasSymbol}<span class="cross">•</span>{/if}
				A symbol
			</li>
		</ul>

		<p class="note">
			Notice the repetition — five separate <code>{'{#if}'}</code> blocks. Lesson 4.2 shows how
			<code>{':else if'}</code> collapses this.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'{#if expr}'}</code> renders when <code>expr</code> is truthy.</li>
		<li>Falsy values: <code>''</code>, <code>0</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>false</code>.</li>
		<li>Prefer <code>===</code> and <code>!==</code> for comparisons.</li>
		<li>Boolean operators <code>&&</code>, <code>||</code>, <code>!</code> combine conditions.</li>
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
	.concept strong { color: var(--color-text); }

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

	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.field input {
		font-family: inherit;
		font-size: var(--text-base);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.field input:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	.status {
		font-size: var(--text-sm);
		font-weight: 600;
		margin: 0;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		display: inline-block;
		width: fit-content;
	}
	.weak { color: var(--color-error); background: var(--color-surface-2); }
	.ok { color: var(--color-warning); background: var(--color-surface-2); }
	.good { color: var(--color-brand); background: var(--color-surface-2); }
	.strong { color: var(--color-success); background: var(--color-surface-2); }

	.checks {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.tick { color: var(--color-success); font-weight: 700; margin-inline-end: var(--space-xs); }
	.cross { color: var(--color-text-muted); margin-inline-end: var(--space-xs); }

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
