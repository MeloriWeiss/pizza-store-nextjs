import { pizzaSizes } from "@/shared/constants/pizza-sizes";
import { ProductVariant } from "@prisma/client";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { Variant } from "@/shared/components/shared/product-variants";

export const getCurrentPizzaSizes = (type: PizzaTypes, variants: ProductVariant[]): Variant[] => {
	const pizzaVariantsByCurrentType = variants
		.filter(variant => variant.pizzaDoughType === type);
	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !Boolean(pizzaVariantsByCurrentType.find(variant => Number(variant.size) === Number(item.value)))
	}));
}