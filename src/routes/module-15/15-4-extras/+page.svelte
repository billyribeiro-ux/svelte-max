<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls, Text, Environment, ContactShadows } from '@threlte/extras';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let mounted = $state(false);
	let clickedMesh = $state<string | null>(null);
	let textContent = $state('Threlte');

	$effect(() => {
		mounted = true;
	});

	function handleMeshClick(name: string) {
		clickedMesh = name;
		setTimeout(() => { clickedMesh = null; }, 1500);
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Canvas, T } from '@threlte/core';\n" +
		"	import { OrbitControls, Text, Environment, ContactShadows } from '@threlte/extras';\n" +
		"\n" +
		"	let mounted = $state(false);\n" +
		"	let clickedMesh = $state\u003cstring | null\u003e(null);\n" +
		"	let textContent = $state('Threlte');\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		mounted = true;\n" +
		"	});\n" +
		"\n" +
		"	function handleMeshClick(name: string) {\n" +
		"		clickedMesh = name;\n" +
		"		setTimeout(() =\u003e { clickedMesh = null; }, 1500);\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e15.4 — Text, Environment, and Extras\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003e@threlte/extras\u003c/strong\u003e provides high-level components that extend Threlte beyond basic\n" +
		"		geometries. \u003ccode\u003e&lt;Text&gt;\u003c/code\u003e renders 3D text using SDF fonts.\n" +
		"		\u003ccode\u003e&lt;Environment&gt;\u003c/code\u003e creates image-based lighting for realistic reflections.\n" +
		"		The \u003ccode\u003einteractivity\u003c/code\u003e plugin enables pointer events on 3D objects.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Extras Components\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eText\u003c/strong\u003e — 3D text rendered via Troika (SDF-based, resolution-independent)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eEnvironment\u003c/strong\u003e — HDR-like ambient lighting using presets or custom images\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eContactShadows\u003c/strong\u003e — soft ground shadows without shadow maps\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eOrbitControls\u003c/strong\u003e — camera interaction (covered in 15.2)\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eFloat / MeshWobbleMaterial\u003c/strong\u003e — animation helpers\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eGLTF Loading\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		For production 3D assets, you would load \u003cstrong\u003eGLTF/GLB models\u003c/strong\u003e using Threlte's\n" +
		"		\u003ccode\u003euseGltf\u003c/code\u003e hook or the \u003ccode\u003e&lt;GLTF&gt;\u003c/code\u003e component from extras. The pattern\n" +
		"		looks like: \u003ccode\u003e{\"const { scene } = useGltf('/model.glb')\"}\u003c/code\u003e. We do not load actual GLTF\n" +
		"		files here, but the concept is the same as loading images — provide a URL, await the asset,\n" +
		"		and place it in the scene.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eMini-Build: Text and Clickable Meshes\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003clabel class=\"input-label\"\u003e\n" +
		"				3D Text:\n" +
		"				\u003cinput type=\"text\" bind:value={textContent} maxlength={20} class=\"text-input\" /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"			{#if clickedMesh}\n" +
		"				\u003cdiv class=\"click-indicator\"\u003e\n" +
		"					Clicked: \u003cstrong\u003e{clickedMesh}\u003c/strong\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"canvas-container\"\u003e\n" +
		"			{#if mounted}\n" +
		"				\u003cCanvas\u003e\n" +
		"					\u003cT.PerspectiveCamera\n" +
		"						makeDefault\n" +
		"						position={[0, 2, 7]}\n" +
		"						fov={45}\n" +
		"					\u003e\n" +
		"						\u003cOrbitControls enableDamping /\u003e\n" +
		"					\u003c/T.PerspectiveCamera\u003e\n" +
		"\n" +
		"					\u003cT.DirectionalLight position={[5, 8, 5]} intensity={1.2} /\u003e\n" +
		"					\u003cT.AmbientLight intensity={0.5} /\u003e\n" +
		"\n" +
		"					\u003c!-- 3D Text --\u003e\n" +
		"					\u003cText\n" +
		"						text={textContent}\n" +
		"						position={[0, 2.5, 0]}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>15.4 — Text, Environment, and Extras</h1>

	<p class="concept">
		<strong>@threlte/extras</strong> provides high-level components that extend Threlte beyond basic
		geometries. <code>&lt;Text&gt;</code> renders 3D text using SDF fonts.
		<code>&lt;Environment&gt;</code> creates image-based lighting for realistic reflections.
		The <code>interactivity</code> plugin enables pointer events on 3D objects.
	</p>

	<h3>Key Extras Components</h3>
	<ul>
		<li><strong>Text</strong> — 3D text rendered via Troika (SDF-based, resolution-independent)</li>
		<li><strong>Environment</strong> — HDR-like ambient lighting using presets or custom images</li>
		<li><strong>ContactShadows</strong> — soft ground shadows without shadow maps</li>
		<li><strong>OrbitControls</strong> — camera interaction (covered in 15.2)</li>
		<li><strong>Float / MeshWobbleMaterial</strong> — animation helpers</li>
	</ul>

	<h3>GLTF Loading</h3>
	<p class="concept">
		For production 3D assets, you would load <strong>GLTF/GLB models</strong> using Threlte's
		<code>useGltf</code> hook or the <code>&lt;GLTF&gt;</code> component from extras. The pattern
		looks like: <code>{"const { scene } = useGltf('/model.glb')"}</code>. We do not load actual GLTF
		files here, but the concept is the same as loading images — provide a URL, await the asset,
		and place it in the scene.
	</p>

	<h3>Mini-Build: Text and Clickable Meshes</h3>
	<div class="build">
		<div class="controls">
			<label class="input-label">
				3D Text:
				<input type="text" bind:value={textContent} maxlength={20} class="text-input" />
			</label>
			{#if clickedMesh}
				<div class="click-indicator">
					Clicked: <strong>{clickedMesh}</strong>
				</div>
			{/if}
		</div>

		<div class="canvas-container">
			{#if mounted}
				<Canvas>
					<T.PerspectiveCamera
						makeDefault
						position={[0, 2, 7]}
						fov={45}
					>
						<OrbitControls enableDamping />
					</T.PerspectiveCamera>

					<T.DirectionalLight position={[5, 8, 5]} intensity={1.2} />
					<T.AmbientLight intensity={0.5} />

					<!-- 3D Text -->
					<Text
						text={textContent}
						position={[0, 2.5, 0]}
						fontSize={0.8}
						color="#7c5cfc"
						anchorX="center"
						anchorY="middle"
						font="/fonts/Inter-Bold.woff"
					/>

					<!-- Clickable cube -->
					<T.Mesh
						position={[-2, 0.5, 0]}
						onclick={() => handleMeshClick('Cube')}
					>
						<T.BoxGeometry args={[1, 1, 1]} />
						<T.MeshStandardMaterial
							color={clickedMesh === 'Cube' ? '#ffcc00' : '#fc5c8a'}
							metalness={0.2}
							roughness={0.5}
						/>
					</T.Mesh>

					<!-- Clickable sphere -->
					<T.Mesh
						position={[0, 0.6, 0]}
						onclick={() => handleMeshClick('Sphere')}
					>
						<T.SphereGeometry args={[0.6, 32, 32]} />
						<T.MeshStandardMaterial
							color={clickedMesh === 'Sphere' ? '#ffcc00' : '#5cfc7c'}
							metalness={0.3}
							roughness={0.4}
						/>
					</T.Mesh>

					<!-- Clickable torus -->
					<T.Mesh
						position={[2, 0.5, 0]}
						onclick={() => handleMeshClick('Torus')}
					>
						<T.TorusGeometry args={[0.5, 0.2, 16, 32]} />
						<T.MeshStandardMaterial
							color={clickedMesh === 'Torus' ? '#ffcc00' : '#5cb8fc'}
							metalness={0.3}
							roughness={0.4}
						/>
					</T.Mesh>

					<!-- Ground -->
					<T.Mesh rotation.x={-Math.PI / 2} position.y={-0.01}>
						<T.PlaneGeometry args={[12, 12]} />
						<T.MeshStandardMaterial color="#1a1a2e" />
					</T.Mesh>

					<ContactShadows
						position.y={0}
						opacity={0.4}
						scale={10}
						blur={2}
					/>
				</Canvas>
			{:else}
				<div class="fallback">Loading 3D scene...</div>
			{/if}
		</div>

		<p class="concept">
			Type in the input to change the 3D text. Click on the cube, sphere, or torus — they
			flash yellow on click. The <code>onclick</code> prop on <code>&lt;T.Mesh&gt;</code>
			works thanks to Threlte's interactivity system, which raycasts pointer events into the
			3D scene.
		</p>
	</div>

	<h3>Interactivity Pattern</h3>
	<pre>{`<!-- Clickable mesh with visual feedback -->
<T.Mesh
  position={[0, 1, 0]}
  onclick={() => handleClick('myMesh')}
  onpointerenter={() => hovered = true}
  onpointerleave={() => hovered = false}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial
    color={hovered ? '#ffcc00' : '#7c5cfc'}
  />
</T.Mesh>`}</pre>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment explores an extras component limitation. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Set the <code>{'<Text>'}</code> component's <code>font</code> prop to a nonexistent URL.</strong> The text disappears or falls back to a default system font (depending on the Troika version). SDF text requires a font file (WOFF, TTF, or OTF) to generate the signed distance field. Without a valid font, the component has no glyph data to render.</li>
		<li><strong>Remove the <code>onclick</code> handler from a mesh and try clicking it.</strong> Nothing happens because Threlte's interactivity system only raycasts against meshes that have event handlers attached. Meshes without event props are excluded from the raycast for performance. This is an optimisation: only interactive meshes pay the cost of hit testing.</li>
		<li><strong>Set the <code>{'<Text>'}</code> content to an extremely long string (1000+ characters).</strong> The text renders but performance may degrade because Troika must generate SDF glyphs for every character. For large text content, consider limiting the visible text or using HTML overlays instead of 3D text. Three-dimensional text is best for short labels and headings, not paragraphs.</li>
		<li><strong>Add <code>{'<ContactShadows>'}</code> without any meshes that have <code>castShadow</code> set.</strong> The contact shadows component renders but appears as a uniform dark circle because it uses a separate rendering pass that captures shadow-casting geometry. Without any shadow casters, the result is a flat blob that does not correspond to any object shapes in the scene.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>@threlte/extras</code> extends Threlte with high-level components that go beyond basic geometry. The <code>{'<Text>'}</code> component renders resolution-independent 3D text using Troika's SDF (Signed Distance Field) approach, which means text stays crisp at any zoom level. It requires a font file URL and supports reactive <code>text</code>, <code>fontSize</code>, <code>color</code>, and anchor props. Use it for labels, headings, and HUD elements in 3D scenes.</p>
	<p class="prose">Pointer interactivity on 3D meshes works through Threlte's raycasting system. Adding <code>onclick</code>, <code>onpointerenter</code>, or <code>onpointerleave</code> props to a <code>{'<T.Mesh>'}</code> enables hit testing via raycasting from the mouse position into the 3D scene. Only meshes with event handlers are included in the raycast, which is an important performance optimisation. The click handler receives the Three.js intersection event, giving you access to the hit point, face normal, and distance.</p>
	<p class="prose"><code>{'<Environment>'}</code> creates image-based lighting for realistic reflections and ambient illumination, while <code>{'<ContactShadows>'}</code> renders soft ground shadows without requiring shadow map configuration. For production 3D assets, the <code>useGltf</code> hook or <code>{'<GLTF>'}</code> component loads GLTF/GLB models asynchronously. The pattern is the same as loading images: provide a URL, await the asset, and place the loaded scene in the component tree.</p>
	<p class="next">Next, you will learn performance strategies for 3D scenes: SSR fallbacks, reduced motion, lazy loading, and GPU resource management.</p>
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
		block-size: 400px;
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
		flex-wrap: wrap;
		gap: var(--space-md);
		align-items: center;
	}

	.input-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.text-input {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: var(--text-sm);
		font-family: var(--font-mono);
	}

	.click-indicator {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(-4px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
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
