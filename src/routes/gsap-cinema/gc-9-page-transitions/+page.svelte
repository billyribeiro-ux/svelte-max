<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onNavigate } from '$app/navigation';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface CardDef {
		id: number;
		title: string;
		description: string;
		color: string;
		gradient: string;
	}

	const cards: CardDef[] = [
		{
			id: 1,
			title: 'Kinetic Typography',
			description: 'Words that move with purpose, creating rhythm and emphasis through motion.',
			color: 'oklch(70% 0.22 270)',
			gradient: 'linear-gradient(135deg, oklch(35% 0.15 270), oklch(20% 0.10 290))'
		},
		{
			id: 2,
			title: 'Scroll Narratives',
			description: 'Stories that unfold as you scroll, tying content to spatial progression.',
			color: 'oklch(68% 0.20 160)',
			gradient: 'linear-gradient(135deg, oklch(30% 0.12 160), oklch(18% 0.08 180))'
		},
		{
			id: 3,
			title: 'Micro-interactions',
			description: 'Tiny details — a button ripple, a toggle spring — that make interfaces feel alive.',
			color: 'oklch(72% 0.18 60)',
			gradient: 'linear-gradient(135deg, oklch(35% 0.14 60), oklch(22% 0.10 40))'
		},
		{
			id: 4,
			title: 'Parallax Worlds',
			description: 'Layered depth that rewards scrolling with a sense of exploring a 3D scene.',
			color: 'oklch(65% 0.22 320)',
			gradient: 'linear-gradient(135deg, oklch(32% 0.16 320), oklch(20% 0.12 340))'
		}
	];

	let selectedId: number | null = $derived(
		$page.url.searchParams.has('id')
			? Number($page.url.searchParams.get('id'))
			: null
	);

	let selectedCard: CardDef | undefined = $derived(
		selectedId !== null ? cards.find((c) => c.id === selectedId) : undefined
	);

	let expandedContentEl: HTMLDivElement | null = $state(null);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (prefersReducedMotion.current) return;

		return new Promise<void>((resolve) => {
			const transition = document.startViewTransition(() => {
				resolve();
				return navigation.complete;
			});

			void transition.finished;
		});
	});

	function selectCard(id: number): void {
		void goto(`/gsap-cinema/gc-9-page-transitions?id=${id}`, { noScroll: true });
	}

	function goBack(): void {
		void goto('/gsap-cinema/gc-9-page-transitions', { noScroll: true });
	}

	$effect(() => {
		if (!expandedContentEl || !selectedCard) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.expanded-title',
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
			);
			gsap.fromTo(
				'.expanded-desc',
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'power2.out' }
			);
			gsap.fromTo(
				'.back-btn',
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'back.out(1.7)' }
			);
		}, expandedContentEl!);

		return () => ctx.revert();
	});

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onNavigate } from '$app/navigation';
  import gsap from 'gsap';

  interface CardDef {
    id: number; title: string; description: string;
    color: string; gradient: string;
  }

  const cards: CardDef[] = [ /* ... */ ];

  let selectedId: number | null = $derived(
    $page.url.searchParams.has('id')
      ? Number($page.url.searchParams.get('id'))
      : null
  );

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    if (prefersReducedMotion.current) return;
    return new Promise<void>((resolve) => {
      const transition = document.startViewTransition(() => {
        resolve();
        return navigation.complete;
      });
      void transition.finished;
    });
  });

  function selectCard(id: number): void {
    void goto(\`/gsap-cinema/gc-9-page-transitions?id=\${id}\`, { noScroll: true });
  }
  function goBack(): void {
    void goto('/gsap-cinema/gc-9-page-transitions', { noScroll: true });
  }

  $effect(() => {
    if (!expandedContentEl || !selectedCard) return;
    if (prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.expanded-title', { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
      gsap.fromTo('.expanded-desc', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'power2.out' });
    }, expandedContentEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.9 — View Transitions API + GSAP</h1>
	<p class="concept">
		<strong>The View Transitions API lets you animate between DOM states — including route changes.</strong>
		SvelteKit's <code>onNavigate</code> hook is the integration point. Combine with GSAP: snapshot
		the old state, start a transition, then run GSAP inside the callback for complex choreography.
		Feature-detect <code>startViewTransition</code> and fall back to instant swap.
	</p>

	<div class="build">
		{#if selectedCard}
			<div
				class="expanded-view"
				style:background={selectedCard.gradient}
				style:view-transition-name="card-{selectedCard.id}"
				bind:this={expandedContentEl}
			>
				<button type="button" class="back-btn" onclick={goBack}>
					&larr; Back to Gallery
				</button>
				<div class="expanded-content">
					<h2 class="expanded-title" style:color={selectedCard.color}>
						{selectedCard.title}
					</h2>
					<p class="expanded-desc">{selectedCard.description}</p>
					<div class="expanded-meta">
						<span class="meta-badge" style:background={selectedCard.color}>
							Card #{selectedCard.id}
						</span>
						<span class="meta-note">
							This view used <code>view-transition-name: card-{selectedCard.id}</code>
						</span>
					</div>
				</div>
			</div>
		{:else}
			<h2 class="section-title">Mini Gallery</h2>
			<p class="gallery-hint">Click a card to see the View Transition in action.</p>
			<div class="card-grid">
				{#each cards as card}
					<button
						type="button"
						class="gallery-card"
						style:background={card.gradient}
						style:view-transition-name="card-{card.id}"
						onclick={() => selectCard(card.id)}
					>
						<span class="card-title" style:color={card.color}>{card.title}</span>
						<span class="card-peek">{card.description}</span>
					</button>
				{/each}
			</div>
			<div class="code-callout">
				<h3 class="callout-heading">Key CSS property</h3>
				<code class="block-code">view-transition-name: card-1;</code>
				<p class="callout-note">
					Each card gets a unique <code>view-transition-name</code>, telling the browser which
					elements correspond across the old and new DOM states. The browser auto-generates
					<code>::view-transition-old</code> and <code>::view-transition-new</code> pseudo-elements
					for the cross-fade.
				</p>
			</div>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">View Transitions depend on precise pairing between old and new DOM elements. Break the pairing and the cross-fade morphing degrades to a simple cut.</p>
	<ol class="experiments">
		<li><strong>Remove <code>view-transition-name</code> from the gallery cards but keep it on the expanded view.</strong> The browser cannot find a matching old-state element, so it falls back to a full-page cross-fade instead of the smooth morph between the card and expanded view. The card-specific animation vanishes.</li>
		<li><strong>Give two cards the same <code>view-transition-name</code> value.</strong> The browser throws a console error because <code>view-transition-name</code> must be unique within a document at transition time. Duplicate names break the entire transition and it falls back to an instant swap.</li>
		<li><strong>Remove the <code>if (!document.startViewTransition)</code> guard.</strong> The code crashes in browsers that do not support the View Transitions API (like Firefox as of early 2025) because <code>startViewTransition</code> is undefined. The feature-detection guard is not optional.</li>
		<li><strong>Remove <code>noScroll: true</code> from the <code>goto()</code> calls.</strong> SvelteKit scrolls to the top on every navigation, which fights against the View Transition's positional morph. The expanded card jumps to the top of the page instead of expanding in place from the clicked card's position.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The View Transitions API captures a bitmap snapshot of the old DOM state, swaps in the new DOM, then cross-fades between the two using browser-generated <code>::view-transition-old</code> and <code>::view-transition-new</code> pseudo-elements. SvelteKit's <code>onNavigate</code> hook is the integration point: you wrap the navigation's resolve/complete callbacks inside <code>document.startViewTransition()</code> so the browser snapshots before the route change and reveals the new page with the transition.</p>
	<p class="prose">The <code>view-transition-name</code> CSS property is the pairing mechanism. When the old page has an element named <code>card-1</code> and the new page also has an element named <code>card-1</code>, the browser morphs between them — interpolating size, position, and opacity. Every name must be unique in the document at the time of transition. The <code>view-transition-class</code> property lets multiple elements share a single transition animation rule without requiring unique names for each.</p>
	<p class="prose">GSAP enters after the View Transition completes, animating elements that did not participate in the CSS-level morph. The expanded card's title, description, and back button fade in with staggered GSAP tweens inside an <code>$effect</code> that triggers when the selected card changes. This two-layer approach — View Transitions for the spatial morph, GSAP for the content choreography — gives you the best of both systems.</p>
	<p class="next">Next lesson: CSS 3D transforms with card flips and carousels.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
		text-wrap: balance;

		& strong { color: var(--color-text); }
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}
	.next {
		margin-block-start: var(--space-xl);
		color: var(--color-text);
	}

	.section-title {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin: 0;
	}
	.gallery-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: var(--space-md);
	}
	.gallery-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-lg);
		border: 1px solid oklch(30% 0.04 270);
		border-radius: var(--radius-lg);
		cursor: pointer;
		text-align: start;
		min-block-size: 160px;
		/* view-transition-class — groups cards so they share a single View Transition animation rule */
		view-transition-class: card;
		transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);

		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 8px 24px oklch(0% 0 0 / 0.3);
		}
	}
	.card-title {
		font-size: var(--text-lg);
		font-weight: 800;
	}
	.card-peek {
		font-size: var(--text-sm);
		color: oklch(75% 0.02 270);
		line-height: 1.5;
	}

	/* Expanded view */
	.expanded-view {
		position: relative;
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		min-block-size: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-lg);
	}
	.back-btn {
		position: absolute;
		inset-block-start: var(--space-md);
		inset-inline-start: var(--space-md);
		background: oklch(10% 0.02 270 / 0.6);
		color: oklch(90% 0.02 270);
		border: 1px solid oklch(40% 0.04 270);
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		backdrop-filter: blur(8px);
		transition: background var(--dur-fast) var(--ease-out);

		&:hover { background: oklch(20% 0.02 270 / 0.8); }
	}
	.expanded-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		text-align: center;
		max-inline-size: 50ch;
	}
	.expanded-title {
		font-size: clamp(var(--text-xl), 5vw, var(--text-2xl));
		font-weight: 900;
		margin: 0;
	}
	.expanded-desc {
		font-size: var(--text-base);
		color: oklch(80% 0.02 270);
		line-height: 1.7;
		margin: 0;
	}
	.expanded-meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		margin-block-start: var(--space-md);
	}
	.meta-badge {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: 700;
		color: oklch(10% 0 0);
	}
	.meta-note {
		font-size: var(--text-xs);
		color: oklch(65% 0.02 270);
	}

	/* Code callout */
	.code-callout {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md) var(--space-lg);
		margin-block-start: var(--space-md);
	}
	.callout-heading {
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 var(--space-sm);
	}
	.block-code {
		display: block;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-1);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		margin-block-end: var(--space-sm);
	}
	.callout-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}
		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.card-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
		.card-grid { grid-template-columns: repeat(4, 1fr); }
	}
</style>
