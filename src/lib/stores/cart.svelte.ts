export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

export class CartStore {
	items = $state<CartItem[]>([]);

	get total(): number {
		return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	get count(): number {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}

	add(item: Omit<CartItem, 'quantity'>) {
		const existing = this.items.find((i) => i.id === item.id);
		if (existing) {
			existing.quantity++;
		} else {
			this.items.push({ ...item, quantity: 1 });
		}
	}

	remove(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}

	clear() {
		this.items = [];
	}
}
