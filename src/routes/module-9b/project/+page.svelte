<script lang="ts">
	import { enhance } from '$app/forms';

	// --- Query section ---
	type Product = { id: number; name: string; price: number; category: string };
	const allProducts: Product[] = [
		{ id: 1, name: 'Wireless Keyboard', price: 59.99, category: 'peripherals' },
		{ id: 2, name: 'USB-C Hub', price: 34.99, category: 'accessories' },
		{ id: 3, name: 'Monitor Stand', price: 89.99, category: 'furniture' },
		{ id: 4, name: '4K Webcam', price: 129.99, category: 'peripherals' },
		{ id: 5, name: 'Desk Lamp', price: 44.99, category: 'furniture' },
		{ id: 6, name: 'Cable Organizer', price: 12.99, category: 'accessories' },
	];

	let searchQuery = $state('');
	let queryLoading = $state(true);
	let queryProducts = $state<Product[]>([]);

	$effect(() => {
		const t = setTimeout(() => { queryProducts = allProducts; queryLoading = false; }, 700);
		return () => clearTimeout(t);
	});

	let filteredProducts = $derived.by(() => {
		if (!searchQuery) return queryProducts;
		const q = searchQuery.toLowerCase();
		return queryProducts.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q));
	});

	// --- Form section ---
	type FormResult = {
		success: boolean;
		errors?: Record<string, string> | null;
		values?: Record<string, FormDataEntryValue> | null;
		entry?: { id: string; name: string; rating: number; comment: string; createdAt: string } | null;
	};
	let formResult = $state<FormResult | null>(null);
	let formSubmitting = $state(false);

	// --- Command section (optimistic delete) ---
	type TaskItem = { id: string; text: string };
	let tasks = $state<TaskItem[]>([
		{ id: '1', text: 'Review pull request' },
		{ id: '2', text: 'Update documentation' },
		{ id: '3', text: 'Deploy staging build' },
		{ id: '4', text: 'Run integration tests' },
	]);
	let deletedTask = $state<{ item: TaskItem; index: number } | null>(null);

	function deleteTask(id: string) {
		const idx = tasks.findIndex((t) => t.id === id);
		if (idx === -1) return;
		deletedTask = { item: tasks[idx], index: idx };
		tasks = tasks.filter((t) => t.id !== id);
		setTimeout(() => { deletedTask = null; }, 3000);
	}

	function undoDelete() {
		if (!deletedTask) return;
		const { item, index } = deletedTask;
		tasks = [...tasks.slice(0, index), item, ...tasks.slice(index)];
		deletedTask = null;
	}

	// --- Batch section ---
	type Metric = { label: string; value: string; change: string; up: boolean };
	let batchLoading = $state(true);
	let metrics = $state<Metric[]>([]);

	$effect(() => {
		const t = setTimeout(() => {
			metrics = [
				{ label: 'Revenue', value: '$48.2K', change: '+12%', up: true },
				{ label: 'Users', value: '3,847', change: '+8%', up: true },
				{ label: 'Latency', value: '42ms', change: '-15%', up: true },
				{ label: 'Errors', value: '0.3%', change: '+0.1%', up: false },
			];
			batchLoading = false;
		}, 500);
		return () => clearTimeout(t);
	});

	// --- Prerender section ---
	const buildConfig = {
		version: '2.4.1',
		buildTime: new Date().toISOString(),
		environment: 'production',
		features: ['remote-functions', 'async-ssr', 'single-flight'],
	};

	const conceptsList = [
		'query() — typed data loading with caching',
		'form() — validated form submission with progressive enhancement',
		'command() — optimistic mutations with rollback',
		'query.batch() — N+1 elimination via batched requests',
		'prerender() — static build-time data',
		'Single-flight mutations — server and client refresh',
		'Async SSR — await in component bodies',
		'fork() — preload on hover, commit on click',
		'Valibot validation — schema-based type safety',
	];
</script>

<section class="page">
	<h1>Module 9B Project — Real-Time Data App</h1>
	<p class="concept">
		<strong>Concept.</strong> A dashboard demonstrating remote function concepts through
		simulated implementations. Each section represents a different remote function pattern:
		query, form, command, batch, and prerender.
	</p>

	<div class="build">
		<!-- QUERY SECTION -->
		<div class="panel">
			<h2 class="panel-title">
				<span class="tag">query</span>
				Product Search
			</h2>
			<p class="panel-desc">Simulates a typed <code>query()</code> with reactive search arguments.</p>
			<input
				type="text"
				class="search-input"
				placeholder="Search products by name or category..."
				bind:value={searchQuery}
			/>
			{#if queryLoading}
				<div class="loading-msg">Loading products...</div>
			{:else}
				<div class="product-list">
					{#each filteredProducts as product}
						<div class="product-row">
							<span class="product-name">{product.name}</span>
							<span class="product-cat">{product.category}</span>
							<span class="product-price">${product.price.toFixed(2)}</span>
						</div>
					{:else}
						<p class="empty-msg">No products match "{searchQuery}"</p>
					{/each}
				</div>
			{/if}
		</div>

		<!-- FORM SECTION -->
		<div class="panel">
			<h2 class="panel-title">
				<span class="tag">form</span>
				Feedback Form
			</h2>
			<p class="panel-desc">Real form action with Valibot validation via <code>+page.server.ts</code>.</p>

			{#if formResult?.success}
				<div class="success-box">
					<p>Feedback submitted! Thank you, {formResult.entry?.name}.</p>
					<button class="btn-sm" onclick={() => { formResult = null; }}>Submit another</button>
				</div>
			{:else}
				<form
					method="POST"
					action="?/submit"
					use:enhance={() => {
						formSubmitting = true;
						return async ({ result, update }) => {
							formSubmitting = false;
							if (result.type === 'success') {
								formResult = result.data as FormResult;
							}
							await update();
						};
					}}
				>
					<div class="form-grid">
						<label class="field">
							<span>Name</span>
							<input type="text" name="name" required minlength={2} value={formResult?.values?.name ?? ''} />
							{#if formResult?.errors?.name}
								<span class="field-err">{formResult.errors.name}</span>
							{/if}
						</label>
						<label class="field">
							<span>Email</span>
							<input type="email" name="email" required value={formResult?.values?.email ?? ''} />
							{#if formResult?.errors?.email}
								<span class="field-err">{formResult.errors.email}</span>
							{/if}
						</label>
						<label class="field">
							<span>Rating (1-5)</span>
							<input type="number" name="rating" min={1} max={5} required value={formResult?.values?.rating ?? ''} />
							{#if formResult?.errors?.rating}
								<span class="field-err">{formResult.errors.rating}</span>
							{/if}
						</label>
						<label class="field full">
							<span>Comment</span>
							<textarea name="comment" required minlength={5} rows={3}>{formResult?.values?.comment ?? ''}</textarea>
							{#if formResult?.errors?.comment}
								<span class="field-err">{formResult.errors.comment}</span>
							{/if}
						</label>
					</div>
					<button class="btn" type="submit" disabled={formSubmitting}>
						{formSubmitting ? 'Submitting...' : 'Submit Feedback'}
					</button>
				</form>
			{/if}
		</div>

		<!-- COMMAND SECTION -->
		<div class="panel">
			<h2 class="panel-title">
				<span class="tag">command</span>
				Task Manager
			</h2>
			<p class="panel-desc">Optimistic delete with undo — simulates <code>command()</code> mutations.</p>

			{#if deletedTask}
				<div class="toast">
					Deleted "{deletedTask.item.text}"
					<button class="undo-btn" onclick={undoDelete}>Undo</button>
				</div>
			{/if}

			<div class="task-list">
				{#each tasks as task}
					<div class="task-row">
						<span>{task.text}</span>
						<button class="delete-btn" onclick={() => deleteTask(task.id)}>Delete</button>
					</div>
				{:else}
					<p class="empty-msg">All tasks completed!</p>
				{/each}
			</div>
		</div>

		<!-- BATCH SECTION -->
		<div class="panel">
			<h2 class="panel-title">
				<span class="tag">batch</span>
				Metrics Dashboard
			</h2>
			<p class="panel-desc">Four widgets loading from one <code>Promise.all</code> — simulates <code>query.batch()</code>.</p>

			<div class="metric-grid">
				{#if batchLoading}
					{#each Array(4) as _}
						<div class="metric-card skeleton">
							<div class="skel-bar"></div>
							<div class="skel-bar short"></div>
						</div>
					{/each}
				{:else}
					{#each metrics as m}
						<div class="metric-card">
							<span class="metric-label">{m.label}</span>
							<span class="metric-value">{m.value}</span>
							<span class="metric-change" class:up={m.up} class:down={!m.up}>{m.change}</span>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- PRERENDER SECTION -->
		<div class="panel">
			<h2 class="panel-title">
				<span class="tag">prerender</span>
				Build Configuration
			</h2>
			<p class="panel-desc">Static build-time data — simulates <code>prerender()</code>.</p>

			<div class="config-grid">
				<div class="config-item">
					<span class="config-key">Version</span>
					<span class="config-val">{buildConfig.version}</span>
				</div>
				<div class="config-item">
					<span class="config-key">Build Time</span>
					<span class="config-val">{buildConfig.buildTime}</span>
				</div>
				<div class="config-item">
					<span class="config-key">Environment</span>
					<span class="config-val">{buildConfig.environment}</span>
				</div>
				<div class="config-item full">
					<span class="config-key">Features</span>
					<span class="config-val">{buildConfig.features.join(', ')}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- FOOTER -->
	<div class="footer">
		<h3>Module 9B concepts demonstrated</h3>
		<ul class="concepts-list">
			{#each conceptsList as concept}
				<li>{concept}</li>
			{/each}
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>How each remote function pattern maps to a real dashboard feature</li>
		<li>Typed query loading with reactive search filtering</li>
		<li>Valibot-validated form submission via form actions</li>
		<li>Optimistic mutations with undo/rollback</li>
		<li>Batch loading for multiple data widgets</li>
		<li>Static prerendered configuration data</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-lg); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	/* Panel */
	.panel {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-sm);
		border-left: 4px solid oklch(65% 0.16 200);
	}
	.panel-title { margin: 0; font-size: var(--text-lg); display: flex; align-items: center; gap: var(--space-sm); }
	.panel-desc { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
	.tag {
		display: inline-block; padding: 2px var(--space-sm);
		background: oklch(65% 0.16 200); color: white;
		border-radius: var(--radius-sm); font-size: var(--text-sm);
		font-family: var(--font-mono); font-weight: 600;
	}

	/* Query */
	.search-input {
		padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-1); color: var(--color-text); width: 100%;
	}
	.product-list { display: flex; flex-direction: column; gap: var(--space-xs); }
	.product-row {
		display: flex; justify-content: space-between; align-items: center;
		padding: var(--space-xs) var(--space-sm); background: var(--color-surface-1);
		border-radius: var(--radius-sm); font-size: var(--text-sm);
	}
	.product-name { font-weight: 500; flex: 1; }
	.product-cat { color: var(--color-text-muted); text-transform: capitalize; margin-inline: var(--space-sm); }
	.product-price { font-weight: 600; }
	.loading-msg { text-align: center; color: var(--color-text-muted); padding: var(--space-md); }
	.empty-msg { margin: 0; text-align: center; color: var(--color-text-muted); padding: var(--space-sm); }

	/* Form */
	.form-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-sm); }
	.field { display: flex; flex-direction: column; gap: var(--space-xs); }
	.field span { font-size: var(--text-sm); font-weight: 500; }
	.field input, .field textarea {
		padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-1); color: var(--color-text); font-family: inherit;
	}
	.field-err { font-size: var(--text-sm); color: oklch(60% 0.2 25); }
	.btn {
		padding: var(--space-sm) var(--space-md); border: none;
		border-radius: var(--radius-md); font-weight: 600;
		background: oklch(55% 0.13 200); color: white;
		cursor: pointer; font-size: var(--text-base); margin-block-start: var(--space-xs);
	}
	.btn:disabled { opacity: 0.6; cursor: not-allowed; }
	.btn-sm {
		padding: var(--space-xs) var(--space-md); border: 1px solid var(--color-border);
		border-radius: var(--radius-sm); background: var(--color-surface-1);
		cursor: pointer; color: var(--color-text); font-size: var(--text-sm);
	}
	.success-box { text-align: center; padding: var(--space-md); }
	.success-box p { margin: 0 0 var(--space-sm) 0; color: oklch(60% 0.15 145); font-weight: 600; }

	/* Command */
	.task-list { display: flex; flex-direction: column; gap: var(--space-xs); }
	.task-row {
		display: flex; align-items: center; justify-content: space-between;
		padding: var(--space-sm); background: var(--color-surface-1);
		border-radius: var(--radius-sm);
	}
	.delete-btn {
		padding: var(--space-xs) var(--space-sm); border: 1px solid oklch(60% 0.2 25);
		border-radius: var(--radius-sm); background: none; cursor: pointer;
		color: oklch(60% 0.2 25); font-size: var(--text-sm);
	}
	.toast {
		display: flex; align-items: center; justify-content: space-between;
		padding: var(--space-sm) var(--space-md); background: var(--color-surface-1);
		border: 1px solid var(--color-border); border-radius: var(--radius-md);
	}
	.undo-btn {
		padding: var(--space-xs) var(--space-sm); border: none;
		border-radius: var(--radius-sm); background: oklch(55% 0.13 200);
		color: white; cursor: pointer; font-weight: 600; font-size: var(--text-sm);
	}

	/* Batch */
	.metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-sm); }
	.metric-card {
		background: var(--color-surface-1); border-radius: var(--radius-md);
		padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs);
	}
	.metric-label { font-size: var(--text-sm); color: var(--color-text-muted); }
	.metric-value { font-size: var(--text-xl); font-weight: 700; }
	.metric-change { font-size: var(--text-sm); font-weight: 600; }
	.metric-change.up { color: oklch(60% 0.15 145); }
	.metric-change.down { color: oklch(60% 0.15 25); }
	.skeleton { animation: pulse 1.2s ease-in-out infinite; }
	.skel-bar { height: 1rem; background: var(--color-border); border-radius: var(--radius-xs); }
	.skel-bar.short { width: 60%; margin-block-start: var(--space-xs); }
	@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

	/* Prerender */
	.config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xs); }
	.config-item {
		display: flex; flex-direction: column; gap: 2px;
		padding: var(--space-sm); background: var(--color-surface-1);
		border-radius: var(--radius-sm);
	}
	.config-item.full { grid-column: 1 / -1; }
	.config-key { font-size: var(--text-sm); color: var(--color-text-muted); }
	.config-val { font-family: var(--font-mono); font-size: var(--text-sm); }

	/* Footer */
	.footer {
		background: var(--color-surface-1); border: 1px solid var(--color-border);
		border-radius: var(--radius-lg); padding: var(--space-lg); margin-block-start: var(--space-md);
	}
	.footer h3 { margin: 0 0 var(--space-sm) 0; }
	.concepts-list { font-size: var(--text-sm); }

	@media (min-width: 768px) {
		.form-grid { grid-template-columns: 1fr 1fr; }
		.full { grid-column: 1 / -1; }
	}
</style>
