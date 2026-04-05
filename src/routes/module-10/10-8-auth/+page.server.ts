import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

interface User {
	id: number;
	email: string;
	name: string;
}

const users: User[] = [
	{ id: 1, email: 'ada@example.com', name: 'Ada Lovelace' },
	{ id: 2, email: 'grace@example.com', name: 'Grace Hopper' }
];

const sessions = new Map<string, number>();

export const load: PageServerLoad = ({ cookies }) => {
	const token = cookies.get('demo-session');
	const userId = token ? sessions.get(token) : undefined;
	const user = userId ? (users.find((u) => u.id === userId) ?? null) : null;
	return {
		user,
		availableEmails: users.map((u) => u.email)
	};
};

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = String(form.get('email') ?? '').trim();
		const user = users.find((u) => u.email === email);
		if (!user) {
			return fail(401, {
				email,
				error: 'Unknown email — try ada@example.com or grace@example.com'
			});
		}
		const token = crypto.randomUUID();
		sessions.set(token, user.id);
		cookies.set('demo-session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60
		});
		return { success: true };
	},
	logout: async ({ cookies }) => {
		const token = cookies.get('demo-session');
		if (token) sessions.delete(token);
		cookies.delete('demo-session', { path: '/' });
		return { loggedOut: true };
	}
};
