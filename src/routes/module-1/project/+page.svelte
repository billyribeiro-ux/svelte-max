<script lang="ts">
	import type { Profile } from '$lib/types/profile';

	const me: Profile = {
		name: 'Billy Ribeiro',
		role: 'Frontend Engineer',
		location: 'Lisbon, Portugal',
		bio: 'I build fast, accessible interfaces with a compiler-first mindset. Svelte, TypeScript strict, and CSS written like it matters — because it does. I care about the details you only notice when they are wrong.',
		yearsExperience: 9,
		available: true,
		skills: [
			'Svelte 5',
			'SvelteKit 2',
			'TypeScript',
			'CSS architecture',
			'Accessibility',
			'Performance',
			'Design systems',
			'GSAP',
			'Threlte'
		] as const,
		stats: {
			projects: 84,
			clients: 27,
			commits: 12_430
		}
	};
</script>

<section class="page portfolio">
	<header class="hero">
		<p class="eyebrow">Module 1 Project</p>
		<h1>{me.name}</h1>
		<p class="role">{me.role}</p>
		<p class="location">📍 {me.location}</p>
		<span class="availability" class:available={me.available}>
			{me.available ? '● Available for work' : '○ Currently booked'}
		</span>
	</header>

	<section class="bio">
		<p>{me.bio}</p>
		{#if me.yearsExperience > 0}
			{@const tagline = `${me.yearsExperience}+ years shipping production code`}
			<span class="years-badge">{tagline}</span>
		{/if}
	</section>

	<section class="stats">
		<article class="stat">
			<span class="stat-value">{me.stats.projects}</span>
			<span class="stat-label">Projects shipped</span>
		</article>
		<article class="stat">
			<span class="stat-value">{me.stats.clients}</span>
			<span class="stat-label">Clients served</span>
		</article>
		<article class="stat">
			<span class="stat-value">{me.stats.commits.toLocaleString()}</span>
			<span class="stat-label">Commits authored</span>
		</article>
	</section>

	<section class="skills">
		<h2>Skills</h2>
		<ul class="skill-list">
			{#each me.skills as skill (skill)}
				<li class="skill-pill">{skill}</li>
			{/each}
		</ul>
	</section>

	<footer class="built-with">
		<h3>Built with</h3>
		<p>
			Lessons 1.1 (compiled scoped styles) · 1.2 (pnpm + SvelteKit + TS strict) · 1.3 (three
			blocks) · 1.4 (typed primitives) · 1.5 (PE7 tokens) · 1.6 (fluid clamp) · 1.7 (scoping) · 1.8
			(interfaces — the <code>Profile</code> interface imported from
			<code>$lib/types/profile</code>) · 1.9 (template expressions + <code>{'{@const}'}</code>).
		</p>
	</footer>
</section>

<style>
	/*
	 * Per-page color personality via scoped custom-property override.
	 * This foreshadows Module 6.9 — every page can claim its own identity
	 * without touching global tokens. Here we swap the brand hue to a teal.
	 */
	.portfolio {
		--color-brand: oklch(62% 0.19 180);
		--color-brand-dim: oklch(52% 0.16 180);
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-block-end: var(--space-lg);
		border-block-end: 1px solid var(--color-border);
		margin-block-end: var(--space-xl);
	}

	.eyebrow {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		font-weight: 700;
	}

	.hero h1 {
		color: var(--color-brand);
	}

	.role {
		font-size: var(--text-xl);
		color: var(--color-text);
		font-weight: 600;
	}

	.location {
		color: var(--color-text-muted);
		font-size: var(--text-base);
	}

	.availability {
		align-self: start;
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		font-weight: 600;
		margin-block-start: var(--space-sm);
	}

	.availability.available {
		background: oklch(95% 0.05 145);
		color: var(--color-success);
	}

	.bio {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block-end: var(--space-xl);
	}

	.bio p {
		max-inline-size: 65ch;
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.years-badge {
		align-self: start;
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-brand);
		color: oklch(99% 0.005 270);
		border-radius: var(--radius-md);
		font-size: var(--text-sm);
		font-weight: 700;
	}

	.stats {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		margin-block-end: var(--space-xl);
	}

	.stat {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.stat-value {
		font-size: var(--text-2xl);
		font-weight: 800;
		color: var(--color-brand);
		line-height: 1;
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.skills {
		margin-block-end: var(--space-xl);
	}

	.skills h2 {
		margin-block-end: var(--space-md);
	}

	.skill-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.skill-pill {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 600;
	}

	.built-with {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.built-with h3 {
		font-size: var(--text-base);
		margin-block-end: var(--space-xs);
	}

	.built-with p {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		max-inline-size: none;
	}

	.built-with code {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		font-size: 0.9em;
		padding: 0.1em 0.3em;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	@media (min-width: 768px) {
		.stats {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.hero h1 {
			font-size: clamp(3rem, 9vw, 6rem);
		}

		.role {
			font-size: var(--text-2xl);
		}
	}
</style>
