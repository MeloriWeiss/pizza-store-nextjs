import { mapPizzaTypes, PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { Ingredient, ProductVariant } from "@prisma/client";
import { calculatePizzaPrice } from "@/shared/lib";

export const getPizzaDetails = (
	size: PizzaSizes,
	type: PizzaTypes,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
) => {
	const textDetails = `${size} см, ${mapPizzaTypes[type]} тесто`;
	const totalPrice = calculatePizzaPrice(type, size, variants, ingredients, selectedIngredients);

	return {
		totalPrice,
		textDetails
	}
}