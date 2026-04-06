<script lang="ts">
	import type { Profile } from '$lib/types/profile';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import ReferenceSolution from '$lib/components/ReferenceSolution.svelte';

	// ── Profile data ────────────────────────────────────────────────────
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

	// ── Reference solution code ─────────────────────────────────────────
	const solutionPageCode: string = `\u003cscript lang="ts"\u003e
  // Import the shared Profile interface from $lib/types.
  // This is the same interface used across the entire course.
  import type { Profile } from '$lib/types/profile';

  // Create a Profile object. TypeScript checks every field
  // against the interface at compile time.
  const me: Profile = {
    name: 'Billy Ribeiro',           // string — your full name
    role: 'Frontend Engineer',       // string — your job title
    location: 'Lisbon, Portugal',    // string — where you are based
    bio: 'I build fast, accessible interfaces...', // string — short bio
    yearsExperience: 9,              // number — years in the industry
    available: true,                 // boolean — open to work?
    skills: [                        // readonly string[] — skill tags
      'Svelte 5', 'SvelteKit 2', 'TypeScript',
      'CSS architecture', 'Accessibility', 'Performance',
      'Design systems', 'GSAP', 'Threlte'
    ] as const,
    stats: {                         // nested object — key numbers
      projects: 84,                  // number — projects shipped
      clients: 27,                   // number — clients served
      commits: 12_430                // number — git commits (underscore for readability)
    }
  };
\u003c/script\u003e

<!-- Hero section: name, role, location, availability -->
<header class="hero">
  <p class="eyebrow">Module 1 Project</p>

  <!-- Fluid typography: --text-hero scales with viewport (Lesson 1.6) -->
  <h1>{me.name}</h1>

  <!-- Template expression: renders the role string (Lesson 1.9) -->
  <p class="role">{me.role}</p>
  <p class="location">{me.location}</p>

  <!-- Ternary expression: picks text based on boolean (Lesson 1.9) -->
  <!-- class: directive: adds .available class conditionally (Lesson 1.7) -->
  <span class="availability" class:available={me.available}>
    {me.available ? 'Available for work' : 'Currently booked'}
  </span>
</header>

<!-- Bio section with {@const} for computed tagline (Lesson 1.9) -->
<section class="bio">
  <p>{me.bio}</p>
  {#if me.yearsExperience > 0}
    {@const tagline = me.yearsExperience + '+ years shipping production code'}
    <span class="years-badge">{tagline}</span>
  {/if}
</section>

<!-- Stats grid using template expressions (Lesson 1.9) -->
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
    <!-- .toLocaleString() adds commas: 12,430 -->
    <span class="stat-value">{me.stats.commits.toLocaleString()}</span>
    <span class="stat-label">Commits authored</span>
  </article>
</section>

<!-- Skills list using {#each} with (key) for efficient updates -->
<section class="skills">
  <h2>Skills</h2>
  <ul class="skill-list">
    {#each me.skills as skill (skill)}
      <li class="skill-pill">{skill}</li>
    {/each}
  </ul>
</section>

<!-- Footer listing which lessons each feature uses -->
<footer class="built-with">
  <h3>Built with</h3>
  <p>
    Lessons 1.1 (compiled scoped styles) - 1.2 (pnpm + SvelteKit + TS strict) -
    1.3 (three blocks) - 1.4 (typed primitives) - 1.5 (PE7 tokens) -
    1.6 (fluid clamp) - 1.7 (scoping) - 1.8 (interfaces) -
    1.9 (template expressions + @const).
  </p>
</footer>

<style>
  /* Scoped custom-property override (Lesson 1.7) —
     this page uses a teal brand instead of the global brand color. */
  .portfolio {
    --color-brand: oklch(62% 0.19 180);     /* teal brand hue */
    --color-brand-dim: oklch(52% 0.16 180); /* darker teal for hover */
  }

  /* Hero uses fluid type tokens (Lesson 1.6) */
  .hero h1 {
    color: var(--color-brand);              /* brand-colored name */
  }

  /* Stats grid: 1 column on mobile, 3 on tablet+ */
  .stats {
    display: grid;
    grid-template-columns: 1fr;             /* single column mobile */
    gap: var(--space-md);                   /* consistent gap */
  }

  @media (min-width: 768px) {
    .stats {
      grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    }
  }
</style>`;

	const solutionProfileCode: string = `// $lib/types/profile.ts
// The canonical Profile interface for the entire course.

export interface Profile {
  name: string;                // full name
  role: string;                // job title
  location: string;            // city, country
  bio: string;                 // short biography
  yearsExperience: number;     // years in the industry
  available: boolean;          // open to new work?
  skills: readonly string[];   // list of skill tags (readonly = cannot mutate)
  stats: {                     // nested object for key statistics
    projects: number;          // total projects shipped
    clients: number;           // total clients served
    commits: number;           // total git commits
  };
}`;

	const solutionFiles: readonly { name: string; code: string }[] = [
		{ name: '+page.svelte', code: solutionPageCode },
		{ name: '$lib/types/profile.ts', code: solutionProfileCode }
	];

	// ── Common mistakes code blocks ─────────────────────────────────────
	const mistakeNoInterface: string = `// WRONG — no interface, no type safety
const me = {
  name: 'Billy',
  role: 'Engineer',
  locaton: 'Lisbon',     // typo! "locaton" instead of "location"
  bio: 'I build things.',
  yearsExperience: '9',  // wrong type! string instead of number
  available: true,
  skills: ['Svelte'],
  stats: { projects: 84 } // missing "clients" and "commits"
};
// Without the Profile interface, none of these bugs are caught.`;

	const mistakeNoCheck: string = `<!-- WRONG — accessing optional-like nested data without a guard -->
\u003cscript lang="ts"\u003e
  // If stats were optional (stats?: {...}), this would crash:
  const value = me.stats.projects;
  // Always guard optional properties with {#if} before accessing.
\u003c/script\u003e`;

	const mistakeGlobal: string = `<style>
  /* WRONG — :global() on the availability badge */
  :global(.availability) {
    /* This leaks to EVERY .availability on the site.
       Scoped styles (Lesson 1.7) handle this automatically. */
  }
</style>`;
</script>

<section class="page portfolio">
	<!-- ── Hero ───────────────────────────────────────────── -->
	<header class="hero">
		<p class="eyebrow">Module 1 Project</p>
		<h1>{me.name}</h1>
		<p class="role">{me.role}</p>
		<p class="location">{me.location}</p>
		<span class="availability" class:available={me.available}>
			{me.available ? 'Available for work' : 'Currently booked'}
		</span>
	</header>

	<!-- ── Bio ────────────────────────────────────────────── -->
	<section class="bio">
		<p>{me.bio}</p>
		{#if me.yearsExperience > 0}
			{@const tagline = `${me.yearsExperience}+ years shipping production code`}
			<span class="years-badge">{tagline}</span>
		{/if}
	</section>

	<!-- ── Stats ──────────────────────────────────────────── -->
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

	<!-- ── Skills ─────────────────────────────────────────── -->
	<section class="skills">
		<h2>Skills</h2>
		<ul class="skill-list">
			{#each me.skills as skill (skill)}
				<li class="skill-pill">{skill}</li>
			{/each}
		</ul>
	</section>

	<!-- ── Built with ─────────────────────────────────────── -->
	<footer class="built-with">
		<h3>Built with</h3>
		<p>
			Lessons 1.1 (compiled scoped styles) · 1.2 (pnpm + SvelteKit + TS strict) · 1.3 (three
			blocks) · 1.4 (typed primitives) · 1.5 (PE7 tokens) · 1.6 (fluid clamp) · 1.7 (scoping) · 1.8
			(interfaces — the <code>Profile</code> interface imported from
			<code>$lib/types/profile</code>) · 1.9 (template expressions + <code>{'{@const}'}</code>).
		</p>
	</footer>

	<!-- ── Common mistakes ────────────────────────────────── -->
	<h2>Common mistakes</h2>

	<div class="mistake-list">
		<details>
			<summary>Mistake 1 — No interface on your data object</summary>
			<p class="detail-text">
				Without the <code>Profile</code> interface, TypeScript cannot catch typos, wrong types, or
				missing fields. Always type your data.
			</p>
			<CodeCanvas filename="wrong — no interface" code={mistakeNoInterface} />
		</details>

		<details>
			<summary>Mistake 2 — Accessing optional data without a guard</summary>
			<p class="detail-text">
				If a property is optional, you must check it with <code>{'{#if}'}</code> before accessing it.
				Otherwise you risk a runtime crash.
			</p>
			<CodeCanvas filename="wrong — no guard" code={mistakeNoCheck} />
		</details>

		<details>
			<summary>Mistake 3 — Using :global() when scoped styles work</summary>
			<p class="detail-text">
				Svelte scopes all your styles automatically. Using <code>:global()</code> defeats the
				purpose and leaks styles to the entire page.
			</p>
			<CodeCanvas filename="wrong — unnecessary :global()" code={mistakeGlobal} />
		</details>
	</div>

	<!-- ── What to improve (stretch goals) ────────────────── -->
	<h2>What to improve</h2>
	<ul class="stretch-goals">
		<li><strong>Add a dark mode toggle</strong> — use a <code>$state</code> boolean and swap CSS custom properties.</li>
		<li><strong>Add a contact form section</strong> — create a new interface for form fields and validate with TypeScript.</li>
		<li><strong>Add project cards</strong> — define a <code>Project</code> interface with name, description, URL, and tech stack, then render them with <code>{'{#each}'}</code>.</li>
		<li><strong>Add a responsive navigation bar</strong> — practice scoped styles and mobile-first layout.</li>
		<li><strong>Animate the stats</strong> — use <code>$effect</code> to count up from 0 to the final value on mount.</li>
		<li><strong>Extract reusable components</strong> — move the stat card and skill pill into separate <code>.svelte</code> files with typed props.</li>
	</ul>

	<!-- ── Reference solution ─────────────────────────────── -->
	<h2>Reference solution</h2>
	<p class="concept">
		Below is the complete annotated source code for this project. Every CSS property is commented,
		every TypeScript type is explained, and every Svelte feature is cross-referenced to its lesson.
	</p>
	<ReferenceSolution files={solutionFiles} />
</section>

<style>
	/* ── Per-page color personality (Lesson 1.7) ─────────── */
	/* Scoped custom-property override: this page uses teal
	   instead of the global brand color. */
	.portfolio {
		--color-brand: oklch(62% 0.19 180);     /* teal hue */
		--color-brand-dim: oklch(52% 0.16 180); /* darker teal for hover states */
	}

	/* ── Hero section ────────────────────────────────────── */
	.hero {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-xs);                /* tight spacing between elements */
		padding-block-end: var(--space-lg);  /* space before the border */
		border-block-end: 1px solid var(--color-border); /* bottom separator */
		margin-block-end: var(--space-xl);   /* space after hero */
	}

	.eyebrow {
		font-size: var(--text-xs);           /* extra small text */
		text-transform: uppercase;           /* ALL CAPS */
		letter-spacing: 0.1em;              /* wide letter spacing */
		color: var(--color-text-muted);      /* secondary color */
		font-weight: 700;                    /* bold */
	}

	.hero h1 {
		color: var(--color-brand);           /* teal brand color */
	}

	.role {
		font-size: var(--text-xl);           /* large text for role */
		color: var(--color-text);            /* primary color */
		font-weight: 600;                    /* semi-bold */
	}

	.location {
		color: var(--color-text-muted);      /* secondary color */
		font-size: var(--text-base);         /* body size */
	}

	/* ── Availability badge ──────────────────────────────── */
	.availability {
		align-self: start;                   /* shrink to content width */
		display: inline-block;               /* inline with padding */
		padding: var(--space-xs) var(--space-sm); /* pill padding */
		border-radius: var(--radius-full);   /* fully rounded */
		background: var(--color-surface-2);  /* neutral background */
		color: var(--color-text-muted);      /* secondary text */
		font-size: var(--text-sm);           /* small text */
		font-weight: 600;                    /* semi-bold */
		margin-block-start: var(--space-sm); /* space above */
	}

	.availability.available {
		background: oklch(95% 0.05 145);     /* light green background */
		color: var(--color-success);         /* green text */
	}

	/* ── Bio section ─────────────────────────────────────── */
	.bio {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-sm);                /* space between elements */
		margin-block-end: var(--space-xl);   /* space after bio */
	}

	.bio p {
		max-inline-size: 65ch;               /* optimal reading width */
		font-size: var(--text-lg);           /* slightly larger body */
		color: var(--color-text);            /* primary color */
	}

	.years-badge {
		align-self: start;                   /* shrink to content width */
		display: inline-block;               /* inline with padding */
		padding: var(--space-xs) var(--space-sm); /* pill padding */
		background: var(--color-brand);      /* brand fill */
		color: oklch(99% 0.005 270);         /* near-white text */
		border-radius: var(--radius-md);     /* medium rounding */
		font-size: var(--text-sm);           /* small text */
		font-weight: 700;                    /* bold */
	}

	/* ── Stats grid ──────────────────────────────────────── */
	.stats {
		display: grid;                       /* grid layout */
		grid-template-columns: 1fr;          /* 1 column on mobile */
		gap: var(--space-md);                /* consistent gap */
		margin-block-end: var(--space-xl);   /* space after stats */
	}

	.stat {
		padding: var(--space-md);            /* inner spacing */
		background: var(--color-surface-2);  /* subtle background */
		border: 1px solid var(--color-border); /* card border */
		border-radius: var(--radius-lg);     /* large rounding */
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: var(--space-xs);                /* tight spacing */
	}

	.stat-value {
		font-size: var(--text-2xl);          /* large number */
		font-weight: 800;                    /* extra bold */
		color: var(--color-brand);           /* brand color */
		line-height: 1;                      /* tight leading */
	}

	.stat-label {
		font-size: var(--text-sm);           /* small label */
		color: var(--color-text-muted);      /* secondary color */
		text-transform: uppercase;           /* ALL CAPS */
		letter-spacing: 0.05em;              /* slight tracking */
	}

	/* ── Skills section ──────────────────────────────────── */
	.skills {
		margin-block-end: var(--space-xl);   /* space after skills */
	}

	.skills h2 {
		margin-block-end: var(--space-md);   /* space before pill list */
	}

	.skill-list {
		list-style: none;                    /* remove bullets */
		padding: 0;                          /* remove default padding */
		margin: 0;                           /* remove default margin */
		display: flex;                       /* horizontal layout */
		flex-wrap: wrap;                     /* wrap to next line */
		gap: var(--space-xs);                /* space between pills */
	}

	.skill-pill {
		padding: var(--space-xs) var(--space-sm); /* pill padding */
		background: var(--color-surface-2);  /* subtle background */
		border: 1px solid var(--color-border); /* subtle border */
		border-radius: var(--radius-full);   /* fully rounded */
		font-size: var(--text-sm);           /* small text */
		color: var(--color-text);            /* primary text */
		font-weight: 600;                    /* semi-bold */
	}

	/* ── Built-with footer ───────────────────────────────── */
	.built-with {
		padding: var(--space-md);            /* inner padding */
		background: var(--color-surface-2);  /* subtle background */
		border: 1px solid var(--color-border); /* border */
		border-radius: var(--radius-lg);     /* large rounding */
	}

	.built-with h3 {
		font-size: var(--text-base);         /* body-sized heading */
		margin-block-end: var(--space-xs);   /* small space below */
	}

	.built-with p {
		font-size: var(--text-sm);           /* small text */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: none;               /* allow full width */
	}

	.built-with code {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; /* monospace */
		font-size: 0.9em;                    /* slightly smaller than surrounding */
		padding: 0.1em 0.3em;               /* tight inline padding */
		background: var(--color-surface);    /* subtle bg */
		border: 1px solid var(--color-border); /* subtle border */
		border-radius: var(--radius-sm);     /* small rounding */
	}

	/* ── Headings ────────────────────────────────────────── */
	h2 {
		font-size: var(--text-xl);           /* section heading */
		margin-block-start: 2rem;            /* space above */
	}

	/* ── Common mistakes ─────────────────────────────────── */
	.mistake-list {
		display: flex;                       /* vertical stack */
		flex-direction: column;              /* top to bottom */
		gap: 1rem;                           /* space between items */
	}

	.mistake-list details {
		border: 1px solid var(--color-border); /* boundary */
		border-radius: 0.5rem;               /* rounded */
		padding: 1rem;                       /* inner spacing */

		& summary {
			cursor: pointer;                   /* clickable */
			font-weight: 600;                  /* bold */
			color: oklch(55% 0.15 25);         /* red-ish warning color */
			font-size: var(--text-base);       /* body size */
		}
	}

	.detail-text {
		font-size: var(--text-sm);           /* smaller */
		color: var(--color-text-muted);      /* secondary */
		margin-block: 0.5rem;                /* spacing */
	}

	/* ── Concept text ────────────────────────────────────── */
	.concept {
		font-size: var(--text-base);         /* body size */
		color: var(--color-text-muted);      /* secondary */
		max-inline-size: 65ch;               /* reading width */
		line-height: 1.6;                    /* comfortable */
	}

	/* ── Stretch goals ───────────────────────────────────── */
	.stretch-goals {
		padding-inline-start: 1.25rem;       /* indent bullets */
		color: var(--color-text-muted);      /* secondary */
		line-height: 1.6;                    /* readable */

		& li {
			margin-block: 0.5rem;              /* gap between items */
		}

		& strong {
			color: var(--color-text);          /* full contrast for bold */
		}
	}

	/* ── Responsive ──────────────────────────────────────── */
	@media (min-width: 768px) {
		.stats {
			grid-template-columns: repeat(3, 1fr); /* 3 columns on tablet+ */
		}
	}

	@media (min-width: 1024px) {
		.hero h1 {
			font-size: clamp(3rem, 9vw, 6rem); /* extra large on desktop */
		}

		.role {
			font-size: var(--text-2xl);        /* larger role on desktop */
		}
	}
</style>
