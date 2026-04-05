<script lang="ts">
	const name: string = 'Billy';
	const role: string = 'Frontend Engineer';
</script>

<section class="page">
	<h1>1.3 — The three blocks</h1>

	<p class="concept">
		Every Svelte component is made of three blocks: a <code>&lt;script&gt;</code>, the markup, and a
		<code>&lt;style&gt;</code>. Each runs at a different time and for a different reason. The
		<strong>script</strong>
		runs once per component instance — it is where you declare state and logic. The
		<strong>markup</strong>
		is reactive — Svelte re-evaluates any template expression when its dependencies change. The
		<strong>style</strong>
		is compiled at build time — Svelte scopes every selector to this component so you cannot accidentally
		leak CSS into another component. Understanding which block runs when is the foundation of Svelte.
	</p>

	<article class="name-tag">
		<header class="name-tag__header">
			<span>HELLO</span>
			<span>my name is</span>
		</header>
		<div class="name-tag__body">
			<p class="name-tag__name">{name}</p>
			<p class="name-tag__role">{role}</p>
		</div>
	</article>

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;script&gt;</code> runs once per instance — declare data here.</li>
		<li>Markup is reactive — template expressions re-run when inputs change.</li>
		<li><code>&lt;style&gt;</code> is compiled and scoped at build time.</li>
		<li>Template expressions use <code>{'{'}value{'}'}</code> interpolation.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		max-width: 60ch;
		line-height: 1.6;
	}

	.name-tag {
		width: 100%;
		max-width: 20rem;
		margin-block: var(--space-xl);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--color-surface-1);
		box-shadow: var(--shadow-md);

		@media (min-width: 768px) {
			max-width: 24rem;
		}
	}

	.name-tag__header {
		background: var(--color-brand);
		color: var(--color-surface-1);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.1em;

		& span:first-child {
			font-size: var(--text-2xl);
			font-weight: 800;
		}

		& span:last-child {
			font-size: var(--text-sm);
			opacity: 0.85;
		}
	}

	.name-tag__body {
		background: var(--color-surface-1);
		padding: var(--space-xl) var(--space-md);
		text-align: center;
	}

	.name-tag__name {
		margin: 0 0 var(--space-xs) 0;
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text);
	}

	.name-tag__role {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
</style>
