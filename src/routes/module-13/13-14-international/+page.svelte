<script lang="ts">
	interface Locale {
		code: string;
		label: string;
	}

	const locales: Locale[] = [
		{ code: 'en-US', label: 'English (US)' },
		{ code: 'en-GB', label: 'English (UK)' },
		{ code: 'de-DE', label: 'German' },
		{ code: 'ja-JP', label: 'Japanese' }
	];

	let current = $state<string>('en-US');

	const base = 'https://svelte-max.example';
	const path = '/articles/oklch';

	const tags = $derived([
		...locales.map((l) => ({
			hreflang: l.code,
			href: `${base}/${l.code}${path}`
		})),
		{ hreflang: 'x-default', href: `${base}${path}` }
	]);

	const rendered = $derived(
		tags
			.map((t) => `<link rel="alternate" hreflang="${t.hreflang}" href="${t.href}" />`)
			.join('\n')
	);
</script>

<svelte:head>
	{#each tags as t (t.hreflang)}
		<link rel="alternate" hreflang={t.hreflang} href={t.href} />
	{/each}
</svelte:head>

<section class="page">
	<h1>13.14 — International SEO</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>hreflang</code> tags tell Google which language/region versions of a
		page exist. Format:
		<code>{'<link rel="alternate" hreflang="en-US" href="..." />'}</code>. Always
		include <code>x-default</code> as the fallback. Every language version of
		every page should list every other language version AND itself. The
		<code>{'<html lang="...">'}</code>
		attribute also matters — SvelteKit sets it via
		<code>src/app.html</code> (static) or dynamically via
		<code>document.documentElement.lang</code> in an <code>$effect</code>.
	</p>

	<div class="build">
		<label class="field">
			<span>Current locale</span>
			<select bind:value={current}>
				{#each locales as l (l.code)}
					<option value={l.code}>{l.label} ({l.code})</option>
				{/each}
			</select>
		</label>

		<p class="echo">
			Active: <strong>{current}</strong>
		</p>

		<h2>Rendered into &lt;svelte:head&gt;</h2>
		<pre>{rendered}</pre>

		<p class="note">
			In production, each language version also sets <code>lang</code> on
			<code>{'<html>'}</code> — SvelteKit does this via <code>app.html</code>
			(static) or <code>document.documentElement.lang</code> via
			<code>$effect</code> (dynamic).
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>hreflang</code> tags enumerate every language/region variant.</li>
		<li>Always include <code>x-default</code> as the fallback URL.</li>
		<li>Each variant page lists every variant, including itself.</li>
		<li>
			The <code>{'<html lang>'}</code> attribute complements hreflang for accessibility
			and search.
		</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	h2 {
		font-size: var(--text-lg);
		margin: 0;
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
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field span {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	select {
		padding: var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-size: var(--text-base);
	}
	.echo {
		margin: 0;
		color: var(--color-text-muted);
	}
	.echo strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.note {
		margin: 0;
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
