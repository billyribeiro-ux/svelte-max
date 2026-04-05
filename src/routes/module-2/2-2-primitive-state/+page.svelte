<script lang="ts">
	let enabled = $state<boolean>(false);

	function toggle(): void {
		enabled = !enabled;
	}
</script>

<section class="page">
	<h1>2.2 — Primitive $state</h1>

	<p class="lede">
		Strings, numbers, and booleans are the atoms of application state. Most of what a UI
		cares about — counts, flags, single text fields, selected IDs — lives in a primitive.
	</p>

	<p>
		When you wrap a primitive with <code>$state</code>, Svelte gives you back a reactive
		slot. Reading it registers a dependency; writing to it triggers updates. That's why
		<code>count++</code> <em>just works</em>: even though <code>count</code> looks like a
		plain number, the compiler has rewritten it into a read–modify–write that flows through
		the reactive system.
	</p>

	<p>
		TypeScript infers the type from the initial value — <code>$state(0)</code> is
		<code>number</code>, <code>$state('')</code> is <code>string</code>. When the initial
		value doesn't tell the whole story (for example, a string that will later hold only
		specific literal values), be explicit: <code>$state&lt;'idle' | 'loading'&gt;('idle')</code>.
	</p>

	<p>
		Finally, primitives must be declared with <code>let</code>, never <code>const</code>.
		You <em>will</em> assign new values to them, and <code>const</code> would block that at
		the language level before the proxy ever got a chance.
	</p>

	<div class="demo">
		<div class="row">
			<button
				type="button"
				class="switch"
				aria-pressed={enabled}
				aria-label="Toggle notifications"
				onclick={toggle}
			>
				<span class="knob"></span>
			</button>
			<span class="status">
				{enabled ? 'Notifications on' : 'Notifications off'}
			</span>
		</div>
		<p class="hint">
			A single <code>boolean</code> in <code>$state</code> drives the colour, the knob
			position, the <code>aria-pressed</code> value, and the label — all from one
			assignment.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Primitives (string, number, boolean) are the most common kind of state.</li>
		<li><code>count++</code> and similar mutations work because <code>$state</code> is proxy-backed.</li>
		<li>TypeScript infers a primitive type from the initial value; override with a generic when needed.</li>
		<li>Use <code>let</code> for primitive state — you need to reassign it.</li>
		<li>A single boolean can drive an entire piece of UI through CSS and bindings.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.lede {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--color-surface-2);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.switch {
		--track-w: 3.25rem;
		--track-h: 1.85rem;
		--pad: 0.22rem;
		position: relative;
		width: var(--track-w);
		height: var(--track-h);
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-border);
		padding: 0;
		cursor: pointer;
		transition: background var(--dur-base) var(--ease-out);

		&[aria-pressed='true'] {
			background: var(--color-brand);
			border-color: var(--color-brand);
		}

		&:focus-visible {
			outline: 2px solid var(--color-brand);
			outline-offset: 2px;
		}
	}

	.knob {
		position: absolute;
		top: var(--pad);
		left: var(--pad);
		width: calc(var(--track-h) - var(--pad) * 2 - 2px);
		height: calc(var(--track-h) - var(--pad) * 2 - 2px);
		border-radius: var(--radius-full);
		background: var(--color-surface-1);
		box-shadow: var(--shadow-sm);
		transition: transform var(--dur-base) var(--ease-spring);
	}

	.switch[aria-pressed='true'] .knob {
		transform: translateX(calc(var(--track-w) - var(--track-h)));
	}

	.status {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
	}

	.hint {
		font-size: var(--text-sm);
	}

	h3 {
		font-size: var(--text-lg);
		margin-top: var(--space-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-left: var(--space-md);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.demo {
			padding: var(--space-lg);
		}
	}
</style>
