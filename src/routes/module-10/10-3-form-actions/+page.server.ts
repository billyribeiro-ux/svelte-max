import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

interface Message {
	id: number;
	name: string;
	body: string;
	at: string;
}

const messages: Message[] = [];

export const load: PageServerLoad = () => ({
	messages: messages.slice(0, 5)
});

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const body = String(form.get('body') ?? '').trim();
		if (!name || !body) {
			return fail(400, { name, body, error: 'Both name and body are required' });
		}
		messages.unshift({
			id: Date.now(),
			name,
			body,
			at: new Date().toISOString()
		});
		return { success: true, messageCount: messages.length };
	}
};
