<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';

	interface Card {
		id: number;
		title: string;
		description: string;
	}

	const cards: Card[] = [
		{ id: 1, title: 'Respect', description: 'Motion preferences are accessibility needs.' },
		{ id: 2, title: 'Reactive', description: 'prefersReducedMotion.current updates live.' },
		{ id: 3, title: 'Graceful', description: 'Fade is a safe alternative to motion.' },
		{ id: 4, title: 'Fast', description: 'Reduced motion should also mean shorter.' },
		{ id: 5, title: 'Gated', description: 'Wrap any effect that moves in space.' },
		{ id: 6, title: 'Default on', description: 'Assume some users have it enabled.' },
		{ id: 7, title: 'Tested', description: 'Try both branches in every review.' },
		{ id: 8, title: 'Kind', description: 'Good motion design respects the viewer.' }
	];

	let visible = $state(true);
	let forceReduced = $state(false);

	const reduced = $derived(prefersReducedMotion.current || forceReduced);

	function replay() {
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 30);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { fly, fade } from 'svelte/transition';\n" +
		"\timport { cubicOut } from 'svelte/easing';\n" +
		"\timport { prefersReducedMotion } from 'svelte/motion';\n" +
		"\n" +
		"\tinterface Card {\n" +
		"\t\tid: number;\n" +
		"\t\ttitle: string;\n" +
		"\t\tdescription: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst cards: Card[] = [\n" +
		"\t\t{ id: 1, title: 'Respect', description: 'Motion preferences are accessibility needs.' },\n" +
		"\t\t{ id: 2, title: 'Reactive', description: 'prefersReducedMotion.current updates live.' },\n" +
		"\t\t{ id: 3, title: 'Graceful', description: 'Fade is a safe alternative to motion.' },\n" +
		"\t\t{ id: 4, title: 'Fast', description: 'Reduced motion should also mean shorter.' },\n" +
		"\t\t{ id: 5, title: 'Gated', description: 'Wrap any effect that moves in space.' },\n" +
		"\t\t{ id: 6, title: 'Default on', description: 'Assume some users have it enabled.' },\n" +
		"\t\t{ id: 7, title: 'Tested', description: 'Try both branches in every review.' },\n" +
		"\t\t{ id: 8, title: 'Kind', description: 'Good motion design respects the viewer.' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet visible = $state(true);\n" +
		"\tlet forceReduced = $state(false);\n" +
		"\n" +
		"\tconst reduced = $derived(prefersReducedMotion.current || forceReduced);\n" +
		"\n" +
		"\tfunction replay() {\n" +
		"\t\tvisible = false;\n" +
		"\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\tvisible = true;\n" +
		"\t\t}, 30);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e6.18 — prefers-reduced-motion\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Some people experience motion sickness or vestibular discomfort from\n" +
		"\t\tanimated UI. The OS lets them request reduced motion and browsers expose it via\n" +
		"\t\t\u003ccode\u003e@media (prefers-reduced-motion: reduce)\u003c/code\u003e. In Svelte read\n" +
		"\t\t\u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e from \u003ccode\u003esvelte/motion\u003c/code\u003e and conditionally\n" +
		"\t\tshorten or replace transitions. This is not optional — if you animate, respect it.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cspan class=\"pill\" class:on={reduced}\u003e\n" +
		"\t\t\t\tReduced motion: \u003cstrong\u003e{reduced ? 'on' : 'off'}\u003c/strong\u003e\n" +
		"\t\t\t\u003c/span\u003e\n" +
		"\t\t\t\u003clabel class=\"toggle\"\u003e\n" +
		"\t\t\t\t\u003cinput type=\"checkbox\" bind:checked={forceReduced} /\u003e\n" +
		"\t\t\t\tForce reduced motion (demo)\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={replay}\u003ePlay\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t{#if visible}\n" +
		"\t\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t\t{#each cards as card, i (card.id)}\n" +
		"\t\t\t\t\t{#if reduced}\n" +
		"\t\t\t\t\t\t\u003cdiv class=\"card\" in:fade={{ duration: 150 }}\u003e\n" +
		"\t\t\t\t\t\t\t\u003ch4\u003e{card.title}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\t\t\u003cp\u003e{card.description}\u003c/p\u003e\n" +
		"\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t{:else}\n" +
		"\t\t\t\t\t\t\u003cdiv\n" +
		"\t\t\t\t\t\t\tclass=\"card\"\n" +
		"\t\t\t\t\t\t\tin:fly={{ y: 30, delay: i * 80, duration: 500, easing: cubicOut }}\n" +
		"\t\t\t\t\t\t\tout:fade={{ duration: 200 }}\n" +
		"\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t\u003ch4\u003e{card.title}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\t\t\u003cp\u003e{card.description}\u003c/p\u003e\n" +
		"\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t{/if}\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cdiv class=\"instructions\"\u003e\n" +
		"\t\t\t\u003cp\u003e\u003cstrong\u003eTurn on reduced motion in your OS:\u003c/strong\u003e\u003c/p\u003e\n" +
		"\t\t\t\u003cul class=\"inline\"\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003cstrong\u003emacOS:\u003c/strong\u003e System Settings → Accessibility → Display → Reduce Motion\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eWindows:\u003c/strong\u003e Settings → Accessibility → Visual effects → Animation effects\n" +
		"\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\u003cstrong\u003eiOS:\u003c/strong\u003e Settings → Accessibility → Motion → Reduce Motion\u003c/li\u003e\n" +
		"\t\t\t\t\u003cli\u003e\n" +
		"\t\t\t\t\t\u003cstrong\u003eAndroid:\u003c/strong\u003e Settings → Accessibility → Remove animations\n" +
		"\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\u003c/ul\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003eprefersReducedMotion\u003c/code\u003e from \u003ccode\u003esvelte/motion\u003c/code\u003e is reactive — read\n" +
		"\t\t\t\u003ccode\u003e.current\u003c/code\u003e.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSwap \u003ccode\u003efly\u003c/code\u003e/\u003ccode\u003eslide\u003c/code\u003e/\u003ccode\u003escale\u003c/code\u003e for \u003ccode\u003efade\u003c/code\u003e when on.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDrop stagger delays — users want content fast, not choreographed.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAlways provide a dev toggle so instructors can demo both branches.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>6.18 — prefers-reduced-motion</h1>
	<p class="concept">
		<strong>Concept.</strong> Some people experience motion sickness or vestibular discomfort from
		animated UI. The OS lets them request reduced motion and browsers expose it via
		<code>@media (prefers-reduced-motion: reduce)</code>. In Svelte read
		<code>prefersReducedMotion.current</code> from <code>svelte/motion</code> and conditionally
		shorten or replace transitions. This is not optional — if you animate, respect it.
	</p>

	<div class="build">
		<div class="row">
			<span class="pill" class:on={reduced}>
				Reduced motion: <strong>{reduced ? 'on' : 'off'}</strong>
			</span>
			<label class="toggle">
				<input type="checkbox" bind:checked={forceReduced} />
				Force reduced motion (demo)
			</label>
		</div>
		<div class="row">
			<button type="button" onclick={replay}>Play</button>
		</div>

		{#if visible}
			<div class="grid">
				{#each cards as card, i (card.id)}
					{#if reduced}
						<div class="card" in:fade={{ duration: 150 }}>
							<h4>{card.title}</h4>
							<p>{card.description}</p>
						</div>
					{:else}
						<div
							class="card"
							in:fly={{ y: 30, delay: i * 80, duration: 500, easing: cubicOut }}
							out:fade={{ duration: 200 }}
						>
							<h4>{card.title}</h4>
							<p>{card.description}</p>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="instructions">
			<p><strong>Turn on reduced motion in your OS:</strong></p>
			<ul class="inline">
				<li><strong>macOS:</strong> System Settings → Accessibility → Display → Reduce Motion</li>
				<li>
					<strong>Windows:</strong> Settings → Accessibility → Visual effects → Animation effects
				</li>
				<li><strong>iOS:</strong> Settings → Accessibility → Motion → Reduce Motion</li>
				<li>
					<strong>Android:</strong> Settings → Accessibility → Remove animations
				</li>
			</ul>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Test what happens when you ignore or improperly handle the reduced motion preference to understand why it matters.</p>
	<ol class="experiments">
		<li><strong>Ignore <code>prefers-reduced-motion</code></strong> — vestibular disorder users get nauseated. Failing to check this preference means your animations actively harm users who have explicitly told their operating system they need reduced motion.</li>
		<li><strong>Check <code>prefersReducedMotion.current</code></strong> — disable all animation. Reading this reactive property and branching your transition logic ensures that users who need reduced motion get a comfortable experience.</li>
		<li><strong>Provide ALTERNATIVE static experience, not just "disabled"</strong> — reduced motion does not mean no visual feedback. Replace spatial movement with subtle opacity changes, ensure state transitions remain visible, and keep the interface informative.</li>
		<li><strong>Test in OS settings</strong> — toggle reduce motion preference. Go to your operating system's accessibility settings, enable reduced motion, reload the page, and verify that every animation in your application respects the preference.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Respecting <code>prefers-reduced-motion</code> is not a nice-to-have feature -- it is an accessibility requirement on par with providing alt text for images or semantic HTML for screen readers. Users who enable this OS-level preference include people with vestibular disorders (who experience dizziness or nausea from motion), people with seizure conditions (who can be triggered by rapid visual changes), and people with attention disorders (who find animation distracting). Ignoring this preference means your application actively causes harm to these users, which is both an ethical failure and, in many jurisdictions, a legal liability under accessibility regulations.</p>
	<p class="prose">Svelte provides <code>prefersReducedMotion</code> from <code>svelte/motion</code> as a reactive object whose <code>.current</code> property updates live when the user toggles the OS preference. The recommended pattern is to derive a reduced-motion flag and use it to branch your transition logic: when active, replace <code>fly</code>, <code>slide</code>, and <code>scale</code> with short <code>fade</code> transitions, drop stagger delays entirely, and set spring/tween durations to zero or near-zero. The goal is not to eliminate all visual feedback -- state changes should still be visible -- but to remove spatial movement and long-duration choreography that triggers vestibular responses.</p>
	<p class="prose">Building a development toggle that simulates reduced motion (as demonstrated in this lesson) is essential for testing. Developers typically do not have reduced motion enabled on their own machines, so without a toggle they cannot verify the reduced-motion branch of their code. The toggle pattern -- <code>const reduced = $derived(prefersReducedMotion.current || forceReduced)</code> -- lets instructors and QA testers switch between both branches instantly without changing OS settings. Every code review that touches animation should include verification of both branches: the full-motion experience for users who want it, and the reduced-motion alternative for users who need it.</p>
	<p class="next"><a href="/module-6/project">Next: Module 6 project</a></p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72rem;
		margin-inline: auto;
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
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.pill.on {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.pill.on strong {
		color: var(--color-surface);
	}
	.pill strong {
		color: var(--color-text);
	}
	.toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
	}
	button {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}
	.card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.card h4 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	.card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.instructions {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.instructions p {
		margin: 0 0 var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	ul.inline {
		font-size: var(--text-sm);
	}
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.grid {
			grid-template-columns: repeat(4, 1fr);
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
