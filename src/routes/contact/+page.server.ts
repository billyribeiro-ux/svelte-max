import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const subject = data.get('subject')?.toString() ?? '';
		const message = data.get('message')?.toString().trim() ?? '';

		// Server validation
		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Name is required';
		if (!email) errors.email = 'Email is required';
		else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) errors.email = 'Invalid email format';
		if (!subject) errors.subject = 'Please select a subject';
		if (!message) errors.message = 'Message is required';
		else if (message.length < 20) errors.message = 'Message must be at least 20 characters';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, name, email, subject, message });
		}

		// Simulate sending (real app: send email via Resend/SendGrid/etc.)
		await new Promise((r) => setTimeout(r, 800));
		console.log(`[CONTACT] From: ${name} <${email}> Subject: ${subject}`);

		return { success: true, name };
	}
};
