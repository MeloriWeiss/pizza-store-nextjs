import { CartItem } from "@prisma/client";

export const calculateCartItemTotalPrice = (item: CartItem): number => {
	const ingredientsTotalAmount = item.ingredients.reduce((totalAmount, ingredient) => totalAmount + ingredient.price, 0)
	return (ingredientsTotalAmount + item.productVariant.price) * item.quantity;
};