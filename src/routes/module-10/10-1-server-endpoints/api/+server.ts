import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

interface Item {
	id: number;
	name: string;
}

const items: Item[] = [
	{ id: 1, name: 'First item' },
	{ id: 2, name: 'Second item' }
];

export const GET: RequestHandler = () => json({ items });

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}
	if (
		typeof body !== 'object' ||
		body === null ||
		typeof (body as { name?: unknown }).name !== 'string' ||
		!(body as { name: string }).name.trim()
	) {
		return json({ error: 'name is required' }, { status: 400 });
	}
	const item: Item = { id: Date.now(), name: (body as { name: string }).name.trim() };
	items.push(item);
	return json({ item }, { status: 201 });
};
