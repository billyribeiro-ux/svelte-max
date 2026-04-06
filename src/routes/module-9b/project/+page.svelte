<script lang="ts">
	import { enhance } from '$app/forms';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { enhance } from '$app/forms';\n" +
		"\n" +
		"	// --- Query section ---\n" +
		"	type Product = { id: number; name: string; price: number; category: string };\n" +
		"	const allProducts: Product[] = [\n" +
		"		{ id: 1, name: 'Wireless Keyboard', price: 59.99, category: 'peripherals' },\n" +
		"		{ id: 2, name: 'USB-C Hub', price: 34.99, category: 'accessories' },\n" +
		"		{ id: 3, name: 'Monitor Stand', price: 89.99, category: 'furniture' },\n" +
		"		{ id: 4, name: '4K Webcam', price: 129.99, category: 'peripherals' },\n" +
		"		{ id: 5, name: 'Desk Lamp', price: 44.99, category: 'furniture' },\n" +
		"		{ id: 6, name: 'Cable Organizer', price: 12.99, category: 'accessories' },\n" +
		"	];\n" +
		"\n" +
		"	let searchQuery = $state('');\n" +
		"	let queryLoading = $state(true);\n" +
		"	let queryProducts = $state\u003cProduct[]\u003e([]);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const t = setTimeout(() =\u003e { queryProducts = allProducts; queryLoading = false; }, 700);\n" +
		"		return () =\u003e clearTimeout(t);\n" +
		"	});\n" +
		"\n" +
		"	let filteredProducts = $derived.by(() =\u003e {\n" +
		"		if (!searchQuery) return queryProducts;\n" +
		"		const q = searchQuery.toLowerCase();\n" +
		"		return queryProducts.filter((p) =\u003e p.name.toLowerCase().includes(q) || p.category.includes(q));\n" +
		"	});\n" +
		"\n" +
		"	// --- Form section ---\n" +
		"	type FormResult = {\n" +
		"		success: boolean;\n" +
		"		errors?: Record\u003cstring, string\u003e | null;\n" +
		"		values?: Record\u003cstring, FormDataEntryValue\u003e | null;\n" +
		"		entry?: { id: string; name: string; rating: number; comment: string; createdAt: string } | null;\n" +
		"	};\n" +
		"	let formResult = $state\u003cFormResult | null\u003e(null);\n" +
		"	let formSubmitting = $state(false);\n" +
		"\n" +
		"	// --- Command section (optimistic delete) ---\n" +
		"	type TaskItem = { id: string; text: string };\n" +
		"	let tasks = $state\u003cTaskItem[]\u003e([\n" +
		"		{ id: '1', text: 'Review pull request' },\n" +
		"		{ id: '2', text: 'Update documentation' },\n" +
		"		{ id: '3', text: 'Deploy staging build' },\n" +
		"		{ id: '4', text: 'Run integration tests' },\n" +
		"	]);\n" +
		"	let deletedTask = $state\u003c{ item: TaskItem; index: number } | null\u003e(null);\n" +
		"\n" +
		"	function deleteTask(id: string) {\n" +
		"		const idx = tasks.findIndex((t) =\u003e t.id === id);\n" +
		"		if (idx === -1) return;\n" +
		"		deletedTask = { item: tasks[idx], index: idx };\n" +
		"		tasks = tasks.filter((t) =\u003e t.id !== id);\n" +
		"		setTimeout(() =\u003e { deletedTask = null; }, 3000);\n" +
		"	}\n" +
		"\n" +
		"	function undoDelete() {\n" +
		"		if (!deletedTask) return;\n" +
		"		const { item, index } = deletedTask;\n" +
		"		tasks = [...tasks.slice(0, index), item, ...tasks.slice(index)];\n" +
		"		deletedTask = null;\n" +
		"	}\n" +
		"\n" +
		"	// --- Batch section ---\n" +
		"	type Metric = { label: string; value: string; change: string; up: boolean };\n" +
		"	let batchLoading = $state(true);\n" +
		"	let metrics = $state\u003cMetric[]\u003e([]);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const t = setTimeout(() =\u003e {\n" +
		"			metrics = [\n" +
		"				{ label: 'Revenue', value: '$48.2K', change: '+12%', up: true },\n" +
		"				{ label: 'Users', value: '3,847', change: '+8%', up: true },\n" +
		"				{ label: 'Latency', value: '42ms', change: '-15%', up: true },\n" +
		"				{ label: 'Errors', value: '0.3%', change: '+0.1%', up: false },\n" +
		"			];\n" +
		"			batchLoading = false;\n" +
		"		}, 500);\n" +
		"		return () =\u003e clearTimeout(t);\n" +
		"	});\n" +
		"\n" +
		"	// --- Prerender section ---\n" +
		"	const buildConfig = {\n" +
		"		version: '2.4.1',\n" +
		"		buildTime: new Date().toISOString(),\n" +
		"		environment: 'production',\n" +
		"		features: ['remote-functions', 'async-ssr', 'single-flight'],\n" +
		"	};\n" +
		"\n" +
		"	const conceptsList = [\n" +
		"		'query() — typed data loading with caching',\n" +
		"		'form() — validated form submission with progressive enhancement',\n" +
		"		'command() — optimistic mutations with rollback',\n" +
		"		'query.batch() — N+1 elimination via batched requests',\n" +
		"		'prerender() — static build-time data',\n" +
		"		'Single-flight mutations — server and client refresh',\n" +
		"		'Async SSR — await in component bodies',\n" +
		"		'fork() — preload on hover, commit on click',\n" +
		"		'Valibot validation — schema-based type safety',\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eModule 9B Project — Real-Time Data App\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A dashboard demonstrating remote function concepts through\n" +
		"		simulated implementations. Each section represents a different remote function pattern:\n" +
		"		query, form, command, batch, and prerender.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003c!-- QUERY SECTION --\u003e\n" +
		"		\u003cdiv class=\"panel\"\u003e\n" +
		"			\u003ch2 class=\"panel-title\"\u003e\n" +
		"				\u003cspan class=\"tag\"\u003equery\u003c/span\u003e\n" +
		"				Product Search\n" +
		"			\u003c/h2\u003e\n" +
		"			\u003cp class=\"panel-desc\"\u003eSimulates a typed \u003ccode\u003equery()\u003c/code\u003e with reactive search arguments.\u003c/p\u003e\n" +
		"			\u003cinput\n" +
		"				type=\"text\"\n" +
		"				class=\"search-input\"\n" +
		"				placeholder=\"Search products by name or category...\"\n" +
		"				bind:value={searchQuery}\n" +
		"			/\u003e\n" +
		"			{#if queryLoading}\n" +
		"				\u003cdiv class=\"loading-msg\"\u003eLoading products...\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cdiv class=\"product-list\"\u003e\n" +
		"					{#each filteredProducts as product}\n" +
		"						\u003cdiv class=\"product-row\"\u003e\n" +
		"							\u003cspan class=\"product-name\"\u003e{product.name}\u003c/span\u003e\n" +
		"							\u003cspan class=\"product-cat\"\u003e{product.category}\u003c/span\u003e\n" +
		"							\u003cspan class=\"product-price\"\u003e${product.price.toFixed(2)}\u003c/span\u003e\n" +
		"						\u003c/div\u003e\n" +
		"					{:else}\n" +
		"						\u003cp class=\"empty-msg\"\u003eNo products match \"{searchQuery}\"\u003c/p\u003e\n" +
		"					{/each}\n" +
		"				\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003c!-- FORM SECTION --\u003e\n" +
		"		\u003cdiv class=\"panel\"\u003e\n" +
		"			\u003ch2 class=\"panel-title\"\u003e\n" +
		"				\u003cspan class=\"tag\"\u003eform\u003c/span\u003e\n" +
		"				Feedback Form\n" +
		"			\u003c/h2\u003e\n" +
		"			\u003cp class=\"panel-desc\"\u003eReal form action with Valibot validation via \u003ccode\u003e+page.server.ts\u003c/code\u003e.\u003c/p\u003e\n" +
		"\n" +
		"			{#if formResult?.success}\n" +
		"				\u003cdiv class=\"success-box\"\u003e\n" +
		"					\u003cp\u003eFeedback submitted! Thank you, {formResult.entry?.name}.\u003c/p\u003e\n" +
		"					\u003cbutton class=\"btn-sm\" onclick={() =\u003e { formResult = null; }}\u003eSubmit another\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cform\n" +
		"					method=\"POST\"\n" +
		"					action=\"?/submit\"\n" +
		"					use:enhance={() =\u003e {\n" +
		"						formSubmitting = true;\n" +
		"						return async ({ result, update }) =\u003e {\n" +
		"							formSubmitting = false;\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
