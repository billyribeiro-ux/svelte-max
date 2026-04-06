<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteURL } from 'svelte/reactivity';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	// SvelteURL — reactive URL class for building/inspecting URL state
	const demoUrl = new SvelteURL('https://example.com/tasks?filter=active');

	interface Task {
		id: number;
		title: string;
		status: 'active' | 'completed' | 'archived';
	}

	const tasks: Task[] = [
		{ id: 1, title: 'Set up SvelteKit project', status: 'completed' },
		{ id: 2, title: 'Learn runes', status: 'completed' },
		{ id: 3, title: 'Build state management module', status: 'active' },
		{ id: 4, title: 'Add TanStack Table', status: 'active' },
		{ id: 5, title: 'Write tests', status: 'active' },
		{ id: 6, title: 'Old migration task', status: 'archived' },
		{ id: 7, title: 'Deploy v1', status: 'active' },
		{ id: 8, title: 'Initial prototype', status: 'archived' }
	];

	const filters = ['all', 'active', 'completed', 'archived'] as const;

	let currentFilter = $derived(page.url.searchParams.get('filter') ?? 'all');

	let filteredTasks = $derived(
		currentFilter === 'all'
			? tasks
			: tasks.filter((t) => t.status === currentFilter)
	);

	function setFilter(filter: string) {
		if (filter === 'all') {
			goto('?');
		} else {
			goto(`?filter=${filter}`);
		}
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { page } from '$app/state';\n" +
		"	import { goto } from '$app/navigation';\n" +
		"\n" +
		"	interface Task {\n" +
		"		id: number;\n" +
		"		title: string;\n" +
		"		status: 'active' | 'completed' | 'archived';\n" +
		"	}\n" +
		"\n" +
		"	const tasks: Task[] = [\n" +
		"		{ id: 1, title: 'Set up SvelteKit project', status: 'completed' },\n" +
		"		{ id: 2, title: 'Learn runes', status: 'completed' },\n" +
		"		{ id: 3, title: 'Build state management module', status: 'active' },\n" +
		"		{ id: 4, title: 'Add TanStack Table', status: 'active' },\n" +
		"		{ id: 5, title: 'Write tests', status: 'active' },\n" +
		"		{ id: 6, title: 'Old migration task', status: 'archived' },\n" +
		"		{ id: 7, title: 'Deploy v1', status: 'active' },\n" +
		"		{ id: 8, title: 'Initial prototype', status: 'archived' }\n" +
		"	];\n" +
		"\n" +
		"	const filters = ['all', 'active', 'completed', 'archived'] as const;\n" +
		"\n" +
		"	let currentFilter = $derived(page.url.searchParams.get('filter') ?? 'all');\n" +
		"\n" +
		"	let filteredTasks = $derived(\n" +
		"		currentFilter === 'all'\n" +
		"			? tasks\n" +
		"			: tasks.filter((t) =\u003e t.status === currentFilter)\n" +
		"	);\n" +
		"\n" +
		"	function setFilter(filter: string) {\n" +
		"		if (filter === 'all') {\n" +
		"			goto('?');\n" +
		"		} else {\n" +
		"			goto(`?filter=${filter}`);\n" +
		"		}\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.6 — URL SearchParams as State\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		URL search parameters are an excellent place to store \u003cstrong\u003efilter, sort, and\n" +
		"		pagination state\u003c/strong\u003e. They're shareable, bookmarkable, and survive page refreshes.\n" +
		"		SvelteKit's \u003ccode\u003epage\u003c/code\u003e state and \u003ccode\u003egoto\u003c/code\u003e make this seamless.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eReading URL State\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003eimport &#123; page &#125; from '$app/state';\n" +
		"import &#123; goto &#125; from '$app/navigation';\n" +
		"\n" +
		"let filter = $derived(\n" +
		"  page.url.searchParams.get('filter') ?? 'all'\n" +
		");\n" +
		"\n" +
		"function setFilter(f: string) &#123;\n" +
		"  goto(`?filter=$&#123;f&#125;`);\n" +
		"&#125;\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo: Filtered Task List\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"filter-bar\"\u003e\n" +
		"			{#each filters as filter}\n" +
		"				\u003cbutton\n" +
		"					class=\"filter-btn\"\n" +
		"					class:active={currentFilter === filter}\n" +
		"					onclick={() =\u003e setFilter(filter)}\n" +
		"				\u003e\n" +
		"					{filter}\n" +
		"				\u003c/button\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"url-display\"\u003e\n" +
		"			Current URL: \u003ccode\u003e?filter={currentFilter}\u003c/code\u003e\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"task-list\"\u003e\n" +
		"			{#each filteredTasks as task}\n" +
		"				\u003cdiv class=\"task-item\" data-status={task.status}\u003e\n" +
		"					\u003cspan class=\"status-badge\"\u003e{task.status}\u003c/span\u003e\n" +
		"					\u003cspan class=\"task-title\"\u003e{task.title}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cp class=\"empty\"\u003eNo tasks match this filter.\u003c/p\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"task-count\"\u003e{filteredTasks.length} task{filteredTasks.length === 1 ? '' : 's'} shown\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Takeaways\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eURL params persist across refreshes and are shareable via links\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003epage.url.searchParams\u003c/code\u003e is reactive — changes trigger UI updates\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003egoto('?filter=active')\u003c/code\u003e updates the URL without a full page reload\u003c/li\u003e\n" +
		"		\u003cli\u003eUse URL state for anything the user might want to bookmark or share\u003c/li\u003e\n" +
		"		\u003cli\u003eCombine with \u003ccode\u003e$derived\u003c/code\u003e for computed filtered/sorted lists\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003epage.url.searchParams\u003c/code\u003e is reactive and drives filter/sort/pagination state from the URL.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003egoto('?filter=active')\u003c/code\u003e updates the URL without a full page reload.\u003c/li\u003e\n" +
		"		\u003cli\u003eURL state is bookmarkable, shareable, and survives page refreshes, unlike in-memory state.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>11.6 — URL SearchParams as State</h1>

	<p class="concept">
		URL search parameters are an excellent place to store <strong>filter, sort, and
		pagination state</strong>. They're shareable, bookmarkable, and survive page refreshes.
		SvelteKit's <code>page</code> state and <code>goto</code> make this seamless.
	</p>

	<h3>Reading URL State</h3>
	<div class="build">
		<pre><code>import &#123; page &#125; from '$app/state';
import &#123; goto &#125; from '$app/navigation';

let filter = $derived(
  page.url.searchParams.get('filter') ?? 'all'
);

function setFilter(f: string) &#123;
  goto(`?filter=$&#123;f&#125;`);
&#125;</code></pre>
	</div>

	<h3>Live Demo: Filtered Task List</h3>
	<div class="build">
		<div class="filter-bar">
			{#each filters as filter}
				<button
					class="filter-btn"
					class:active={currentFilter === filter}
					onclick={() => setFilter(filter)}
				>
					{filter}
				</button>
			{/each}
		</div>

		<p class="url-display">
			Current URL: <code>?filter={currentFilter}</code>
		</p>

		<div class="task-list">
			{#each filteredTasks as task}
				<div class="task-item" data-status={task.status}>
					<span class="status-badge">{task.status}</span>
					<span class="task-title">{task.title}</span>
				</div>
			{:else}
				<p class="empty">No tasks match this filter.</p>
			{/each}
		</div>

		<p class="task-count">{filteredTasks.length} task{filteredTasks.length === 1 ? '' : 's'} shown</p>
	</div>

	<h3>SvelteURL Demo</h3>
	<div class="build">
		<p class="url-display">
			SvelteURL href: <code>{demoUrl.href}</code>
		</p>
		<p class="url-display">
			searchParams.get('filter'): <code>{demoUrl.searchParams.get('filter')}</code>
		</p>
		<div class="filter-bar">
			<button class="filter-btn" onclick={() => { demoUrl.searchParams.set('filter', 'active'); }}>Set active</button>
			<button class="filter-btn" onclick={() => { demoUrl.searchParams.set('filter', 'completed'); }}>Set completed</button>
			<button class="filter-btn" onclick={() => { demoUrl.searchParams.delete('filter'); }}>Remove filter</button>
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>URL params persist across refreshes and are shareable via links</li>
		<li><code>page.url.searchParams</code> is reactive — changes trigger UI updates</li>
		<li><code>goto('?filter=active')</code> updates the URL without a full page reload</li>
		<li>Use URL state for anything the user might want to bookmark or share</li>
		<li>Combine with <code>$derived</code> for computed filtered/sorted lists</li>
	</ul>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>page.url.searchParams</code> is reactive and drives filter/sort/pagination state from the URL.</li>
		<li><code>goto('?filter=active')</code> updates the URL without a full page reload.</li>
		<li>URL state is bookmarkable, shareable, and survives page refreshes, unlike in-memory state.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.filter-bar {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
	.filter-btn {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
		text-transform: capitalize;
	}
	.filter-btn.active {
		background: var(--color-primary);
		color: var(--color-surface-1);
		border-color: var(--color-primary);
	}
	.url-display {
		margin: 0;
		font-size: 0.85em;
		color: var(--color-text-muted);
	}
	.task-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.task-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
	}
	.status-badge {
		font-size: 0.75em;
		font-weight: 700;
		text-transform: uppercase;
		padding: 2px var(--space-xs);
		border-radius: var(--radius-xs);
		background: var(--color-border);
		color: var(--color-text-muted);
	}
	.task-item[data-status='active'] .status-badge {
		background: oklch(75% 0.15 150);
		color: oklch(25% 0.1 150);
	}
	.task-item[data-status='completed'] .status-badge {
		background: oklch(75% 0.15 250);
		color: oklch(25% 0.1 250);
	}
	.task-item[data-status='archived'] .status-badge {
		background: oklch(75% 0.05 60);
		color: oklch(35% 0.05 60);
	}
	.task-title {
		color: var(--color-text);
	}
	.task-count {
		margin: 0;
		font-size: 0.85em;
		color: var(--color-text-muted);
	}
	.empty {
		color: var(--color-text-muted);
		font-style: italic;
		margin: 0;
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
