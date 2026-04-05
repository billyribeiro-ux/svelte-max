<script lang="ts">
	const greeting: string = 'Hello, world.';
</script>

<section class="page">
	<h1>1.1 — Hello, compiled</h1>

	<p class="concept">
		Svelte is a <strong>compiler</strong>, not a runtime framework. When you write a
		<code>.svelte</code>
		file, the Svelte compiler transforms it at build time into small, optimized vanilla JavaScript that
		updates the DOM directly. Unlike React or Vue, there is no large framework runtime shipped to the browser
		— the output is just the code needed for <em>your</em> component. That is why Svelte apps start fast
		and stay small.
	</p>

	<article class="card">
		<h2>{greeting}</h2>
		<p>This card was compiled, not rendered by a framework.</p>
	</article>

	<p class="hint">
		Open DevTools &rarr; Elements and inspect the card above. You will see the class name has a hash
		appended (something like <code>card.svelte-abc123</code>). That hash is proof the Svelte compiler
		scoped these styles to this component at build time — no runtime CSS-in-JS required.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li>Svelte is a compiler; it emits vanilla JS at build time.</li>
		<li>There is no framework runtime shipped to the browser.</li>
		<li>Scoped styles get a class-name hash appended by the compiler.</li>
		<li>Less framework code means faster load and smaller bundles.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		max-width: 60ch;
		line-height: 1.6;
	}

	.card {
		background: var(--color-brand);
		color: var(--color-surface-1);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		margin-block: var(--space-xl);
		max-width: 32rem;

		& h2 {
			margin: 0 0 var(--space-sm) 0;
			font-size: var(--font-size-xl);
		}

		& p {
			margin: 0;
			opacity: 0.9;
		}

		@media (min-width: 768px) {
			padding: var(--space-xl);
		}
	}

	.hint {
		background: var(--color-surface-2);
		color: var(--color-text);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border-left: 4px solid var(--color-brand);
		max-width: 60ch;

		& code {
			color: var(--color-brand);
		}
	}

	ul {
		color: var(--color-text);
		line-height: 1.8;
	}
</style>
