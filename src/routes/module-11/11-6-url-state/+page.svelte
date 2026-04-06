<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

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

	<h3>Key Takeaways</h3>
	<ul>
		<li>URL params persist across refreshes and are shareable via links</li>
		<li><code>page.url.searchParams</code> is reactive — changes trigger UI updates</li>
		<li><code>goto('?filter=active')</code> updates the URL without a full page reload</li>
		<li>Use URL state for anything the user might want to bookmark or share</li>
		<li>Combine with <code>$derived</code> for computed filtered/sorted lists</li>
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
</style>
