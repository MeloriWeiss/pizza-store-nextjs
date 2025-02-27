import { useEffect, useState } from "react";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { Variant } from "@/shared/components/shared/product-variants";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { useSet } from "react-use";
import { getCurrentPizzaSizes } from "@/shared/lib";
import { ProductVariant } from "@prisma/client";

interface ReturnProps {
	size: PizzaSizes;
	type: PizzaTypes;
	selectedIngredients: Set<number>;
	currentPizzaSizes: Variant[];
	currentVariantId: number;
	setSize: (size: PizzaSizes) => void;
	setType: (type: PizzaTypes) => void;
	onToggleIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSizes>(20);
	const [type, setType] = useState<PizzaTypes>(1);
	const [selectedIngredients, { toggle: onToggleIngredient }] = useSet(new Set<number>([]));
	const currentSizes = getCurrentPizzaSizes(type, variants);

	const currentVariantId = variants.find(variant => variant.pizzaDoughType === type && variant.size === size)?.id;

	useEffect(() => {
		const activeSize = currentSizes.find(item => Number(item.value) === size);
		if (activeSize?.disabled) {
			const firstAvailableSize = currentSizes.find(item => !item.disabled);
			if (firstAvailableSize) {
				setSize(Number(firstAvailableSize.value) as PizzaSizes);
			}
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		currentPizzaSizes: currentSizes,
		currentVariantId,
		setSize,
		setType,
		onToggleIngredient
	}
}