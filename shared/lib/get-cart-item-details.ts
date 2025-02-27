import { mapPizzaTypes, PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { Ingredient } from "@prisma/client";
import { CartStateItem } from "@/shared/lib/get-cart-details";

export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaDoughType: PizzaTypes,
	pizzaSize: PizzaSizes
): string => {
	const details = [];

	if (pizzaSize && pizzaDoughType) {
		const typeName = mapPizzaTypes[pizzaDoughType][0].toUpperCase() + mapPizzaTypes[pizzaDoughType].slice(1, mapPizzaTypes[pizzaDoughType].length);
		details.push(`${typeName} тесто, ${pizzaSize} см`);

		if (ingredients) {
			details.push(...ingredients.map(ingredient => ingredient.name));
		}
	}

	return details.join(', ');
};