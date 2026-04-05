<script lang="ts">
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut, quintOut, backOut } from 'svelte/easing';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	interface Feature {
		id: number;
		title: string;
		description: string;
		icon: string;
	}

	interface Testimonial {
		id: number;
		quote: string;
		author: string;
		role: string;
	}

	const features: Feature[] = [
		{
			id: 1,
			title: 'Lightning Fast',
			description: 'Ship polished UIs with zero-config dev tooling and instant HMR.',
			icon: 'bolt'
		},
		{
			id: 2,
			title: 'Fully Typed',
			description: 'TypeScript-first API with strict types across every surface.',
			icon: 'type'
		},
		{
			id: 3,
			title: 'Reactive Runes',
			description: 'State, derivations, and effects in a single unified model.',
			icon: 'rune'
		},
		{
			id: 4,
			title: 'Tiny Bundles',
			description: 'Compile-time optimizations keep production payloads lean.',
			icon: 'box'
		},
		{
			id: 5,
			title: 'Accessible',
			description: 'A11y warnings baked into the compiler — not an afterthought.',
			icon: 'eye'
		},
		{
			id: 6,
			title: 'Animated',
			description: 'Transitions, easings, and springs included in the framework.',
			icon: 'spark'
		}
	];

	const testimonials: Testimonial[] = [
		{
			id: 1,
			quote: 'We shipped our rewrite in half the time. The runes model just clicks.',
			author: 'Jordan Kim',
			role: 'Staff Engineer, Northwind'
		},
		{
			id: 2,
			quote: 'Transitions and Spring made our app feel premium with almost no extra code.',
			author: 'Priya Desai',
			role: 'Design Engineer, Lumen'
		},
		{
			id: 3,
			quote: 'The best DX I have had in a decade of web work. Types, motion, state — all solved.',
			author: 'Marco Reyes',
			role: 'CTO, Shelf'
		}
	];

	let currentIndex = $state(0);
	let paused = $state(false);
	const current = $derived(testimonials[currentIndex]);

	$effect(() => {
		if (paused) return;
		const id = setInterval(() => {
			currentIndex = (currentIndex + 1) % testimonials.length;
		}, 4000);
		return () => clearInterval(id);
	});

	// Module 6.9: per-page OKLCH brand personality
	// CTA parallax via Spring (Module 6.15)
	const px = new Spring(0, { stiffness: 0.08, damping: 0.5 });
	const py = new Spring(0, { stiffness: 0.08, damping: 0.5 });

	function handleCtaMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const nx = (e.clientX - cx) / rect.width;
		const ny = (e.clientY - cy) / rect.height;
		if (prefersReducedMotion.current) {
			px.set(0, { instant: true });
			py.set(0, { instant: true });
		} else {
			px.target = nx * 16;
			py.target = ny * 16;
		}
	}

	function handleCtaLeave() {
		px.target = 0;
		py.target = 0;
	}

	const reduced = $derived(prefersReducedMotion.current);
</script>

<div class="landing">
	<h1 class="sr-only">Module 6 Project — Animated Landing Page</h1>

	<!-- HERO -->
	<section class="hero">
		{#if reduced}
			<div class="hero-inner" in:fade={{ duration: 200 }}>
				<p class="eyebrow">Introducing</p>
				<h2 class="title">Kinetik</h2>
				<p class="subtitle">
					The animation-first component toolkit for teams who ship premium interfaces.
				</p>
				<div class="cta-row">
					<button type="button" class="btn primary">Get started</button>
					<button type="button" class="btn ghost">View docs</button>
				</div>
			</div>
		{:else}
			<div class="hero-inner" in:fly={{ y: 30, duration: 700, easing: quintOut }}>
				<p class="eyebrow" in:fade={{ delay: 150, duration: 400 }}>Introducing</p>
				<h2 class="title" in:fly={{ y: 20, delay: 200, duration: 700, easing: quintOut }}>
					Kinetik
				</h2>
				<p class="subtitle" in:fly={{ y: 20, delay: 350, duration: 700, easing: quintOut }}>
					The animation-first component toolkit for teams who ship premium interfaces.
				</p>
				<div class="cta-row" in:fade={{ delay: 600, duration: 400 }}>
					<button type="button" class="btn primary">Get started</button>
					<button type="button" class="btn ghost">View docs</button>
				</div>
			</div>
		{/if}
	</section>

	<!-- FEATURES -->
	<section class="features">
		<header class="section-header">
			<h2>Everything you need</h2>
			<p>Six primitives that compose into any interface you can dream up.</p>
		</header>
		<div class="feature-grid">
			{#each features as feature, i (feature.id)}
				{#if reduced}
					<article class="feature" in:fade={{ duration: 150 }}>
						<div class="icon" aria-hidden="true">{feature.icon[0].toUpperCase()}</div>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</article>
				{:else}
					<article
						class="feature"
						in:fly={{ y: 24, delay: i * 90, duration: 600, easing: cubicOut }}
					>
						<div class="icon" aria-hidden="true">{feature.icon[0].toUpperCase()}</div>
						<h3>{feature.title}</h3>
						<p>{feature.description}</p>
					</article>
				{/if}
			{/each}
		</div>
	</section>

	<!-- TESTIMONIALS -->
	<section class="testimonials">
		<header class="section-header">
			<h2>Loved by builders</h2>
			<p>Teams shipping real products with Kinetik.</p>
		</header>
		<div class="testimonial-stage">
			{#key currentIndex}
				{#if reduced}
					<figure class="testimonial" in:fade={{ duration: 200 }}>
						<blockquote>&ldquo;{current.quote}&rdquo;</blockquote>
						<figcaption>
							<strong>{current.author}</strong>
							<span>{current.role}</span>
						</figcaption>
					</figure>
				{:else}
					<figure
						class="testimonial"
						in:scale={{ start: 0.95, duration: 500, easing: backOut }}
						out:fade={{ duration: 200 }}
					>
						<blockquote>&ldquo;{current.quote}&rdquo;</blockquote>
						<figcaption>
							<strong>{current.author}</strong>
							<span>{current.role}</span>
						</figcaption>
					</figure>
				{/if}
			{/key}
		</div>
		<div class="testimonial-controls">
			<div class="dots" role="tablist" aria-label="Testimonials">
				{#each testimonials as t, i (t.id)}
					<button
						type="button"
						class="dot"
						class:active={i === currentIndex}
						aria-label="Show testimonial {i + 1}"
						aria-selected={i === currentIndex}
						role="tab"
						onclick={() => (currentIndex = i)}
					></button>
				{/each}
			</div>
			<button type="button" class="btn tiny" onclick={() => (paused = !paused)}>
				{paused ? 'Resume' : 'Pause'}
			</button>
		</div>
	</section>

	<!-- CTA -->
	<section class="cta">
		<div
			class="cta-card"
			onpointermove={handleCtaMove}
			onpointerleave={handleCtaLeave}
			role="presentation"
			style:transform="translate({px.current}px, {py.current}px)"
		>
			<h2>Ready to ship something beautiful?</h2>
			<p>Install Kinetik in under a minute and start building.</p>
			<button type="button" class="btn primary large">Start free trial</button>
		</div>
	</section>

	<!-- FOOTER -->
	<footer class="footer">
		<nav class="footer-links" aria-label="Footer">
			<a href="#docs">Docs</a>
			<a href="#pricing">Pricing</a>
			<a href="#blog">Blog</a>
			<a href="#github">GitHub</a>
			<a href="#contact">Contact</a>
		</nav>
		<p class="built-with">
			Built with: transitions, stagger, Spring, {'{#key}'}, CSS transitions, prefers-reduced-motion,
			per-page OKLCH personality.
		</p>
		<p class="copyright">&copy; 2026 Kinetik. A Module 6 capstone.</p>
	</footer>
</div>

<style>
	/* Per-page brand personality (Module 6.9) */
	.landing {
		--color-brand: oklch(58% 0.21 300);
		--color-brand-dim: oklch(48% 0.18 300);
		display: flex;
		flex-direction: column;
		gap: var(--space-2xl);
		max-inline-size: 72rem;
		margin-inline: auto;
		padding: var(--space-lg);
		color: var(--color-text);
	}

	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* HERO */
	.hero {
		position: relative;
		border-radius: var(--radius-xl);
		padding: var(--space-2xl) var(--space-lg);
		background:
			radial-gradient(ellipse at top, oklch(58% 0.21 300 / 0.25), transparent 60%),
			linear-gradient(180deg, var(--color-surface-1), var(--color-surface));
		border: 1px solid var(--color-border);
		overflow: hidden;
	}
	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		text-align: center;
		max-inline-size: 42rem;
		margin-inline: auto;
	}
	.eyebrow {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-brand);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 600;
	}
	.title {
		margin: 0;
		font-size: var(--text-hero);
		line-height: 1.05;
		letter-spacing: -0.02em;
		background: linear-gradient(135deg, var(--color-text), var(--color-brand));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.subtitle {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		justify-content: center;
		margin-block-start: var(--space-sm);
	}

	/* BUTTONS */
	.btn {
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	.btn.primary {
		background: var(--color-brand);
		color: var(--color-surface);
		box-shadow: var(--shadow-md);
	}
	.btn.primary:hover {
		background: var(--color-brand-dim);
		transform: translateY(-1px);
		box-shadow: var(--shadow-lg);
	}
	.btn.primary:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.btn.ghost {
		background: transparent;
		color: var(--color-text);
		border-color: var(--color-border);
	}
	.btn.ghost:hover {
		background: var(--color-surface-1);
	}
	.btn.large {
		padding: var(--space-md) var(--space-xl);
		font-size: var(--text-lg);
	}
	.btn.tiny {
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-xs);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.btn.tiny:hover {
		background: var(--color-surface-1);
	}

	/* SECTION HEADERS */
	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		text-align: center;
		margin-block-end: var(--space-xl);
	}
	.section-header h2 {
		margin: 0;
		font-size: var(--text-2xl);
		letter-spacing: -0.01em;
	}
	.section-header p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	/* FEATURES */
	.feature-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.feature {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition:
			transform var(--dur-base) var(--ease-out),
			border-color var(--dur-base) var(--ease-out),
			box-shadow var(--dur-base) var(--ease-out);
	}
	.feature:hover {
		transform: translateY(-2px);
		border-color: var(--color-brand);
		box-shadow: var(--shadow-md);
	}
	.icon {
		inline-size: 2.5rem;
		block-size: 2.5rem;
		border-radius: var(--radius-md);
		background: linear-gradient(135deg, var(--color-brand), var(--color-brand-dim));
		color: var(--color-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: var(--text-lg);
	}
	.feature h3 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}
	.feature p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	/* TESTIMONIALS */
	.testimonials {
		display: flex;
		flex-direction: column;
	}
	.testimonial-stage {
		min-block-size: 12rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.testimonial {
		margin: 0;
		max-inline-size: 40rem;
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-align: center;
		box-shadow: var(--shadow-sm);
	}
	.testimonial blockquote {
		margin: 0 0 var(--space-md);
		font-size: var(--text-lg);
		line-height: 1.5;
		color: var(--color-text);
	}
	.testimonial figcaption {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.testimonial figcaption strong {
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	.testimonial figcaption span {
		color: var(--color-text-muted);
		font-size: var(--text-xs);
	}
	.testimonial-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
		margin-block-start: var(--space-md);
	}
	.dots {
		display: flex;
		gap: var(--space-xs);
	}
	.dot {
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border-radius: var(--radius-full);
		border: none;
		background: var(--color-border);
		cursor: pointer;
		padding: 0;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.dot.active {
		background: var(--color-brand);
	}
	.dot:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}

	/* CTA */
	.cta {
		display: flex;
		justify-content: center;
	}
	.cta-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-2xl) var(--space-lg);
		background:
			radial-gradient(ellipse at center, oklch(58% 0.21 300 / 0.2), transparent 70%),
			var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		text-align: center;
		inline-size: 100%;
		max-inline-size: 48rem;
		will-change: transform;
	}
	.cta-card h2 {
		margin: 0;
		font-size: var(--text-2xl);
		letter-spacing: -0.01em;
	}
	.cta-card p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	/* FOOTER */
	.footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding-block: var(--space-xl);
		border-block-start: 1px solid var(--color-border);
		text-align: center;
	}
	.footer-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
		justify-content: center;
	}
	.footer-links a {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: var(--text-sm);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.footer-links a:hover {
		color: var(--color-brand);
	}
	.footer-links a:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
		border-radius: var(--radius-xs);
	}
	.built-with {
		margin: 0;
		max-inline-size: 52rem;
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-family: var(--font-mono);
		line-height: 1.6;
	}
	.copyright {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-xs);
	}

	/* RESPONSIVE */
	@media (min-width: 480px) {
		.feature-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 768px) {
		.landing {
			padding: var(--space-xl);
		}
		.hero {
			padding: calc(var(--space-2xl) * 1.5) var(--space-xl);
		}
		.feature-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
