import { CartDTO } from "@/shared/services/dto/cart.dto";
import { calculateCartItemTotalPrice } from "@/shared/lib";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	size?: number | null;
	pizzaDoughType?: number | null;
	ingredients: Array<{name: string, price: number}>;
}

interface ReturnProps {
	items: CartStateItem[];
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.cartItems.map(item => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariant.product.name,
		imageUrl: item.productVariant.product.imageUrl,
		price: calculateCartItemTotalPrice(item),
		size: item.productVariant.size,
		pizzaDoughType: item.productVariant.pizzaDoughType,
		ingredients: item.ingredients.map(ingredient => ({
			name: ingredient.name,
			price: ingredient.price
		}))
	}));

	return {
		totalAmount: items.reduce((totalAmount, item) => totalAmount + item.price, 0),
		items
	}
}