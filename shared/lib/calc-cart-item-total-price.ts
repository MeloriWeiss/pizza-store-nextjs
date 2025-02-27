import { CartItemDTO } from "@/shared/services/dto/cart.dto";

export const calculateCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsTotalAmount = item.ingredients.reduce((totalAmount, ingredient) => totalAmount + ingredient.price, 0)
	return (ingredientsTotalAmount + item.productVariant.price) * item.quantity;
};