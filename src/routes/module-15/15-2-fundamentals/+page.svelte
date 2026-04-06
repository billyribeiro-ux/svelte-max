<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	let mounted = $state(false);
	let directionalIntensity = $state(1.5);
	let ambientIntensity = $state(0.3);

	$effect(() => {
		mounted = true;
	});
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
		height: 350px;
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
		width: 100%;
		accent-color: var(--color-primary);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.canvas-container { height: 450px; }
		.controls { flex-direction: row; }
		.slider-label { flex: 1; }
	}
</style>
