import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const task = String(form.get('task') ?? '').trim();
		if (!task) {
			return fail(400, { error: 'Task is required' });
		}
		// Simulate slow server work so students see the pending state.
		await new Promise((resolve) => setTimeout(resolve, 700));
		return { success: true, createdAt: new Date().toISOString(), task };
	}
};
