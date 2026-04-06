/**
 * PE7 Remote Functions demo — actual working .remote.ts file.
 *
 * This file runs on the SERVER but is callable from the BROWSER
 * with full type safety. No manual fetch, no +server.ts boilerplate.
 *
 * Requires: kit.experimental.remoteFunctions: true in svelte.config.js
 */

interface Product {
	id: number;
	name: string;
	price: number;
	category: 'audio' | 'wearable' | 'camera';
}

const products: Product[] = [
	{ id: 1, name: 'Studio Monitor Headphones', price: 149, category: 'audio' },
	{ id: 2, name: 'Wireless Earbuds Pro', price: 89, category: 'audio' },
	{ id: 3, name: 'Smart Fitness Band', price: 59, category: 'wearable' },
	{ id: 4, name: 'Smart Watch Ultra', price: 399, category: 'wearable' },
	{ id: 5, name: 'Action Camera 5K', price: 329, category: 'camera' },
	{ id: 6, name: 'Instant Film Camera', price: 79, category: 'camera' }
];

/**
 * Query: fetch all products, optionally filtered by category.
 * Called from the browser — runs on the server.
 */
export async function getProducts(category?: Product['category']): Promise<Product[]> {
	// Simulate server latency
	await new Promise((r) => setTimeout(r, 100));

	if (category) {
		return products.filter((p) => p.category === category);
	}
	return products;
}

/**
 * Query: fetch a single product by ID.
 */
export async function getProduct(id: number): Promise<Product | null> {
	await new Promise((r) => setTimeout(r, 50));
	return products.find((p) => p.id === id) ?? null;
}

/**
 * Command: "purchase" a product (simulated mutation).
 * Returns a confirmation with timestamp.
 */
export async function purchaseProduct(
	id: number
): Promise<{ success: boolean; message: string; at: string }> {
	await new Promise((r) => setTimeout(r, 200));

	const product = products.find((p) => p.id === id);
	if (!product) {
		return { success: false, message: `Product ${id} not found`, at: new Date().toISOString() };
	}

	return {
		success: true,
		message: `Purchased ${product.name} for $${product.price}`,
		at: new Date().toISOString()
	};
}
