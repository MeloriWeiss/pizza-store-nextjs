import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

interface PriceRangeProps {
	priceFrom: number | null;
	priceTo: number | null;
}

export interface Filters {
	sizes: Set<string>,
	doughTypes: Set<string>,
	ingredients: Set<string>,
	priceTo: number | null,
	priceFrom: number | null,
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceRangeProps, value: number | null) => void,
	onToggleIngredients: (key: string) => void,
	onToggleSizes: (key: string) => void,
	onToggleDoughTypes: (key: string) => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams();

	const [selectedIngredients, {toggle: onToggleIngredients}]
		= useSet(new Set<string>(searchParams.get("ingredients") ? String(searchParams.get("ingredients")).split(",") : []));
	const [selectedSizes, { toggle: onToggleSizes }]
		= useSet(new Set<string>(searchParams.get("sizes") ? String(searchParams.get("sizes")).split(",") : []));
	const [selectedDoughTypes, { toggle: onToggleDoughTypes }]
		= useSet(new Set<string>(searchParams.get("doughTypes") ? String(searchParams.get("doughTypes")).split(",") : []));

	const [{ priceFrom, priceTo }, setPrices] = useState<PriceRangeProps>({
		priceFrom: +searchParams.get("priceFrom") || null,
		priceTo: +searchParams.get("priceTo") || null
	});

	const updatePrice = (name: keyof PriceRangeProps, value: number | null) => {
		setPrices(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	return {
		ingredients: selectedIngredients,
		sizes: selectedSizes,
		doughTypes: selectedDoughTypes,
		priceFrom,
		priceTo,
		setPrices: updatePrice,
		onToggleIngredients,
		onToggleSizes,
		onToggleDoughTypes
	}
}