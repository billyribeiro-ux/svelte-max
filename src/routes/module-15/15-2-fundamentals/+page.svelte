<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let mounted = $state(false);
	let directionalIntensity = $state(1.5);
	let ambientIntensity = $state(0.3);

	$effect(() => {
		mounted = true;
	});


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Canvas, T } from '@threlte/core';\n" +
		"	import { OrbitControls } from '@threlte/extras';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"	let directionalIntensity = $state(1.5);\n" +
		"	let ambientIntensity = $state(0.3);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		mounted = true;\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e15.2 — Canvas, Camera, and Lights\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Every Threlte scene starts with three fundamentals: a \u003cstrong\u003eCanvas\u003c/strong\u003e (the renderer),\n" +
		"		a \u003cstrong\u003eCamera\u003c/strong\u003e (the viewpoint), and \u003cstrong\u003eLights\u003c/strong\u003e (illumination).\n" +
		"		\u003ccode\u003eOrbitControls\u003c/code\u003e from \u003ccode\u003e@threlte/extras\u003c/code\u003e adds mouse/touch-driven camera\n" +
		"		rotation for interactive exploration.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eCamera Types\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003ePerspectiveCamera\u003c/strong\u003e — mimics human vision with foreshortening; use for most 3D scenes\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eOrthographicCamera\u003c/strong\u003e — no perspective distortion; use for 2D-style or technical views\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003emakeDefault\u003c/code\u003e prop — tells Threlte to use this camera for rendering\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eposition\u003c/code\u003e — \u003ccode\u003e[x, y, z]\u003c/code\u003e array placing the camera in world space\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLight Types\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eAmbientLight\u003c/strong\u003e — uniform illumination from all directions (no shadows)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eDirectionalLight\u003c/strong\u003e — parallel rays like the sun (casts shadows)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003ePointLight\u003c/strong\u003e — emits from a point in all directions (like a bulb)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eSpotLight\u003c/strong\u003e — cone-shaped beam (like a flashlight)\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: Interactive Scene\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				Directional Light: {directionalIntensity.toFixed(1)}\n" +
		"				\u003cinput\n" +
		"					type=\"range\"\n" +
		"					min=\"0\"\n" +
		"					max=\"5\"\n" +
		"					step=\"0.1\"\n" +
		"					bind:value={directionalIntensity}\n" +
		"				/\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			\u003clabel class=\"slider-label\"\u003e\n" +
		"				Ambient Light: {ambientIntensity.toFixed(1)}\n" +
		"				\u003cinput\n" +
		"					type=\"range\"\n" +
		"					min=\"0\"\n" +
		"					max=\"2\"\n" +
		"					step=\"0.1\"\n" +
		"					bind:value={ambientIntensity}\n" +
		"				/\u003e\n" +
		"			\u003c/label\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"canvas-container\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"						position={[4, 3, 6]}\n" +
		"						fov={45}\n" +
		"					\u003e\n" +
		"						\u003cOrbitControls\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>15.2 — Canvas, Camera, and Lights</h1>

	<p class="concept">
		Every Threlte scene starts with three fundamentals: a <strong>Canvas</strong> (the renderer),
		a <strong>Camera</strong> (the viewpoint), and <strong>Lights</strong> (illumination).
		<code>OrbitControls</code> from <code>@threlte/extras</code> adds mouse/touch-driven camera
		rotation for interactive exploration.
	</p>

	<h3>Camera Types</h3>
	<ul>
		<li><strong>PerspectiveCamera</strong> — mimics human vision with foreshortening; use for most 3D scenes</li>
		<li><strong>OrthographicCamera</strong> — no perspective distortion; use for 2D-style or technical views</li>
		<li><code>makeDefault</code> prop — tells Threlte to use this camera for rendering</li>
		<li><code>position</code> — <code>[x, y, z]</code> array placing the camera in world space</li>
	</ul>

	<h3>Light Types</h3>
	<ul>
		<li><strong>AmbientLight</strong> — uniform illumination from all directions (no shadows)</li>
		<li><strong>DirectionalLight</strong> — parallel rays like the sun (casts shadows)</li>
		<li><strong>PointLight</strong> — emits from a point in all directions (like a bulb)</li>
		<li><strong>SpotLight</strong> — cone-shaped beam (like a flashlight)</li>
	</ul>

	<h3>Mini-Build: Interactive Scene</h3>
	<div class="build">
		<div class="controls">
			<label class="slider-label">
				Directional Light: {directionalIntensity.toFixed(1)}
				<input
					type="range"
					min="0"
					max="5"
					step="0.1"
					bind:value={directionalIntensity}
				/>
			</label>
			<label class="slider-label">
				Ambient Light: {ambientIntensity.toFixed(1)}
				<input
					type="range"
					min="0"
					max="2"
					step="0.1"
					bind:value={ambientIntensity}
				/>
			</label>
		</div>

		<div class="canvas-container">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[4, 3, 6]}
						fov={45}
					>
						<OrbitControls
							enableDamping
							autoRotate={false}
						/>
					</T.PerspectiveCamera>

					<T.DirectionalLight
						position={[5, 8, 5]}
						intensity={directionalIntensity}
						castShadow
					/>
					<T.AmbientLight intensity={ambientIntensity} />

					<!-- Ground plane -->
					<T.Mesh
						rotation.x={-Math.PI / 2}
						position.y={-0.5}
						receiveShadow
					>
						<T.PlaneGeometry args={[10, 10]} />
						<T.MeshStandardMaterial color="#2a2a3e" />
					</T.Mesh>

					<!-- Box -->
					<T.Mesh position={[-1.5, 0.5, 0]} castShadow>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshStandardMaterial color="#7c5cfc" />
					</T.Mesh>

					<!-- Sphere -->
					<T.Mesh position={[1.5, 0.5, 0]} castShadow>
						<T.SphereGeometry args={[0.6, 32, 32]} />
						<T.MeshStandardMaterial color="#fc5c8a" />
					</T.Mesh>
				</Canvas>
			{:else}
				<div class="fallback">Loading 3D scene...</div>
			{/if}
		</div>

		<p class="concept">
			Drag to orbit the camera. Adjust sliders to see how light intensity affects the scene.
			The <code>OrbitControls</code> component is nested inside the camera — this is how
			Threlte attaches controls to a specific camera instance.
		</p>
	</div>

	<h3>OrbitControls</h3>
	<ul>
		<li>Import from <code>@threlte/extras</code></li>
		<li>Nest inside <code>&lt;T.PerspectiveCamera&gt;</code></li>
		<li><code>enableDamping</code> adds smooth deceleration</li>
		<li><code>autoRotate</code> enables automatic camera rotation</li>
		<li>Touch-friendly — pinch to zoom, drag to orbit on mobile</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment demonstrates how camera and light settings affect the 3D scene. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Set both light intensities to zero using the sliders.</strong> The scene goes completely dark. All physically-based materials require light to be visible. This demonstrates that unlike CSS where elements have inherent color, 3D materials only reflect the light that hits them. Zero light means zero visibility regardless of the material color.</li>
		<li><strong>Move the <code>{'<OrbitControls>'}</code> outside the camera component (make it a sibling instead of a child).</strong> The controls no longer attach to the camera. Threlte uses the parent-child relationship to determine which camera the controls should manipulate. As a sibling, OrbitControls has no camera reference and either errors or does nothing.</li>
		<li><strong>Remove the <code>makeDefault</code> prop from the <code>PerspectiveCamera</code>.</strong> The scene renders blank because no camera is designated as the default. Threlte needs to know which camera to use for rendering when multiple cameras might exist in the scene. Without <code>makeDefault</code>, the renderer has no viewpoint.</li>
		<li><strong>Set the camera <code>fov</code> (field of view) to an extreme value like 150.</strong> The scene becomes severely fish-eyed with extreme barrel distortion. Objects at the edges of the viewport are stretched dramatically. Typical FOV values range from 35 (telephoto, flat look) to 75 (wide angle). Values above 90 produce unrealistic distortion that most users find disorienting.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Every Threlte scene requires three foundational elements: a <code>Canvas</code> (the WebGL renderer), a <code>Camera</code> (the viewpoint), and at least one <code>Light</code> (illumination). The <code>PerspectiveCamera</code> mimics human vision with foreshortening and is used for most 3D scenes. The <code>OrthographicCamera</code> removes perspective distortion and is ideal for 2D-style or technical views. The <code>makeDefault</code> prop tells Threlte which camera to use for rendering.</p>
	<p class="prose">Light types serve different purposes. <code>AmbientLight</code> provides uniform illumination from all directions without casting shadows, acting as a fill light. <code>DirectionalLight</code> simulates parallel rays like sunlight and casts sharp shadows. <code>PointLight</code> emits from a single point in all directions like a light bulb, and <code>SpotLight</code> creates a cone-shaped beam like a flashlight. Combining ambient and directional lights is the most common setup for general 3D scenes.</p>
	<p class="prose"><code>OrbitControls</code> from <code>@threlte/extras</code> adds mouse and touch-driven camera interaction. It must be nested inside the camera component it controls, establishing the parent-child relationship Threlte uses for attachment. The <code>enableDamping</code> prop adds smooth deceleration when the user releases the mouse, and <code>autoRotate</code> enables continuous camera rotation. OrbitControls is touch-friendly by default, supporting pinch-to-zoom and drag-to-orbit on mobile devices.</p>
	<p class="next">Next, you will learn how Svelte's reactivity system drives 3D object properties for real-time scene updates.</p>
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
		inline-size: 100%;
		block-size: 350px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: oklch(15% 0.03 270);
	}

	.fallback {
		inline-size: 100%;
		block-size: 100%;
		display: grid;
		place-items: center;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.slider-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	input[type="range"] {
		inline-size: 100%;
		accent-color: var(--color-primary);
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { block-size: 450px; }
		.controls { flex-direction: row; }
		.slider-label { flex: 1; }
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
