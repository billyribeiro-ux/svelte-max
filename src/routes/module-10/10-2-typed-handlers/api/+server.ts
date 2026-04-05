import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

interface SubmitPayload {
	name: string;
	age: number;
	subscribe: boolean;
}

function isSubmitPayload(v: unknown): v is SubmitPayload {
	if (typeof v !== 'object' || v === null) return false;
	const o = v as Record<string, unknown>;
	return (
		typeof o.name === 'string' &&
		typeof o.age === 'number' &&
		typeof o.subscribe === 'boolean'
	);
}

export const POST: RequestHandler = async ({ request, url }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}
	if (!isSubmitPayload(body)) {
		return json({ error: 'Invalid payload' }, { status: 400 });
	}
	return json({
		echo: body,
		receivedAt: new Date().toISOString(),
		queryParam: url.searchParams.get('debug')
	});
};
