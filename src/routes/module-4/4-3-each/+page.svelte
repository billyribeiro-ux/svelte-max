<script lang="ts">
	interface Contact {
		id: number;
		name: string;
		role: string;
		email: string;
	}

	const contacts: readonly Contact[] = [
		{ id: 1, name: 'Ada Lovelace', role: 'Engineering Lead', email: 'ada@example.com' },
		{ id: 2, name: 'Grace Hopper', role: 'Compiler Architect', email: 'grace@example.com' },
		{ id: 3, name: 'Alan Turing', role: 'Research Fellow', email: 'alan@example.com' },
		{ id: 4, name: 'Katherine Johnson', role: 'Trajectory Analyst', email: 'katherine@example.com' },
		{ id: 5, name: 'Linus Torvalds', role: 'Kernel Maintainer', email: 'linus@example.com' }
	];
</script>

<section class="page">
	<h1>4.3 — {'{#each}'} with destructuring</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#each array as item}'}</code> iterates any array. You can destructure inline —
		<code>{'{#each contacts as { id, name, email }}'}</code> — to pull fields straight out. A
		second parameter gives you the index: <code>{'{#each items as item, i}'}</code>. The block
		body is a template that runs once per element.
	</p>

	<div class="build">
		<div class="grid">
			{#each contacts as { id, name, role, email }, i (id)}
				<article class="card">
					<span class="badge">{i + 1}</span>
					<h4>{name}</h4>
					<p class="role">{role}</p>
					<a class="mail" href="mailto:{email}">{email}</a>
				</article>
			{/each}
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'{#each array as item}'}</code> renders its body once per element.</li>
		<li>Inline destructuring: <code>{'{#each contacts as { name, email }}'}</code>.</li>
		<li>Second parameter is the zero-based index: <code>{'as item, i'}</code>.</li>
		<li>The body has full access to component scope — great for calling handlers.</li>
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

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.card {
		position: relative;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.badge {
		position: absolute;
		inset-block-start: var(--space-sm);
		inset-inline-end: var(--space-sm);
		background: var(--color-brand);
		color: var(--color-surface);
		font-size: var(--text-xs);
		font-weight: 700;
		inline-size: 1.5rem;
		block-size: 1.5rem;
		border-radius: var(--radius-full);
		display: grid;
		place-items: center;
	}

	.card h4 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.role {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.mail {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-brand);
		text-decoration: none;
	}
	.mail:hover { text-decoration: underline; }

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.grid { grid-template-columns: 1fr 1fr; }
	}
</style>
