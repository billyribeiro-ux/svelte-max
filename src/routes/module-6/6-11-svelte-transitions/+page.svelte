<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Notification {
		id: number;
		kind: 'info' | 'success';
		text: string;
	}

	let notifications = $state<Notification[]>([]);

	function add(kind: 'info' | 'success'): void {
		const id = Date.now() + Math.random();
		const text = kind === 'info' ? 'Heads up: something happened.' : 'Success! All good.';
		notifications.push({ id, kind, text });
		setTimeout(() => {
			notifications = notifications.filter((n) => n.id !== id);
		}, 3000);
	}

	function dismiss(id: number): void {
		notifications = notifications.filter((n) => n.id !== id);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { fly } from 'svelte/transition';\n" +
		"\timport { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"\tinterface Notification {\n" +
		"\t\tid: number;\n" +
		"\t\tkind: 'info' | 'success';\n" +
		"\t\ttext: string;\n" +
		"\t}\n" +
		"\n" +
		"\tlet notifications = $state\u003cNotification[]\u003e([]);\n" +
		"\n" +
		"\tfunction add(kind: 'info' | 'success'): void {\n" +
		"\t\tconst id = Date.now() + Math.random();\n" +
		"\t\tconst text = kind === 'info' ? 'Heads up: something happened.' : 'Success! All good.';\n" +
		"\t\tnotifications.push({ id, kind, text });\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tnotifications = notifications.filter((n) =\u003e n.id !== id);\n" +
		"\t\t}, 3000);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction dismiss(id: number): void {\n" +
		"\t\tnotifications = notifications.filter((n) =\u003e n.id !== id);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.11 — Svelte transition directive\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte ships built-in transition functions: \u003ccode\u003efade\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003efly\u003c/code\u003e, \u003ccode\u003eslide\u003c/code\u003e, \u003ccode\u003escale\u003c/code\u003e, \u003ccode\u003eblur\u003c/code\u003e, \u003ccode\u003edraw\u003c/code\u003e.\n" +
		"\t\tThey plug into the \u003ccode\u003etransition:\u003c/code\u003e directive on any element toggled via\n" +
		"\t\t\u003ccode\u003e&lbrace;#if&rbrace;\u003c/code\u003e or keyed \u003ccode\u003e&lbrace;#each&rbrace;\u003c/code\u003e. A\n" +
		"\t\t\u003ccode\u003etransition:\u003c/code\u003e is bidirectional — the same animation enters and exits. Parameters:\n" +
		"\t\t\u003ccode\u003e&lbrace; duration, delay, easing &rbrace;\u003c/code\u003e. Easings come from\n" +
		"\t\t\u003ccode\u003esvelte/easing\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"controls\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e add('info')}\u003eAdd info\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e add('success')}\u003eAdd success\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"stack\"\u003e\n" +
		"\t\t\t{#each notifications as n (n.id)}\n" +
		"\t\t\t\t\u003cdiv\n" +
		"\t\t\t\t\tclass=\"toast {n.kind}\"\n" +
		"\t\t\t\t\ttransition:fly={{ y: 20, duration: 300, easing: cubicOut }}\n" +
		"\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003e{n.text}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cbutton type=\"button\" class=\"close\" onclick={() =\u003e dismiss(n.id)}\u003e✕\u003c/button\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eImport transitions from \u003ccode\u003esvelte/transition\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003etransition:\u003c/code\u003e runs the same animation in and out.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eKeyed each blocks are required for per-item enter/exit.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eParameters tune duration, delay, and easing.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.11 — Svelte transition directive</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte ships built-in transition functions: <code>fade</code>,
		<code>fly</code>, <code>slide</code>, <code>scale</code>, <code>blur</code>, <code>draw</code>.
		They plug into the <code>transition:</code> directive on any element toggled via
		<code>&lbrace;#if&rbrace;</code> or keyed <code>&lbrace;#each&rbrace;</code>. A
		<code>transition:</code> is bidirectional — the same animation enters and exits. Parameters:
		<code>&lbrace; duration, delay, easing &rbrace;</code>. Easings come from
		<code>svelte/easing</code>.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={() => add('info')}>Add info</button>
			<button type="button" onclick={() => add('success')}>Add success</button>
		</div>

		<div class="stack">
			{#each notifications as n (n.id)}
				<div
					class="toast {n.kind}"
					transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
				>
					<span>{n.text}</span>
					<button type="button" class="close" onclick={() => dismiss(n.id)}>✕</button>
				</div>
			{/each}
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Import transitions from <code>svelte/transition</code>.</li>
		<li><code>transition:</code> runs the same animation in and out.</li>
		<li>Keyed each blocks are required for per-item enter/exit.</li>
		<li>Parameters tune duration, delay, and easing.</li>
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
	.controls {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.controls button {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		min-height: 60px;
	}
	.toast {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-2);
		color: var(--color-text);
		box-shadow: var(--shadow-sm);
		font-size: var(--text-sm);
	}
	.toast.info {
		border-color: var(--color-brand);
	}
	.toast.success {
		border-color: var(--color-success);
	}
	.close {
		background: transparent;
		border: none;
		color: var(--color-text-muted);
		cursor: pointer;
		font-size: var(--text-base);
		padding: 0 var(--space-xs);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
