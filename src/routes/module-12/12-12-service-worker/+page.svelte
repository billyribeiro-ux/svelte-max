<script lang="ts">
	type LifecycleStep = {
		name: string;
		description: string;
	};

	const lifecycle: LifecycleStep[] = [
		{ name: 'Register', description: 'SvelteKit auto-registers src/service-worker.js when the file exists.' },
		{ name: 'Install', description: 'The browser downloads and installs the service worker. Precache static assets here.' },
		{ name: 'Activate', description: 'The new service worker takes control. Clean up old caches here.' },
		{ name: 'Fetch', description: 'The service worker intercepts network requests. Apply caching strategies here.' },
		{ name: 'Update', description: 'When the SW file changes, the browser installs the new version alongside the old one.' }
	];
</script>

<section class="page">
	<h1>12.12 — Service Workers</h1>

	<p class="concept">
		SvelteKit automatically registers a service worker if you create a
		<code>src/service-worker.js</code> (or <code>.ts</code>) file. The
		<strong><code>$service-worker</code></strong> module gives you access to <code>build</code>
		(compiled app files), <code>files</code> (static assets), and <code>version</code>
		(a unique build identifier) for building caching strategies.
	</p>

	<h3>Service Worker Lifecycle</h3>
	<div class="build">
		<div class="lifecycle">
			{#each lifecycle as step, i}
				<div class="lifecycle-step">
					<div class="step-num">{i + 1}</div>
					<div class="step-content">
						<strong>{step.name}</strong>
						<p>{step.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<h3>$service-worker Module</h3>
	<div class="build">
		<ul>
			<li><strong><code>build</code></strong> — array of URLs for the compiled app (JS, CSS chunks)</li>
			<li><strong><code>files</code></strong> — array of URLs for files in <code>static/</code> directory</li>
			<li><strong><code>version</code></strong> — unique string that changes on every build (use as cache key)</li>
			<li><strong><code>prerendered</code></strong> — array of pre-rendered page URLs</li>
			<li><strong><code>base</code></strong> — the app's base path</li>
		</ul>
	</div>

	<h3>Cache-First for App Shell</h3>
	<div class="build">
		<p class="concept">
			The app shell (compiled JS, CSS, static images) rarely changes between deploys.
			Use a <strong>cache-first</strong> strategy: serve from cache, falling back to network.
			The <code>version</code> string ensures old caches are cleaned up on deploy.
		</p>
		<pre>{`// src/service-worker.js
/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = \`cache-\${version}\`;
const ASSETS = [...build, ...files];

// Install: precache all app assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      for (const key of keys) {
        if (key !== CACHE) await caches.delete(key);
      }
    })
  );
});

// Fetch: cache-first for app shell
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first for known assets
  if (ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
    return;
  }

  // Network-first for everything else (API calls, pages)
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});`}</pre>
	</div>

	<h3>Network-First for API Calls</h3>
	<div class="build">
		<p class="concept">
			For API endpoints and dynamic pages, use <strong>network-first</strong>: try the network,
			cache the response, and fall back to cache when offline. This ensures users always get
			fresh data when connected but can still use the app offline.
		</p>
		<pre>{`// Pattern: network-first with fallback
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only apply to API routes
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((c) => c.put(event.request, clone));
          }
          return response;
        })
        .catch(async () => {
          // Offline: return cached version
          const cached = await caches.match(event.request);
          if (cached) return cached;
          // No cache: return error JSON
          return new Response(
            JSON.stringify({ error: 'Offline' }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
  }
});`}</pre>
	</div>

	<h3>Offline Fallback Page</h3>
	<div class="build">
		<p class="concept">
			For navigation requests that fail (user is offline and page is not cached), you can
			serve a pre-cached offline fallback page.
		</p>
		<pre>{`// During install, cache the offline page
const OFFLINE_PAGE = '/offline';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([...ASSETS, OFFLINE_PAGE]);
    })
  );
});

// During fetch, serve fallback for navigation
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cached = await caches.match(event.request);
        return cached || caches.match(OFFLINE_PAGE);
      })
    );
  }
});`}</pre>
	</div>

	<h3>Important Notes</h3>
	<ul>
		<li><strong>Do not create <code>src/service-worker.js</code> unless you need offline support</strong> — it adds complexity</li>
		<li><strong>Service workers only work over HTTPS</strong> (except localhost for development)</li>
		<li><strong>Use <code>version</code> for cache busting</strong> — ensures users get new assets on deploy</li>
		<li><strong>Test with Chrome DevTools</strong> — Application tab shows SW status, cache contents</li>
		<li><strong>Be careful with caching HTML</strong> — stale HTML can break your app after a deploy</li>
	</ul>
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

	.lifecycle {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.lifecycle-step {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
	}
	.step-num {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--color-primary);
		color: white;
		border-radius: 50%;
		font-weight: 700;
		font-size: var(--text-sm);
		flex-shrink: 0;
	}
	.step-content {
		flex: 1;
	}
	.step-content strong {
		color: var(--color-text);
	}
	.step-content p {
		margin: var(--space-xs) 0 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.5;
	}
</style>
