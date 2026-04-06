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

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Put two <code>&lt;style&gt;</code> blocks in one component.</strong> Svelte will throw a compile error because each component is allowed exactly one <code>&lt;style&gt;</code> block. This constraint exists so the compiler can statically scope every selector without ambiguity.</li>
		<li><strong>Import a component but forget the <code>.svelte</code> extension.</strong> You will get a "module not found" error. Unlike JavaScript files that bundlers resolve automatically, <code>.svelte</code> files require the explicit extension so the compiler knows to process them as components rather than plain modules.</li>
		<li><strong>Use a component tag without importing it first.</strong> Svelte will report that the name is not defined. Every component must be imported as a value before it can appear in markup, because the tag name is just a reference to the imported constructor.</li>
		<li><strong>Create a circular import where component A imports B and B imports A.</strong> Svelte handles it without crashing, but the pattern is a code smell. Circular dependencies make the dependency graph harder to reason about and can cause subtle initialization-order bugs in larger projects.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Components are the fundamental building block of every Svelte application. Each component lives in a single <code>.svelte</code> file that bundles three concerns — script, markup, and style — into one self-contained unit. You import a component the same way you import any JavaScript module, and you instantiate it in markup as if it were a custom HTML tag.</p>
	<p class="prose">Because each component file is a complete definition, you can render many instances of it on the same page, each fed different data through props. One definition, many instances — that is the core value proposition. The compiler treats each instance independently, so changing data in one never accidentally affects another.</p>
	<p class="prose">Scoped styles are a critical part of this encapsulation. The <code>&lt;style&gt;</code> block inside a component applies only to that component's markup, never leaking to siblings or parents. This means you can name your classes freely — <code>.card</code>, <code>.title</code>, <code>.row</code> — without worrying about collisions across the rest of the application.</p>
	<p class="next">Next lesson: <a href="/module-3/3-2-props">3.2 — $props()</a></p>
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
