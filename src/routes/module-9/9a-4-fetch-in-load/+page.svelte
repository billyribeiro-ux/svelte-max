<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const loaderSnippet = `import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/api/tip');
  const body = await res.json();
  return { tip: body };
};`;
</script>

<section class="page">
	<h1>9A.4 — Enhanced fetch in load</h1>

	<p class="concept">
		<strong>Concept.</strong> The <code>fetch</code> argument you destructure from the load event
		is SvelteKit's <em>enhanced</em> fetch. It inherits credentials from the current request, is
		SSR-aware (short-circuiting same-origin calls to avoid a real HTTP round-trip during SSR), and
		inlines responses into the SSR HTML so the client doesn't refetch on hydration. Always use the
		destructured <code>fetch</code>, never <code>globalThis.fetch</code>.
	</p>

	<div class="build">
		<p class="tip-headline">{data.tip.tip}</p>
		<p class="tip-kind">
			Using <code>{data.tip.fetchType}</code>
		</p>
		<pre>{loaderSnippet}</pre>
		<p class="why">
			Why it matters: during SSR, a call to <code>/api/data</code> through the enhanced
			<code>fetch</code> skips the network entirely — SvelteKit invokes the endpoint handler
			directly. On hydration the client reuses the inlined response, so the user never sees a
			flash of loading state for the initial render.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Destructure <code>fetch</code> from the load event — don't import a global.</li>
		<li>The enhanced fetch inherits credentials and is SSR-aware.</li>
		<li>SSR responses are inlined so the client doesn't re-request on hydration.</li>
		<li>Same-origin requests short-circuit directly to the endpoint handler.</li>
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
	.tip-headline {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-brand);
	}
	.tip-kind {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.why {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
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
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
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
