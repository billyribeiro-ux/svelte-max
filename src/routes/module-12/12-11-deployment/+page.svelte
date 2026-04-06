<script lang="ts">
	type Adapter = {
		platform: string;
		adapter: string;
		install: string;
		notes: string;
	};

	const adapters: Adapter[] = [
		{ platform: 'Auto-detect', adapter: 'adapter-auto', install: '@sveltejs/adapter-auto', notes: 'Detects deployment platform automatically. Default in new projects.' },
		{ platform: 'Node.js server', adapter: 'adapter-node', install: '@sveltejs/adapter-node', notes: 'Builds a standalone Node server. Good for Docker, VPS, Railway.' },
		{ platform: 'Vercel', adapter: 'adapter-vercel', install: '@sveltejs/adapter-vercel', notes: 'Optimized for Vercel edge/serverless functions. Zero-config.' },
		{ platform: 'Cloudflare', adapter: 'adapter-cloudflare', install: '@sveltejs/adapter-cloudflare', notes: 'Runs on Cloudflare Workers/Pages. Edge runtime.' },
		{ platform: 'Static hosting', adapter: 'adapter-static', install: '@sveltejs/adapter-static', notes: 'Pre-renders all pages to HTML. No server needed. Good for GitHub Pages, S3.' }
	];

	type CheckItem = {
		label: string;
		done: boolean;
	};

	let checklist = $state<CheckItem[]>([
		{ label: 'Choose the correct adapter for your platform', done: false },
		{ label: 'Set environment variables in production (not .env)', done: false },
		{ label: 'Run npm run build and verify output', done: false },
		{ label: 'Test the production build locally with npm run preview', done: false },
		{ label: 'Enable HTTPS in production', done: false },
		{ label: 'Configure CSP headers', done: false },
		{ label: 'Set up error monitoring (Sentry, LogRocket)', done: false },
		{ label: 'Verify Core Web Vitals with Lighthouse', done: false },
		{ label: 'Set up CI/CD pipeline (GitHub Actions, etc.)', done: false },
		{ label: 'Configure caching headers for static assets', done: false },
		{ label: 'Add robots.txt and sitemap.xml', done: false },
		{ label: 'Test on multiple browsers and devices', done: false }
	]);

	function toggleItem(index: number) {
		checklist[index].done = !checklist[index].done;
	}

	const completedCount = $derived(checklist.filter((item) => item.done).length);
</script>

<section class="page">
	<h1>12.11 — Deployment</h1>

	<p class="concept">
		SvelteKit uses <strong>adapters</strong> to transform your app for different deployment targets.
		The adapter runs at build time and produces output optimized for your platform — whether that is
		a Node.js server, a serverless function, or a static site.
	</p>

	<h3>Adapter Decision Table</h3>
	<div class="build">
		<div class="table-wrapper">
			<table class="adapter-table">
				<thead>
					<tr>
						<th>Platform</th>
						<th>Adapter</th>
						<th>npm install</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each adapters as adapter}
						<tr>
							<td><strong>{adapter.platform}</strong></td>
							<td><code>{adapter.adapter}</code></td>
							<td><code>{adapter.install}</code></td>
							<td>{adapter.notes}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<h3>Adapter Configuration</h3>
	<div class="build">
		<pre>{`// svelte.config.js
import adapter from '@sveltejs/adapter-node';
// or: import adapter from '@sveltejs/adapter-vercel';
// or: import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // adapter-node options:
      out: 'build',
      precompress: true,
      envPrefix: 'APP_'
    })
  }
};

export default config;`}</pre>
	</div>

	<h3>Environment Variables</h3>
	<div class="build">
		<p class="concept">
			SvelteKit provides <code>$env/static/private</code>, <code>$env/static/public</code>,
			<code>$env/dynamic/private</code>, and <code>$env/dynamic/public</code> modules.
			Public variables must be prefixed with <code>PUBLIC_</code>. Never expose secrets
			to the client.
		</p>
		<pre>{`// Server-only (never sent to browser)
import { DATABASE_URL } from '$env/static/private';

// Available on client (prefixed with PUBLIC_)
import { PUBLIC_API_URL } from '$env/static/public';

// Dynamic (read at runtime, not build time)
import { env } from '$env/dynamic/private';
const dbUrl = env.DATABASE_URL;`}</pre>
	</div>

	<h3>Build Output</h3>
	<div class="build">
		<pre>{`# Build the app
npm run build

# Preview the production build locally
npm run preview

# Build output location depends on adapter:
# adapter-node  → build/
# adapter-static → build/
# adapter-vercel → .vercel/output/
# adapter-cloudflare → .svelte-kit/cloudflare/`}</pre>
	</div>

	<h3>Deployment Checklist</h3>
	<div class="build">
		<p class="concept">
			Track your deployment readiness. Click each item to mark it done.
			<strong>{completedCount}/{checklist.length}</strong> completed.
		</p>
		<div class="progress-bar">
			<div class="progress-fill" style="width: {(completedCount / checklist.length) * 100}%"></div>
		</div>
		<div class="deploy-checklist">
			{#each checklist as item, i}
				<label class="deploy-item" class:checked={item.done}>
					<input type="checkbox" checked={item.done} onchange={() => toggleItem(i)} />
					<span>{item.label}</span>
				</label>
			{/each}
		</div>
	</div>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.table-wrapper {
		overflow-x: auto;
	}
	.adapter-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		min-width: 600px;
	}
	.adapter-table th,
	.adapter-table td {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		text-align: left;
		vertical-align: top;
	}
	.adapter-table th {
		background: var(--color-surface-2);
		font-weight: 600;
	}
	.deploy-checklist {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.deploy-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		cursor: pointer;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		transition: background 0.15s;
	}
	.deploy-item:hover {
		background: var(--color-surface-2);
	}
	.deploy-item.checked span {
		text-decoration: line-through;
		opacity: 0.6;
	}
	.deploy-item input[type="checkbox"] {
		accent-color: var(--color-primary);
	}
	.progress-bar {
		height: 6px;
		background: var(--color-surface-2);
		border-radius: 3px;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		background: #2d8a4e;
		border-radius: 3px;
		transition: width 0.3s;
	}
</style>
