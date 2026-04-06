<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls, Text, Environment, ContactShadows } from '@threlte/extras';

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
		height: 400px;
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

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
