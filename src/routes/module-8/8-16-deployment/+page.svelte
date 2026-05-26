<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface AdapterInfo {
		name: string;
		pkg: string;
		install: string;
		runtime: string;
		strengths: string;
	}

	const adapters: readonly AdapterInfo[] = [
		{
			name: 'adapter-auto',
			pkg: '@sveltejs/adapter-auto',
			install: 'Included by default',
			runtime: 'Detected at deploy time',
			strengths: 'Zero config — detects Vercel, Netlify, Cloudflare automatically'
		},
		{
			name: 'adapter-vercel',
			pkg: '@sveltejs/adapter-vercel',
			install: 'pnpm add -D @sveltejs/adapter-vercel',
			runtime: 'Serverless + Edge functions',
			strengths: 'Preview deploys per PR, ISR, edge middleware, zero config'
		},
		{
			name: 'adapter-netlify',
			pkg: '@sveltejs/adapter-netlify',
			install: 'pnpm add -D @sveltejs/adapter-netlify',
			runtime: 'Netlify Functions + Edge',
			strengths: 'Netlify Forms, Identity, edge functions, split testing'
		},
		{
			name: 'adapter-cloudflare',
			pkg: '@sveltejs/adapter-cloudflare',
			install: 'pnpm add -D @sveltejs/adapter-cloudflare',
			runtime: 'Cloudflare Workers / Pages',
			strengths: 'Edge-first, KV/R2/D1 bindings, global low latency'
		},
		{
			name: 'adapter-node',
			pkg: '@sveltejs/adapter-node',
			install: 'pnpm add -D @sveltejs/adapter-node',
			runtime: 'Standalone Node.js server',
			strengths: 'Full control, Docker/PM2/systemd, any VPS or cloud VM'
		},
		{
			name: 'adapter-static',
			pkg: '@sveltejs/adapter-static',
			install: 'pnpm add -D @sveltejs/adapter-static',
			runtime: 'No server (static files)',
			strengths: 'CDN hosting, GitHub Pages, S3 — cheapest and fastest'
		}
	];

	let selectedAdapter = $state<string>('adapter-vercel');

	const selectedInfo = $derived(adapters.find((a) => a.name === selectedAdapter));

	/* ── Config snippets per adapter ── */
	const configSnippets: Record<string, string> = {
		'adapter-auto': `// svelte.config.js
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
    // adapter-auto detects Vercel, Netlify, Cloudflare
    // at deploy time — no config needed
  }
};

export default config;`,

		'adapter-vercel': `// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Edge functions run at the CDN edge (fast, limited runtime)
      // Serverless functions run in a single region (full Node.js)
      runtime: 'nodejs22.x',

      // ISR: regenerate pages in the background
      isr: {
        expiration: 60 // seconds
      },

      // Split routes into separate functions
      split: true
    })
  }
};

export default config;`,

		'adapter-netlify': `// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Use Netlify Edge Functions (Deno-based, runs at CDN edge)
      edge: false,

      // Split each route into its own function
      split: false
    })
  }
};

export default config;

// netlify.toml
// [build]
//   command = "pnpm build"
//   publish = "build"
//
// [[headers]]
//   for = "/build/*"
//   [headers.values]
//     Cache-Control = "public, max-age=31536000, immutable"`,

		'adapter-cloudflare': `// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Routes configuration
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
};

export default config;

// wrangler.toml
// name = "my-sveltekit-app"
// compatibility_date = "2025-01-01"
// pages_build_output_dir = ".svelte-kit/cloudflare"
//
// [vars]
// PUBLIC_API_URL = "https://api.example.com"
//
// [[kv_namespaces]]
// binding = "MY_KV"
// id = "abc123"`,

		'adapter-node': `// svelte.config.js
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      out: 'build',
      precompress: true,  // generates .gz and .br files
      envPrefix: 'APP_'   // only expose APP_* env vars
    })
  }
};

export default config;

// Run the built server:
// PORT=3000 HOST=0.0.0.0 node build

// Dockerfile:
// FROM node:22-slim
// WORKDIR /app
// COPY build/ ./build/
// COPY package.json ./
// ENV PORT=3000 HOST=0.0.0.0
// EXPOSE 3000
// CMD ["node", "build"]`,

		'adapter-static': `// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',  // or 'index.html' for SPA mode
      precompress: true,
      strict: true
    })
  }
};

export default config;

// In your root +layout.ts:
// export const prerender = true;
//
// For SPA mode (client-side routing only):
// export const ssr = false;
// And set fallback: 'index.html' above`
	};

	const currentSnippet = $derived(configSnippets[selectedAdapter] ?? '');

	/* ── Dockerfile for Node adapter ── */
	const dockerfileCode = `# ── Dockerfile for SvelteKit + adapter-node ──
FROM node:22-slim AS builder
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# ── Production stage ──
FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node", "build"]`;

	/* ── Vercel config example ── */
	const vercelJsonCode = `{
  "framework": "sveltekit",
  "regions": ["iad1"],
  "crons": [
    {
      "path": "/api/revalidate",
      "schedule": "0 * * * *"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}`;

	/* ── Build commands ── */
	const buildCommands = `# Build the production bundle
pnpm build

# Preview the production build locally (catches SSR bugs)
pnpm preview

# Check bundle size
ls -lh .svelte-kit/output/client/_app/immutable/

# Analyze what is in the bundle
# (add to package.json scripts: "analyze": "vite build --mode analyze")
pnpm analyze`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"\timport CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"\n" +
		"\tinterface AdapterInfo {\n" +
		"\t\tname: string;\n" +
		"\t\tpkg: string;\n" +
		"\t\tinstall: string;\n" +
		"\t\truntime: string;\n" +
		"\t\tstrengths: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst adapters: readonly AdapterInfo[] = [\n" +
		"\t\t{ name: 'adapter-auto', pkg: '@sveltejs/adapter-auto', install: 'Included by default', runtime: 'Detected at deploy time', strengths: 'Zero config' },\n" +
		"\t\t{ name: 'adapter-vercel', pkg: '@sveltejs/adapter-vercel', install: 'pnpm add -D @sveltejs/adapter-vercel', runtime: 'Serverless + Edge functions', strengths: 'Preview deploys per PR, ISR, edge middleware' },\n" +
		"\t\t{ name: 'adapter-netlify', pkg: '@sveltejs/adapter-netlify', install: 'pnpm add -D @sveltejs/adapter-netlify', runtime: 'Netlify Functions + Edge', strengths: 'Netlify Forms, Identity, edge functions' },\n" +
		"\t\t{ name: 'adapter-cloudflare', pkg: '@sveltejs/adapter-cloudflare', install: 'pnpm add -D @sveltejs/adapter-cloudflare', runtime: 'Workers / Pages', strengths: 'KV/R2/D1 bindings, global edge' },\n" +
		"\t\t{ name: 'adapter-node', pkg: '@sveltejs/adapter-node', install: 'pnpm add -D @sveltejs/adapter-node', runtime: 'Standalone Node.js', strengths: 'Docker, PM2, full control' },\n" +
		"\t\t{ name: 'adapter-static', pkg: '@sveltejs/adapter-static', install: 'pnpm add -D @sveltejs/adapter-static', runtime: 'No server', strengths: 'CDN, GitHub Pages, cheapest' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet selectedAdapter = $state<string>('adapter-vercel');\n" +
		"\tconst selectedInfo = $derived(adapters.find((a) => a.name === selectedAdapter));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\">\n" +
		"\t\u003ch1\u003e8.16 — Deployment deep dive\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\">\u003cstrong\u003eConcept.\u003c/strong\u003e An adapter is a translator between your SvelteKit app and the server that runs it.\u003c/p\u003e\n" +
		"\t\u003c!-- ...adapter explorer, config snippets, Docker, Vercel JSON, build commands... --\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.16 — Deployment deep dive</h1>

	<p class="concept">
		<strong>Concept.</strong>
		An adapter is a translator between your SvelteKit app and the server that runs it.
		When you run <code>pnpm build</code>, the adapter transforms your application into the
		exact format your hosting platform expects — serverless functions for Vercel, Workers
		scripts for Cloudflare, a standalone Node.js server for Docker, or plain HTML files for
		static hosting. Without an adapter, SvelteKit has no idea how to package your code for
		production.
	</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 1: What adapters are               -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>What adapters are</h2>
	<p class="prose">Every SvelteKit project starts with <code>adapter-auto</code> in <code>svelte.config.js</code>. This auto adapter inspects your deployment environment and picks the right adapter for you — Vercel, Netlify, or Cloudflare — without any configuration. If it cannot detect a platform (for example, on a plain VPS or in Docker), it falls back to a generic Node.js output. For production projects where you control the platform, explicitly installing and configuring the correct adapter removes ambiguity and gives you access to platform-specific features like edge functions, ISR, or KV bindings.</p>

	<p class="prose">Think of the adapter as a build plugin that runs after Vite compiles your code. Your source code stays the same regardless of which adapter you use — the adapter only changes the shape of the output. This means you can switch from Vercel to Cloudflare to a self-hosted Docker container by swapping one line in your config file. The application code, your routes, your load functions, your components — none of that changes.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Adapter explorer                           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Adapter explorer</h2>
	<p class="prose">Select an adapter below to see its configuration, installation command, and deployment notes. The config snippet updates in real time.</p>

	<div class="build">
		<div class="adapter-selector">
			{#each adapters as adapter (adapter.name)}
				<button
					class="adapter-btn"
					class:active={selectedAdapter === adapter.name}
					onclick={() => (selectedAdapter = adapter.name)}
				>
					{adapter.name.replace('adapter-', '')}
				</button>
			{/each}
		</div>

		{#if selectedInfo}
			<div class="adapter-detail">
				<div class="detail-row">
					<span class="detail-label">Package</span>
					<code>{selectedInfo.pkg}</code>
				</div>
				<div class="detail-row">
					<span class="detail-label">Install</span>
					<code>{selectedInfo.install}</code>
				</div>
				<div class="detail-row">
					<span class="detail-label">Runtime</span>
					<span>{selectedInfo.runtime}</span>
				</div>
				<div class="detail-row">
					<span class="detail-label">Strengths</span>
					<span>{selectedInfo.strengths}</span>
				</div>
			</div>
		{/if}

		<pre>{currentSnippet}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 2: Vercel (recommended)            -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Vercel (PE7 recommended for most projects)</h2>
	<p class="prose">Vercel is the simplest path from code to production. Push your SvelteKit project to GitHub, connect the repository in the Vercel dashboard, and every push to <code>main</code> triggers a production deployment. Every pull request gets its own preview URL automatically — no CI/CD configuration required. This preview-per-PR workflow is invaluable for code review because reviewers can click a link and see the changes running live.</p>

	<p class="prose">Under the hood, Vercel splits your SvelteKit routes into individual serverless functions (or edge functions if you configure <code>runtime: 'edge'</code> on specific routes). Edge functions run at CDN edge locations worldwide, giving users sub-50ms response times, but they run in a limited V8 isolate — no filesystem access, no native Node.js APIs. Serverless functions run in a single AWS region with full Node.js support but higher cold-start latency. Most routes should use serverless functions unless latency is critical and the route does not need Node.js APIs.</p>

	<p class="prose">ISR (Incremental Static Regeneration) is Vercel's middle ground between SSR and SSG. A page is rendered once, cached at the edge, and served as a static page. After the <code>expiration</code> period (in seconds), the next request triggers a background re-render. Users always see cached content — they never wait for the re-render. Configure ISR in the adapter options or per-route via <code>export const config</code> in your <code>+page.server.ts</code>.</p>

	<p class="prose">Environment variables are set in the Vercel dashboard under Project Settings. Variables can be scoped to Production, Preview, or Development environments. Secrets are encrypted at rest and injected at runtime — never commit them to your repository.</p>

	<div class="build">
		<h3>vercel.json (optional custom config)</h3>
		<pre>{vercelJsonCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 3: Netlify                         -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Netlify</h2>
	<p class="prose">Netlify's adapter works similarly to Vercel's zero-config approach. Install <code>@sveltejs/adapter-netlify</code>, push to GitHub, and Netlify builds automatically. Netlify Functions (AWS Lambda under the hood) handle your server routes, and Netlify Edge Functions (Deno-based, similar to Cloudflare Workers) handle edge-deployed routes. The <code>edge: true</code> option in the adapter config opts all server routes into edge deployment.</p>

	<p class="prose">Netlify provides several platform features that integrate well with SvelteKit: <strong>Forms</strong> (add a <code>netlify</code> attribute to any HTML form for serverless form handling), <strong>Identity</strong> (authentication without a backend), and <strong>Split Testing</strong> (A/B test different branches). Configure build settings in <code>netlify.toml</code> at the project root. Set <code>publish = "build"</code> and <code>command = "pnpm build"</code>.</p>

	<p class="prose">One significant difference from Vercel: Netlify Functions have a default timeout of 10 seconds (26 seconds on Pro plans). If your server load functions hit external APIs that are slow, you may need to optimize those calls or use background functions for long-running tasks. Edge Functions have no cold start but run in a Deno-based runtime, so Node.js-specific packages may not work. Test thoroughly when switching between Functions and Edge Functions.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 4: Cloudflare                      -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Cloudflare</h2>
	<p class="prose">Cloudflare Pages with <code>adapter-cloudflare</code> deploys your SvelteKit app to Cloudflare's global edge network. Every request is handled by a Worker running in a V8 isolate at the nearest data center — there is no cold start because Workers use isolates, not containers. This gives you consistently low latency worldwide, but the runtime is not Node.js: you cannot use <code>fs</code>, <code>child_process</code>, or other Node.js built-in modules.</p>

	<p class="prose">The real power of Cloudflare is platform bindings. Through the <code>platform</code> object in your server load functions and API routes, you get access to <strong>KV</strong> (globally replicated key-value store), <strong>R2</strong> (S3-compatible object storage with zero egress fees), <strong>D1</strong> (SQLite at the edge), and <strong>Durable Objects</strong> (stateful edge compute). These bindings are configured in <code>wrangler.toml</code> and accessed via <code>platform.env</code> in your SvelteKit handlers.</p>

	<p class="prose">Use <code>wrangler pages dev</code> for local development with platform bindings, and <code>wrangler pages deploy</code> to ship. Cloudflare also supports preview deployments for every PR when connected to GitHub.</p>

	<p class="prose">An important constraint: Cloudflare Workers run in a V8 isolate, not a full Node.js process. This means no access to the <code>fs</code> module, no <code>child_process</code>, no native Node.js addons. Libraries that rely on these APIs (like <code>sharp</code> for image processing or <code>bcrypt</code> for password hashing) will not work. Use Cloudflare-compatible alternatives: the Workers runtime has built-in <code>crypto</code> for hashing, and R2 handles file storage. Check your dependencies before committing to the Cloudflare adapter.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 5: Node.js (self-hosted)           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Node.js (self-hosted)</h2>
	<p class="prose"><code>adapter-node</code> builds your SvelteKit app into a standalone Node.js server that you can run anywhere: a VPS, a Docker container, a Kubernetes pod, or a bare-metal server. The output is a <code>build/</code> directory containing a <code>index.js</code> entry point. Run it with <code>node build</code> and it starts an HTTP server on the port specified by the <code>PORT</code> environment variable (default 3000).</p>

	<p class="prose">For production, never run Node directly — use a process manager. <strong>PM2</strong> provides automatic restarts, log management, and cluster mode (spawning one process per CPU core). <strong>systemd</strong> integrates with Linux's init system for automatic start on boot and watchdog monitoring. For containerized deployments, Docker is the standard. Use a multi-stage build to keep the image small: build in a Node image, then copy only the <code>build/</code> directory to a slim runtime image.</p>

	<p class="prose">Set <code>precompress: true</code> in the adapter config to pre-generate <code>.gz</code> and <code>.br</code> (Brotli) compressed files at build time. The built-in server will serve these compressed files automatically when the client supports them, saving CPU at runtime. The <code>envPrefix</code> option controls which environment variables the server reads — set it to limit exposure.</p>

	<div class="build">
		<h3>Dockerfile for SvelteKit</h3>
		<pre>{dockerfileCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 6: Static site generation           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Static site generation</h2>
	<p class="prose"><code>adapter-static</code> pre-renders every page to HTML at build time. There is no server at runtime — the output is a directory of HTML, CSS, and JavaScript files that you upload to any static hosting provider (GitHub Pages, Netlify, S3 + CloudFront, Cloudflare Pages). This is the cheapest and fastest deployment option because every response is a cached file served from a CDN.</p>

	<p class="prose">To use adapter-static, every route must be prerenderable. Add <code>export const prerender = true</code> to your root <code>+layout.ts</code> to prerender the entire site. Routes with server load functions (<code>+page.server.ts</code>) that read cookies, headers, or other per-request data cannot be prerendered — the build will fail for those routes. If you need a few dynamic routes, use a different adapter.</p>

	<p class="prose"><strong>SPA mode</strong> is a variant of static generation. Set <code>export const ssr = false</code> in your root layout and configure <code>fallback: 'index.html'</code> (or <code>'200.html'</code>) in the adapter options. This generates a single HTML shell that loads your entire app client-side. Every URL serves the same HTML file, and client-side routing handles navigation. SPA mode is ideal for auth-gated dashboards where SEO is irrelevant, but it sacrifices first-paint speed and search visibility.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 7: Build & preview                 -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Build and preview</h2>
	<p class="prose">The build-and-preview cycle is the final gate before deployment. <code>pnpm build</code> runs Vite's production build, then passes the output through your adapter. <code>pnpm preview</code> starts a local server that serves the production build exactly as it would run in production — including SSR, server routes, and environment variable handling. Always preview before deploying to catch SSR-only bugs, missing environment variables, and adapter-specific issues that do not appear during development.</p>

	<div class="build">
		<h3>Build commands</h3>
		<pre>{buildCommands}</pre>
	</div>

	<p class="prose">Bundle size directly affects your Core Web Vitals. After building, inspect the <code>.svelte-kit/output/client/_app/immutable/</code> directory to see what ships to the browser. SvelteKit automatically code-splits by route, so each page only loads the JavaScript it needs. If a single chunk is unexpectedly large, investigate what dependency is being pulled in — common culprits are icon libraries, date libraries, and charting libraries that do not tree-shake well.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Environment variables in production        -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Environment variables in production</h2>
	<p class="prose">SvelteKit provides four modules for environment variables: <code>$env/static/private</code> and <code>$env/static/public</code> for build-time values (inlined into the bundle), and <code>$env/dynamic/private</code> and <code>$env/dynamic/public</code> for runtime values (read from the process environment on each request). Public variables must be prefixed with <code>PUBLIC_</code> — SvelteKit enforces this at the compiler level to prevent accidental secret leakage.</p>

	<p class="prose">In development, SvelteKit reads from <code>.env</code>, <code>.env.local</code>, <code>.env.development</code>, and <code>.env.development.local</code> files. In production, <code>.env</code> files are never deployed (they are gitignored). You must set environment variables through your platform's dashboard or CLI: <code>vercel env add</code>, Netlify's deploy settings, <code>wrangler secret put</code> for Cloudflare, or Docker's <code>-e</code> flag. This is the single most common deployment failure: the app works locally because <code>.env</code> exists, then crashes in production because the variables are undefined.</p>

	<p class="prose">Use <code>$env/static/private</code> when the value never changes between deployments (API keys, database URLs). These are inlined at build time, so changing them requires a rebuild. Use <code>$env/dynamic/private</code> when the value might change without redeploying (feature flags, runtime configuration). On serverless platforms, dynamic variables are read on every cold start. On Node.js servers, they are read when the process starts.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- CI/CD pipeline                             -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>CI/CD pipeline</h2>
	<p class="prose">A production deployment pipeline has three stages: <strong>check</strong> (type-check, lint, format), <strong>test</strong> (unit tests, integration tests), and <strong>deploy</strong> (build and ship). On Vercel and Netlify, the deploy stage is handled automatically — every push triggers a build. But the check and test stages are your responsibility. GitHub Actions is the standard CI tool for SvelteKit projects.</p>

	<p class="prose">A minimal GitHub Actions workflow runs <code>pnpm install</code>, <code>pnpm check</code> (Svelte and TypeScript checks), <code>pnpm lint</code> (ESLint), and <code>pnpm test</code> (Vitest) on every pull request. If any step fails, the PR is blocked from merging. This prevents broken code from reaching production. The workflow file lives at <code>.github/workflows/ci.yml</code> and runs on Ubuntu with the Node.js version matching your production runtime.</p>

	<p class="prose">For self-hosted deployments (adapter-node + Docker), add a <strong>build and push</strong> step that creates a Docker image and pushes it to a container registry (GitHub Container Registry, Docker Hub, or AWS ECR). Then a <strong>deploy</strong> step pulls the new image on your server and restarts the container. Tools like <code>docker compose</code> with health checks and rolling updates ensure zero-downtime deployments.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Production checklist                       -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Production readiness checklist</h2>
	<p class="prose">Before your first production deployment, verify each of these items. Missing any one of them is a common source of production incidents.</p>

	<div class="build">
		<ul class="checklist-items">
			<li><strong>Adapter configured</strong> — the correct adapter is installed and configured in <code>svelte.config.js</code> for your target platform. Do not rely on <code>adapter-auto</code> for production.</li>
			<li><strong>Environment variables set</strong> — every variable your app reads from <code>$env</code> is configured in your hosting platform's dashboard. Check both private and public variables.</li>
			<li><strong>Build succeeds</strong> — <code>pnpm build</code> completes without errors. Fix all TypeScript errors and Svelte warnings before deploying.</li>
			<li><strong>Preview tested</strong> — <code>pnpm preview</code> runs the production build locally. Test critical user flows: login, data loading, form submissions, error pages.</li>
			<li><strong>HTTPS enabled</strong> — all traffic is encrypted. Vercel, Netlify, and Cloudflare provide HTTPS automatically. For self-hosted Node.js, use a reverse proxy (Nginx, Caddy) with Let's Encrypt certificates.</li>
			<li><strong>Error monitoring connected</strong> — Sentry or an equivalent service captures both server and client errors with source maps.</li>
			<li><strong>Security headers configured</strong> — CSP, X-Content-Type-Options, X-Frame-Options, and Strict-Transport-Security headers are set via your platform config or the <code>handle</code> hook.</li>
			<li><strong>robots.txt and sitemap</strong> — search engines can discover and index your pages correctly.</li>
			<li><strong>Core Web Vitals passing</strong> — Lighthouse scores are green for Performance, Accessibility, Best Practices, and SEO.</li>
			<li><strong>CI pipeline running</strong> — type checks, linting, and tests run automatically on every pull request.</li>
		</ul>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Adapter comparison table                   -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Adapter comparison</h2>
	<div class="build">
		<div class="table-wrapper">
			<table class="adapter-table">
				<thead>
					<tr>
						<th>Adapter</th>
						<th>Runtime</th>
						<th>Strengths</th>
					</tr>
				</thead>
				<tbody>
					{#each adapters as adapter (adapter.name)}
						<tr class:highlight={adapter.name === selectedAdapter}>
							<td><strong>{adapter.name}</strong></td>
							<td>{adapter.runtime}</td>
							<td>{adapter.strengths}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Break it on purpose                        -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment exposes a real deployment pitfall. Try each one, observe the failure, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Deploy with <code>adapter-auto</code> but no platform detected (for example, on a plain VPS without Vercel/Netlify/Cloudflare).</strong> The adapter falls back to a generic Node.js output. This works, but you miss platform-specific optimizations like edge functions, ISR, and CDN caching headers. The lesson: <code>adapter-auto</code> is convenient for development, but for production you should explicitly install the adapter that matches your platform to unlock all its features.</li>
		<li><strong>Use <code>$env/dynamic/private</code> inside a component or <code>+page.ts</code> (universal load) with <code>adapter-static</code>.</strong> The build fails because <code>adapter-static</code> pre-renders everything at build time and produces no server — there is no runtime to read environment variables from. Dynamic private env vars require a running server. With adapter-static, you can only use <code>$env/static/public</code> (inlined at build time). This demonstrates the fundamental constraint: static sites have no server at runtime.</li>
		<li><strong>Forget to set environment variables in your production dashboard (Vercel, Netlify, or Cloudflare) after deploying.</strong> Your app builds successfully because the variables exist in your local <code>.env</code> file, but the production deployment crashes or behaves incorrectly because the variables are <code>undefined</code>. The <code>.env</code> file is never deployed — it is gitignored. Every environment variable your app needs must be explicitly configured in your hosting provider's dashboard or CI/CD pipeline.</li>
		<li><strong>Import a server-only module (like <code>$env/static/private</code> or a database client) in a <code>+page.svelte</code> component or <code>+page.ts</code> file.</strong> The build immediately fails with a clear error: <em>"Cannot import $env/static/private into client-side code."</em> SvelteKit enforces a strict boundary between server and client code. Server-only imports can only appear in <code>+page.server.ts</code>, <code>+server.ts</code>, <code>hooks.server.ts</code>, or any file ending in <code>.server.ts</code>. This compile-time check prevents secrets from leaking to the browser.</li>
	</ol>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Having issues?                             -->
	<!-- ═══════════════════════════════════════════ -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- ═══════════════════════════════════════════ -->
	<!-- What you learned                           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>What you learned</h2>
	<p class="prose">SvelteKit adapters are the bridge between your application and your deployment target. Each adapter transforms the build output into the format a specific platform expects: serverless functions for Vercel, Workers scripts for Cloudflare, a standalone Node.js HTTP server for Docker or VPS hosting, or plain HTML files for static CDN hosting. The adapter you choose determines which features are available at runtime — edge functions, platform bindings, ISR — but your application code remains the same regardless. Switching adapters is a one-line config change.</p>
	<p class="prose">Vercel is the recommended starting point for most SvelteKit projects because it requires zero configuration: push to GitHub and your app is live. Every pull request gets a unique preview URL, making code review effortless. For teams that need edge compute with platform bindings (KV storage, databases, object storage), Cloudflare Workers is the best choice. For teams that need full control over the server — running behind a corporate firewall, on custom hardware, or with specific compliance requirements — <code>adapter-node</code> with Docker gives you that freedom. For blogs, documentation sites, and marketing pages that rarely change, <code>adapter-static</code> is the cheapest and fastest option.</p>
	<p class="prose">The build-and-preview cycle is non-negotiable before every deployment. <code>pnpm build</code> compiles your application and runs the adapter, while <code>pnpm preview</code> serves the production build locally so you can verify that SSR works, environment variables are present, and the bundle size is acceptable. Skipping the preview step is the most common cause of broken production deployments — bugs that only manifest in production mode (missing env vars, SSR-only errors, server-client module boundaries) are invisible during <code>pnpm dev</code>.</p>
	<p class="next"><strong>Next:</strong> Head to the Module 8 project to deploy a real SvelteKit app to production.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 { font-size: var(--text-xl); margin: 0; }
	h2 { font-size: var(--text-lg); margin: 0; margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text-muted); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; word-wrap: break-word; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── Adapter selector ── */
	.adapter-selector {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
	.adapter-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: all 0.15s;
	}
	.adapter-btn:hover {
		background: var(--color-surface);
		color: var(--color-text);
	}
	.adapter-btn.active {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.adapter-detail {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}
	.detail-row {
		display: flex;
		gap: var(--space-sm);
		align-items: baseline;
		font-size: var(--text-sm);
	}
	.detail-label {
		min-inline-size: 6rem;
		font-weight: 600;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: var(--text-xs);
	}

	/* ── Table ── */
	.table-wrapper { overflow-x: auto; }
	.adapter-table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		min-inline-size: 500px;
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
	.adapter-table tr.highlight {
		background: oklch(0.95 0.02 var(--hue-brand, 250));
	}

	/* ── Checklist ── */
	.checklist-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.checklist-items li {
		padding: var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-text-muted);
	}
	.checklist-items li strong {
		color: var(--color-text);
	}
	.checklist-items li code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		background: var(--color-surface);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
