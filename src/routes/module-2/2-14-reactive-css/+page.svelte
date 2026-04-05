<script lang="ts">
	// Three reactive numbers that feed an OKLCH color string.
	let l = $state(65);
	let c = $state(0.22);
	let h = $state(270);

	// $derived infers `string` from the expression — no annotation needed.
	const colorString = $derived(`oklch(${l}% ${c} ${h})`);

	function reset(): void {
		l = 65;
		c = 0.22;
		h = 270;
	}
</script>

<section class="page">
	<h1>2.14 — Reactive CSS</h1>

	<p class="concept">
		Svelte 5.16 added clsx-style class bindings:
		<code>{'class={{ active: isActive, muted: !enabled }}'}</code> for objects and
		<code>{"class={[faded && 'fade', scale && 'scale']}"}</code> for arrays. These compose cleanly
		with the legacy <code>class:name={'{condition}'}</code> directive. The
		<code>style:property={'{value}'}</code> directive binds any reactive expression to a CSS
		property — including CSS custom properties like <code>style:--brand-hue={'{hue}'}</code>.
		Combined with scoped CSS reading <code>var(--brand-hue)</code>, you get reactive styling
		without touching the DOM or stringifying inline <code>style</code> attributes.
	</p>

	<div class="build stack">
		<h2>OKLCH color mixer</h2>

		<div class="controls">
			<label>
				<span>lightness <output>{l}%</output></span>
				<input type="range" min="0" max="100" step="1" bind:value={l} />
			</label>
			<label>
				<span>chroma <output>{c.toFixed(2)}</output></span>
				<input type="range" min="0" max="0.4" step="0.01" bind:value={c} />
			</label>
			<label>
				<span>hue <output>{h}°</output></span>
				<input type="range" min="0" max="360" step="1" bind:value={h} />
			</label>
		</div>

		<div class="preview" style:background="oklch({l}% {c} {h})">
			<span class="preview-text">preview</span>
		</div>

		<!--
			clsx-style object binding: exactly one of `dark` or `light` is true at any
			moment. The scoped CSS defines both classes with different OKLCH text colors.
		-->
		<div class={['label-card', { dark: l > 60, light: l <= 60 }]}>
			<span>Adaptive label — readable at any lightness</span>
			<code>{colorString}</code>
		</div>

		<button type="button" class="reset" onclick={reset}>Reset to defaults</button>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>
			Object class bindings (<code>{'class={{ dark: l > 60 }}'}</code>) toggle classes
			declaratively — no <code>classList</code> calls.
		</li>
		<li>
			Array class bindings let you mix static strings and conditional classes in one expression.
		</li>
		<li>
			<code>style:property={'{value}'}</code> binds reactive values to CSS properties, including
			custom properties like <code>--brand-hue</code>.
		</li>
		<li>
			Combining scoped CSS with reactive custom properties gives you skinnable components with zero
			imperative DOM work.
		</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		font-size: var(--text-base);
		margin-block: var(--space-md) var(--space-lg);
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	h2 {
		font-size: var(--text-lg);
	}

	.controls {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	@media (min-width: 768px) {
		.controls {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.controls label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.controls output {
		font-family: var(--font-mono);
		color: var(--color-text);
		margin-inline-start: var(--space-xs);
	}

	input[type='range'] {
		accent-color: var(--color-brand);
		inline-size: 100%;
	}

	.preview {
		block-size: clamp(8rem, 18vw, 14rem);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-md);
		display: grid;
		place-items: center;
		transition: background var(--dur-fast) var(--ease-out);
	}

	.preview-text {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 800;
		color: oklch(20% 0.02 270);
		mix-blend-mode: difference;
	}

	.label-card {
		padding: var(--space-md) var(--space-lg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-base);
		font-weight: 600;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.label-card.dark {
		background: oklch(96% 0.01 270);
		color: oklch(18% 0.04 270);
	}

	.label-card.light {
		background: oklch(20% 0.04 270);
		color: oklch(96% 0.01 270);
	}

	.label-card code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		opacity: 0.8;
	}

	.reset {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.reset:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}

	code {
		font-family: var(--font-mono);
	}

	ul {
		margin-block-start: var(--space-md);
		padding-inline-start: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--color-text-muted);
	}

	h3 {
		margin-block-start: var(--space-xl);
	}
</style>
