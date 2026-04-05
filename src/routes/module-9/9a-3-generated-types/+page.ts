import type { PageLoad } from './$types';

interface Product {
	id: number;
	name: string;
	price: number;
}

interface PageResult {
	product: Product;
	relatedIds: readonly number[];
}

export const load: PageLoad = async (): Promise<PageResult> => {
	await new Promise((r) => setTimeout(r, 90));

	return {
		product: {
			id: 42,
			name: 'Mechanical Keyboard',
			price: 149
		},
		relatedIds: [17, 23, 91] as const
	};
};
