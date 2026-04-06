<script lang="ts">
	const sizes: readonly { token: string; formula: string }[] = [
		{ token: '--text-xs', formula: 'clamp(0.75rem, 0.70rem + 0.25vw, 0.85rem)' },
		{ token: '--text-sm', formula: 'clamp(0.875rem, 0.82rem + 0.30vw, 1rem)' },
		{ token: '--text-base', formula: 'clamp(1rem, 0.93rem + 0.35vw, 1.125rem)' },
		{ token: '--text-lg', formula: 'clamp(1.125rem, 1.04rem + 0.45vw, 1.35rem)' },
		{ token: '--text-xl', formula: 'clamp(1.35rem, 1.22rem + 0.70vw, 1.75rem)' },
		{ token: '--text-2xl', formula: 'clamp(1.75rem, 1.55rem + 1.05vw, 2.35rem)' },
		{ token: '--text-hero', formula: 'clamp(2.5rem, 2.05rem + 2.35vw, 4.25rem)' }
	];

	const sample = 'The quick brown fox jumps over the lazy dog';
</script>

<section class="page">
	<h1>1.6 — Fluid typography</h1>

	<p class="concept">
		<strong>Concept.</strong> CSS <code>clamp(min, preferred, max)</code> takes three values: a hard
		lower bound, a preferred value that scales with the viewport (usually a <code>rem</code> plus a
		<code>vw</code> term), and a hard upper bound. One line replaces an entire stack of
		<code>@media</code> breakpoints for typography. The PE7 fluid scale bakes a clamp into every
		<code>--text-*</code> token, so text grows smoothly from phone to desktop without ever looking
		too small on mobile or absurdly huge on ultrawide monitors.
	</p>

	<p class="hint">Resize the browser window slowly and watch every row scale in lockstep — no snaps, no jumps.</p>

	<div class="specimen">
		{#each sizes as { token, formula } (token)}
			<article class="row">
				<div class="label">
					<span class="token">{token}</span>
					<code class="formula">{formula}</code>
				</div>
				<p class="sample" style:font-size="var({token})">{sample}</p>
			</article>
		{/each}
	</div>

	<p class="concept">
		<strong>Why min and max bounds?</strong> Without them, <code>2.5vw</code> alone would shrink text to
		unreadable sizes on 320px screens and bloat it on ultrawide monitors. The clamp bounds are safety
		rails: the min ensures readability, the max prevents absurdity.
	</p>

	<h2>What you learned</h2>
	<ul class="learned">
		<li><code>clamp()</code> takes exactly three arguments: min, preferred, max.</li>
		<li>The preferred value mixes <code>rem</code> + <code>vw</code> so it scales with the viewport.</li>
		<li>PE7 tokens (<code>--text-xs</code> … <code>--text-hero</code>) are pre-clamped — just use them.</li>
		<li>Fluid type eliminates the majority of typography media queries.</li>
	</ul>
</section>

<style>
	.page {
		& .concept {
			font-size: var(--text-base);
			color: var(--color-text-muted);
			max-inline-size: 65ch;
		}

		& .hint {
			font-size: var(--text-sm);
			color: var(--color-brand);
			font-style: italic;
		}

		& h2 {
			font-size: var(--text-xl);
			margin-block-start: 2rem;
		}
	}

	.specimen {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-block: 2rem;

		& .row {
			border-block-end: 1px solid var(--color-border);
			padding-block-end: 1rem;

			& .label {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				margin-block-end: 0.5rem;
			}

			& .token {
				font-family: ui-monospace, monospace;
				font-size: var(--text-sm);
				color: var(--color-brand);
				font-weight: 600;
			}

			& .formula {
				font-family: ui-monospace, monospace;
				font-size: var(--text-xs);
				color: var(--color-text-muted);
				word-break: break-word;
			}

			& .sample {
				margin: 0;
				line-height: 1.2;
				color: var(--color-text);
			}
		}
	}

	.learned {
		padding-inline-start: 1.25rem;
		color: var(--color-text-muted);

		& li {
			margin-block: 0.25rem;
		}
	}

	@media (min-width: 768px) {
		.specimen {
			& .row {
				display: grid;
				grid-template-columns: 18rem 1fr;
				align-items: baseline;
				gap: 2rem;

				& .label {
					margin-block-end: 0;
				}
			}
		}
	}
</style>
