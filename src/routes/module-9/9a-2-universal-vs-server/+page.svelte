<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="page">
	<h1>9A.2 — Universal vs server load</h1>

	<p class="concept">
		<strong>Concept.</strong> <code>+page.ts</code> is <em>universal</em> — it runs on the server
		during SSR and then <em>again</em> in the browser on client-side navigation.
		<code>+page.server.ts</code> is <em>server only</em> — it never runs in the browser. Both can
		coexist for the same route: the server loader runs first, and the universal loader receives
		its return value as <code>event.data</code> and can merge or extend it.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">serverSecret</span>
			<code>{data.serverSecret}</code>
		</div>
		<div class="row">
			<span class="label">processedAt (server, stable)</span>
			<code>{data.processedAt}</code>
		</div>
		<div class="row">
			<span class="label">clientTs (universal, updates on nav)</span>
			<code>{data.clientTs}</code>
		</div>
		<div class="row">
			<span class="label">combined</span>
			<code>{data.combined}</code>
		</div>
		<p class="note">
			Navigate away and back client-side: <code>clientTs</code> will change but
			<code>processedAt</code> stays the same because the server loader only ran once during the
			initial SSR.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>+page.server.ts</code> is server-only — use it for secrets and DB reads.</li>
		<li><code>+page.ts</code> is universal — it runs on both server and client.</li>
		<li>When both exist, the universal loader receives server data via <code>event.data</code>.</li>
		<li>Client-side navigation re-runs the universal loader but reuses server data from SSR.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-md);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
