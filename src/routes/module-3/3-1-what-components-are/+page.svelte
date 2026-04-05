<script lang="ts">
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
</style>
