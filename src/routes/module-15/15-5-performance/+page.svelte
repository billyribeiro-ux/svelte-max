<script lang="ts">
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { Canvas, T } from '@threlte/core';
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { OrbitControls } from '@threlte/extras';

	let mounted = $state(false);
	let prefersReducedMotion = $state(false);
	let rotationY = $state(0);

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
			rotationY += 0.008;
		}, 16);
		return () => clearInterval(interval);
	});

	const implementationExample = `\u003cscript lang="ts"\u003e
  let mounted = $state(false);
  let prefersReducedMotion = $state(false);

  $effect(() => {
    mounted = true;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });
\u003c/script\u003e

{#if mounted}
  <Canvas>
    <!-- 3D content with conditional animation -->
  </Canvas>
{:else}
  <div class="fallback">
    <img src="/scene-preview.jpg" alt="3D scene preview" />
  </div>
{/if}`;
</script>

<section class="page">
	<h1>15.5 — 3D Performance</h1>

	<p class="concept">
		3D scenes are expensive. Every frame involves geometry processing, material shading, and
		rasterization. Good performance means <strong>fewer draw calls</strong>,
		<strong>lazy loading</strong>, <strong>SSR fallbacks</strong>, and respecting
		<strong>reduced motion</strong> preferences.
	</p>

	<h3>Performance Strategies</h3>
	<ul>
		<li><strong>Reduce draw calls</strong> — merge geometries, use instanced meshes for repeated objects</li>
		<li><strong>Level of Detail (LOD)</strong> — switch to simpler geometry at distance</li>
		<li><strong>Lazy loading</strong> — load heavy assets (textures, GLTF) only when visible</li>
		<li><strong>Dispose resources</strong> — Three.js does not garbage-collect GPU memory; call <code>.dispose()</code></li>
		<li><strong>Limit pixel ratio</strong> — cap <code>renderer.setPixelRatio()</code> at 2 on high-DPI screens</li>
		<li><strong>Frustum culling</strong> — enabled by default; objects outside camera view are skipped</li>
	</ul>

	<h3>SSR: 3D Must Be Client-Only</h3>
	<p class="concept">
		WebGL requires a browser context — it cannot run on the server. All Threlte scenes
		<strong>must</strong> be guarded with an <code>{"{"} #if mounted {"}"}</code> block or the route must
		set <code>export const ssr = false</code>. During SSR, show a static fallback (placeholder
		image, skeleton, or descriptive text) so the page is still meaningful before JavaScript loads.
	</p>

	<h3>Reduced Motion</h3>
	<p class="concept">
		Users with <code>prefers-reduced-motion: reduce</code> may experience discomfort from
		continuous 3D animations. Check the media query and disable auto-rotation, particle effects,
		and camera transitions. The scene can still be interactive — just not animated.
	</p>

	<h3>Mini-Build: Progressive Enhancement</h3>
	<div class="build">
		<p class="concept">
			This scene demonstrates progressive enhancement: a static placeholder is shown during SSR
			and before mount. Once hydrated, the 3D scene replaces it. Animation respects
			<code>prefers-reduced-motion</code>.
		</p>

		<div class="status-bar">
			<span class="status-item">
				Mounted: <strong>{mounted ? 'Yes' : 'No'}</strong>
			</span>
			<span class="status-item">
				Reduced motion: <strong>{prefersReducedMotion ? 'Yes' : 'No'}</strong>
			</span>
			<span class="status-item">
				Animation: <strong>{mounted && !prefersReducedMotion ? 'Running' : 'Paused'}</strong>
			</span>
		</div>

		<div class="canvas-container">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[3, 2, 5]}
						fov={50}
					>
						<OrbitControls enableDamping />
					</T.PerspectiveCamera>

					<T.DirectionalLight position={[5, 8, 5]} intensity={1.5} />
					<T.AmbientLight intensity={0.4} />

					<!-- Torus knot with conditional rotation -->
					<T.Mesh rotation.y={rotationY} position.y={0.5}>
						<T.TorusKnotGeometry args={[0.8, 0.3, 128, 16]} />
						<T.MeshStandardMaterial
							color="#7c5cfc"
							metalness={0.4}
							roughness={0.3}
						/>
					</T.Mesh>

					<!-- Ground -->
					<T.Mesh rotation.x={-Math.PI / 2} position.y={-1}>
						<T.PlaneGeometry args={[10, 10]} />
						<T.MeshStandardMaterial color="#1a1a2e" />
					</T.Mesh>
				</Canvas>
			{:else}
				<div class="fallback">
					<div class="fallback-shape"></div>
					<p>3D scene loading...</p>
					<p class="fallback-sub">A torus knot rendered with Threlte and Three.js</p>
				</div>
			{/if}
		</div>
	</div>

	<h3>Implementation Pattern</h3>
	<pre><code>{implementationExample}</code></pre>

	<h3>Checklist</h3>
	<ul>
		<li>Wrap all Threlte content in <code>{"{"} #if mounted {"}"}</code></li>
		<li>Provide a meaningful fallback for SSR/pre-hydration</li>
		<li>Respect <code>prefers-reduced-motion</code> for animations</li>
		<li>Dispose Three.js resources on component unmount</li>
		<li>Lazy-load heavy models and textures</li>
		<li>Test on low-end devices — cap pixel ratio and polygon count</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.canvas-container {
		width: 100%;
		height: 350px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: #1a1a2e;
	}

	.fallback {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.fallback-shape {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, #7c5cfc 0%, #5c3cd4 100%);
		border-radius: 30%;
		opacity: 0.6;
	}

	.fallback-sub {
		font-size: 0.75rem;
		opacity: 0.6;
	}

	.status-bar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.status-item strong { color: var(--color-text); }

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { height: 450px; }
	}
</style>
