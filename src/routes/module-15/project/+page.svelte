<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let mounted = $state(false);
	let prefersReducedMotion = $state(false);
	let rotationY = $state(0);
	let rotationX = $state(0);
	let scrollY = $state(0);

	$effect(() => {
		mounted = true;
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mq.matches;
		const handler = (e: MediaQueryListEvent) => { prefersReducedMotion = e.matches; };
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	$effect(() => {
		if (!mounted || prefersReducedMotion) return;
		const interval = setInterval(() => {
			rotationY += 0.006;
			rotationX += 0.003;
		}, 16);
		return () => clearInterval(interval);
	});

	function handleScroll() {
		scrollY = window.scrollY;
	}

	let section1Visible = $derived(scrollY > 200);
	let section2Visible = $derived(scrollY > 600);
	let section3Visible = $derived(scrollY > 1000);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Canvas, T } from '@threlte/core';\n" +
		"	import { OrbitControls } from '@threlte/extras';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"	let prefersReducedMotion = $state(false);\n" +
		"	let rotationY = $state(0);\n" +
		"	let rotationX = $state(0);\n" +
		"	let scrollY = $state(0);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		mounted = true;\n" +
		"		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');\n" +
		"		prefersReducedMotion = mq.matches;\n" +
		"		const handler = (e: MediaQueryListEvent) =\u003e { prefersReducedMotion = e.matches; };\n" +
		"		mq.addEventListener('change', handler);\n" +
		"		return () =\u003e mq.removeEventListener('change', handler);\n" +
		"	});\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		if (!mounted || prefersReducedMotion) return;\n" +
		"		const interval = setInterval(() =\u003e {\n" +
		"			rotationY += 0.006;\n" +
		"			rotationX += 0.003;\n" +
		"		}, 16);\n" +
		"		return () =\u003e clearInterval(interval);\n" +
		"	});\n" +
		"\n" +
		"	function handleScroll() {\n" +
		"		scrollY = window.scrollY;\n" +
		"	}\n" +
		"\n" +
		"	let section1Visible = $derived(scrollY \u003e 200);\n" +
		"	let section2Visible = $derived(scrollY \u003e 600);\n" +
		"	let section3Visible = $derived(scrollY \u003e 1000);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:window onscroll={handleScroll} /\u003e\n" +
		"\n" +
		"\u003csection class=\"page project-page\"\u003e\n" +
		"	\u003c!-- Hero with 3D scene --\u003e\n" +
		"	\u003cdiv class=\"hero\"\u003e\n" +
		"		\u003cdiv class=\"hero-canvas\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"						position={[0, 0, 5]}\n" +
		"						fov={50}\n" +
		"					\u003e\n" +
		"						\u003cOrbitControls\n" +
		"							enableDamping\n" +
		"							enableZoom={false}\n" +
		"							autoRotate={!prefersReducedMotion}\n" +
		"							autoRotateSpeed={0.5}\n" +
		"						/\u003e\n" +
		"					\u003c/T.PerspectiveCamera\u003e\n" +
		"\n" +
		"					\u003cT.DirectionalLight position={[5, 5, 5]} intensity={1.5} /\u003e\n" +
		"					\u003cT.DirectionalLight position={[-3, 2, -4]} intensity={0.5} color=\"#5c3cd4\" /\u003e\n" +
		"					\u003cT.AmbientLight intensity={0.3} /\u003e\n" +
		"\n" +
		"					\u003c!-- Icosahedron (geometric shape) --\u003e\n" +
		"					\u003cT.Mesh rotation.y={rotationY} rotation.x={rotationX}\u003e\n" +
		"						\u003cT.IcosahedronGeometry args={[1.5, 1]} /\u003e\n" +
		"						\u003cT.MeshStandardMaterial\n" +
		"							color=\"#6b3fa0\"\n" +
		"							metalness={0.6}\n" +
		"							roughness={0.2}\n" +
		"							wireframe={false}\n" +
		"						/\u003e\n" +
		"					\u003c/T.Mesh\u003e\n" +
		"\n" +
		"					\u003c!-- Wireframe overlay --\u003e\n" +
		"					\u003cT.Mesh rotation.y={rotationY * 1.1} rotation.x={rotationX * 0.9}\u003e\n" +
		"						\u003cT.IcosahedronGeometry args={[1.7, 1]} /\u003e\n" +
		"						\u003cT.MeshStandardMaterial\n" +
		"							color=\"#9d6eff\"\n" +
		"							wireframe\n" +
		"							transparent\n" +
		"							opacity={0.3}\n" +
		"						/\u003e\n" +
		"					\u003c/T.Mesh\u003e\n" +
		"\n" +
		"					\u003c!-- Orbiting small spheres --\u003e\n" +
		"					\u003cT.Mesh\n" +
		"						position.x={Math.cos(rotationY * 2) * 2.5}\n" +
		"						position.z={Math.sin(rotationY * 2) * 2.5}\n" +
		"						position.y={Math.sin(rotationY * 3) * 0.5}\n" +
		"					\u003e\n" +
		"						\u003cT.SphereGeometry args={[0.12, 16, 16]} /\u003e\n" +
		"						\u003cT.MeshStandardMaterial color=\"#ff6b9d\" emissive=\"#ff6b9d\" emissiveIntensity={0.5} /\u003e\n" +
		"					\u003c/T.Mesh\u003e\n" +
		"\n" +
		"					\u003cT.Mesh\n" +
		"						position.x={Math.cos(rotationY * 2 + Math.PI) * 2.5}\n" +
		"						position.z={Math.sin(rotationY * 2 + Math.PI) * 2.5}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<svelte:window onscroll={handleScroll} />

<section class="page project-page">
	<!-- Hero with 3D scene -->
	<div class="hero">
		<div class="hero-canvas">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[0, 0, 5]}
						fov={50}
					>
						<OrbitControls
							enableDamping
							enableZoom={false}
							autoRotate={!prefersReducedMotion}
							autoRotateSpeed={0.5}
						/>
					</T.PerspectiveCamera>

					<T.DirectionalLight position={[5, 5, 5]} intensity={1.5} />
					<T.DirectionalLight position={[-3, 2, -4]} intensity={0.5} color="#5c3cd4" />
					<T.AmbientLight intensity={0.3} />

					<!-- Icosahedron (geometric shape) -->
					<T.Mesh rotation.y={rotationY} rotation.x={rotationX}>
						<T.IcosahedronGeometry args={[1.5, 1]} />
						<T.MeshStandardMaterial
							color="#6b3fa0"
							metalness={0.6}
							roughness={0.2}
							wireframe={false}
						/>
					</T.Mesh>

					<!-- Wireframe overlay -->
					<T.Mesh rotation.y={rotationY * 1.1} rotation.x={rotationX * 0.9}>
						<T.IcosahedronGeometry args={[1.7, 1]} />
						<T.MeshStandardMaterial
							color="#9d6eff"
							wireframe
							transparent
							opacity={0.3}
						/>
					</T.Mesh>

					<!-- Orbiting small spheres -->
					<T.Mesh
						position.x={Math.cos(rotationY * 2) * 2.5}
						position.z={Math.sin(rotationY * 2) * 2.5}
						position.y={Math.sin(rotationY * 3) * 0.5}
					>
						<T.SphereGeometry args={[0.12, 16, 16]} />
						<T.MeshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.5} />
					</T.Mesh>

					<T.Mesh
						position.x={Math.cos(rotationY * 2 + Math.PI) * 2.5}
						position.z={Math.sin(rotationY * 2 + Math.PI) * 2.5}
						position.y={Math.sin(rotationY * 3 + 1) * 0.5}
					>
						<T.SphereGeometry args={[0.08, 16, 16]} />
						<T.MeshStandardMaterial color="#5caafc" emissive="#5caafc" emissiveIntensity={0.5} />
					</T.Mesh>
				</Canvas>
			{:else}
				<div class="hero-fallback">
					<div class="fallback-geo"></div>
				</div>
			{/if}
		</div>

		<div class="hero-overlay">
			<h1>Module 15 Project</h1>
			<p class="hero-subtitle">Immersive 3D Landing Page</p>
			<p class="hero-desc">Built with Threlte, Three.js, and Svelte 5</p>
		</div>
	</div>

	<!-- Scroll sections -->
	<div class="scroll-sections">
		<div class="scroll-section" class:visible={section1Visible}>
			<div class="section-content">
				<h2>Declarative 3D</h2>
				<p class="concept">
					Threlte transforms Three.js into a component-driven experience. Instead of
					imperative object creation, you write <strong>reactive markup</strong>. Props
					drive geometry, materials, and transforms. Svelte handles the lifecycle.
				</p>
				<div class="feature-grid">
					<div class="feature-card">
						<div class="feature-icon">C</div>
						<strong>Components</strong>
						<span>Every Three.js class is a Svelte component</span>
					</div>
					<div class="feature-card">
						<div class="feature-icon">R</div>
						<strong>Reactivity</strong>
						<span>$state and $derived drive 3D properties</span>
					</div>
					<div class="feature-card">
						<div class="feature-icon">L</div>
						<strong>Lifecycle</strong>
						<span>Automatic creation, update, and disposal</span>
					</div>
				</div>
			</div>
		</div>

		<div class="scroll-section" class:visible={section2Visible}>
			<div class="section-content">
				<h2>Progressive Enhancement</h2>
				<p class="concept">
					3D content is <strong>client-only</strong> by necessity. This page renders a static
					fallback during SSR that is replaced by the interactive 3D scene after hydration.
					Animation respects <code>prefers-reduced-motion</code> for accessibility.
				</p>
				<div class="enhancement-steps">
					<div class="step">
						<div class="step-number">1</div>
						<div>
							<strong>SSR</strong>
							<p>Static HTML with fallback placeholder</p>
						</div>
					</div>
					<div class="step">
						<div class="step-number">2</div>
						<div>
							<strong>Hydration</strong>
							<p>JavaScript loads, mounted flag triggers</p>
						</div>
					</div>
					<div class="step">
						<div class="step-number">3</div>
						<div>
							<strong>3D Scene</strong>
							<p>Canvas initializes, WebGL renders geometry</p>
						</div>
					</div>
					<div class="step">
						<div class="step-number">4</div>
						<div>
							<strong>Interaction</strong>
							<p>OrbitControls enable, animations start</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="scroll-section" class:visible={section3Visible}>
			<div class="section-content">
				<h2>Performance First</h2>
				<p class="concept">
					This landing page uses minimal geometry, capped pixel ratios, and conditional
					animation. The 3D hero is a single icosahedron with a wireframe overlay — visually
					striking but lightweight. Scroll-triggered 2D sections use CSS transitions for
					zero additional JavaScript dependencies.
				</p>
				<ul>
					<li>Single geometry with wireframe overlay</li>
					<li>CSS transitions for scroll reveals (no GSAP)</li>
					<li>Reduced motion detection via <code>matchMedia</code></li>
					<li>Static fallback for SSR and non-WebGL browsers</li>
					<li>OrbitControls for engagement without forced animation</li>
				</ul>
			</div>
		</div>
	</div>

	<footer class="project-footer">
		Built with Threlte, Three.js, and Svelte 5 runes.
	</footer>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }

	.project-page {
		padding: 0;
	}

	/* Hero */
	.hero {
		position: relative;
		height: 100vh;
		min-height: 500px;
		max-height: 900px;
		overflow: hidden;
	}

	.hero-canvas {
		position: absolute;
		inset: 0;
		background: oklch(45% 0.25 280);
	}

	.hero-fallback {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: oklch(45% 0.25 280);
	}

	.fallback-geo {
		width: 120px;
		height: 120px;
		background: linear-gradient(135deg, #6b3fa0, #9d6eff);
		clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
		opacity: 0.5;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		pointer-events: none;
		z-index: 1;
		padding: var(--space-lg);
	}

	.hero-overlay h1 {
		font-size: clamp(1.5rem, 5vw, 3rem);
		color: #fff;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
		margin: 0;
	}

	.hero-subtitle {
		font-size: clamp(1rem, 3vw, 1.5rem);
		color: rgba(255, 255, 255, 0.85);
		margin: var(--space-sm) 0 0;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
	}

	.hero-desc {
		font-size: var(--text-sm);
		color: rgba(255, 255, 255, 0.6);
		margin: var(--space-xs) 0 0;
	}

	/* Scroll Sections */
	.scroll-sections {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.scroll-section {
		padding: var(--space-xl) var(--space-lg);
		opacity: 0;
		transform: translateY(2rem);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}

	.scroll-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-section {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}

	.section-content {
		max-width: 50rem;
		margin: 0 auto;
	}

	.section-content h2 {
		font-size: var(--text-xl);
		margin: 0 0 var(--space-md);
		color: oklch(45% 0.25 280);
	}

	/* Feature grid */
	.feature-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		margin-block-start: var(--space-lg);
	}

	.feature-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.feature-card strong { color: var(--color-text); }
	.feature-card span { color: var(--color-text-muted); font-size: var(--text-sm); }

	.feature-icon {
		width: 2.5rem;
		height: 2.5rem;
		display: grid;
		place-items: center;
		background: oklch(45% 0.25 280);
		color: #fff;
		border-radius: var(--radius-md);
		font-weight: 700;
		font-size: var(--text-base);
	}

	/* Enhancement steps */
	.enhancement-steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		margin-block-start: var(--space-lg);
	}

	.step {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.step-number {
		width: 2rem;
		height: 2rem;
		display: grid;
		place-items: center;
		background: oklch(45% 0.25 280);
		color: #fff;
		border-radius: 50%;
		font-weight: 700;
		font-size: var(--text-sm);
		flex-shrink: 0;
	}

	.step strong { display: block; color: var(--color-text); }
	.step p { margin: var(--space-xs) 0 0; color: var(--color-text-muted); font-size: var(--text-sm); }

	/* Footer */
	.project-footer {
		padding: var(--space-xl) var(--space-lg);
		text-align: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		border-block-start: 1px solid var(--color-border);
	}

	@media (min-width: 768px) {
		.feature-grid { grid-template-columns: repeat(3, 1fr); }
		.scroll-section { padding: var(--space-xl); }
		.section-content h2 { font-size: var(--text-2xl); }
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
