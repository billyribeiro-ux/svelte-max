<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
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
		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30' },
		{ id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', joinedAt: '2023-11-12' },
		{ id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor', joinedAt: '2023-12-01' },
		{ id: 11, name: 'Kim Park', email: 'kim@example.com', role: 'Viewer', joinedAt: '2024-01-08' },
		{ id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Admin', joinedAt: '2024-02-14' }
	];

	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'id', header: 'ID', size: 60 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 100 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }
	];

	let sorting = $state<SortingState>([]);
	let globalFilter = $state('');

	let options = $state<TableOptions<Member>>({
		data,
		columns,
		state: {
			get sorting() { return sorting; },
			get globalFilter() { return globalFilter; }
		},
		onSortingChange(updater) {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onGlobalFilterChange(updater) {
			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageSize: 5, pageIndex: 0 }
		}
	});

	const table = createSvelteTable(options);
</script>

<section class="page">
	<h1>11.9 — Sorting, Filtering, Pagination</h1>

	<p class="concept">
		TanStack Table's power comes from composable <strong>row models</strong>. Adding
		<code>getSortedRowModel</code>, <code>getFilteredRowModel</code>, and
		<code>getPaginationRowModel</code> layers sorting, search, and paging onto your table
		with minimal code.
	</p>

	<h3>Live Demo</h3>
	<div class="build">
		<div class="toolbar">
			<input
				type="text"
				placeholder="Search all columns..."
				bind:value={globalFilter}
				class="search-input"
			/>
			<span class="row-count">
				{$table.getFilteredRowModel().rows.length} of {data.length} rows
			</span>
		</div>

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
					{:else}
						<tr>
							<td colspan={columns.length} class="no-results">No matching results</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="pagination">
			<button
				onclick={() => $table.previousPage()}
				disabled={!$table.getCanPreviousPage()}
			>
				Previous
			</button>
			<span class="page-info">
				Page {$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}
			</span>
			<button
				onclick={() => $table.nextPage()}
				disabled={!$table.getCanNextPage()}
			>
				Next
			</button>
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Each row model (<code>getSortedRowModel</code>, etc.) is added independently</li>
		<li><code>globalFilter</code> searches across all columns at once</li>
		<li>Pagination state is managed via <code>initialState.pagination</code></li>
		<li><code>table.previousPage()</code> / <code>table.nextPage()</code> handle navigation</li>
		<li><code>getCanPreviousPage()</code> / <code>getCanNextPage()</code> disable buttons at boundaries</li>
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

	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.search-input {
		flex: 1;
		min-width: 200px;
		padding: var(--space-sm) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: 0.9em;
	}
	.row-count {
		font-size: 0.85em;
		color: var(--color-text-muted);
		white-space: nowrap;
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
	.no-results {
		text-align: center;
		color: var(--color-text-muted);
		font-style: italic;
		padding: var(--space-lg);
	}
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
	}
	button {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.page-info {
		font-size: 0.9em;
		color: var(--color-text-muted);
	}
</style>
