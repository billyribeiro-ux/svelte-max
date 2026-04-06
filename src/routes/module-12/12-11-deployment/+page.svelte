<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Adapter = {\n" +
		"		platform: string;\n" +
		"		adapter: string;\n" +
		"		install: string;\n" +
		"		notes: string;\n" +
		"	};\n" +
		"\n" +
		"	const adapters: Adapter[] = [\n" +
		"		{ platform: 'Auto-detect', adapter: 'adapter-auto', install: '@sveltejs/adapter-auto', notes: 'Detects deployment platform automatically. Default in new projects.' },\n" +
		"		{ platform: 'Node.js server', adapter: 'adapter-node', install: '@sveltejs/adapter-node', notes: 'Builds a standalone Node server. Good for Docker, VPS, Railway.' },\n" +
		"		{ platform: 'Vercel', adapter: 'adapter-vercel', install: '@sveltejs/adapter-vercel', notes: 'Optimized for Vercel edge/serverless functions. Zero-config.' },\n" +
		"		{ platform: 'Cloudflare', adapter: 'adapter-cloudflare', install: '@sveltejs/adapter-cloudflare', notes: 'Runs on Cloudflare Workers/Pages. Edge runtime.' },\n" +
		"		{ platform: 'Static hosting', adapter: 'adapter-static', install: '@sveltejs/adapter-static', notes: 'Pre-renders all pages to HTML. No server needed. Good for GitHub Pages, S3.' }\n" +
		"	];\n" +
		"\n" +
		"	type CheckItem = {\n" +
		"		label: string;\n" +
		"		done: boolean;\n" +
		"	};\n" +
		"\n" +
		"	let checklist = $state\u003cCheckItem[]\u003e([\n" +
		"		{ label: 'Choose the correct adapter for your platform', done: false },\n" +
		"		{ label: 'Set environment variables in production (not .env)', done: false },\n" +
		"		{ label: 'Run npm run build and verify output', done: false },\n" +
		"		{ label: 'Test the production build locally with npm run preview', done: false },\n" +
		"		{ label: 'Enable HTTPS in production', done: false },\n" +
		"		{ label: 'Configure CSP headers', done: false },\n" +
		"		{ label: 'Set up error monitoring (Sentry, LogRocket)', done: false },\n" +
		"		{ label: 'Verify Core Web Vitals with Lighthouse', done: false },\n" +
		"		{ label: 'Set up CI/CD pipeline (GitHub Actions, etc.)', done: false },\n" +
		"		{ label: 'Configure caching headers for static assets', done: false },\n" +
		"		{ label: 'Add robots.txt and sitemap.xml', done: false },\n" +
		"		{ label: 'Test on multiple browsers and devices', done: false }\n" +
		"	]);\n" +
		"\n" +
		"	function toggleItem(index: number) {\n" +
		"		checklist[index].done = !checklist[index].done;\n" +
		"	}\n" +
		"\n" +
		"	const completedCount = $derived(checklist.filter((item) =\u003e item.done).length);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.11 — Deployment\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		SvelteKit uses \u003cstrong\u003eadapters\u003c/strong\u003e to transform your app for different deployment targets.\n" +
		"		The adapter runs at build time and produces output optimized for your platform — whether that is\n" +
		"		a Node.js server, a serverless function, or a static site.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eAdapter Decision Table\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"table-wrapper\"\u003e\n" +
		"			\u003ctable class=\"adapter-table\"\u003e\n" +
		"				\u003cthead\u003e\n" +
		"					\u003ctr\u003e\n" +
		"						\u003cth\u003ePlatform\u003c/th\u003e\n" +
		"						\u003cth\u003eAdapter\u003c/th\u003e\n" +
		"						\u003cth\u003enpm install\u003c/th\u003e\n" +
		"						\u003cth\u003eNotes\u003c/th\u003e\n" +
		"					\u003c/tr\u003e\n" +
		"				\u003c/thead\u003e\n" +
		"				\u003ctbody\u003e\n" +
		"					{#each adapters as adapter}\n" +
		"						\u003ctr\u003e\n" +
		"							\u003ctd\u003e\u003cstrong\u003e{adapter.platform}\u003c/strong\u003e\u003c/td\u003e\n" +
		"							\u003ctd\u003e\u003ccode\u003e{adapter.adapter}\u003c/code\u003e\u003c/td\u003e\n" +
		"							\u003ctd\u003e\u003ccode\u003e{adapter.install}\u003c/code\u003e\u003c/td\u003e\n" +
		"							\u003ctd\u003e{adapter.notes}\u003c/td\u003e\n" +
		"						\u003c/tr\u003e\n" +
		"					{/each}\n" +
		"				\u003c/tbody\u003e\n" +
		"			\u003c/table\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eAdapter Configuration\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e{`// svelte.config.js\n" +
		"import adapter from '@sveltejs/adapter-node';\n" +
		"// or: import adapter from '@sveltejs/adapter-vercel';\n" +
		"// or: import adapter from '@sveltejs/adapter-static';\n" +
		"\n" +
		"/** @type {import('@sveltejs/kit').Config} */\n" +
		"const config = {\n" +
		"  kit: {\n" +
		"    adapter: adapter({\n" +
		"      // adapter-node options:\n" +
		"      out: 'build',\n" +
		"      precompress: true,\n" +
		"      envPrefix: 'APP_'\n" +
		"    })\n" +
		"  }\n" +
		"};\n" +
		"\n" +
		"export default config;`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eEnvironment Variables\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the adapter from <code>svelte.config.js</code> and run <code>pnpm build</code>.</strong> The build fails because SvelteKit does not know how to package the output without an adapter telling it the target platform.</li>
		<li><strong>Use <code>adapter-static</code> on a project with server-side <code>load</code> functions.</strong> The build fails for any route that has <code>+page.server.ts</code> because static adapters cannot run server code at request time.</li>
		<li><strong>Skip <code>pnpm preview</code> and deploy directly after <code>pnpm build</code>.</strong> You miss SSR-only bugs, missing environment variables, and runtime errors that only appear in the production build, leading to broken deployments.</li>
		<li><strong>Set an environment variable without the <code>PUBLIC_</code> prefix and try to read it on the client.</strong> SvelteKit refuses to expose it, so the variable is <code>undefined</code> in the browser, causing client-side features to break.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit adapters are the bridge between your application and the deployment target. Each adapter transforms the build output for a specific platform: <code>adapter-node</code> for traditional Node.js servers, <code>adapter-vercel</code> and <code>adapter-cloudflare</code> for serverless platforms, and <code>adapter-static</code> for static hosting. The adapter you choose determines what features are available at runtime.</p>
	<p class="prose">Environment variables in production use the same <code>$env</code> module system as development. Private variables from <code>$env/static/private</code> are inlined at build time and never reach the client, while public variables must be prefixed with <code>PUBLIC_</code> to be accessible in browser code. This compile-time enforcement prevents accidental secret leakage.</p>
	<p class="prose">Always run <code>pnpm preview</code> to test the production build locally before deploying. The preview server runs the exact same code that will be deployed, so it catches SSR errors, missing environment variables, and adapter-specific issues that do not appear during development.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-12-service-worker">12.12 — Service workers</a> — add offline support and caching strategies.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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

	/* === RESPONSIVE BREAKPOINTS === */
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
