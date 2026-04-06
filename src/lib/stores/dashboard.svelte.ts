import type { KpiMetric, DashboardActivity, DashboardFilters } from '$lib/types/kpi';

/**
 * Gaussian-ish noise via Box-Muller transform (simplified).
 * Returns a value in roughly [-1, 1] most of the time.
 */
function gaussianNoise(): number {
	const u1 = Math.random();
	const u2 = Math.random();
	return Math.sqrt(-2 * Math.log(u1 || 0.001)) * Math.cos(2 * Math.PI * u2) * 0.3;
}

function clamp(val: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, val));
}

/** Window an array to the last `n` items. */
function windowed<T>(arr: readonly T[], n: number): T[] {
	return arr.length > n ? arr.slice(arr.length - n) : [...arr];
}

let activityCounter = 6;

const activityTemplates: { text: string; level: DashboardActivity['level'] }[] = [
	{ text: 'Auto-scaling group added 2 instances', level: 'info' },
	{ text: 'Latency spike detected on /api/search', level: 'warning' },
	{ text: 'Deployment v3.14.2 rolled out to us-east-1', level: 'info' },
	{ text: 'Error rate exceeded 1% threshold', level: 'error' },
	{ text: 'Cache hit ratio recovered to 98.2%', level: 'info' },
	{ text: 'Certificate renewal completed', level: 'info' },
	{ text: 'Database failover triggered', level: 'warning' },
	{ text: 'Rate limiter engaged for /api/bulk', level: 'warning' },
	{ text: 'Health check failed on node-07', level: 'error' },
	{ text: 'CDN purge completed for static assets', level: 'info' }
];

function seedMetrics(): KpiMetric[] {
	return [
		{
			id: 'requests',
			label: 'Requests/sec',
			value: 2437,
			previousValue: 2280,
			target: 3000,
			unit: 'req/s',
			history: [2100, 2200, 2350, 2280, 2400, 2380, 2437]
		},
		{
			id: 'latency',
			label: 'P99 Latency',
			value: 182,
			previousValue: 195,
			target: 150,
			unit: 'ms',
			history: [210, 205, 198, 195, 188, 185, 182]
		},
		{
			id: 'errors',
			label: 'Error Rate',
			value: 0.82,
			previousValue: 1.1,
			target: 0.5,
			unit: '%',
			history: [1.4, 1.3, 1.1, 1.1, 0.95, 0.88, 0.82]
		},
		{
			id: 'users',
			label: 'Active Users',
			value: 12_438,
			previousValue: 11_200,
			target: 15_000,
			unit: 'users',
			history: [10_800, 11_000, 11_200, 11_200, 11_800, 12_100, 12_438]
		}
	];
}

function seedActivities(): DashboardActivity[] {
	return [
		{ id: 1, text: 'Deployment v3.14.1 completed successfully', level: 'info', at: new Date(Date.now() - 300_000) },
		{ id: 2, text: 'Auto-scaling group added 1 instance', level: 'info', at: new Date(Date.now() - 240_000) },
		{ id: 3, text: 'Latency spike on /api/checkout (320ms)', level: 'warning', at: new Date(Date.now() - 180_000) },
		{ id: 4, text: 'Error rate crossed 1% threshold briefly', level: 'error', at: new Date(Date.now() - 120_000) },
		{ id: 5, text: 'Cache warm-up completed for region us-west-2', level: 'info', at: new Date(Date.now() - 60_000) }
	];
}

export class DashboardStore {
	metrics = $state<KpiMetric[]>(seedMetrics());
	activities = $state<DashboardActivity[]>(seedActivities());
	filters = $state<DashboardFilters>({ environment: 'production', timeRange: '1h', autoRefresh: true });

	/** Randomize metric values slightly and optionally add an activity. */
	tick(): void {
		this.metrics = this.metrics.map((m) => {
			const noise = gaussianNoise();
			let newValue: number;

			if (m.id === 'errors') {
				newValue = clamp(m.value + noise * 0.15, 0.1, 3.0);
				newValue = Math.round(newValue * 100) / 100;
			} else if (m.id === 'latency') {
				newValue = clamp(m.value + noise * 12, 80, 350);
				newValue = Math.round(newValue);
			} else if (m.id === 'users') {
				newValue = clamp(m.value + noise * 300, 8_000, 20_000);
				newValue = Math.round(newValue);
			} else {
				newValue = clamp(m.value + noise * 120, 1_000, 5_000);
				newValue = Math.round(newValue);
			}

			const newHistory = windowed([...m.history, newValue], 20);

			return {
				...m,
				previousValue: m.value,
				value: newValue,
				history: newHistory
			};
		});

		// ~30% chance to add an activity event per tick
		if (Math.random() < 0.3) {
			const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
			const event: DashboardActivity = {
				id: activityCounter++,
				text: template.text,
				level: template.level,
				at: new Date()
			};
			this.activities = windowed([...this.activities, event], 20);
		}
	}

	setEnvironment(env: DashboardFilters['environment']): void {
		this.filters = { ...this.filters, environment: env };
	}

	setTimeRange(range: DashboardFilters['timeRange']): void {
		this.filters = { ...this.filters, timeRange: range };
	}

	reset(): void {
		this.metrics = seedMetrics();
		this.activities = seedActivities();
		activityCounter = 6;
	}
}

export const dashboard = new DashboardStore();
