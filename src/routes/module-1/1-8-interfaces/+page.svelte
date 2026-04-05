<script lang="ts">
	interface User {
		name: string;
		role: string;
		avatar: string;
		bio: string;
		tags?: readonly string[];
	}

	const user: User = {
		name: 'Mira Kovalenko',
		role: 'Senior Product Designer',
		avatar: 'MK',
		bio: 'Designs calm, high-density interfaces for developer tools. Previously shipped the onboarding surface at a YC-backed devtool used by 40k engineers a month.',
		tags: ['Design Systems', 'Figma', 'Prototyping', 'A11y', 'Motion']
	};
</script>

<section class="page">
	<h1>Lesson 1.8 — Interfaces</h1>

	<p class="concept">
		<strong>Concept.</strong> A TypeScript <code>interface</code> describes the shape of an object
		— what properties it has, what types they are, and whether any are optional (marked with
		<code>?</code>). With <code>strict</code> mode on, the compiler refuses to build if a required
		field is missing or mistyped, so whole categories of bugs die before runtime. Rule of thumb:
		reach for <code>interface</code> when describing an object shape (especially one that might be
		extended), and reach for a <code>type</code> alias when describing a union or a primitive
		alias. They overlap heavily, but this split keeps intent clear in a large codebase.
	</p>

	<article class="profile">
		<div class="avatar" aria-hidden="true">{user.avatar}</div>
		<div class="content">
			<h2>{user.name}</h2>
			<p class="role">{user.role}</p>
			<p class="bio">{user.bio}</p>

			{#if user.tags}
				<ul class="tags">
					{#each user.tags as tag (tag)}
						<li class="tag">{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</article>

	<h2>What you learned</h2>
	<ul class="learned">
		<li><code>interface</code> describes the shape of an object.</li>
		<li><code>?</code> marks an optional property — the compiler forces an <code>#if</code> check before you read it.</li>
		<li><code>readonly</code> arrays cannot be mutated — great for fixed lists.</li>
		<li>Use <code>interface</code> for objects, <code>type</code> for unions.</li>
	</ul>
</section>

<style>
	.page {
		& .concept {
			font-size: var(--text-base);
			color: var(--color-fg-muted);
			max-inline-size: 65ch;
		}

		& h2 {
			font-size: var(--text-xl);
			margin-block-start: 2rem;
		}
	}

	.profile {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 1.5rem;
		border: 1px solid var(--color-border);
		border-radius: 1rem;
		background: var(--color-surface);
		margin-block: 2rem;

		& .avatar {
			inline-size: 5rem;
			block-size: 5rem;
			border-radius: 999px;
			background: var(--color-brand);
			color: var(--color-bg);
			display: grid;
			place-items: center;
			font-size: var(--text-2xl);
			font-weight: 700;
			flex-shrink: 0;
		}

		& .content {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			& h2 {
				font-size: var(--text-2xl);
				margin: 0;
			}

			& .role {
				font-size: var(--text-base);
				color: var(--color-brand);
				margin: 0;
				font-weight: 600;
			}

			& .bio {
				font-size: var(--text-base);
				color: var(--color-fg-muted);
				margin: 0;
				line-height: 1.6;
			}
		}
	}

	.tags {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;

		& .tag {
			font-size: var(--text-xs);
			padding: 0.35rem 0.75rem;
			border-radius: 999px;
			background: var(--color-brand-dim);
			color: var(--color-fg);
			font-weight: 500;
		}
	}

	.learned {
		padding-inline-start: 1.25rem;
		color: var(--color-fg-muted);

		& li {
			margin-block: 0.25rem;
		}
	}

	@media (min-width: 768px) {
		.profile {
			flex-direction: row;
			align-items: flex-start;
			gap: 2rem;
			padding: 2rem;

			& .avatar {
				inline-size: 7rem;
				block-size: 7rem;
				font-size: var(--text-hero);
			}
		}
	}
</style>
