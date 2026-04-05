<script lang="ts">
	// 1) bind:group
	let prefs = $state<string[]>([]);

	// 2) dimension bindings on a resizable textarea
	let taWidth = $state(0);
	let taHeight = $state(0);
	let sample = $state('Resize me from the corner ↘');

	// 3) <details bind:open>
	let detailsOpen = $state(false);

	function toggleDetails(): void {
		detailsOpen = !detailsOpen;
	}
</script>

<section class="page">
	<h1>5.10 — Bindings deep dive</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>bind:value</code> is the start. <code>bind:group</code> binds radios or
		checkboxes to an array. Media bindings: <code>bind:currentTime</code>, <code>bind:paused</code>,
		<code>bind:duration</code>. Dimension bindings (<code>bind:clientWidth</code>,
		<code>bind:clientHeight</code>) are readonly and measured via ResizeObserver.
		<code>bind:this</code> grabs the DOM element. <code>&lt;details bind:open&gt;</code> syncs open state.
	</p>

	<div class="build">
		<section class="part">
			<h4>1. <code>bind:group</code> on checkboxes</h4>
			<div class="checks">
				<label><input type="checkbox" bind:group={prefs} value="email" /> Email</label>
				<label><input type="checkbox" bind:group={prefs} value="sms" /> SMS</label>
				<label><input type="checkbox" bind:group={prefs} value="push" /> Push</label>
			</div>
			<p class="state">prefs = <code>[{prefs.map((p) => `"${p}"`).join(', ')}]</code></p>
		</section>

		<section class="part">
			<h4>2. Dimension bindings on a resizable <code>&lt;textarea&gt;</code></h4>
			<textarea
				class="resizable"
				bind:value={sample}
				bind:clientWidth={taWidth}
				bind:clientHeight={taHeight}
			></textarea>
			<p class="state">
				clientWidth = <code>{taWidth}px</code> · clientHeight = <code>{taHeight}px</code>
			</p>
		</section>

		<section class="part">
			<h4>3. <code>&lt;details bind:open&gt;</code> two-way</h4>
			<button type="button" class="btn" onclick={toggleDetails}>
				{detailsOpen ? 'Close from outside' : 'Open from outside'}
			</button>
			<details bind:open={detailsOpen}>
				<summary>Click me (native) or use the button above</summary>
				<p class="inside">
					Both the summary click and the external button flip the same <code>detailsOpen</code> state.
				</p>
			</details>
			<p class="state">detailsOpen = <code>{detailsOpen}</code></p>
		</section>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>bind:group</code> collects multiple inputs into an array.</li>
		<li>Dimension bindings are readonly — set by the browser via ResizeObserver.</li>
		<li><code>bind:open</code> on <code>&lt;details&gt;</code> is two-way: both sides stay in sync.</li>
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
		gap: var(--space-xl);
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
	.part {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.part h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.checks {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}
	.checks label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
		min-block-size: 44px;
	}
	.resizable {
		resize: both;
		min-inline-size: 200px;
		min-block-size: 80px;
		inline-size: 280px;
		block-size: 120px;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
	.btn {
		align-self: flex-start;
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
	}
	details {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
	}
	summary {
		cursor: pointer;
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.inside {
		margin-block-start: var(--space-sm);
		margin-block-end: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
