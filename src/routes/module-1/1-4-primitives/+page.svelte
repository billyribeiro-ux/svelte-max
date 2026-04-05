<script lang="ts">
	const fullName: string = 'Ada Lovelace';
	const age: number = 36;
	const active: boolean = true;
</script>

<section class="page">
	<h1>1.4 — TypeScript primitives</h1>

	<p class="concept">
		TypeScript gives you three primitive types you will use constantly: <code>string</code>,
		<code>number</code>, and <code>boolean</code>. The value of typing them is not bureaucracy — it is
		that a mistake like adding a number to a string, or reading <code>.toUpperCase()</code> on something
		that might be
		<code>undefined</code>, is caught by the compiler <em>before</em> the browser ever sees it. Prefer
		<strong>inference</strong>
		where it is obvious (<code>const age = 36</code>) and explicit <strong>annotations</strong> where the
		shape matters (function parameters, empty arrays, exported constants). And prefer <code>const</code>
		by default — reach for <code>let</code> only when you truly must reassign.
	</p>

	<article class="stats-card">
		<h2>{fullName}</h2>
		<p class="age">Age: <strong>{age}</strong></p>
		<span class="pill" class:pill--active={active} class:pill--away={!active}>
			{active ? 'Active' : 'Away'}
		</span>
	</article>

	<h3>What you learned</h3>
	<ul>
		<li>The three primitives: <code>string</code>, <code>number</code>, <code>boolean</code>.</li>
		<li>Annotations are explicit; inference is implicit — use inference when it is obvious.</li>
		<li><code>const</code> by default, <code>let</code> only when reassignment is needed.</li>
		<li>TypeScript catches type mismatches at compile time, not in the browser.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		max-width: 60ch;
		line-height: 1.6;
	}

	.stats-card {
		background: var(--color-surface-2);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		margin-block: var(--space-xl);
		max-width: 24rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		align-items: flex-start;

		& h2 {
			margin: 0;
			color: var(--color-text);
			font-size: var(--text-xl);
		}

		@media (min-width: 768px) {
			padding: var(--space-xl);
		}
	}

	.age {
		margin: 0;
		color: var(--color-text-muted);

		& strong {
			color: var(--color-text);
		}
	}

	.pill {
		display: inline-block;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-full);
		font-size: var(--text-sm);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.pill--active {
		background: var(--color-success);
		color: var(--color-surface-1);
	}

	.pill--away {
		background: var(--color-text-muted);
		color: var(--color-surface-1);
	}

	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
</style>
