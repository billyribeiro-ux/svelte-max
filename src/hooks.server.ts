/**
 * PE7 Server Hooks — runs on EVERY request.
 *
 * This is the middleware layer of SvelteKit. Every request passes through
 * handle() before reaching a route. Use it for logging, auth, headers,
 * and error tracking. Compose multiple hooks with sequence().
 */
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Logging hook — logs method, pathname, and duration for every request.
 */
const logger: Handle = async ({ event, resolve }) => {
	const start = performance.now();
	const response = await resolve(event);
	const duration = Math.round(performance.now() - start);

	console.log(
		`[${new Date().toISOString()}] ${event.request.method} ${event.url.pathname} → ${response.status} (${duration}ms)`
	);

	return response;
};

/**
 * Custom headers hook — adds PE7 version and security headers.
 */
const headers: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-PE7-Version', '1.0.0');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};

/**
 * Compose hooks with sequence() — they run in order, each wrapping the next.
 * Add more hooks here: auth, rate limiting, locale detection, etc.
 */
export const handle: Handle = sequence(logger, headers);

/**
 * Server error handler — catches unhandled errors in load(), actions, and endpoints.
 * In production, send these to your error tracking service (Sentry, Axiom, etc.).
 */
export const handleError: HandleServerError = ({ error, event, status, message }) => {
	console.error(`[ERROR ${status}] ${event.url.pathname}:`, error);

	return {
		message: message ?? 'An unexpected error occurred',
		code: status.toString()
	};
};
