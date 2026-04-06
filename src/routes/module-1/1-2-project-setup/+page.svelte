<script lang="ts">
	interface ProjectInfo {
		packageManager: string;
		svelte: string;
		kit: string;
		vite: string;
		typescript: string;
		strict: string;
	}

	const info: ProjectInfo = {
		packageManager: 'pnpm 9+',
		svelte: '5.55+',
		kit: '2.55+',
		vite: '7',
		typescript: '5',
		strict: 'true'
	};
</script>

<section class="page">
	<h1>1.2 — Project setup</h1>

	<p class="concept">
		A modern Svelte project is a small stack of sharp tools. <strong>pnpm</strong> installs dependencies
		with a content-addressable store so disk use stays tiny.
		<strong>Vite</strong>
		runs a native-ESM dev server (instant HMR) and bundles production builds with Rollup.
		<strong>SvelteKit</strong>
		gives you file-based routing: any <code>+page.svelte</code> under <code>src/routes</code> becomes
		a URL — no router config to wire. And we turn on
		<strong>TypeScript strict</strong>
		from day one because catching a bug at compile time is always cheaper than catching it in production.
	</p>

	<article class="card">
		<h2>This project</h2>
		<dl>
			<dt>Package manager</dt>
			<dd>{info.packageManager}</dd>
			<dt>Svelte</dt>
			<dd>{info.svelte}</dd>
			<dt>SvelteKit</dt>
			<dd>{info.kit}</dd>
			<dt>Vite</dt>
			<dd>{info.vite}</dd>
			<dt>TypeScript</dt>
			<dd>{info.typescript}</dd>
			<dt>Strict mode</dt>
			<dd>{info.strict}</dd>
		</dl>
	</article>

	<div class="build">
		<h3>Verify your setup</h3>
		<ul>
			<li>Open a terminal and run: <code>pnpm -v</code> (should show 9+).</li>
			<li>Run: <code>node -v</code> (should show 22+).</li>
			<li>Run: <code>pnpm dev</code> (should show a Vite dev server URL like <code>http://localhost:5173</code>).</li>
			<li>Open <code>tsconfig.json</code> and confirm <code>strict: true</code>.</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>pnpm gives you fast, deduplicated installs.</li>
		<li>Vite is the dev server and the production bundler.</li>
		<li>SvelteKit turns <code>src/routes</code> into URLs — no config.</li>
		<li>TypeScript strict mode catches bugs before the browser does.</li>
	</ul>
</section>

<style>
	.concept {
		color: var(--color-text-muted);
		max-width: 60ch;
		line-height: 1.6;
	}

	.card {
		background: var(--color-surface-2);
		color: var(--color-text);
		padding: var(--space-lg);
		border-radius: var(--radius-lg);
		margin-block: var(--space-xl);
		max-width: 36rem;

		& h2 {
			margin: 0 0 var(--space-md) 0;
			color: var(--color-brand);
			font-size: var(--text-lg);
		}

		& dl {
			display: grid;
			grid-template-columns: 1fr;
			gap: var(--space-xs) var(--space-md);
			margin: 0;

			@media (min-width: 768px) {
				grid-template-columns: max-content 1fr;
			}
		}

		& dt {
			font-weight: 600;
			color: var(--color-text-muted);
		}

		& dd {
			margin: 0 0 var(--space-sm) 0;
			color: var(--color-text);
			font-family: var(--font-mono, monospace);
		}
	}

	ul {
		color: var(--color-text);
		line-height: 1.8;

		& code {
			color: var(--color-brand);
		}
	}
</style>
