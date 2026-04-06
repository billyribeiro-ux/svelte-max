<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Option {
		id: number;
		label: string;
	}

	const options: Option[] = [
		{ id: 1, label: 'Svelte' },
		{ id: 2, label: 'SvelteKit' },
		{ id: 3, label: 'Vite' },
		{ id: 4, label: 'TypeScript' },
		{ id: 5, label: 'Tailwind' }
	];

	let open = $state(false);
	let selected = $state<number>(1);
	let activeIndex = $state(0);

	let triggerEl: HTMLButtonElement | null = $state(null);
	let listboxEl: HTMLUListElement | null = $state(null);

	// <svelte:document> — pause listbox interaction when the tab is hidden
	let tabHidden = $state(false);
	function handleVisibilityChange() {
		tabHidden = document.hidden;
		if (tabHidden && open) closeList(false);
	}

	function currentLabel(): string {
		return options.find((o) => o.id === selected)?.label ?? '';
	}

	function openList(): void {
		open = true;
		activeIndex = options.findIndex((o) => o.id === selected);
		if (activeIndex < 0) activeIndex = 0;
		queueMicrotask(() => listboxEl?.focus());
	}

	function closeList(restoreFocus: boolean): void {
		open = false;
		if (restoreFocus) triggerEl?.focus();
	}

	function selectAt(i: number): void {
		const opt = options[i];
		if (!opt) return;
		selected = opt.id;
		closeList(true);
	}

	function handleTriggerKey(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openList();
		}
	}

	function handleListKey(e: KeyboardEvent): void {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = (activeIndex + 1) % options.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = (activeIndex - 1 + options.length) % options.length;
				break;
			case 'Home':
				e.preventDefault();
				activeIndex = 0;
				break;
			case 'End':
				e.preventDefault();
				activeIndex = options.length - 1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				selectAt(activeIndex);
				break;
			case 'Escape':
				e.preventDefault();
				closeList(true);
				break;
		}
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Option {\n" +
		"\t\tid: number;\n" +
		"\t\tlabel: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst options: Option[] = [\n" +
		"\t\t{ id: 1, label: 'Svelte' },\n" +
		"\t\t{ id: 2, label: 'SvelteKit' },\n" +
		"\t\t{ id: 3, label: 'Vite' },\n" +
		"\t\t{ id: 4, label: 'TypeScript' },\n" +
		"\t\t{ id: 5, label: 'Tailwind' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet open = $state(false);\n" +
		"\tlet selected = $state\u003cnumber\u003e(1);\n" +
		"\tlet activeIndex = $state(0);\n" +
		"\n" +
		"\tlet triggerEl: HTMLButtonElement | null = $state(null);\n" +
		"\tlet listboxEl: HTMLUListElement | null = $state(null);\n" +
		"\n" +
		"\tfunction currentLabel(): string {\n" +
		"\t\treturn options.find((o) =\u003e o.id === selected)?.label ?? '';\n" +
		"\t}\n" +
		"\n" +
		"\tfunction openList(): void {\n" +
		"\t\topen = true;\n" +
		"\t\tactiveIndex = options.findIndex((o) =\u003e o.id === selected);\n" +
		"\t\tif (activeIndex \u003c 0) activeIndex = 0;\n" +
		"\t\tqueueMicrotask(() =\u003e listboxEl?.focus());\n" +
		"\t}\n" +
		"\n" +
		"\tfunction closeList(restoreFocus: boolean): void {\n" +
		"\t\topen = false;\n" +
		"\t\tif (restoreFocus) triggerEl?.focus();\n" +
		"\t}\n" +
		"\n" +
		"\tfunction selectAt(i: number): void {\n" +
		"\t\tconst opt = options[i];\n" +
		"\t\tif (!opt) return;\n" +
		"\t\tselected = opt.id;\n" +
		"\t\tcloseList(true);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleTriggerKey(e: KeyboardEvent): void {\n" +
		"\t\tif (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {\n" +
		"\t\t\te.preventDefault();\n" +
		"\t\t\topenList();\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleListKey(e: KeyboardEvent): void {\n" +
		"\t\tswitch (e.key) {\n" +
		"\t\t\tcase 'ArrowDown':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tactiveIndex = (activeIndex + 1) % options.length;\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t\tcase 'ArrowUp':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tactiveIndex = (activeIndex - 1 + options.length) % options.length;\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t\tcase 'Home':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tactiveIndex = 0;\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t\tcase 'End':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tactiveIndex = options.length - 1;\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t\tcase 'Enter':\n" +
		"\t\t\tcase ' ':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tselectAt(activeIndex);\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t\tcase 'Escape':\n" +
		"\t\t\t\te.preventDefault();\n" +
		"\t\t\t\tcloseList(true);\n" +
		"\t\t\t\tbreak;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e5.12 — Keyboard accessibility\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Every interaction must be reachable without a mouse. \u003ccode\u003etabindex=\"0\"\u003c/code\u003e\n" +
		"\t\tmakes a non-semantic element focusable (but prefer native buttons). \u003ccode\u003earia-*\u003c/code\u003e attributes\n" +
		"\t\tdescribe intent (\u003ccode\u003earia-expanded\u003c/code\u003e, \u003ccode\u003earia-selected\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003earia-controls\u003c/code\u003e). Focus management: when a popup opens, move focus in; when it closes,\n" +
		"\t\treturn focus to the trigger. Conventions: Escape closes, arrows navigate, Enter activates.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eKeyboard: Enter/Space or ↓ opens. ↑↓ Home End navigate. Enter selects. Esc closes.\u003c/p\u003e\n" +
		"\t\t\u003cdiv class=\"select-wrap\"\u003e\n" +
		"\t\t\t\u003cspan id=\"lbl\" class=\"sr-label\"\u003eFramework\u003c/span\u003e\n" +
		"\t\t\t\u003cbutton\n" +
		"\t\t\t\tbind:this={triggerEl}\n" +
		"\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\tclass=\"trigger\"\n" +
		"\t\t\t\taria-haspopup=\"listbox\"\n" +
		"\t\t\t\taria-expanded={open}\n" +
		"\t\t\t\taria-labelledby=\"lbl\"\n" +
		"\t\t\t\taria-controls=\"lb-list\"\n" +
		"\t\t\t\tonclick={() =\u003e (open ? closeList(false) : openList())}\n" +
		"\t\t\t\tonkeydown={handleTriggerKey}\n" +
		"\t\t\t\u003e\n" +
		"\t\t\t\t\u003cspan\u003e{currentLabel()}\u003c/span\u003e\n" +
		"\t\t\t\t\u003cspan class=\"chev\" aria-hidden=\"true\"\u003e▾\u003c/span\u003e\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t\t{#if open}\n" +
		"\t\t\t\t\u003cul\n" +
		"\t\t\t\t\tbind:this={listboxEl}\n" +
		"\t\t\t\t\tid=\"lb-list\"\n" +
		"\t\t\t\t\tclass=\"listbox\"\n" +
		"\t\t\t\t\trole=\"listbox\"\n" +
		"\t\t\t\t\ttabindex=\"-1\"\n" +
		"\t\t\t\t\taria-labelledby=\"lbl\"\n" +
		"\t\t\t\t\taria-activedescendant={`lb-opt-${options[activeIndex].id}`}\n" +
		"\t\t\t\t\tonkeydown={handleListKey}\n" +
		"\t\t\t\t\u003e\n" +
		"\t\t\t\t\t{#each options as opt, i (opt.id)}\n" +
		"\t\t\t\t\t\t\u003cli\n" +
		"\t\t\t\t\t\t\tid={`lb-opt-${opt.id}`}\n" +
		"\t\t\t\t\t\t\tclass=\"option\"\n" +
		"\t\t\t\t\t\t\tclass:active={i === activeIndex}\n" +
		"\t\t\t\t\t\t\tclass:selected={opt.id === selected}\n" +
		"\t\t\t\t\t\t\trole=\"option\"\n" +
		"\t\t\t\t\t\t\taria-selected={opt.id === selected}\n" +
		"\t\t\t\t\t\t\tonclick={() =\u003e selectAt(i)}\n" +
		"\t\t\t\t\t\t\tonkeydown={(e) =\u003e {\n" +
		"\t\t\t\t\t\t\t\tif (e.key === 'Enter' || e.key === ' ') {\n" +
		"\t\t\t\t\t\t\t\t\te.preventDefault();\n" +
		"\t\t\t\t\t\t\t\t\tselectAt(i);\n" +
		"\t\t\t\t\t\t\t\t}\n" +
		"\t\t\t\t\t\t\t}}\n" +
		"\t\t\t\t\t\t\tonmousemove={() =\u003e (activeIndex = i)}\n" +
		"\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan\u003e{opt.label}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t{#if opt.id === selected}\n" +
		"\t\t\t\t\t\t\t\t\u003cspan aria-hidden=\"true\"\u003e✓\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t{/if}\n" +
		"\t\t\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/ul\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"state\"\u003eSelected id: \u003ccode\u003e{selected}\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eImplement \u003ccode\u003erole=\"listbox\"\u003c/code\u003e/\u003ccode\u003erole=\"option\"\u003c/code\u003e for custom selects.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eHandle Arrow, Home, End, Enter, Space, and Escape keys.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRestore focus to the trigger when the popup closes.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<!-- svelte:document — pause listbox when tab is hidden -->
<svelte:document onvisibilitychange={handleVisibilityChange} />

<section class="page">
	<h1>5.12 — Keyboard accessibility</h1>
	<p class="concept">
		<strong>Concept.</strong> Every interaction must be reachable without a mouse. <code>tabindex="0"</code>
		makes a non-semantic element focusable (but prefer native buttons). <code>aria-*</code> attributes
		describe intent (<code>aria-expanded</code>, <code>aria-selected</code>,
		<code>aria-controls</code>). Focus management: when a popup opens, move focus in; when it closes,
		return focus to the trigger. Conventions: Escape closes, arrows navigate, Enter activates.
	</p>

	<div class="build">
		<p class="hint">Keyboard: Enter/Space or ↓ opens. ↑↓ Home End navigate. Enter selects. Esc closes.</p>
		<div class="select-wrap">
			<span id="lbl" class="sr-label">Framework</span>
			<button
				bind:this={triggerEl}
				type="button"
				class="trigger"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-labelledby="lbl"
				aria-controls="lb-list"
				onclick={() => (open ? closeList(false) : openList())}
				onkeydown={handleTriggerKey}
			>
				<span>{currentLabel()}</span>
				<span class="chev" aria-hidden="true">▾</span>
			</button>

			{#if open}
				<ul
					bind:this={listboxEl}
					id="lb-list"
					class="listbox"
					role="listbox"
					tabindex="-1"
					aria-labelledby="lbl"
					aria-activedescendant={`lb-opt-${options[activeIndex].id}`}
					onkeydown={handleListKey}
				>
					{#each options as opt, i (opt.id)}
						<li
							id={`lb-opt-${opt.id}`}
							class="option"
							class:active={i === activeIndex}
							class:selected={opt.id === selected}
							role="option"
							aria-selected={opt.id === selected}
							onclick={() => selectAt(i)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									selectAt(i);
								}
							}}
							onmousemove={() => (activeIndex = i)}
						>
							<span>{opt.label}</span>
							{#if opt.id === selected}
								<span aria-hidden="true">✓</span>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<p class="state">Selected id: <code>{selected}</code></p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Implement <code>role="listbox"</code>/<code>role="option"</code> for custom selects.</li>
		<li>Handle Arrow, Home, End, Enter, Space, and Escape keys.</li>
		<li>Restore focus to the trigger when the popup closes.</li>
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
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.select-wrap {
		position: relative;
		max-inline-size: 18rem;
	}
	.sr-label {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	.trigger {
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 44px;
	}
	.trigger:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.chev {
		color: var(--color-text-muted);
	}
	.listbox {
		position: absolute;
		inset-block-start: calc(100% + var(--space-xs));
		inset-inline: 0;
		list-style: none;
		padding: var(--space-xs);
		margin: 0;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.listbox:focus {
		outline: none;
	}
	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
		cursor: pointer;
		min-block-size: 40px;
	}
	.option.active {
		background: var(--color-brand-dim);
		outline: 2px solid var(--color-brand);
		outline-offset: -2px;
	}
	.option.selected {
		color: var(--color-brand);
		font-weight: 600;
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
