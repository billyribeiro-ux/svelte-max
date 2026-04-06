/**
 * PE7 Remote Functions — project data layer.
 *
 * All data operations for the Module 9B Real-Time Data App project.
 * These functions run on the server but are callable from the browser
 * with full type safety via the remote function protocol.
 */

interface DashboardMetric {
	id: string;
	label: string;
	value: number;
	unit: string;
}

interface FeedbackEntry {
	id: number;
	author: string;
	text: string;
	rating: number;
	createdAt: string;
}

const metrics: DashboardMetric[] = [
	{ id: 'throughput', label: 'Throughput', value: 1842, unit: 'req/s' },
	{ id: 'latency', label: 'P95 Latency', value: 145, unit: 'ms' },
	{ id: 'errors', label: 'Error Rate', value: 0.42, unit: '%' },
	{ id: 'uptime', label: 'Uptime', value: 99.97, unit: '%' }
];

let feedbackStore: FeedbackEntry[] = [
	{ id: 1, author: 'Ada', text: 'Dashboard loads instantly', rating: 5, createdAt: '2026-04-01T10:00:00Z' },
	{ id: 2, author: 'Grace', text: 'Love the real-time updates', rating: 4, createdAt: '2026-04-02T14:30:00Z' },
	{ id: 3, author: 'Alan', text: 'Error rate tracking is very useful', rating: 5, createdAt: '2026-04-03T09:15:00Z' }
];

let nextId = 4;

/**
 * Query: fetch current dashboard metrics.
 */
export async function getMetrics(): Promise<DashboardMetric[]> {
	await new Promise((r) => setTimeout(r, 80));
	return metrics.map((m) => ({
		...m,
		value: m.id === 'errors'
			? Math.round((m.value + (Math.random() - 0.5) * 0.1) * 100) / 100
			: Math.round(m.value + (Math.random() - 0.5) * m.value * 0.05)
	}));
}

/**
 * Query: fetch feedback entries.
 */
export async function getFeedback(): Promise<FeedbackEntry[]> {
	await new Promise((r) => setTimeout(r, 60));
	return [...feedbackStore].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
}

/**
 * Command: add a new feedback entry.
 */
export async function addFeedback(
	author: string,
	text: string,
	rating: number
): Promise<{ success: boolean; entry?: FeedbackEntry; error?: string }> {
	await new Promise((r) => setTimeout(r, 150));

	if (!author.trim()) return { success: false, error: 'Author is required' };
	if (!text.trim()) return { success: false, error: 'Text is required' };
	if (rating < 1 || rating > 5) return { success: false, error: 'Rating must be 1-5' };

	const entry: FeedbackEntry = {
		id: nextId++,
		author: author.trim(),
		text: text.trim(),
		rating,
		createdAt: new Date().toISOString()
	};

	feedbackStore.push(entry);
	return { success: true, entry };
}

/**
 * Command: delete a feedback entry by ID.
 */
export async function deleteFeedback(
	id: number
): Promise<{ success: boolean; error?: string }> {
	await new Promise((r) => setTimeout(r, 100));

	const index = feedbackStore.findIndex((f) => f.id === id);
	if (index === -1) return { success: false, error: 'Entry not found' };

	feedbackStore.splice(index, 1);
	return { success: true };
}
