<script lang="ts">
	import { Canvas, T } from '@threlte/core';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Canvas, T } from '@threlte/core';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"	let rotationY = $state(0);\n" +
		"	let rotationX = $state(0);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		mounted = true;\n" +
		"	});\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		if (!mounted) return;\n" +
		"		const interval = setInterval(() =\u003e {\n" +
		"			rotationY += 0.01;\n" +
		"			rotationX += 0.005;\n" +
		"		}, 16);\n" +
		"		return () =\u003e clearInterval(interval);\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e15.1 — What Is Threlte\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eThrelte\u003c/strong\u003e is a declarative 3D framework for Svelte, built on top of\n" +
		"		\u003cstrong\u003eThree.js\u003c/strong\u003e. Instead of imperative WebGL calls, you describe 3D scenes using\n" +
		"		Svelte components: \u003ccode\u003e&lt;Canvas&gt;\u003c/code\u003e, \u003ccode\u003e&lt;T.Mesh&gt;\u003c/code\u003e,\n" +
		"		\u003ccode\u003e&lt;T.BoxGeometry&gt;\u003c/code\u003e, and \u003ccode\u003e&lt;T.MeshStandardMaterial&gt;\u003c/code\u003e.\n" +
		"		Threlte bridges Svelte's reactivity system with Three.js's rendering pipeline.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Three.js Rendering Pipeline\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eScene\u003c/strong\u003e — the container for all 3D objects, lights, and cameras\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eCamera\u003c/strong\u003e — defines the viewpoint (perspective or orthographic)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eRenderer\u003c/strong\u003e — converts the scene into pixels via WebGL\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eMesh = Geometry + Material\u003c/strong\u003e — shapes with surface appearance\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eAnimation loop\u003c/strong\u003e — \u003ccode\u003erequestAnimationFrame\u003c/code\u003e drives continuous updates\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhy Threlte\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Raw Three.js requires imperative setup: create a scene, add objects, manage the render loop,\n" +
		"		handle disposal. Threlte wraps all of this into \u003cstrong\u003ereactive components\u003c/strong\u003e.\n" +
		"		Props drive object properties. Svelte's lifecycle handles creation and cleanup. The\n" +
		"		\u003ccode\u003euseTask\u003c/code\u003e hook replaces manual animation loops.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: Rotating Cube\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"canvas-container\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"						position={[3, 2, 5]}\n" +
		"						fov={50}\n" +
		"					/\u003e\n" +
		"					\u003cT.DirectionalLight\n" +
		"						position={[5, 5, 5]}\n" +
		"						intensity={1.5}\n" +
		"					/\u003e\n" +
		"					\u003cT.AmbientLight intensity={0.4} /\u003e\n" +
		"					\u003cT.Mesh\n" +
		"						rotation.y={rotationY}\n" +
		"						rotation.x={rotationX}\n" +
		"					\u003e\n" +
		"						\u003cT.BoxGeometry args={[1.5, 1.5, 1.5]} /\u003e\n" +
		"						\u003cT.MeshStandardMaterial color=\"#7c5cfc\" /\u003e\n" +
		"					\u003c/T.Mesh\u003e\n" +
		"				\u003c/Canvas\u003e\n" +
		"			{:else}\n" +
		"				\u003cdiv class=\"fallback\"\u003eLoading 3D scene...\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			A rotating cube rendered with Threlte. The purple color (\u003ccode\u003e#7c5cfc\u003c/code\u003e) is an\n" +
		"			approximate hex conversion of \u003ccode\u003eoklch(65% 0.22 270)\u003c/code\u003e. Three.js materials\n" +
		"			require hex or RGB values — OKLCH is not supported in the WebGL pipeline.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Concepts\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e&lt;Canvas&gt;\u003c/code\u003e creates the WebGL renderer and scene\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e&lt;T.*&gt;\u003c/code\u003e components map to Three.js classes (Mesh, Light, Camera, etc.)\u003c/li\u003e\n" +
		"		\u003cli\u003eProps like \u003ccode\u003eposition\u003c/code\u003e, \u003ccode\u003erotation\u003c/code\u003e, \u003ccode\u003ecolor\u003c/code\u003e are reactive\u003c/li\u003e\n" +
		"		\u003cli\u003eSSR guard required — wrap \u003ccode\u003e&lt;Canvas&gt;\u003c/code\u003e in \u003ccode\u003e{\"{\"} #if mounted {\"}\"}\u003c/code\u003e\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eThrelte is a declarative 3D framework for Svelte built on Three.js.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e&lt;Canvas&gt;\u003c/code\u003e creates the WebGL renderer, and \u003ccode\u003e&lt;T.*&gt;\u003c/code\u003e components map to Three.js classes.\u003c/li\u003e\n" +
		"		\u003cli\u003eProps like \u003ccode\u003eposition\u003c/code\u003e, \u003ccode\u003erotation\u003c/code\u003e, and \u003ccode\u003ecolor\u003c/code\u003e are reactive and update the scene automatically.\u003c/li\u003e\n" +
		"		\u003cli\u003eThrelte scenes must be client-only — guard with \u003ccode\u003e{\"{\"} #if mounted {\"}\"}\u003c/code\u003e to avoid SSR errors.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a Threlte/Three.js integration boundary. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>{'{#if mounted}'}</code> guard around the <code>{'<Canvas>'}</code> component.</strong> The page crashes during SSR because Three.js attempts to access the <code>window</code> and <code>document</code> objects, which do not exist on the server. WebGL is a browser-only API, and every Threlte scene must be guarded against server-side rendering.</li>
		<li><strong>Remove the <code>{'<T.PerspectiveCamera>'}</code> component from the scene.</strong> The canvas renders a blank black rectangle because there is no camera to define the viewpoint. Three.js requires at least one camera with <code>makeDefault</code> to know from which perspective to render the scene. Without a camera, geometry exists in the scene graph but is never projected to pixels.</li>
		<li><strong>Remove both light components (<code>{'<T.DirectionalLight>'}</code> and <code>{'<T.AmbientLight>'}</code>).</strong> The cube appears completely black because <code>MeshStandardMaterial</code> is a physically-based material that requires light to be visible. Without illumination, the material reflects no photons and renders as a black silhouette.</li>
		<li><strong>Pass an OKLCH color value like <code>oklch(65% 0.22 270)</code> directly to the material's <code>color</code> prop.</strong> Three.js does not understand CSS color functions. The material either renders white (fallback) or throws an error. Three.js materials accept hex strings, CSS named colors, or RGB values. OKLCH must be converted to hex before passing to a Three.js material.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Threlte is a declarative 3D framework for Svelte that wraps Three.js in reactive components. Instead of imperative WebGL calls (create a scene, add a mesh, manage the render loop), you describe 3D scenes using Svelte components: <code>{'<Canvas>'}</code> creates the WebGL renderer and scene, <code>{'<T.Mesh>'}</code> creates a mesh, <code>{'<T.BoxGeometry>'}</code> defines the shape, and <code>{'<T.MeshStandardMaterial>'}</code> defines the surface. The <code>T</code> namespace maps directly to Three.js class constructors.</p>
	<p class="prose">Props like <code>position</code>, <code>rotation</code>, and <code>color</code> are fully reactive. When a <code>$state</code> or <code>$derived</code> value changes, Threlte updates the corresponding Three.js object property and the scene re-renders automatically. This eliminates the manual render-loop management that raw Three.js requires. Svelte's lifecycle also handles creation and cleanup: when a component is destroyed, Threlte disposes the associated Three.js objects to free GPU memory.</p>
	<p class="prose">The critical constraint is that all Threlte content must be client-only. WebGL requires a browser context with a canvas element and GPU access, neither of which exists during server-side rendering. Guard every <code>{'<Canvas>'}</code> with an <code>{'{#if mounted}'}</code> block where <code>mounted</code> is set to <code>true</code> inside an <code>$effect</code>. This ensures the 3D scene only mounts after hydration, while the SSR output shows a fallback placeholder.</p>
	<p class="next">Next, you will learn how cameras, lights, and OrbitControls create interactive 3D scenes with Threlte.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
