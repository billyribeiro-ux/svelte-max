import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || !password) {
			return fail(400, { action: 'login' as const, error: 'Missing fields', email });
		}
		if (password !== 'demo') {
			return fail(401, { action: 'login' as const, error: 'Use password: demo', email });
		}
		return { action: 'login' as const, success: true, message: `Welcome back, ${email}` };
	},
	register: async ({ request }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const password = String(form.get('password') ?? '');
		if (!email || !password) {
			return fail(400, { action: 'register' as const, error: 'Missing fields', email });
		}
		if (password.length < 6) {
			return fail(400, {
				action: 'register' as const,
				error: 'Password must be at least 6 characters',
				email
			});
		}
		return {
			action: 'register' as const,
			success: true,
			message: `Account created for ${email}`
		};
	}
};
