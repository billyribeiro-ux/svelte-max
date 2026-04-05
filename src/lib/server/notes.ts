// Server-only module — importing from client code errors at build time.

export interface Note {
	id: string;
	title: string;
	body: string;
	ownerEmail: string;
	createdAt: string;
	updatedAt: string;
}

export interface UserSession {
	token: string;
	email: string;
	name: string;
}

const notes = new Map<string, Note>();
const sessions = new Map<string, UserSession>();

function seed(): void {
	if (notes.size > 0) return;
	const t = new Date().toISOString();
	notes.set('seed-1', {
		id: 'seed-1',
		title: 'Welcome to svelte-max notes',
		body: 'This is a public note. Log in to add your own.',
		ownerEmail: 'ada@example.com',
		createdAt: t,
		updatedAt: t
	});
	notes.set('seed-2', {
		id: 'seed-2',
		title: 'SvelteKit form actions are great',
		body: 'Every mutation here goes through a named form action. Progressive enhancement included.',
		ownerEmail: 'grace@example.com',
		createdAt: t,
		updatedAt: t
	});
}
seed();

export function listNotes(): Note[] {
	return [...notes.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function createNote(ownerEmail: string, title: string, body: string): Note {
	const id = crypto.randomUUID();
	const now = new Date().toISOString();
	const note: Note = { id, title, body, ownerEmail, createdAt: now, updatedAt: now };
	notes.set(id, note);
	return note;
}

export function updateNote(
	id: string,
	title: string,
	body: string,
	ownerEmail: string
): Note | null {
	const existing = notes.get(id);
	if (!existing || existing.ownerEmail !== ownerEmail) return null;
	const updated: Note = { ...existing, title, body, updatedAt: new Date().toISOString() };
	notes.set(id, updated);
	return updated;
}

export function deleteNote(id: string, ownerEmail: string): boolean {
	const existing = notes.get(id);
	if (!existing || existing.ownerEmail !== ownerEmail) return false;
	notes.delete(id);
	return true;
}

export function login(email: string, name: string): UserSession {
	const token = crypto.randomUUID();
	const session: UserSession = { token, email, name };
	sessions.set(token, session);
	return session;
}

export function getSession(token: string | undefined): UserSession | null {
	if (!token) return null;
	return sessions.get(token) ?? null;
}

export function logout(token: string | undefined): void {
	if (token) sessions.delete(token);
}
