<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Status = 'idle' | 'loading' | 'error' | 'success';

	let status = $state<Status>('idle');

	function setStatus(next: Status) {
		status = next;
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Status = 'idle' | 'loading' | 'error' | 'success';\n" +
		"\n" +
		"\tlet status = $state\u003cStatus\u003e('idle');\n" +
		"\n" +
		"\tfunction setStatus(next: Status) {\n" +
		"\t\tstatus = next;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.2 — {':else if'} and {':else'}\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{'{:else if}'}\u003c/code\u003e and \u003ccode\u003e{'{:else}'}\u003c/code\u003e chain conditions in a single\n" +
		"\t\t\u003ccode\u003e{'{#if}'}\u003c/code\u003e block. Svelte evaluates them top-down and renders the first branch\n" +
		"\t\tthat matches. This is the idiomatic pattern for finite state machines — the universal\n" +
		"\t\t\u003ccode\u003e'idle' | 'loading' | 'error' | 'success'\u003c/code\u003e shape for any async operation.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e setStatus('idle')}\u003eidle\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e setStatus('loading')}\u003eloading\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e setStatus('error')}\u003eerror\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e setStatus('success')}\u003esuccess\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#if status === 'loading'}\n" +
		"\t\t\t\u003cspan class=\"pill loading\"\u003eLoading…\u003c/span\u003e\n" +
		"\t\t{:else if status === 'error'}\n" +
		"\t\t\t\u003cspan class=\"pill error\"\u003eSomething went wrong\u003c/span\u003e\n" +
		"\t\t{:else if status === 'success'}\n" +
		"\t\t\t\u003cspan class=\"pill success\"\u003eDone!\u003c/span\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cspan class=\"pill idle\"\u003eIdle — click a button\u003c/span\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tThe status is \u003ccode\u003e{status}\u003c/code\u003e. Click through to see each branch render.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{':else if'}\u003c/code\u003e chains inside one \u003ccode\u003e{'{#if}'}\u003c/code\u003e block.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eBranches are evaluated top-down; only the first match renders.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eA literal union type like \u003ccode\u003e'idle' | 'loading' | 'error' | 'success'\u003c/code\u003e pairs perfectly with an \u003ccode\u003e{'{:else if}'}\u003c/code\u003e chain.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{':else'}\u003c/code\u003e is the fallback when no branch matches.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.2 — {':else if'} and {':else'}</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{:else if}'}</code> and <code>{'{:else}'}</code> chain conditions in a single
		<code>{'{#if}'}</code> block. Svelte evaluates them top-down and renders the first branch
		that matches. This is the idiomatic pattern for finite state machines — the universal
		<code>'idle' | 'loading' | 'error' | 'success'</code> shape for any async operation.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={() => setStatus('idle')}>idle</button>
			<button type="button" onclick={() => setStatus('loading')}>loading</button>
			<button type="button" onclick={() => setStatus('error')}>error</button>
			<button type="button" onclick={() => setStatus('success')}>success</button>
		</div>

		{#if status === 'loading'}
			<span class="pill loading">Loading…</span>
		{:else if status === 'error'}
			<span class="pill error">Something went wrong</span>
		{:else if status === 'success'}
			<span class="pill success">Done!</span>
		{:else}
			<span class="pill idle">Idle — click a button</span>
		{/if}

		<p class="note">
			The status is <code>{status}</code>. Click through to see each branch render.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>{':else if'}</code> chains inside one <code>{'{#if}'}</code> block.</li>
		<li>Branches are evaluated top-down; only the first match renders.</li>
		<li>A literal union type like <code>'idle' | 'loading' | 'error' | 'success'</code> pairs perfectly with an <code>{'{:else if}'}</code> chain.</li>
		<li><code>{':else'}</code> is the fallback when no branch matches.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong { color: var(--color-text); }

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

	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.controls button {
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
	}
	.controls button:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}

	.pill {
		display: inline-block;
		width: fit-content;
		font-size: var(--text-sm);
		font-weight: 600;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-full);
	}
	.idle { background: var(--color-surface-2); color: var(--color-text-muted); }
	.loading { background: var(--color-brand); color: var(--color-surface); }
	.error { background: var(--color-error); color: var(--color-surface); }
	.success { background: var(--color-success); color: var(--color-surface); }

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
