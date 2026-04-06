<script lang="ts">
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions, SortingState, VisibilityState, RowSelectionState } from '@tanstack/svelte-table';

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
		{
			id: 'select',
			header: 'Select',
			cell: ({ row }) => row.getIsSelected() ? '[x]' : '[ ]',
			enableSorting: false,
			size: 70
		},
		{ accessorKey: 'id', header: 'ID', size: 60 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 100 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 120 }
	];

	let sorting = $state<SortingState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});

	let options = $state<TableOptions<Member>>({
		data,
		columns,
		state: {
			get sorting() { return sorting; },
			get columnVisibility() { return columnVisibility; },
			get rowSelection() { return rowSelection; }
		},
		onSortingChange(updater) {
			sorting = typeof updater === 'function' ? updater(sorting) : updater;
		},
		onColumnVisibilityChange(updater) {
			columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
		},
		onRowSelectionChange(updater) {
			rowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableRowSelection: true
	});

	const table = createSvelteTable(options);

	let exportedJson = $state('');

	function exportSelected() {
		const selectedRows = $table.getSelectedRowModel().rows.map((row: { original: Member }) => row.original);
		exportedJson = JSON.stringify(selectedRows, null, 2);
	}

	const toggleableColumns = $derived(
		$table.getAllLeafColumns().filter((col: { id: string }) => col.id !== 'select')
	);
</script>

<section class="page">
	<h1>11.10 — Typed Table with Visibility Toggles</h1>

	<p class="concept">
		TanStack Table supports <strong>column visibility</strong> and <strong>row selection</strong>
		out of the box. Combined with TypeScript generics, you get full type safety from
		column definitions to exported data.
	</p>

	<h3>Column Visibility</h3>
	<div class="build">
		<div class="visibility-toggles">
			{#each toggleableColumns as column}
				<label class="toggle-label">
					<input
						type="checkbox"
						checked={column.getIsVisible()}
						onchange={() => column.toggleVisibility()}
					/>
					{column.id}
				</label>
			{/each}
		</div>
	</div>

	<h3>Table with Row Selection</h3>
	<div class="build">
		<div class="table-wrapper">
			<table>
				<thead>
					{#each $table.getHeaderGroups() as headerGroup}
						<tr>
							{#each headerGroup.headers as header}
								<th
									style:width="{header.getSize()}px"
									onclick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
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
						<tr
							class:selected={row.getIsSelected()}
							onclick={() => row.toggleSelected()}
						>
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

		<div class="selection-actions">
			<span class="selection-count">
				{Object.keys(rowSelection).length} row{Object.keys(rowSelection).length === 1 ? '' : 's'} selected
			</span>
			<button onclick={exportSelected}>Export Selected as JSON</button>
		</div>

		{#if exportedJson}
			<div class="json-output">
				<pre><code>{exportedJson}</code></pre>
			</div>
		{/if}
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li><code>VisibilityState</code> controls which columns are shown — toggle via <code>column.toggleVisibility()</code></li>
		<li><code>RowSelectionState</code> tracks selected rows by index</li>
		<li><code>table.getSelectedRowModel().rows</code> gives access to selected data with full typing</li>
		<li>Click rows to select, then export the typed <code>Member[]</code> as JSON</li>
		<li>Generic <code>createSvelteTable&lt;Member&gt;</code> ensures type safety throughout</li>
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

	.visibility-toggles {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: 0.85em;
		color: var(--color-text-muted);
		cursor: pointer;
		text-transform: capitalize;
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
	tr {
		cursor: pointer;
	}
	tr:hover td {
		background: var(--color-surface-2);
	}
	tr.selected td {
		background: color-mix(in oklch, var(--color-primary) 15%, var(--color-surface-1));
	}
	.sort-indicator {
		font-size: 0.7em;
		color: var(--color-primary);
	}
	.selection-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.selection-count {
		font-size: 0.85em;
		color: var(--color-text-muted);
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
	.json-output {
		overflow-x: auto;
		max-height: 300px;
		overflow-y: auto;
	}
	.json-output pre {
		margin: 0;
	}
	.json-output code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.4;
		font-size: 0.8em;
	}
</style>
