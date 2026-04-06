<script lang="ts">
	import { Canvas, T } from '@threlte/core';

	let mounted = $state(false);
	let rotationY = $state(0);
	let rotationX = $state(0);

	$effect(() => {
		mounted = true;
	});

	$effect(() => {
		if (!mounted) return;
		const interval = setInterval(() => {
			rotationY += 0.01;
			rotationX += 0.005;
		}, 16);
		return () => clearInterval(interval);
	});
</script>

<section class="page">
	<h1>15.1 — What Is Threlte</h1>

	<p class="concept">
		<strong>Threlte</strong> is a declarative 3D framework for Svelte, built on top of
		<strong>Three.js</strong>. Instead of imperative WebGL calls, you describe 3D scenes using
		Svelte components: <code>&lt;Canvas&gt;</code>, <code>&lt;T.Mesh&gt;</code>,
		<code>&lt;T.BoxGeometry&gt;</code>, and <code>&lt;T.MeshStandardMaterial&gt;</code>.
		Threlte bridges Svelte's reactivity system with Three.js's rendering pipeline.
	</p>

	<h3>The Three.js Rendering Pipeline</h3>
	<ul>
		<li><strong>Scene</strong> — the container for all 3D objects, lights, and cameras</li>
		<li><strong>Camera</strong> — defines the viewpoint (perspective or orthographic)</li>
		<li><strong>Renderer</strong> — converts the scene into pixels via WebGL</li>
		<li><strong>Mesh = Geometry + Material</strong> — shapes with surface appearance</li>
		<li><strong>Animation loop</strong> — <code>requestAnimationFrame</code> drives continuous updates</li>
	</ul>

	<h3>Why Threlte</h3>
	<p class="concept">
		Raw Three.js requires imperative setup: create a scene, add objects, manage the render loop,
		handle disposal. Threlte wraps all of this into <strong>reactive components</strong>.
		Props drive object properties. Svelte's lifecycle handles creation and cleanup. The
		<code>useTask</code> hook replaces manual animation loops.
	</p>

	<h3>Mini-Build: Rotating Cube</h3>
	<div class="build">
		<div class="canvas-container">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[3, 2, 5]}
						fov={50}
					/>
					<T.DirectionalLight
						position={[5, 5, 5]}
						intensity={1.5}
					/>
					<T.AmbientLight intensity={0.4} />
					<T.Mesh
						rotation.y={rotationY}
						rotation.x={rotationX}
					>
						<T.BoxGeometry args={[1.5, 1.5, 1.5]} />
						<T.MeshStandardMaterial color="#7c5cfc" />
					</T.Mesh>
				</Canvas>
			{:else}
				<div class="fallback">Loading 3D scene...</div>
			{/if}
		</div>

		<p class="concept">
			A rotating cube rendered with Threlte. The purple color (<code>#7c5cfc</code>) is an
			approximate hex conversion of <code>oklch(65% 0.22 270)</code>. Three.js materials
			require hex or RGB values — OKLCH is not supported in the WebGL pipeline.
		</p>
	</div>

	<h3>Key Concepts</h3>
	<ul>
		<li><code>&lt;Canvas&gt;</code> creates the WebGL renderer and scene</li>
		<li><code>&lt;T.*&gt;</code> components map to Three.js classes (Mesh, Light, Camera, etc.)</li>
		<li>Props like <code>position</code>, <code>rotation</code>, <code>color</code> are reactive</li>
		<li>SSR guard required — wrap <code>&lt;Canvas&gt;</code> in <code>{"{"} #if mounted {"}"}</code></li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	.canvas-container {
		width: 100%;
		height: 300px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: #1a1a2e;
	}

	.fallback {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { height: 400px; }
	}
</style>
