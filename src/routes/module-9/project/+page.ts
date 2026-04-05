import type { PageLoad } from './$types';

interface Current {
	location: string;
	tempC: number;
	condition: string;
	observedAt: string;
}

interface ForecastDay {
	day: string;
	highC: number;
	lowC: number;
	icon: string;
}

interface Alert {
	id: number;
	level: 'info' | 'warning' | 'severe';
	title: string;
	body: string;
}

interface Historical {
	avgC: number;
	trendNote: string;
}

async function fetchCurrent(): Promise<Current> {
	await new Promise((r) => setTimeout(r, 120));
	const temps = [14, 16, 18, 19, 21, 23];
	const conditions = ['Partly cloudy', 'Clear', 'Light rain', 'Overcast', 'Sunny'];
	return {
		location: 'Lisbon, Portugal',
		tempC: temps[Math.floor(Math.random() * temps.length)],
		condition: conditions[Math.floor(Math.random() * conditions.length)],
		observedAt: new Date().toISOString()
	};
}

async function fetchForecast(): Promise<ForecastDay[]> {
	await new Promise((r) => setTimeout(r, 180));
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
	const icons = ['sun', 'cloud-sun', 'cloud', 'cloud-rain', 'sun'];
	return days.map((day, i) => ({
		day,
		highC: 18 + Math.round(Math.random() * 6),
		lowC: 10 + Math.round(Math.random() * 4),
		icon: icons[i]
	}));
}

async function fetchAlerts(): Promise<Alert[]> {
	await new Promise((r) => setTimeout(r, 90));
	const pool: Alert[] = [
		{
			id: 1,
			level: 'info',
			title: 'Pollen advisory',
			body: 'Elevated pollen counts expected through the afternoon.'
		},
		{
			id: 2,
			level: 'warning',
			title: 'Wind advisory',
			body: 'Gusts up to 55km/h expected along the coast after 18:00.'
		}
	];
	const count = Math.floor(Math.random() * 3);
	return pool.slice(0, count);
}

async function fetchHistorical(): Promise<Historical> {
	await new Promise((r) => setTimeout(r, 1500));
	return {
		avgC: 17.4,
		trendNote: 'Running 1.2°C above the 30-year average for this week.'
	};
}

export const load: PageLoad = async ({ depends }) => {
	depends('app:weather');
	const started = performance.now();
	const [current, forecast, alerts] = await Promise.all([
		fetchCurrent(),
		fetchForecast(),
		fetchAlerts()
	]);
	const duration = Math.round(performance.now() - started);
	return {
		current,
		forecast,
		alerts,
		duration,
		historical: fetchHistorical()
	};
};
