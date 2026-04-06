/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * PE7 Service Worker — offline support and caching.
 *
 * SvelteKit auto-registers this file. The $service-worker module provides:
 * - `build`: hashed JS/CSS files from the build output
 * - `files`: static assets from the static/ directory
 * - `version`: a unique string per deployment for cache busting
 *
 * Strategy:
 * 1. Precache the app shell (build + files) on install
 * 2. Cache-first for precached assets (fast, offline-capable)
 * 3. Network-first for page/API requests (fresh data, offline fallback)
 */

import { build, files, version } from '$service-worker';

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

const CACHE_NAME = `pe7-cache-${version}`;

/** All assets to precache: build output + static files. */
const PRECACHE_ASSETS = [...build, ...files];

// ─── INSTALL: precache the app shell ───────────────────────────────

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(PRECACHE_ASSETS))
			.then(() => sw.skipWaiting())
	);
});

// ─── ACTIVATE: clean up old caches ─────────────────────────────────

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== CACHE_NAME)
						.map((key) => caches.delete(key))
				)
			)
			.then(() => sw.clients.claim())
	);
});

// ─── FETCH: cache-first for assets, network-first for pages ────────

sw.addEventListener('fetch', (event) => {
	const { request } = event;

	// Skip non-GET requests (form submissions, API mutations)
	if (request.method !== 'GET') return;

	const url = new URL(request.url);

	// Skip cross-origin requests
	if (url.origin !== sw.location.origin) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);

			// Cache-first for precached assets (build + static)
			if (PRECACHE_ASSETS.includes(url.pathname)) {
				const cached = await cache.match(request);
				if (cached) return cached;
			}

			// Network-first for pages and API routes
			try {
				const networkResponse = await fetch(request);
				// Cache successful page responses for offline fallback
				if (networkResponse.ok && url.pathname.startsWith('/')) {
					cache.put(request, networkResponse.clone());
				}
				return networkResponse;
			} catch {
				// Offline: return cached version if available
				const cached = await cache.match(request);
				if (cached) return cached;

				// Last resort: return the app shell for navigation requests
				if (request.mode === 'navigate') {
					const shell = await cache.match('/');
					if (shell) return shell;
				}

				return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
			}
		})()
	);
});
