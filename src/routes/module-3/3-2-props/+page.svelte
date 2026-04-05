<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
</script>

<section class="page">
	<h1>3.2 — $props()</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>$props()</code> is how a Svelte 5 component receives data from
		its parent. You destructure the values you want at the top of the script:
		<code>let {'{ src, alt, size }'} = $props();</code>. At the call site you pass them as
		attributes — <code>&lt;Avatar src="..." alt="..." size="lg" /&gt;</code> — which replaces the
		old <code>export let</code> pattern. Explicit destructuring lets the compiler tree-shake unused
		props, infer types, and wire fine-grained reactivity.
	</p>

	<div class="build">
		<p class="note">Four avatars — three sizes plus one <code>src={'{null}'}</code> initials fallback.</p>
		<div class="row">
			<div class="cell">
				<Avatar src={null} alt="Ada Rivera" name="Ada Rivera" size="sm" />
				<span class="caption">sm</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Kai Thompson" name="Kai Thompson" size="md" />
				<span class="caption">md</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Mira Okafor" name="Mira Okafor" size="lg" />
				<span class="caption">lg</span>
			</div>
			<div class="cell">
				<Avatar src={null} alt="Jun Park" name="Jun Park" size="md" />
				<span class="caption">fallback</span>
			</div>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$props()</code> replaces <code>export let</code> from Svelte 4.</li>
		<li>Destructure only the props you need; unused ones are tree-shaken.</li>
		<li>Props are passed at the call site as attributes, exactly like HTML.</li>
		<li>Explicit destructuring is what enables type inference and reactive wiring.</li>
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

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.cell {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.caption {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-family: var(--font-mono);
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

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}

		.row {
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}

		.cell {
			flex-direction: column;
		}
	}
</style>
