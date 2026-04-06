/**
 * KPI Dashboard type definitions — the PE7 way.
 *
 * These interfaces describe every data shape used across the KPI Dashboard
 * section. They're imported by reusable components in $lib/components/ and
 * by lesson/project pages in src/routes/kpi-cards/.
 */

/** A single KPI metric with everything needed to render a full card. */
export interface KpiMetric {
	/** Unique identifier for this metric. */
	id: string;
	/** Human-readable label (e.g., "Requests/sec"). */
	label: string;
	/** Current numeric value. */
	value: number;
	/** Previous period value for trend calculation. */
	previousValue: number;
	/** SLO or goal target. */
	target: number;
	/** Unit suffix (e.g., "ms", "req/s", "%", "users"). */
	unit: string;
	/** Historical data points for sparkline rendering. */
	history: readonly number[];
}

/** Trend direction computed from value vs previousValue. */
export type TrendDirection = 'up' | 'down' | 'neutral';

/** Computed trend info derived from a KpiMetric. */
export interface TrendInfo {
	direction: TrendDirection;
	/** Absolute change: value - previousValue. */
	delta: number;
	/** Percentage change: ((value - previousValue) / previousValue) * 100. */
	percent: number;
}

/** A real-time activity event in a dashboard feed. */
export interface DashboardActivity {
	id: number;
	text: string;
	level: 'info' | 'warning' | 'error';
	at: Date;
}

/** Dashboard filter state. */
export interface DashboardFilters {
	environment: 'production' | 'staging' | 'development';
	timeRange: '1h' | '6h' | '24h' | '7d' | '30d';
	autoRefresh: boolean;
}
