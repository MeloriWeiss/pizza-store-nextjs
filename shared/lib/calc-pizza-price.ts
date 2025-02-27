import { Ingredient, ProductVariant } from "@prisma/client";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";

export const calculatePizzaPrice = (
	type: PizzaTypes,
	size: PizzaSizes,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const pizzaPrice = variants.find(variant => variant.pizzaDoughType === type && variant.size === size)?.price || 0;
	const ingredientsPrice = ingredients.reduce((total, item) => selectedIngredients.has(item.id) ? total + item.price : total, 0);

	return pizzaPrice + ingredientsPrice;
}