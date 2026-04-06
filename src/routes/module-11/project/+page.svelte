<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { innerWidth, online } from 'svelte/reactivity/window';
	import { CartStore, type CartItem } from '$lib/stores/cart.svelte';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';
	import type { ColumnDef, TableOptions, SortingState } from '@tanstack/svelte-table';

	// ─── Theme Context ───
	interface ThemeState {
		accent: string;
		label: string;
	}

	function createThemeContext() {
		const key = Symbol('dashboard-theme');
		return {
			set: (v: ThemeState) => setContext(key, v),
			get: () => getContext<ThemeState>(key)
		};
	}

	const ThemeContext = createThemeContext();
	ThemeContext.set({ accent: 'oklch(55% 0.18 260)', label: 'Deep Purple' });
	const theme = ThemeContext.get();

	// ─── Cart ───
	const cart = new CartStore();

	const products = [
		{ id: 'addon-1', name: 'Priority Support', price: 19.99 },
		{ id: 'addon-2', name: 'Extra Storage (50GB)', price: 9.99 },
		{ id: 'addon-3', name: 'Custom Domain', price: 14.99 },
		{ id: 'addon-4', name: 'API Access', price: 29.99 }
	] as const;

	let showCart = $state(false);

	// ─── Member Data ───
	interface Member {
		id: number;
		name: string;
		email: string;
		role: 'Admin' | 'Editor' | 'Viewer';
		joinedAt: string;
		likes: number;
		liked: boolean;
	}

	let members = $state<Member[]>([
		{ id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joinedAt: '2023-01-15', likes: 24, liked: false },
		{ id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', joinedAt: '2023-03-22', likes: 12, liked: false },
		{ id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', joinedAt: '2023-05-10', likes: 8, liked: true },
		{ id: 4, name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', joinedAt: '2023-06-01', likes: 31, liked: false },
		{ id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', joinedAt: '2023-07-14', likes: 19, liked: true },
		{ id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', joinedAt: '2023-08-20', likes: 5, liked: false },
		{ id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', joinedAt: '2023-09-05', likes: 27, liked: false },
		{ id: 8, name: 'Hank Wilson', email: 'hank@example.com', role: 'Viewer', joinedAt: '2023-10-30', likes: 3, liked: false },
		{ id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', joinedAt: '2023-11-12', likes: 45, liked: true },
		{ id: 10, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor', joinedAt: '2023-12-01', likes: 16, liked: false },
		{ id: 11, name: 'Kim Park', email: 'kim@example.com', role: 'Viewer', joinedAt: '2024-01-08', likes: 9, liked: false },
		{ id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Admin', joinedAt: '2024-02-14', likes: 38, liked: false }
	]);

	// ─── Optimistic Like ───
	let pendingLikes = $state<Set<number>>(new Set());

	async function toggleLike(memberId: number) {
		if (pendingLikes.has(memberId)) return;

		const member = members.find((m) => m.id === memberId);
		if (!member) return;

		const prevLikes = member.likes;
		const prevLiked = member.liked;

		// Optimistic
		member.liked = !member.liked;
		member.likes = member.liked ? member.likes + 1 : member.likes - 1;
		pendingLikes = new Set([...pendingLikes, memberId]);

		try {
			const success = await new Promise<boolean>((resolve) => {
				setTimeout(() => resolve(Math.random() > 0.5), 1000);
			});
			if (!success) throw new Error('fail');
		} catch {
			member.likes = prevLikes;
			member.liked = prevLiked;
		}

		const next = new Set(pendingLikes);
		next.delete(memberId);
		pendingLikes = next;
	}

	// ─── URL Filter ───
	const roles = ['all', 'Admin', 'Editor', 'Viewer'] as const;
	let roleFilter = $derived(page.url.searchParams.get('role') ?? 'all');

	let filteredMembers = $derived(
		roleFilter === 'all' ? members : members.filter((m) => m.role === roleFilter)
	);

	function setRole(role: string) {
		goto(role === 'all' ? '?' : `?role=${role}`);
	}

	// ─── TanStack Table ───
	const columns: ColumnDef<Member>[] = [
		{ accessorKey: 'id', header: 'ID', size: 50 },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'role', header: 'Role', size: 90 },
		{ accessorKey: 'joinedAt', header: 'Joined', size: 110 },
		{
			accessorKey: 'likes',
			header: 'Likes',
			size: 100,
			cell: ({ row }) => {
				const m = row.original;
				return `${m.liked ? '\u2665' : '\u2661'} ${m.likes}`;
			}
		}
	];

	let sorting = $state<SortingState>([]);
	let globalFilter = $state('');

	let options = $state<TableOptions<Member>>({
		get data() { return filteredMembers; },
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
			pagination: { pageSize: 6, pageIndex: 0 }
		}
	});

	const table = createSvelteTable(options);

	// ─── Responsive ───
	let isMobile = $derived((innerWidth?.current ?? 1024) < 768);
</script>

<section class="page">
	<h1>Module 11 Project — Admin Dashboard</h1>

	<p class="concept">
		This project combines <strong>every state management pattern</strong> from Module 11:
		TanStack Table with sort/filter/pagination, a reactive CartStore class, URL-driven
		filter tabs, reactive window values, optimistic like/unlike, and typed context for
		theme sharing.
	</p>

	<!-- Status Bar -->
	<div class="status-bar">
		{#if innerWidth}
			<span class="status-chip">
				{isMobile ? 'Mobile' : 'Desktop'} ({innerWidth.current}px)
			</span>
			<span class="status-chip" class:status-online={online?.current} class:status-offline={!online?.current}>
				{online?.current ? 'Online' : 'Offline'}
			</span>
		{/if}
		<span class="status-chip theme-chip" style:border-color={theme.accent}>
			Theme: {theme.label}
		</span>
		<button class="cart-toggle" onclick={() => showCart = !showCart}>
			Cart ({cart.count})
		</button>
	</div>

	<!-- URL Filter Tabs -->
	<div class="filter-tabs">
		{#each roles as role}
			<button
				class="tab-btn"
				class:active={roleFilter === role}
				onclick={() => setRole(role)}
			>
				{role}
			</button>
		{/each}
	</div>

	<!-- Search -->
	<div class="search-bar">
		<input
			type="text"
			placeholder="Search members..."
			bind:value={globalFilter}
			class="search-input"
		/>
		<span class="result-count">
			{$table.getFilteredRowModel().rows.length} of {filteredMembers.length} shown
		</span>
	</div>

	<!-- Table -->
	<div class="build table-section">
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
											<span class="sort-ind"> &#9650;</span>
										{:else if header.column.getIsSorted() === 'desc'}
											<span class="sort-ind"> &#9660;</span>
										{/if}
									{/if}
								</th>
							{/each}
							<th style:width="90px">Action</th>
						</tr>
					{/each}
				</thead>
				<tbody>
					{#each $table.getRowModel().rows as row}
						{@const member = row.original}
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
							<td>
								<button
									class="like-btn"
									class:liked={member.liked}
									class:pending-like={pendingLikes.has(member.id)}
									onclick={() => toggleLike(member.id)}
									disabled={pendingLikes.has(member.id)}
								>
									{member.liked ? '\u2665' : '\u2661'}
								</button>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan={columns.length + 1} class="no-results">No members found</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="pagination">
			<button class="page-btn" onclick={() => $table.previousPage()} disabled={!$table.getCanPreviousPage()}>
				Prev
			</button>
			<span class="page-info">
				Page {$table.getState().pagination.pageIndex + 1} of {$table.getPageCount()}
			</span>
			<button class="page-btn" onclick={() => $table.nextPage()} disabled={!$table.getCanNextPage()}>
				Next
			</button>
		</div>
	</div>

	<!-- Cart Sidebar -->
	{#if showCart}
		<div class="cart-overlay" role="presentation" onclick={() => showCart = false}></div>
		<aside class="cart-sidebar">
			<div class="cart-header">
				<h3>Add-ons Cart</h3>
				<button class="close-btn" onclick={() => showCart = false}>X</button>
			</div>

			<div class="product-list">
				{#each products as product}
					<div class="product-row">
						<span>{product.name}</span>
						<span class="product-price">${product.price.toFixed(2)}</span>
						<button class="add-btn" onclick={() => cart.add(product)}>+</button>
					</div>
				{/each}
			</div>

			{#if cart.items.length > 0}
				<div class="cart-items">
					<h4>In Cart</h4>
					{#each cart.items as item}
						<div class="cart-row">
							<span>{item.name} x{item.quantity}</span>
							<span>${(item.price * item.quantity).toFixed(2)}</span>
							<button class="remove-btn" onclick={() => cart.remove(item.id)}>Remove</button>
						</div>
					{/each}
					<div class="cart-total">
						<strong>Total: ${cart.total.toFixed(2)}</strong>
						<button class="clear-btn" onclick={() => cart.clear()}>Clear</button>
					</div>
				</div>
			{:else}
				<p class="empty-cart">No items in cart</p>
			{/if}
		</aside>
	{/if}

	<!-- Footer -->
	<footer class="project-footer">
		<p>
			Built with TanStack Table, Reactive Classes, URL State, Context API,
			<code>svelte/reactivity/window</code>, and Optimistic UI patterns.
		</p>
	</footer>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	/* Status Bar */
	.status-bar {
		display: flex;
		gap: var(--space-sm);
		align-items: center;
		flex-wrap: wrap;
		padding: var(--space-sm) 0;
		margin-block: var(--space-md);
	}
	.status-chip {
		font-size: 0.75em;
		padding: 2px var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
	}
	.status-online { background: oklch(80% 0.12 150); color: oklch(30% 0.1 150); }
	.status-offline { background: oklch(80% 0.12 25); color: oklch(30% 0.1 25); }
	.theme-chip {
		border: 1px solid;
		background: color-mix(in oklch, oklch(55% 0.18 260) 10%, var(--color-surface-2));
		color: oklch(55% 0.18 260);
	}
	.cart-toggle {
		margin-inline-start: auto;
		padding: var(--space-xs) var(--space-md);
		background: oklch(55% 0.18 260);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}

	/* Filter Tabs */
	.filter-tabs {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
		margin-block-end: var(--space-md);
	}
	.tab-btn {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	.tab-btn.active {
		background: oklch(55% 0.18 260);
		color: white;
		border-color: oklch(55% 0.18 260);
	}

	/* Search */
	.search-bar {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
		margin-block-end: var(--space-sm);
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
	.result-count {
		font-size: 0.8em;
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	/* Table */
	.table-section {
		padding: var(--space-md);
	}
	.table-wrapper {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85em;
	}
	th, td {
		padding: var(--space-xs) var(--space-sm);
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
	.sort-ind {
		font-size: 0.7em;
		color: oklch(55% 0.18 260);
	}
	.no-results {
		text-align: center;
		font-style: italic;
		padding: var(--space-lg);
	}

	/* Like Button */
	.like-btn {
		background: none;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: 1.1em;
		padding: 2px var(--space-xs);
		color: var(--color-text-muted);
		transition: all 0.2s ease;
	}
	.like-btn.liked {
		color: #e74c3c;
		border-color: #e74c3c;
	}
	.like-btn.pending-like {
		opacity: 0.5;
		cursor: wait;
	}

	/* Pagination */
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
	}
	.page-btn {
		padding: var(--space-xs) var(--space-md);
		background: oklch(55% 0.18 260);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	.page-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.page-info {
		font-size: 0.85em;
		color: var(--color-text-muted);
	}

	/* Cart Sidebar */
	.cart-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 90;
	}
	.cart-sidebar {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: min(360px, 90vw);
		background: var(--color-surface-1);
		border-inline-start: 1px solid var(--color-border);
		z-index: 100;
		padding: var(--space-lg);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.cart-header h3 {
		margin: 0;
	}
	.close-btn {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		padding: var(--space-xs) var(--space-sm);
		color: var(--color-text);
		font-weight: 700;
	}
	.product-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.product-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: 0.85em;
		color: var(--color-text);
	}
	.product-price {
		margin-inline-start: auto;
		font-family: var(--font-mono);
		font-weight: 600;
		color: oklch(55% 0.18 260);
	}
	.add-btn {
		background: oklch(55% 0.18 260);
		color: white;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-weight: 700;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cart-items {
		border-top: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.cart-items h4 {
		margin: 0;
		color: var(--color-text);
	}
	.cart-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: 0.85em;
		color: var(--color-text-muted);
	}
	.cart-row span:nth-child(2) {
		margin-inline-start: auto;
		font-family: var(--font-mono);
		font-weight: 600;
	}
	.remove-btn {
		background: none;
		border: 1px solid #e74c3c;
		color: #e74c3c;
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: 0.75em;
		padding: 2px var(--space-xs);
	}
	.cart-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block-start: var(--space-sm);
		border-top: 1px solid var(--color-border);
		color: var(--color-text);
	}
	.clear-btn {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: 0.8em;
		padding: 2px var(--space-sm);
	}
	.empty-cart {
		color: var(--color-text-muted);
		font-style: italic;
		font-size: 0.9em;
		margin: 0;
	}

	/* Footer */
	.project-footer {
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-md);
		border-top: 1px solid var(--color-border);
	}
	.project-footer p {
		font-size: 0.85em;
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
</style>
