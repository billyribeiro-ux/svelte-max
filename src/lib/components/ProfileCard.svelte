<script lang="ts">
	import type { Profile } from '$lib/types/profile';

	interface Props {
		profile: Profile;
		compact?: boolean;
	}

	let { profile, compact = false }: Props = $props();
</script>

<article class="card" class:compact>
	<header>
		<h2>{profile.name}</h2>
		<p class="role">{profile.role}</p>
		<p class="location">{profile.location}</p>
	</header>

	<p class="bio">{profile.bio}</p>

	<div class="meta">
		<span class="pill availability" class:available={profile.available}>
			{profile.available ? 'Available' : 'Booked'}
		</span>
		<span class="years">{profile.yearsExperience} yrs</span>
	</div>

	<ul class="skills">
		{#each profile.skills as skill (skill)}
			<li class="pill skill">{skill}</li>
		{/each}
	</ul>

	<dl class="stats">
		<div>
			<dt>Projects</dt>
			<dd>{profile.stats.projects}</dd>
		</div>
		<div>
			<dt>Clients</dt>
			<dd>{profile.stats.clients}</dd>
		</div>
		<div>
			<dt>Commits</dt>
			<dd>{profile.stats.commits}</dd>
		</div>
	</dl>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		transition: box-shadow var(--dur-fast) var(--ease-out);
	}

	.card:hover {
		box-shadow: var(--shadow-md);
	}

	.card.compact {
		gap: var(--space-sm);
		padding: var(--space-md);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	h2 {
		font-size: var(--text-xl);
		margin: 0;
	}

	.role {
		font-size: var(--text-sm);
		color: var(--color-brand);
		font-weight: 600;
		margin: 0;
	}

	.location {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	.bio {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.pill {
		display: inline-flex;
		align-items: center;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		font-weight: 600;
		background: var(--color-surface-2);
		color: var(--color-text);
	}

	.availability {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}

	.availability.available {
		background: var(--color-success);
		color: var(--color-surface-1);
	}

	.years {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.skills {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		padding: 0;
		margin: 0;
	}

	.skill {
		background: var(--color-surface-2);
		color: var(--color-text);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-sm);
		padding-block-start: var(--space-md);
		border-block-start: 1px solid var(--color-border);
		margin: 0;
	}

	.stats div {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	dt {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	dd {
		font-size: var(--text-lg);
		font-weight: 700;
		margin: 0;
	}
</style>
