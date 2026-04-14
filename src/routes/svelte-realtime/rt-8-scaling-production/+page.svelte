<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const rateLimiting = `// Rate limiting: per-function and global
// src/live/chat.ts
${"import"} { live } from 'svelte-realtime/server';

// Per-function rate limit
export const sendMessage = live(async (ctx, text) => {
  const msg = await db.messages.insert({ userId: ctx.user.id, text });
  ctx.publish('messages', 'created', msg);
  return msg;
}, {
  rateLimit: {
    max: 10,         // max 10 calls
    window: '1m',    // per 1 minute
    by: 'user'       // per user (default)
  }
});

// Global rate limiting with Redis
// In hooks.ws.ts:
${"import"} { rateLimit } from 'svelte-realtime/server';
${"import"} Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const middleware = [
  rateLimit({ redis, max: 100, window: '1m' })
];`;

	const redisScaling = `// Redis multi-instance: horizontal scaling
// When running multiple server instances behind a load balancer,
// pub/sub events need to reach ALL instances.
//
// Single instance:
//   Client A ─→ Server 1 ─→ publish('chat', 'created', msg)
//                            ↓
//   Client B ←─ Server 1 ←─ (same instance, direct delivery)
//
// Multi-instance:
//   Client A ─→ Server 1 ─→ publish('chat', 'created', msg)
//                            ↓ Redis Pub/Sub
//   Client B ←─ Server 2 ←─ (different instance, needs Redis)

// Configuration:
${"import"} { redis } from 'svelte-realtime/server';
${"import"} Redis from 'ioredis';

redis({
  pub: new Redis(process.env.REDIS_URL),
  sub: new Redis(process.env.REDIS_URL)
});`;

	const productionLimits = `// Production limits and defaults:
//
// maxPayloadLength:  16 KB    (per WebSocket message)
// maxBackpressure:   1 MB     (send buffer per connection)
// Client send queue: 1000     (max queued messages while offline)
// Batch size:        50       (max events per batch)
// Presence refs:     10,000   (max tracked users per topic)
// Rate-limit keys:   5,000    (max tracked identities)
// Topic length:      256 chars (max topic string length)
//
// Exceeding these limits:
// - maxPayloadLength → message rejected, client error
// - maxBackpressure → connection dropped (slow consumer)
// - send queue → oldest messages dropped
// - batch size → batch split into chunks`;

	const cronScheduling = `// Cron: scheduled server-side tasks
${"import"} { live } from 'svelte-realtime/server';

export const dailyCleanup = live.cron('0 3 * * *', async (ctx) => {
  // Runs at 3am daily
  const deleted = await db.sessions.deleteExpired();
  ctx.publish('admin:log', 'set', {
    type: 'cleanup',
    deleted: deleted.count,
    timestamp: Date.now()
  });
});

export const heartbeat = live.cron('*/30 * * * * *', async (ctx) => {
  // Runs every 30 seconds
  ctx.publish('health', 'set', {
    uptime: process.uptime(),
    connections: ctx.platform.connectionCount,
    memory: process.memoryUsage().heapUsed
  });
});`;

	const errorReporting = `// Error reporting
${"import"} { onError } from 'svelte-realtime/server';

onError((error, ctx) => {
  // Terminal close codes (connection will not retry):
  // 1008: Policy violation
  // 1011: Internal error
  // 4000-4999: Application-defined terminal codes

  console.error('[svelte-realtime]', {
    code: error.code,
    message: error.message,
    function: error.functionName,
    user: ctx?.user?.id,
    topic: error.topic
  });

  // Send to error tracking service
  sentry.captureException(error, { user: ctx?.user });
});`;

	const fullCode =
		"<script lang=\"ts\">\n  // Scaling & production\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.8 — Scaling & Production</h1></section>";
</script>

<section class="page">
	<h1>RT.8 — Scaling & Production</h1>
	<p class="concept">
		<strong>Concept.</strong> Production realtime systems need rate limiting, horizontal scaling via
		Redis pub/sub, error reporting, and awareness of connection limits. svelte-realtime provides
		per-function and global rate limiting, Redis-backed multi-instance pub/sub, cron scheduling for
		server-side tasks, and structured error reporting. Understanding the default limits
		(16KB payload, 1MB backpressure, 1000-message queue) prevents production surprises.
	</p>

	<div class="build">
		<h3 class="section-title">Rate limiting</h3>
		<pre class="code-block"><code>{rateLimiting}</code></pre>

		<h3 class="section-title">Redis multi-instance scaling</h3>
		<pre class="code-block"><code>{redisScaling}</code></pre>

		<h3 class="section-title">Production limits</h3>
		<pre class="code-block"><code>{productionLimits}</code></pre>

		<h3 class="section-title">Cron scheduling</h3>
		<pre class="code-block"><code>{cronScheduling}</code></pre>

		<h3 class="section-title">Error reporting</h3>
		<pre class="code-block"><code>{errorReporting}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Deploy two instances without Redis pub/sub.</strong> Client A on Instance 1 publishes an event. Client B on Instance 2 never receives it. Without Redis, each instance is an isolated pub/sub island. Multi-instance requires Redis.</li>
		<li><strong>Send a message larger than <code>maxPayloadLength</code> (16KB).</strong> The WebSocket server rejects the frame. The client receives a close event with code 1009 (message too big). For large payloads, use HTTP upload + WebSocket notification.</li>
		<li><strong>Publish 1000 events per second to a stream with 10,000 subscribers.</strong> That's 10M messages/second fan-out. Even uWebSockets.js can't handle that. Use server-side batching (<code>ctx.batch()</code>) to group events, or use a derived stream that aggregates before fan-out.</li>
		<li><strong>Use the same Redis instance for <code>pub</code> and <code>sub</code>.</strong> Redis requires separate connections for publish and subscribe. Using the same instance object works initially but hangs when subscribe starts blocking. Always create two separate <code>Redis</code> instances.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Production realtime is about limits and scaling strategies. Rate limiting protects the server from abusive clients. Redis pub/sub enables horizontal scaling across multiple instances. Cron scheduling handles periodic server tasks without external services. Error reporting with <code>onError</code> captures structured errors with context (function name, user, topic) for debugging. The default limits (16KB payload, 1MB backpressure, 1000-message queue) are tuned for typical web applications — exceeding them requires architectural changes, not configuration tweaks.</p>
	<p class="next">Next: <a href="/svelte-realtime/project">svelte-realtime — Module Project</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
