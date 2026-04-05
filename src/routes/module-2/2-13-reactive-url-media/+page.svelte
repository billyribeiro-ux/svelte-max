<script lang="ts">
	import { MediaQuery, SvelteURL } from 'svelte/reactivity';

	// MediaQuery wraps window.matchMedia in a reactive class. `.current` is
	// a reactive boolean — reading it in a template/derived/effect subscribes
	// the render to the media query. No event listeners to manage.
	const mqSm = new MediaQuery('(min-width: 480px)');
	const mqMd = new MediaQuery('(min-width: 768px)');
	const mqLg = new MediaQuery('(min-width: 1024px)');
	const mqXl = new MediaQuery('(min-width: 1280px)');

	interface Breakpoint {
		label: string;
		min: string;
		mq: MediaQuery;
	}

	const breakpoints: Breakpoint[] = [
		{ label: 'sm', min: '480px', mq: mqSm },
		{ label: 'md', min: '768px', mq: mqMd },
		{ label: 'lg', min: '1024px', mq: mqLg },
		{ label: 'xl', min: '1280px', mq: mqXl }
	];

	// SvelteURL is a reactive wrapper around the built-in URL class. Mutating
	// `.pathname`, `.searchParams`, or any setter triggers reactivity on the
	// `.href` / `.search` / `.toString()` reads below.
	const url = new SvelteURL('https://svelte-max.dev/search');

	let q = $state('svelte runes');
	let category = $state('tutorials');
	let page = $state('1');

	// Keep the SvelteURL in sync with the three inputs. Because `url` is
	// reactive, reading `url.href` in the template re-renders on every edit.
	$effect(() => {
		url.searchParams.set('q', q);
		url.searchParams.set('category', category);
		url.searchParams.set('page', page);
	});
</script>

<section class="page">
	<h1>2.13 — Reactive URL and MediaQuery</h1>

	<p class="concept">
		Svelte 5 ships reactive wrappers around DOM APIs that are traditionally event-based. Import
		<code>MediaQuery</code> from <code>svelte/reactivity</code> and construct it with a media-query
		string — reading <code>.current</code> inside a template, <code>$derived</code>, or
		<code>$effect</code> subscribes automatically. <code>SvelteURL</code> and
		<code>SvelteURLSearchParams</code> do the same for the URL API: mutate
		<code>url.pathname</code> or <code>url.searchParams</code> and anything reading
		<code>url.href</code> updates on the spot. These replace hand-rolled
		<code>window.addEventListener('resize', ...)</code> and manual URL-string wrangling with a
		single declarative subscription.
	</p>

	<div class="build stack">
		<h2>Layout inspector</h2>

		<p class="hint">Resize the window and watch each badge light up as its breakpoint activates.</p>

		<div class="badges">
			{#each breakpoints as bp (bp.label)}
				<div class={['badge', bp.mq.current && 'on']}>
					<span class="mark">{bp.mq.current ? '✓' : '·'}</span>
					<span class="label">{bp.label}</span>
					<span class="min">≥ {bp.min}</span>
				</div>
			{/each}
		</div>

		<h2>Reactive URL builder</h2>

		<div class="form">
			<label>
				<span>q</span>
				<input type="text" bind:value={q} placeholder="search query" />
			</label>
			<label>
				<span>category</span>
				<input type="text" bind:value={category} placeholder="category" />
			</label>
			<label>
				<span>page</span>
				<input type="text" bind:value={page} inputmode="numeric" placeholder="1" />
			</label>
		</div>

		<div class="preview">
			<span class="preview-label">Live URL</span>
			<code>{url.href}</code>
		</div>

		<p class="hint">
			Every keystroke mutates <code>url.searchParams</code> via an <code>$effect</code>. The
			<code>url.href</code> read in the <code>&lt;code&gt;</code> block re-runs automatically —
			proof that <code>SvelteURL</code> is reactive. No subscriptions, no listeners, no stores.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>
			<code>MediaQuery</code> from <code>svelte/reactivity</code> turns
			<code>window.matchMedia</code> into a reactive value via <code>.current</code>.
		</li>
		<li>
			It is SSR-safe — during server rendering <code>.current</code> returns a sensible fallback
			instead of throwing.
		</li>
		<li>
			<code>SvelteURL</code> and <code>SvelteURLSearchParams</code> make the URL API reactive;
			mutations trigger re-renders of any reader.
		</li>
		<li>
			These classes replace ad-hoc <code>addEventListener('resize', ...)</code> and
			<code>popstate</code> boilerplate with declarative state.
		</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		font-size: var(--text-base);
		margin-block: var(--space-md) var(--space-lg);
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	h2 {
		font-size: var(--text-lg);
		margin-block-start: var(--space-md);
	}

	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.badges {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-sm);
	}

	@media (min-width: 768px) {
		.badges {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.badge {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-xs);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-spring);
	}

	.badge.on {
		background: color-mix(in oklch, var(--color-success) 18%, var(--color-surface-1));
		border-color: var(--color-success);
		color: var(--color-success);
		transform: translateY(-2px);
	}

	.mark {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 800;
	}

	.label {
		font-weight: 800;
		font-size: var(--text-base);
	}

	.min {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}

	.form {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
		margin-block-start: var(--space-md);
	}

	@media (min-width: 768px) {
		.form {
			grid-template-columns: 2fr 1fr 1fr;
		}
	}

	.form label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.form input {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.form input:focus-visible {
		border-color: var(--color-brand);
		outline: none;
	}

	.preview {
		margin-block-start: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview-label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.preview code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
		word-break: break-all;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.95em;
	}

	ul {
		margin-block-start: var(--space-md);
		padding-inline-start: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		color: var(--color-text-muted);
	}

	h3 {
		margin-block-start: var(--space-xl);
	}
</style>
