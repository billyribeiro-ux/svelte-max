<script lang="ts">
	type ToastKind = 'info' | 'success' | 'error';

	interface Toast {
		id: number;
		kind: ToastKind;
		text: string;
	}

	let toasts = $state<Toast[]>([]);
	let nextId = 0;

	function addToast(kind: ToastKind, text: string): void {
		const id = ++nextId;
		toasts = [...toasts, { id, kind, text }];
	}

	function dismiss(id: number): void {
		toasts = toasts.filter((t) => t.id !== id);
	}

	function clearAll(): void {
		toasts = [];
	}

	// Auto-dismiss after 3s. Track timers per toast id so cleanup works when toasts change.
	$effect(() => {
		const current = toasts;
		const timers = current.map((t) =>
			setTimeout(() => {
				toasts = toasts.filter((x) => x.id !== t.id);
			}, 3000)
		);
		return () => {
			for (const h of timers) clearTimeout(h);
		};
	});

	// Imagined child component API (kept inline here for demonstration):
	//   interface Props { onselect?: (item: Item) => void }
	// Parents pass typed callback props instead of using createEventDispatcher.
</script>

<section class="page">
	<h1>5.9 — Callback prop pattern</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte 5 has no <code>createEventDispatcher</code>. Components accept typed
		callback props like <code>onselect?: (item: Item) =&gt; void</code> and call them directly. Parents
		pass a handler: <code>&lt;Picker onselect={'{(i) => ...}'} /&gt;</code>. Type-safe, discoverable, no
		string event names.
	</p>

	<div class="build">
		<p class="hint">Click a trigger — each calls a typed handler that pushes a toast. Toasts auto-dismiss in 3s.</p>
		<div class="triggers">
			<button type="button" class="btn info" onclick={() => addToast('info', 'Saved your preferences.')}>
				Info
			</button>
			<button type="button" class="btn success" onclick={() => addToast('success', 'Profile updated!')}>
				Success
			</button>
			<button type="button" class="btn error" onclick={() => addToast('error', 'Something went wrong.')}>
				Error
			</button>
			<button type="button" class="btn ghost" onclick={clearAll}>Clear all</button>
		</div>

		<p class="count">Active toasts: <strong>{toasts.length}</strong></p>
	</div>

	<div class="stack" aria-live="polite" aria-atomic="false">
		{#each toasts as t (t.id)}
			<div class="toast" data-kind={t.kind} role="status">
				<span class="dot" aria-hidden="true"></span>
				<span class="text">{t.text}</span>
				<button type="button" class="x" aria-label="Dismiss" onclick={() => dismiss(t.id)}>×</button>
			</div>
		{/each}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Components declare callback props with typed signatures.</li>
		<li>Parents pass arrow handlers — no event name strings to typo.</li>
		<li>Return cleanups from <code>$effect</code> to clear pending timers.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.triggers {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.btn {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
		color: var(--color-surface);
	}
	.btn.info {
		background: var(--color-brand);
		border-color: var(--color-brand);
	}
	.btn.success {
		background: var(--color-success);
		border-color: var(--color-success);
	}
	.btn.error {
		background: var(--color-error);
		border-color: var(--color-error);
	}
	.btn.ghost {
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.count {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.count strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.stack {
		position: fixed;
		inset-block-end: var(--space-lg);
		inset-inline-end: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 100;
		max-inline-size: 22rem;
	}
	.toast {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		box-shadow: var(--shadow-lg);
		animation: fade-in var(--dur-base) var(--ease-out);
	}
	.toast[data-kind='info'] .dot {
		background: var(--color-brand);
	}
	.toast[data-kind='success'] .dot {
		background: var(--color-success);
	}
	.toast[data-kind='error'] .dot {
		background: var(--color-error);
	}
	.dot {
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}
	.text {
		flex: 1;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.x {
		background: transparent;
		border: 0;
		color: var(--color-text-muted);
		font-size: var(--text-lg);
		cursor: pointer;
		line-height: 1;
		padding: 0 var(--space-xs);
	}
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
