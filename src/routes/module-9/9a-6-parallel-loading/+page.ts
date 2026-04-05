import type { PageLoad } from './$types';

interface User {
	name: string;
	role: string;
}

interface Stats {
	commits: number;
	stars: number;
}

interface Activity {
	id: number;
	text: string;
}

async function fetchUser(): Promise<User> {
	await new Promise((r) => setTimeout(r, 150));
	return { name: 'Ada', role: 'Engineer' };
}

async function fetchStats(): Promise<Stats> {
	await new Promise((r) => setTimeout(r, 120));
	return { commits: 1842, stars: 76 };
}

async function fetchActivity(): Promise<Activity[]> {
	await new Promise((r) => setTimeout(r, 140));
	return [
		{ id: 1, text: 'Pushed to main' },
		{ id: 2, text: 'Opened PR #42' },
		{ id: 3, text: 'Reviewed PR #41' }
	];
}

export const load: PageLoad = async () => {
	const started = performance.now();
	const [user, stats, activity] = await Promise.all([fetchUser(), fetchStats(), fetchActivity()]);
	const durationMs = Math.round(performance.now() - started);
	return { user, stats, activity, durationMs };
};
