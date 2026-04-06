<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions, SortingState } from '@tanstack/svelte-table';

	interface Member {
		id: number;
		name: string;
		email: string;
		role: string;
		joinedAt: string;
	}

	const data: Member[] = [
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinedAt: '2023-01-15' },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', joinedAt: '2023-03-22' },
		{ id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', joinedAt: '2023-05-10' },
		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', joinedAt: '2023-06-01' },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', joinedAt: '2023-07-14' },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', joinedAt: '2023-08-20' },
		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', joinedAt: '2023-09-05' },
		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' }
	];

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'id', header: 'ID', size: 60 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 100 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }
	];

	let sorting = $state<SortingState>([]);

	let options = $state<TableOptions<Member>>({
		data,
		columns,
		state: {
			get sorting() { return sorting; }
		},
		onSortingChange(updater) {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	});

	const table = createSvelteTable(options);
</script>

<section class="page">
	<h1>11.8 — Basic TanStack Table</h1>

	<p class="concept">
		<strong>TanStack Table</strong> is a headless table library — it manages the data logic
		(sorting, filtering, pagination) while you control the rendering. In Svelte 5, you use
		<code>createSvelteTable</code> with a reactive <code>$state</code> options object.
	</p>

	<h3>Setup Pattern</h3>
	<div class="build">
		<pre><code>import &#123; createSvelteTable, flexRender,
  getCoreRowModel &#125; from '@tanstack/svelte-table';
import type &#123; ColumnDef, TableOptions &#125;
  from '@tanstack/svelte-table';

const columns: ColumnDef&lt;Member&gt;[] = [ ... ];

let options = $state&lt;TableOptions&lt;Member&gt;&gt;(&#123;
  data,
  columns,
  getCoreRowModel: getCoreRowModel()
&#125;);

const table = createSvelteTable(options);</code></pre>
	</div>

	<h3>Live Table (click headers to sort)</h3>
	<div class="build">
		<div class="table-wrapper">
			<table>
				<thead>
					{#each $table.getHeaderGroups() as headerGroup}
						<tr>
							{#each headerGroup.headers as header}
								<th
									style:width="{header.getSize()}px"
									onclick={header.column.getToggleSortingHandler()}
									class:sortable={header.column.getCanSort()}
								>
									{#if !header.isPlaceholder}
										{@const Rendered = flexRender(header.column.columnDef.header, header.getContext())}
										{#if typeof Rendered === 'string'}
											{Rendered}
										{:else if Rendered}
											<Rendered />
										{/if}
										{#if header.column.getIsSorted() === 'asc'}
											<span class="sort-indicator"> &#9650;</span>
										{:else if header.column.getIsSorted() === 'desc'}
											<span class="sort-indicator"> &#9660;</span>
										{/if}
									{/if}
								</th>
							{/each}
						</tr>
					{/each}
				</thead>
				<tbody>
					{#each $table.getRowModel().rows as row}
						<tr>
							{#each row.getVisibleCells() as cell}
								<td>
									{#if true}
										{@const Rendered = flexRender(cell.column.columnDef.cell, cell.getContext())}
										{#if typeof Rendered === 'string'}
											{Rendered}
										{:else if Rendered}
											<Rendered />
										{/if}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>TanStack Table is headless — you own all the HTML and styling</li>
		<li><code>createSvelteTable</code> returns a reactive table instance</li>
		<li><code>flexRender</code> returns a snippet or string — check with <code>typeof</code></li>
		<li>Column defs describe data access, headers, and sizing</li>
		<li>Sorting is opt-in via <code>getSortedRowModel</code> and sorting state</li>
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
	.table-wrapper {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9em;
	}
	th, td {
		padding: var(--space-sm) var(--space-md);
		text-align: left;
		border-bottom: 1px solid var(--color-border);
	}
	th {
		background: var(--color-surface-2);
		font-weight: 600;
		color: var(--color-text);
		white-space: nowrap;
	}
	th.sortable {
		cursor: pointer;
		user-select: none;
	}
	th.sortable:hover {
		background: var(--color-border);
	}
	td {
		color: var(--color-text-muted);
	}
	tr:hover td {
		background: var(--color-surface-2);
	}
	.sort-indicator {
		font-size: 0.7em;
		color: var(--color-primary);
	}
</style>
