import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	// `parent()` awaits the nearest layout loader(s) and returns their merged data.
	// This is the explicit way to read layout data inside a child page loader.
	const layoutData = await parent();

	return {
		pageNote: 'This page merged layout data via parent()',
		inheritedLocale: layoutData.preferences.locale
	};
};
