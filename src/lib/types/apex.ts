/**
 * ApexCharts type definitions for the PE7 course.
 * These provide typed data shapes for chart series and options.
 */

/** A single data point for time-series charts. */
export interface TimeSeriesPoint {
	x: number | string | Date;
	y: number;
}

/** A named series for multi-series charts. */
export interface ChartSeries {
	name: string;
	data: readonly (number | TimeSeriesPoint)[];
	color?: string;
}

/** Heatmap cell data. */
export interface HeatmapPoint {
	x: string;
	y: number;
}

/** Treemap data item. */
export interface TreemapItem {
	x: string;
	y: number;
}

/** Dashboard chart card configuration. */
export interface ChartCard {
	id: string;
	title: string;
	type: 'line' | 'area' | 'bar' | 'donut' | 'radialBar' | 'heatmap' | 'treemap';
	series: readonly ChartSeries[];
	height?: string;
}
