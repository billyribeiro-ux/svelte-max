import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegisterErrors {
	email?: string;
	password?: string;
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		const errors: RegisterErrors = {};

		if (!email) {
			errors.email = 'Email is required';
		} else if (!EMAIL_RE.test(email)) {
			errors.email = 'That does not look like a valid email address';
		}

		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		} else if (!/\d/.test(password)) {
			errors.password = 'Password must contain at least one digit';
		}

		if (errors.email || errors.password) {
			return fail(400, { email, errors });
		}

		return { success: true, email };
	}
};
