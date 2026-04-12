<script lang="ts">
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { Canvas, T } from '@threlte/core';
	// @ts-ignore — Threlte types not fully compatible with strict mode
	import { OrbitControls } from '@threlte/extras';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"// @ts-ignore — Threlte types not fully compatible with strict mode\n" +
		"	import { Canvas, T } from '@threlte/core';\n" +
		"	// @ts-ignore — Threlte types not fully compatible with strict mode\n" +
		"	import { OrbitControls } from '@threlte/extras';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"	let prefersReducedMotion = $state(false);\n" +
		"	let rotationY = $state(0);\n" +
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
		"			rotationY += 0.008;\n" +
		"		}, 16);\n" +
		"		return () =\u003e clearInterval(interval);\n" +
		"	});\n" +
		"\n" +
		"	const implementationExample = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  let mounted = $state(false);\n" +
		"  let prefersReducedMotion = $state(false);\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    mounted = true;\n" +
		"    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');\n" +
		"    prefersReducedMotion = mq.matches;\n" +
		"    const handler = (e: MediaQueryListEvent) =\u003e {\n" +
		"      prefersReducedMotion = e.matches;\n" +
		"    };\n" +
		"    mq.addEventListener('change', handler);\n" +
		"    return () =\u003e mq.removeEventListener('change', handler);\n" +
		"  });\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"{#if mounted}\n" +
		"  \u003cCanvas\u003e\n" +
		"    \u003c!-- 3D content with conditional animation --\u003e\n" +
		"  \u003c/Canvas\u003e\n" +
		"{:else}\n" +
		"  \u003cdiv class=\"fallback\"\u003e\n" +
		"    \u003cimg src=\"/scene-preview.jpg\" alt=\"3D scene preview\" /\u003e\n" +
		"  \u003c/div\u003e\n" +
		"{/if}`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e15.5 — 3D Performance\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		3D scenes are expensive. Every frame involves geometry processing, material shading, and\n" +
		"		rasterization. Good performance means \u003cstrong\u003efewer draw calls\u003c/strong\u003e,\n" +
		"		\u003cstrong\u003elazy loading\u003c/strong\u003e, \u003cstrong\u003eSSR fallbacks\u003c/strong\u003e, and respecting\n" +
		"		\u003cstrong\u003ereduced motion\u003c/strong\u003e preferences.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003ePerformance Strategies\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eReduce draw calls\u003c/strong\u003e — merge geometries, use instanced meshes for repeated objects\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eLevel of Detail (LOD)\u003c/strong\u003e — switch to simpler geometry at distance\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eLazy loading\u003c/strong\u003e — load heavy assets (textures, GLTF) only when visible\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eDispose resources\u003c/strong\u003e — Three.js does not garbage-collect GPU memory; call \u003ccode\u003e.dispose()\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eLimit pixel ratio\u003c/strong\u003e — cap \u003ccode\u003erenderer.setPixelRatio()\u003c/code\u003e at 2 on high-DPI screens\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eFrustum culling\u003c/strong\u003e — enabled by default; objects outside camera view are skipped\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSSR: 3D Must Be Client-Only\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		WebGL requires a browser context — it cannot run on the server. All Threlte scenes\n" +
		"		\u003cstrong\u003emust\u003c/strong\u003e be guarded with an \u003ccode\u003e{\"{\"} #if mounted {\"}\"}\u003c/code\u003e block or the route must\n" +
		"		set \u003ccode\u003eexport const ssr = false\u003c/code\u003e. During SSR, show a static fallback (placeholder\n" +
		"		image, skeleton, or descriptive text) so the page is still meaningful before JavaScript loads.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eReduced Motion\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Users with \u003ccode\u003eprefers-reduced-motion: reduce\u003c/code\u003e may experience discomfort from\n" +
		"		continuous 3D animations. Check the media query and disable auto-rotation, particle effects,\n" +
		"		and camera transitions. The scene can still be interactive — just not animated.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: Progressive Enhancement\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This scene demonstrates progressive enhancement: a static placeholder is shown during SSR\n" +
		"			and before mount. Once hydrated, the 3D scene replaces it. Animation respects\n" +
		"			\u003ccode\u003eprefers-reduced-motion\u003c/code\u003e.\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"status-bar\"\u003e\n" +
		"			\u003cspan class=\"status-item\"\u003e\n" +
		"				Mounted: \u003cstrong\u003e{mounted ? 'Yes' : 'No'}\u003c/strong\u003e\n" +
		"			\u003c/span\u003e\n" +
		"			\u003cspan class=\"status-item\"\u003e\n" +
		"				Reduced motion: \u003cstrong\u003e{prefersReducedMotion ? 'Yes' : 'No'}\u003c/strong\u003e\n" +
		"			\u003c/span\u003e\n" +
		"			\u003cspan class=\"status-item\"\u003e\n" +
		"				Animation: \u003cstrong\u003e{mounted && !prefersReducedMotion ? 'Running' : 'Paused'}\u003c/strong\u003e\n" +
		"			\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"canvas-container\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment demonstrates a 3D performance anti-pattern. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>prefers-reduced-motion</code> check and let the animation run unconditionally.</strong> Users who have enabled reduced motion in their OS settings now see continuous rotation that they cannot stop. This can cause motion sickness or discomfort for users with vestibular disorders. The media query check is not a nice-to-have; it is an accessibility requirement.</li>
		<li><strong>Replace the single torus knot with 500 individual <code>{'<T.Mesh>'}</code> components in a loop.</strong> The frame rate drops dramatically because each mesh is a separate draw call. The GPU can handle millions of triangles but struggles with thousands of individual draw calls. This is why instanced meshes (one draw call for many copies) and geometry merging are essential for scenes with repeated objects.</li>
		<li><strong>Remove the <code>{'{:else}'}</code> fallback from the <code>{'{#if mounted}'}</code> block.</strong> During SSR and before hydration, the page shows nothing where the 3D scene should be. Users on slow connections see a blank gap until JavaScript loads and mounts the canvas. A meaningful fallback (placeholder image, descriptive text) ensures the page is useful before the 3D content appears.</li>
		<li><strong>Set <code>renderer.setPixelRatio(window.devicePixelRatio)</code> without capping it.</strong> On a high-DPI display (3x or 4x pixel ratio), the renderer draws 9 to 16 times more pixels than a 1x display. The GPU load spikes, battery drains faster on mobile, and the frame rate may drop. Capping the pixel ratio at 2 provides sharp rendering without the performance penalty of rendering at full native resolution.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">3D scenes are expensive by nature. Every frame involves geometry processing, material shading, and rasterization across potentially millions of pixels. The primary performance lever is reducing draw calls: merge geometries when objects share the same material, use instanced meshes for repeated objects, and enable frustum culling (on by default) so objects outside the camera's view are skipped. Level of Detail (LOD) switches to simpler geometry at distance, and lazy loading defers heavy assets until they are visible.</p>
	<p class="prose">Server-side rendering compatibility requires guarding all Threlte content with an <code>{'{#if mounted}'}</code> block because WebGL cannot run on the server. The fallback shown during SSR and pre-hydration should be meaningful: a static preview image, a descriptive paragraph, or a skeleton placeholder. This ensures the page is useful and accessible before JavaScript loads. For routes that are entirely 3D, setting <code>export const ssr = false</code> in the page's <code>+page.ts</code> is an alternative.</p>
	<p class="prose">Respecting <code>prefers-reduced-motion</code> is an accessibility requirement, not a feature toggle. Check the media query with <code>window.matchMedia</code> and disable auto-rotation, particle effects, and camera transitions when the user prefers reduced motion. The scene can remain interactive (click, drag, zoom) but should not animate continuously. Finally, always dispose Three.js resources on component unmount because GPU memory is not garbage-collected. Threlte handles disposal for components in its tree, but manually created objects must be disposed explicitly.</p>
	<p class="next">Next, you will apply everything from this module in the Threlte project to build a complete interactive 3D scene with performance best practices.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }

	.canvas-container {
		inline-size: 100%;
		block-size: 350px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: oklch(15% 0.03 270);
	}

	.fallback {
		inline-size: 100%;
		block-size: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.fallback-shape {
		inline-size: 80px;
		block-size: 80px;
		background: linear-gradient(135deg, oklch(55% 0.25 270) 0%, oklch(42% 0.25 270) 100%);
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

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { block-size: 450px; }
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
