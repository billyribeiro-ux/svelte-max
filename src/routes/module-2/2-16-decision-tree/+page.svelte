<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type Step =
		| 'start'
		| 'reading-or-writing'
		| 'writing-target'
		| 'reading-complexity'
		| 'large-dataset'
		| 'serialize'
		| 'before-dom'
		| 'result-state'
		| 'result-effect'
		| 'result-derived'
		| 'result-derived-by'
		| 'result-state-raw'
		| 'result-snapshot'
		| 'result-effect-pre';

	let step = $state<Step>('start');
	let choice = $state('');

	function pick(value: string, next: Step): void {
		choice = value;
		step = next;
	}

	function reset(): void {
		step = 'start';
		choice = '';
	}

	const results: Record<string, { rune: string; why: string }> = {
		'result-state': {
			rune: '$state',
			why: 'You need reactive state that triggers re-renders when it changes.'
		},
		'result-effect': {
			rune: '$effect',
			why: 'You need to synchronize with the DOM or an external system (API, timer, event listener).'
		},
		'result-derived': {
			rune: '$derived',
			why: 'A single expression computes a value from other reactive state.'
		},
		'result-derived-by': {
			rune: '$derived.by',
			why: 'You need multiple steps, loops, or conditionals to compute a derived value.'
		},
		'result-state-raw': {
			rune: '$state.raw',
			why: 'Large datasets you replace wholesale — skips deep proxy overhead for better performance.'
		},
		'result-snapshot': {
			rune: '$state.snapshot',
			why: 'You need a plain JS copy of reactive state to send to an API or pass to a non-reactive context.'
		},
		'result-effect-pre': {
			rune: '$effect.pre',
			why: 'You need to run logic BEFORE the DOM updates — e.g., measuring scroll position before new items render.'
		}
	};

	let isResult = $derived(step.startsWith('result-'));
	let resultData = $derived(isResult ? results[step] : null);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"type Step =\n" +
		"\t\t| 'start'\n" +
		"\t\t| 'reading-or-writing'\n" +
		"\t\t| 'writing-target'\n" +
		"\t\t| 'reading-complexity'\n" +
		"\t\t| 'large-dataset'\n" +
		"\t\t| 'serialize'\n" +
		"\t\t| 'before-dom'\n" +
		"\t\t| 'result-state'\n" +
		"\t\t| 'result-effect'\n" +
		"\t\t| 'result-derived'\n" +
		"\t\t| 'result-derived-by'\n" +
		"\t\t| 'result-state-raw'\n" +
		"\t\t| 'result-snapshot'\n" +
		"\t\t| 'result-effect-pre';\n" +
		"\n" +
		"\tlet step = $state\u003cStep\u003e('start');\n" +
		"\tlet choice = $state('');\n" +
		"\n" +
		"\tfunction pick(value: string, next: Step): void {\n" +
		"\t\tchoice = value;\n" +
		"\t\tstep = next;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction reset(): void {\n" +
		"\t\tstep = 'start';\n" +
		"\t\tchoice = '';\n" +
		"\t}\n" +
		"\n" +
		"\tconst results: Record\u003cstring, { rune: string; why: string }\u003e = {\n" +
		"\t\t'result-state': {\n" +
		"\t\t\trune: '$state',\n" +
		"\t\t\twhy: 'You need reactive state that triggers re-renders when it changes.'\n" +
		"\t\t},\n" +
		"\t\t'result-effect': {\n" +
		"\t\t\trune: '$effect',\n" +
		"\t\t\twhy: 'You need to synchronize with the DOM or an external system (API, timer, event listener).'\n" +
		"\t\t},\n" +
		"\t\t'result-derived': {\n" +
		"\t\t\trune: '$derived',\n" +
		"\t\t\twhy: 'A single expression computes a value from other reactive state.'\n" +
		"\t\t},\n" +
		"\t\t'result-derived-by': {\n" +
		"\t\t\trune: '$derived.by',\n" +
		"\t\t\twhy: 'You need multiple steps, loops, or conditionals to compute a derived value.'\n" +
		"\t\t},\n" +
		"\t\t'result-state-raw': {\n" +
		"\t\t\trune: '$state.raw',\n" +
		"\t\t\twhy: 'Large datasets you replace wholesale — skips deep proxy overhead for better performance.'\n" +
		"\t\t},\n" +
		"\t\t'result-snapshot': {\n" +
		"\t\t\trune: '$state.snapshot',\n" +
		"\t\t\twhy: 'You need a plain JS copy of reactive state to send to an API or pass to a non-reactive context.'\n" +
		"\t\t},\n" +
		"\t\t'result-effect-pre': {\n" +
		"\t\t\trune: '$effect.pre',\n" +
		"\t\t\twhy: 'You need to run logic BEFORE the DOM updates — e.g., measuring scroll position before new items render.'\n" +
		"\t\t}\n" +
		"\t};\n" +
		"\n" +
		"\tlet isResult = $derived(step.startsWith('result-'));\n" +
		"\tlet resultData = $derived(isResult ? results[step] : null);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.16 — Which rune?\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e You've learned \u003ccode\u003e$state\u003c/code\u003e, \u003ccode\u003e$state.raw\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003e$state.snapshot\u003c/code\u003e, \u003ccode\u003e$derived\u003c/code\u003e, \u003ccode\u003e$derived.by\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003e$effect\u003c/code\u003e, \u003ccode\u003e$effect.pre\u003c/code\u003e. Each solves a specific problem. Using the\n" +
		"\t\twrong one wastes performance or creates bugs. This lesson is the decision tree.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch2\u003eRune Decision Tree\u003c/h2\u003e\n" +
		"\t\t\u003cp class=\"build-desc\"\u003eAnswer each question to find the right rune for your use case.\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"tree\"\u003e\n" +
		"\t\t\t{#if step === 'start' || step === 'reading-or-writing'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eAre you \u003cstrong\u003ereading\u003c/strong\u003e (computing a value) or \u003cstrong\u003ewriting\u003c/strong\u003e (causing a side effect or storing data)?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('reading', 'reading-complexity')}\u003eReading / computing\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('writing', 'writing-target')}\u003eWriting / side effect\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if step === 'writing-target'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eAre you writing to the \u003cstrong\u003eDOM / external world\u003c/strong\u003e, or to \u003cstrong\u003ereactive state\u003c/strong\u003e?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('dom', 'before-dom')}\u003eDOM / external world\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('state', 'large-dataset')}\u003eReactive state\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if step === 'before-dom'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eDo you need to run \u003cstrong\u003ebefore\u003c/strong\u003e the DOM updates?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('before', 'result-effect-pre')}\u003eYes, before DOM update\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('after', 'result-effect')}\u003eNo, after is fine\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if step === 'large-dataset'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eIs this a \u003cstrong\u003elarge dataset\u003c/strong\u003e you swap wholesale (e.g., replace entire array from API)?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('large', 'result-state-raw')}\u003eYes, large and replaced whole\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('normal', 'serialize')}\u003eNo, normal state\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if step === 'serialize'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eDo you need to \u003cstrong\u003eserialize\u003c/strong\u003e this state for an API call?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('serialize', 'result-snapshot')}\u003eYes, need a plain JS copy\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('no-serialize', 'result-state')}\u003eNo, just reactive state\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if step === 'reading-complexity'}\n" +
		"\t\t\t\t\u003cdiv class=\"card question\"\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"q\"\u003eCan you express it as a \u003cstrong\u003esingle expression\u003c/strong\u003e, or do you need multiple steps?\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"choices\"\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('single', 'result-derived')}\u003eSingle expression\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"arrow\"\u003eor\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton type=\"button\" class=\"choice\" onclick={() =\u003e pick('multi', 'result-derived-by')}\u003eMulti-step / loops / conditionals\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\n" +
		"\t\t\t{#if isResult && resultData}\n" +
		"\t\t\t\t\u003cdiv class=\"card result\"\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"rune-badge\"\u003e{resultData.rune}\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cp class=\"why\"\u003e{resultData.why}\u003c/p\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#if step !== 'start' && step !== 'reading-or-writing'}\n" +
		"\t\t\t\u003cbutton type=\"button\" class=\"reset\" onclick={reset}\u003eStart over\u003c/button\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state\u003c/code\u003e for reactive values that change over time.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state.raw\u003c/code\u003e for large datasets replaced wholesale — avoids deep proxy cost.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$state.snapshot\u003c/code\u003e to get a plain JS copy for serialization (API calls, localStorage).\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$derived\u003c/code\u003e for single-expression computed values; \u003ccode\u003e$derived.by\u003c/code\u003e for multi-step logic.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e for DOM / external side effects after render; \u003ccode\u003e$effect.pre\u003c/code\u003e for before render.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eChoosing the right rune avoids unnecessary reactivity overhead and subtle bugs.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.16 — Which rune?</h1>

	<p class="concept">
		<strong>Concept.</strong> You've learned <code>$state</code>, <code>$state.raw</code>,
		<code>$state.snapshot</code>, <code>$derived</code>, <code>$derived.by</code>,
		<code>$effect</code>, <code>$effect.pre</code>. Each solves a specific problem. Using the
		wrong one wastes performance or creates bugs. This lesson is the decision tree.
	</p>

	<div class="build">
		<h2>Rune Decision Tree</h2>
		<p class="build-desc">Answer each question to find the right rune for your use case.</p>

		<div class="tree">
			{#if step === 'start' || step === 'reading-or-writing'}
				<div class="card question">
					<p class="q">Are you <strong>reading</strong> (computing a value) or <strong>writing</strong> (causing a side effect or storing data)?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('reading', 'reading-complexity')}>Reading / computing</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('writing', 'writing-target')}>Writing / side effect</button>
					</div>
				</div>
			{/if}

			{#if step === 'writing-target'}
				<div class="card question">
					<p class="q">Are you writing to the <strong>DOM / external world</strong>, or to <strong>reactive state</strong>?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('dom', 'before-dom')}>DOM / external world</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('state', 'large-dataset')}>Reactive state</button>
					</div>
				</div>
			{/if}

			{#if step === 'before-dom'}
				<div class="card question">
					<p class="q">Do you need to run <strong>before</strong> the DOM updates?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('before', 'result-effect-pre')}>Yes, before DOM update</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('after', 'result-effect')}>No, after is fine</button>
					</div>
				</div>
			{/if}

			{#if step === 'large-dataset'}
				<div class="card question">
					<p class="q">Is this a <strong>large dataset</strong> you swap wholesale (e.g., replace entire array from API)?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('large', 'result-state-raw')}>Yes, large and replaced whole</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('normal', 'serialize')}>No, normal state</button>
					</div>
				</div>
			{/if}

			{#if step === 'serialize'}
				<div class="card question">
					<p class="q">Do you need to <strong>serialize</strong> this state for an API call?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('serialize', 'result-snapshot')}>Yes, need a plain JS copy</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('no-serialize', 'result-state')}>No, just reactive state</button>
					</div>
				</div>
			{/if}

			{#if step === 'reading-complexity'}
				<div class="card question">
					<p class="q">Can you express it as a <strong>single expression</strong>, or do you need multiple steps?</p>
					<div class="choices">
						<button type="button" class="choice" onclick={() => pick('single', 'result-derived')}>Single expression</button>
						<span class="arrow">or</span>
						<button type="button" class="choice" onclick={() => pick('multi', 'result-derived-by')}>Multi-step / loops / conditionals</button>
					</div>
				</div>
			{/if}

			{#if isResult && resultData}
				<div class="card result">
					<span class="rune-badge">{resultData.rune}</span>
					<p class="why">{resultData.why}</p>
				</div>
			{/if}
		</div>

		{#if step !== 'start' && step !== 'reading-or-writing'}
			<button type="button" class="reset" onclick={reset}>Start over</button>
		{/if}
	</div>

	<h2>Break it on purpose</h2>

	<p class="prose">
		Use the wrong rune on purpose to see the exact symptoms. These experiments build your instinct for choosing correctly.
	</p>

	<ol class="experiments">
		<li>
			<strong>Use <code>$effect</code> for a computation.</strong> Write
			<code>$effect(() => {'{ total = subtotal + tax }'}) </code> instead of
			<code>$derived</code>. It "works" in the sense that <code>total</code> updates, but
			it wastes a render cycle — the effect runs after the DOM updates with the stale
			value, then writes the new value, causing a second render. <code>$derived</code>
			computes synchronously before the first render.
		</li>
		<li>
			<strong>Use <code>$derived</code> for a side effect (fetch).</strong> Write
			<code>const data = $derived(fetch('/api'))</code>. Svelte warns because derivations
			must be pure — no network calls, no DOM writes, no timers. A <code>fetch</code> is
			a side effect that belongs in <code>$effect</code>, not in a computation.
		</li>
		<li>
			<strong>Use <code>$state</code> for a value computed from other state.</strong> Write
			<code>let total = $state(subtotal + tax)</code>. The initial value is correct, but
			when <code>subtotal</code> or <code>tax</code> changes, <code>total</code> does not
			update — it is just a static initial value. You have created a sync bug. Use
			<code>$derived</code> instead.
		</li>
		<li>
			<strong>Follow the decision tree.</strong> Does it change? Use <code>$state</code>.
			Is it computed from state? Use <code>$derived</code>. Is it a side effect? Use
			<code>$effect</code>. Never use a more complex rune when a simpler one works. The
			tree is: constant → <code>const</code>, changes → <code>$state</code>, computed →
			<code>$derived</code>, side effect → <code>$effect</code>.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		The decision tree for choosing a rune is straightforward: if a value never changes, use
		a plain <code>const</code>. If it changes over time due to user interaction or external
		events, use <code>$state</code>. If it is computed from other reactive state, use
		<code>$derived</code> (or <code>$derived.by</code> for multi-step logic). If it causes
		a side effect — touching the DOM, making a network call, starting a timer — use
		<code>$effect</code>. Never use a more complex rune when a simpler one works.
	</p>

	<p class="prose">
		Using the wrong rune creates specific, predictable bugs. <code>$effect</code> for
		computations wastes a render cycle. <code>$derived</code> for side effects triggers
		warnings and may run more often than you expect. <code>$state</code> for computed
		values creates sync bugs where the value falls out of date. Each rune has a single
		responsibility, and respecting that boundary keeps your code efficient and correct.
	</p>

	<p class="prose">
		For specialized cases, the variants help: <code>$state.raw</code> skips deep proxying
		for large immutable datasets you replace wholesale. <code>$state.snapshot</code> strips
		the proxy wrapper for serialization boundaries. <code>$effect.pre</code> runs before
		the DOM updates for layout measurement. These are not everyday tools — they are
		precision instruments for specific situations. When in doubt, start with the simplest
		rune and upgrade only when you hit a real limitation.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-3/3-1-props">Module 3</a> — component props, events, slots, and the
		composition patterns that make Svelte components reusable.
	</p>
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
	.build h2 { margin: 0; font-size: var(--text-xl); }
	.build-desc { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
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

	.tree {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.card {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		background: var(--color-surface-2);
	}
	.card.question {
		border-inline-start: 4px solid var(--color-brand);
	}
	.card.result {
		border-inline-start: 4px solid var(--color-success);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		align-items: flex-start;
	}
	.q {
		margin: 0 0 var(--space-md);
		font-size: var(--text-base);
		line-height: 1.5;
		color: var(--color-text);
	}
	.choices {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.choice {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		min-block-size: 40px;
	}
	.choice:hover {
		opacity: 0.9;
	}
	.arrow {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-style: italic;
	}
	.rune-badge {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 700;
		background: var(--color-brand);
		color: var(--color-surface);
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-md);
	}
	.why {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.reset {
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
