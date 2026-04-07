import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Name is required';
		if (!email) errors.email = 'Email is required';
		else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) errors.email = 'Invalid email format';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, name, email });
		}

		// Simulate subscriber registration
		await new Promise((r) => setTimeout(r, 500));
		console.log(`[CTA] New subscriber: ${name} <${email}>`);

		return { success: true, name, downloadUrl: '/svelte-cheat-sheet.pdf' };
	}
};
