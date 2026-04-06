<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// Explicit union type — the whole component's shape hangs off this.
	type Status = 'idle' | 'loading' | 'success' | 'error';

	interface Result {
		title: string;
		description: string;
	}

	// When the initial value is narrower than the intended type (null here),
	// we annotate $state explicitly so later assignments of Result are allowed.
	let status = $state<Status>('idle');
	let result = $state<Result | null>(null);
	let error = $state<string | null>(null);

	const samplePayloads: Result[] = [
		{
			title: 'Weekly digest ready',
			description: 'Seven new articles, three new videos, and two community highlights.'
		},
		{
			title: 'Deployment succeeded',
			description: 'Release v2.3.1 is live in production with zero failing health checks.'
		},
		{
			title: 'Profile synchronized',
			description: 'Your preferences are now available on all connected devices.'
		}
	];

	async function fetchIt(): Promise<void> {
		status = 'loading';
		result = null;
		error = null;

		await new Promise((res) => setTimeout(res, 1200));

		// 70% success / 30% error — enough variety to exercise both branches.
		if (Math.random() < 0.7) {
			result = samplePayloads[Math.floor(Math.random() * samplePayloads.length)];
			status = 'success';
		} else {
			error = 'Network request failed — please retry.';
			status = 'error';
		}
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// Explicit union type — the whole component's shape hangs off this.\n" +
		"\ttype Status = 'idle' | 'loading' | 'success' | 'error';\n" +
		"\n" +
		"\tinterface Result {\n" +
		"\t\ttitle: string;\n" +
		"\t\tdescription: string;\n" +
		"\t}\n" +
		"\n" +
		"\t// When the initial value is narrower than the intended type (null here),\n" +
		"\t// we annotate $state explicitly so later assignments of Result are allowed.\n" +
		"\tlet status = $state\u003cStatus\u003e('idle');\n" +
		"\tlet result = $state\u003cResult | null\u003e(null);\n" +
		"\tlet error = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"\tconst samplePayloads: Result[] = [\n" +
		"\t\t{\n" +
		"\t\t\ttitle: 'Weekly digest ready',\n" +
		"\t\t\tdescription: 'Seven new articles, three new videos, and two community highlights.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\ttitle: 'Deployment succeeded',\n" +
		"\t\t\tdescription: 'Release v2.3.1 is live in production with zero failing health checks.'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\ttitle: 'Profile synchronized',\n" +
		"\t\t\tdescription: 'Your preferences are now available on all connected devices.'\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\n" +
		"\tasync function fetchIt(): Promise\u003cvoid\u003e {\n" +
		"\t\tstatus = 'loading';\n" +
		"\t\tresult = null;\n" +
		"\t\terror = null;\n" +
		"\n" +
		"\t\tawait new Promise((res) =\u003e setTimeout(res, 1200));\n" +
		"\n" +
		"\t\t// 70% success / 30% error — enough variety to exercise both branches.\n" +
		"\t\tif (Math.random() \u003c 0.7) {\n" +
		"\t\t\tresult = samplePayloads[Math.floor(Math.random() * samplePayloads.length)];\n" +
		"\t\t\tstatus = 'success';\n" +
		"\t\t} else {\n" +
		"\t\t\terror = 'Network request failed — please retry.';\n" +
		"\t\t\tstatus = 'error';\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.15 — Typed reactive state\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tStrict TypeScript types for runes keep refactors safe. When the initial value of\n" +
		"\t\t\u003ccode\u003e$state\u003c/code\u003e doesn't describe the full shape — e.g., starting with \u003ccode\u003enull\u003c/code\u003e and\n" +
		"\t\tpopulating later — annotate explicitly with \u003ccode\u003e$state&lt;User | null&gt;(null)\u003c/code\u003e.\n" +
		"\t\t\u003ccode\u003e$derived\u003c/code\u003e infers from its expression, so it rarely needs a manual type. Union types\n" +
		"\t\tmodel state machines cleanly: \u003ccode\u003etype Status = 'idle' | 'loading' | 'success' | 'error'\u003c/code\u003e.\n" +
		"\t\tTypeScript narrows unions inside template \u003ccode\u003e{`{#if}`}\u003c/code\u003e blocks, so branches see the\n" +
		"\t\tcorrect non-null types automatically.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build stack\"\u003e\n" +
		"\t\t\u003ch2\u003eTyped async fetch machine\u003c/h2\u003e\n" +
		"\n" +
		"\t\t{#if status === 'idle'}\n" +
		"\t\t\t\u003cdiv class=\"card idle\"\u003e\n" +
		"\t\t\t\t\u003cp\u003ePress the button to simulate an async request.\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"primary\" onclick={fetchIt}\u003eFetch\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{:else if status === 'loading'}\n" +
		"\t\t\t\u003cdiv class=\"card loading\" aria-live=\"polite\"\u003e\n" +
		"\t\t\t\t\u003cspan class=\"dot\" aria-hidden=\"true\"\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\u003cp\u003eLoading…\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{:else if status === 'success' && result}\n" +
		"\t\t\t\u003c!--\n" +
		"\t\t\t\tNarrowing: the `&& result` guard tells TypeScript that `result` is\n" +
		"\t\t\t\t`Result`, not `Result | null`, inside this branch. No `!` needed.\n" +
		"\t\t\t--\u003e\n" +
		"\t\t\t\u003cdiv class=\"card success\"\u003e\n" +
		"\t\t\t\t\u003ch3\u003e{result.title}\u003c/h3\u003e\n" +
		"\t\t\t\t\u003cp\u003e{result.description}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"secondary\" onclick={fetchIt}\u003eFetch another\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{:else if status === 'error' && error}\n" +
		"\t\t\t\u003c!-- Same trick — `error` is narrowed to `string` here. --\u003e\n" +
		"\t\t\t\u003cdiv class=\"card error\" role=\"alert\"\u003e\n" +
		"\t\t\t\t\u003ch3\u003eSomething went wrong\u003c/h3\u003e\n" +
		"\t\t\t\t\u003cp\u003e{error}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"primary\" onclick={fetchIt}\u003eRetry\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tUse \u003ccode\u003e$state&lt;T&gt;(initial)\u003c/code\u003e when the initial value is narrower than the desired\n" +
		"\t\t\ttype (e.g., \u003ccode\u003enull\u003c/code\u003e).\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003e$derived\u003c/code\u003e infers from its expression — no annotation needed in most cases.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUnion types model finite state machines exactly and exhaustively.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tTemplate \u003ccode\u003e{`{#if}`}\u003c/code\u003e conditions narrow types inside their branches, eliminating\n" +
		"\t\t\tnon-null assertions.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eZero \u003ccode\u003eany\u003c/code\u003e. Every assignment is type-checked.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.15 — Typed reactive state</h1>

	<p class="concept">
		Strict TypeScript types for runes keep refactors safe. When the initial value of
		<code>$state</code> doesn't describe the full shape — e.g., starting with <code>null</code> and
		populating later — annotate explicitly with <code>$state&lt;User | null&gt;(null)</code>.
		<code>$derived</code> infers from its expression, so it rarely needs a manual type. Union types
		model state machines cleanly: <code>type Status = 'idle' | 'loading' | 'success' | 'error'</code>.
		TypeScript narrows unions inside template <code>{`{#if}`}</code> blocks, so branches see the
		correct non-null types automatically.
	</p>

	<div class="build stack">
		<h2>Typed async fetch machine</h2>

		{#if status === 'idle'}
			<div class="card idle">
				<p>Press the button to simulate an async request.</p>
				<button type="button" class="primary" onclick={fetchIt}>Fetch</button>
			</div>
		{:else if status === 'loading'}
			<div class="card loading" aria-live="polite">
				<span class="dot" aria-hidden="true"></span>
				<p>Loading…</p>
			</div>
		{:else if status === 'success' && result}
			<!--
				Narrowing: the `&& result` guard tells TypeScript that `result` is
				`Result`, not `Result | null`, inside this branch. No `!` needed.
			-->
			<div class="card success">
				<h3>{result.title}</h3>
				<p>{result.description}</p>
				<button type="button" class="secondary" onclick={fetchIt}>Fetch another</button>
			</div>
		{:else if status === 'error' && error}
			<!-- Same trick — `error` is narrowed to `string` here. -->
			<div class="card error" role="alert">
				<h3>Something went wrong</h3>
				<p>{error}</p>
				<button type="button" class="primary" onclick={fetchIt}>Retry</button>
			</div>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>
			Use <code>$state&lt;T&gt;(initial)</code> when the initial value is narrower than the desired
			type (e.g., <code>null</code>).
		</li>
		<li>
			<code>$derived</code> infers from its expression — no annotation needed in most cases.
		</li>
		<li>Union types model finite state machines exactly and exhaustively.</li>
		<li>
			Template <code>{`{#if}`}</code> conditions narrow types inside their branches, eliminating
			non-null assertions.
		</li>
		<li>Zero <code>any</code>. Every assignment is type-checked.</li>
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
	}

	.card {
		padding: var(--space-lg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.card h3 {
		font-size: var(--text-lg);
	}

	.card p {
		color: var(--color-text-muted);
	}

	.card.loading {
		flex-direction: row;
		align-items: center;
	}

	.card.success {
		border-color: var(--color-success);
		background: color-mix(in oklch, var(--color-success) 10%, var(--color-surface));
	}

	.card.error {
		border-color: var(--color-error);
		background: color-mix(in oklch, var(--color-error) 12%, var(--color-surface));
	}

	.card.error h3 {
		color: var(--color-error);
	}

	.dot {
		inline-size: 0.9rem;
		block-size: 0.9rem;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		animation: pulse 1s var(--ease-in-out) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.4);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.dot {
			animation: none;
			opacity: 0.9;
		}
	}

	button {
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		font-weight: 600;
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-spring);
	}

	button:hover {
		transform: translateY(-1px);
	}

	.primary {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}

	.primary:hover {
		background: var(--color-brand-dim);
	}

	.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
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

	.build h3 {
		margin-block-start: 0;
	}

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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
