<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { MediaQuery, SvelteURL } from 'svelte/reactivity';\n" +
		"\n" +
		"\t// MediaQuery wraps window.matchMedia in a reactive class. `.current` is\n" +
		"\t// a reactive boolean — reading it in a template/derived/effect subscribes\n" +
		"\t// the render to the media query. No event listeners to manage.\n" +
		"\tconst mqSm = new MediaQuery('(min-width: 480px)');\n" +
		"\tconst mqMd = new MediaQuery('(min-width: 768px)');\n" +
		"\tconst mqLg = new MediaQuery('(min-width: 1024px)');\n" +
		"\tconst mqXl = new MediaQuery('(min-width: 1280px)');\n" +
		"\n" +
		"\tinterface Breakpoint {\n" +
		"\t\tlabel: string;\n" +
		"\t\tmin: string;\n" +
		"\t\tmq: MediaQuery;\n" +
		"\t}\n" +
		"\n" +
		"\tconst breakpoints: Breakpoint[] = [\n" +
		"\t\t{ label: 'sm', min: '480px', mq: mqSm },\n" +
		"\t\t{ label: 'md', min: '768px', mq: mqMd },\n" +
		"\t\t{ label: 'lg', min: '1024px', mq: mqLg },\n" +
		"\t\t{ label: 'xl', min: '1280px', mq: mqXl }\n" +
		"\t];\n" +
		"\n" +
		"\t// SvelteURL is a reactive wrapper around the built-in URL class. Mutating\n" +
		"\t// `.pathname`, `.searchParams`, or any setter triggers reactivity on the\n" +
		"\t// `.href` / `.search` / `.toString()` reads below.\n" +
		"\tconst url = new SvelteURL('https://svelte-max.dev/search');\n" +
		"\n" +
		"\tlet q = $state('svelte runes');\n" +
		"\tlet category = $state('tutorials');\n" +
		"\tlet page = $state('1');\n" +
		"\n" +
		"\t// Keep the SvelteURL in sync with the three inputs. Because `url` is\n" +
		"\t// reactive, reading `url.href` in the template re-renders on every edit.\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\turl.searchParams.set('q', q);\n" +
		"\t\turl.searchParams.set('category', category);\n" +
		"\t\turl.searchParams.set('page', page);\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.13 — Reactive URL and MediaQuery\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tSvelte 5 ships reactive wrappers around DOM APIs that are traditionally event-based. Import\n" +
		"\t\t\u003ccode\u003eMediaQuery\u003c/code\u003e from \u003ccode\u003esvelte/reactivity\u003c/code\u003e and construct it with a media-query\n" +
		"\t\tstring — reading \u003ccode\u003e.current\u003c/code\u003e inside a template, \u003ccode\u003e$derived\u003c/code\u003e, or\n" +
		"\t\t\u003ccode\u003e$effect\u003c/code\u003e subscribes automatically. \u003ccode\u003eSvelteURL\u003c/code\u003e and\n" +
		"\t\t\u003ccode\u003eSvelteURLSearchParams\u003c/code\u003e do the same for the URL API: mutate\n" +
		"\t\t\u003ccode\u003eurl.pathname\u003c/code\u003e or \u003ccode\u003eurl.searchParams\u003c/code\u003e and anything reading\n" +
		"\t\t\u003ccode\u003eurl.href\u003c/code\u003e updates on the spot. These replace hand-rolled\n" +
		"\t\t\u003ccode\u003ewindow.addEventListener('resize', ...)\u003c/code\u003e and manual URL-string wrangling with a\n" +
		"\t\tsingle declarative subscription.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build stack\"\u003e\n" +
		"\t\t\u003ch2\u003eLayout inspector\u003c/h2\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003eResize the window and watch each badge light up as its breakpoint activates.\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"badges\"\u003e\n" +
		"\t\t\t{#each breakpoints as bp (bp.label)}\n" +
		"\t\t\t\t\u003cdiv class={['badge', bp.mq.current && 'on']}\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"mark\"\u003e{bp.mq.current ? '✓' : '·'}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"label\"\u003e{bp.label}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"min\"\u003e≥ {bp.min}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003ch2\u003eReactive URL builder\u003c/h2\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"form\"\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003eq\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={q} placeholder=\"search query\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003ecategory\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={category} placeholder=\"category\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel\u003e\n" +
		"\t\t\t\t\u003cspan\u003epage\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"text\" bind:value={page} inputmode=\"numeric\" placeholder=\"1\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"preview\"\u003e\n" +
		"\t\t\t\u003cspan class=\"preview-label\"\u003eLive URL\u003c/span\u003e\n" +
		"\t\t\t\u003ccode\u003e{url.href}\u003c/code\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tEvery keystroke mutates \u003ccode\u003eurl.searchParams\u003c/code\u003e via an \u003ccode\u003e$effect\u003c/code\u003e. The\n" +
		"\t\t\t\u003ccode\u003eurl.href\u003c/code\u003e read in the \u003ccode\u003e&lt;code&gt;\u003c/code\u003e block re-runs automatically —\n" +
		"\t\t\tproof that \u003ccode\u003eSvelteURL\u003c/code\u003e is reactive. No subscriptions, no listeners, no stores.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003eMediaQuery\u003c/code\u003e from \u003ccode\u003esvelte/reactivity\u003c/code\u003e turns\n" +
		"\t\t\t\u003ccode\u003ewindow.matchMedia\u003c/code\u003e into a reactive value via \u003ccode\u003e.current\u003c/code\u003e.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tIt is SSR-safe — during server rendering \u003ccode\u003e.current\u003c/code\u003e returns a sensible fallback\n" +
		"\t\t\tinstead of throwing.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003eSvelteURL\u003c/code\u003e and \u003ccode\u003eSvelteURLSearchParams\u003c/code\u003e make the URL API reactive;\n" +
		"\t\t\tmutations trigger re-renders of any reader.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tThese classes replace ad-hoc \u003ccode\u003eaddEventListener('resize', ...)\u003c/code\u003e and\n" +
		"\t\t\t\u003ccode\u003epopstate\u003c/code\u003e boilerplate with declarative state.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<h2>Break it on purpose</h2>

	<p class="prose">
		Compare reactive and non-reactive versions of URL and MediaQuery to see exactly what the wrappers buy you.
	</p>

	<ol class="experiments">
		<li>
			<strong>Use a plain <code>new URL()</code>.</strong> Replace <code>new SvelteURL()</code>
			with <code>new URL()</code>. Now mutate <code>url.searchParams.set('q', 'test')</code>
			from an effect or handler. The <code>url.href</code> display in the template does not
			update because the native URL object has no reactive tracking — Svelte cannot detect
			when its properties change.
		</li>
		<li>
			<strong>Use <code>new SvelteURL()</code>.</strong> Switch back to the reactive version.
			Now <code>url.searchParams.set()</code> triggers updates — the template reading
			<code>url.href</code> re-renders immediately. Every setter on <code>SvelteURL</code>
			notifies the reactive graph, and every getter registers a dependency.
		</li>
		<li>
			<strong>Create a <code>MediaQuery</code> for dark mode.</strong> Try
			<code>const dark = new MediaQuery('(prefers-color-scheme: dark)')</code> and read
			<code>dark.current</code> in the markup. Toggle your OS dark mode preference and watch
			the value update in real time — no <code>addEventListener</code> needed.
		</li>
		<li>
			<strong>Read <code>MediaQuery.current</code> inside <code>$derived</code>.</strong>
			Create <code>const label = $derived(dark.current ? 'Dark' : 'Light')</code>. The
			derived value recomputes whenever the media query match changes because
			<code>.current</code> is a reactive read that registers the derivation as a subscriber.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>SvelteURL</code> makes URL manipulation reactive. Where a native <code>URL</code>
		object silently absorbs mutations, <code>SvelteURL</code> wraps every property setter
		(<code>.pathname</code>, <code>.search</code>, <code>.hash</code>) and every
		<code>searchParams</code> method to trigger updates on any subscriber reading
		<code>.href</code>, <code>.search</code>, or <code>.toString()</code>. This eliminates
		the need to manually reconstruct URL strings whenever a parameter changes.
	</p>

	<p class="prose">
		<code>MediaQuery</code> replaces the traditional pattern of
		<code>window.matchMedia(query).addEventListener('change', handler)</code> with a single
		reactive class. Construct it with a media query string and read <code>.current</code>
		anywhere — in templates, in <code>$derived</code>, in <code>$effect</code>. The value
		updates automatically when the match changes. It is SSR-safe: during server rendering,
		<code>.current</code> returns a sensible default instead of throwing.
	</p>

	<p class="prose">
		Both classes are imported from <code>svelte/reactivity</code> and follow the same
		philosophy as <code>SvelteMap</code> and <code>SvelteSet</code>: they wrap browser
		APIs in reactive shells so you can use them declaratively instead of imperatively. No
		event listeners to add or remove, no cleanup functions to manage, no stale closures to
		debug. The reactive graph handles synchronization.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-14-reactive-css">2.14 — Reactive CSS</a> — bind reactive values
		to CSS properties and custom properties with the <code>style:</code> directive.
	</p>
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

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
