<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import type { Profile } from '$lib/types/profile';

	const designer: Profile = {
		name: 'Ada Rivera',
		role: 'Product Designer',
		location: 'Lisbon, PT',
		bio: 'Designs calm, confident interfaces for small teams shipping big ideas.',
		yearsExperience: 8,
		available: true,
		skills: ['Figma', 'Design Systems', 'Prototyping', 'Motion'],
		stats: { projects: 42, clients: 18, commits: 1203 }
	};

	const engineer: Profile = {
		name: 'Kai Thompson',
		role: 'Senior Engineer',
		location: 'Berlin, DE',
		bio: 'Full-stack engineer focused on typed UIs and resilient component architecture.',
		yearsExperience: 11,
		available: false,
		skills: ['TypeScript', 'Svelte', 'Postgres', 'Infra'],
		stats: { projects: 67, clients: 24, commits: 8421 }
	};

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import ProfileCard from '$lib/components/ProfileCard.svelte';\n" +
		"\timport type { Profile } from '$lib/types/profile';\n" +
		"\n" +
		"\tconst designer: Profile = {\n" +
		"\t\tname: 'Ada Rivera',\n" +
		"\t\trole: 'Product Designer',\n" +
		"\t\tlocation: 'Lisbon, PT',\n" +
		"\t\tbio: 'Designs calm, confident interfaces for small teams shipping big ideas.',\n" +
		"\t\tyearsExperience: 8,\n" +
		"\t\tavailable: true,\n" +
		"\t\tskills: ['Figma', 'Design Systems', 'Prototyping', 'Motion'],\n" +
		"\t\tstats: { projects: 42, clients: 18, commits: 1203 }\n" +
		"\t};\n" +
		"\n" +
		"\tconst engineer: Profile = {\n" +
		"\t\tname: 'Kai Thompson',\n" +
		"\t\trole: 'Senior Engineer',\n" +
		"\t\tlocation: 'Berlin, DE',\n" +
		"\t\tbio: 'Full-stack engineer focused on typed UIs and resilient component architecture.',\n" +
		"\t\tyearsExperience: 11,\n" +
		"\t\tavailable: false,\n" +
		"\t\tskills: ['TypeScript', 'Svelte', 'Postgres', 'Infra'],\n" +
		"\t\tstats: { projects: 67, clients: 24, commits: 8421 }\n" +
		"\t};\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e3.1 — What components are\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e A component is a reusable \u003ccode\u003e.svelte\u003c/code\u003e file you import and\n" +
		"\t\tinstantiate like an HTML tag. Instead of repeating markup, styles, and logic on every page,\n" +
		"\t\tyou extract it once — one definition, many instances. In Svelte 5, components receive data\n" +
		"\t\tthrough \u003ccode\u003e$props()\u003c/code\u003e rather than the old \u003ccode\u003eexport let\u003c/code\u003e, and their scoped\n" +
		"\t\t\u003ccode\u003e&lt;style&gt;\u003c/code\u003e blocks travel with the component wherever it lands.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tThe portfolio card from Module 1 was 180 lines of page markup. Now it's\n" +
		"\t\t\t\u003ccode\u003e&lt;ProfileCard {'{profile}'} /&gt;\u003c/code\u003e.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t\u003cProfileCard profile={designer} /\u003e\n" +
		"\t\t\t\u003cProfileCard profile={engineer} /\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eA component is a single \u003ccode\u003e.svelte\u003c/code\u003e file that bundles markup, logic, and styles.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eOne definition can render many instances with different typed data.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eScoped styles inside a component never leak to the rest of the page.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eExtracting components is how a codebase scales past a single page.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>3.1 — What components are</h1>
	<p class="concept">
		<strong>Concept.</strong> A component is a reusable <code>.svelte</code> file you import and
		instantiate like an HTML tag. Instead of repeating markup, styles, and logic on every page,
		you extract it once — one definition, many instances. In Svelte 5, components receive data
		through <code>$props()</code> rather than the old <code>export let</code>, and their scoped
		<code>&lt;style&gt;</code> blocks travel with the component wherever it lands.
	</p>

	<div class="build">
		<p class="note">
			The portfolio card from Module 1 was 180 lines of page markup. Now it's
			<code>&lt;ProfileCard {'{profile}'} /&gt;</code>.
		</p>

		<div class="grid">
			<ProfileCard profile={designer} />
			<ProfileCard profile={engineer} />
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>A component is a single <code>.svelte</code> file that bundles markup, logic, and styles.</li>
		<li>One definition can render many instances with different typed data.</li>
		<li>Scoped styles inside a component never leak to the rest of the page.</li>
		<li>Extracting components is how a codebase scales past a single page.</li>
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

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
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

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}

		.grid {
			grid-template-columns: repeat(2, 1fr);
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
