<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Standalone out: demo — shows a banner that only animates on exit
	let showBanner = $state(true);

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

	<h3>Standalone <code>out:</code> directive</h3>
	<div class="build">
		<p style="font-size:var(--text-sm); color:var(--color-text-muted); margin:0;">
			Unlike <code>transition:</code> which is bidirectional, <code>out:</code> only animates on removal.
			Use it when elements should appear instantly but fade/fly away on dismiss.
		</p>
		{#if showBanner}
			<!-- out:fade — standalone exit-only transition; no enter animation -->
			<div class="toast info" out:fade={{ duration: 300 }}>
				<span>This banner has no enter animation. Click dismiss to see out:fade.</span>
				<button type="button" class="close" onclick={() => showBanner = false}>✕</button>
			</div>
		{/if}
		{#if !showBanner}
			<button type="button" onclick={() => showBanner = true} style="align-self:flex-start; padding:var(--space-xs) var(--space-md); border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-surface-2); color:var(--color-text); cursor:pointer;">
				Show banner again
			</button>
		{/if}
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Test the boundaries of Svelte's transition system to understand when transitions fire and how they interact with conditional rendering.</p>
	<ol class="experiments">
		<li><strong>Use <code>transition:</code> without <code>{'{#if}'}</code></strong> — error, transitions need conditional blocks. The transition directive only fires when an element is added to or removed from the DOM, which requires a conditional or keyed each block.</li>
		<li><strong>Use <code>in:</code> and <code>out:</code> separately</strong> — different enter/exit animations. Splitting the transition into separate directives lets you fly in from below but fade out, creating asymmetric motion that feels more natural.</li>
		<li><strong>Add <code>|global</code> modifier</strong> — transition plays even when parent <code>{'{#if}'}</code> removes it. By default, transitions only play when the element's own conditional changes; <code>|global</code> ensures it plays even when an ancestor block triggers removal.</li>
		<li><strong>Custom transition function</strong> — return <code>{'{ duration, css }'}</code>. Writing a function that takes <code>(node, params)</code> and returns a transition config gives you full control over the animation.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's transition system bridges the gap between CSS transitions and JavaScript animation by providing a declarative API that hooks into the component lifecycle. When you write <code>transition:fly={'{{ y: 20, duration: 300 }}'}</code>, Svelte generates optimized CSS keyframes at mount time and applies them as the element enters or leaves the DOM. This means the animation runs on the compositor thread (GPU-accelerated) while Svelte handles the lifecycle coordination -- measuring when the element should appear or disappear and managing the timing of DOM removal so the exit animation completes before the node is destroyed.</p>
	<p class="prose">The built-in transitions -- <code>fade</code>, <code>fly</code>, <code>slide</code>, <code>scale</code>, <code>blur</code>, and <code>draw</code> -- cover the vast majority of UI animation needs. Each accepts a parameter object with <code>duration</code>, <code>delay</code>, and <code>easing</code> properties, where easings are imported from <code>svelte/easing</code> (which provides every standard easing curve from <code>linear</code> to <code>elasticOut</code>). The <code>transition:</code> directive is bidirectional -- the same animation runs in reverse on exit. For keyed <code>{'{#each}'}</code> blocks, each item gets its own independent transition lifecycle, enabling smooth per-item enter and exit animations in lists.</p>
	<p class="prose">Understanding the distinction between <code>transition:</code>, <code>in:</code>, and <code>out:</code> is essential for expressive motion design. A bidirectional <code>transition:</code> is appropriate when the same animation works for both directions, like a tooltip fading in and out. When the enter and exit should feel different -- a modal flying up from below but fading out on close -- you split into <code>in:fly</code> and <code>out:fade</code>. The <code>|global</code> modifier ensures transitions play even when a parent conditional removes the element, which is important for components that live inside conditionally rendered layouts. These tools together give you cinema-quality control over motion in a declarative syntax.</p>
	<p class="next"><a href="/module-6/6-12-in-out">Next lesson: 6.12 in: and out: directives</a></p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
		/* interpolate-size: allow-keywords — enables animating to/from keyword sizes like 'auto' alongside Svelte transitions */
		interpolate-size: allow-keywords;
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
