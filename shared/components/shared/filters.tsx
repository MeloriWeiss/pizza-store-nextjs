"use client";

import React from "react";
import { Ingredient } from "@prisma/client";
import { useFilters, useIngredients, useQueryFilters } from "@/shared/hooks";
import { RangeSlider, Title, CheckboxFiltersGroup } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const {ingredients, loading} = useIngredients();
	const filters = useFilters();

	useQueryFilters(filters);

	const updatePrices = (min: number, max: number) => {
		filters.setPrices("priceFrom", min)
		filters.setPrices("priceTo", max)
	}

	const prepareIngredients = (ingredients: Ingredient[]) => {
		return ingredients.map(item => ({
			value: String(item.id),
			text: item.name
		}));
	};

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			<CheckboxFiltersGroup
				title="Тип теста"
				name="doughTypes"
				className="mb-5"
				onClickCheckbox={filters.onToggleDoughTypes}
				items={[
					{ text: "Тонкое", value: "1" },
					{ text: "Традиционное", value: "2" }
				]}
				selectedIds={filters.doughTypes}
			/>

			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				onClickCheckbox={filters.onToggleSizes}
				className="mb-5"
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" }
				]}
				selectedIds={filters.sizes} />

			<div className="mt-5 border-y border-y-neutral-100 pt-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input type="number" placeholder="0" min={0} max={1000} value={String(filters.priceFrom || '')}
								 onChange={e => filters.setPrices("priceFrom", +e.target.value || null)} />
					<Input type="number" placeholder="1000" min={100} max={1000} value={String(filters.priceTo || '')}
								 onChange={e => filters.setPrices("priceTo", +e.target.value || null)} />
				</div>
				<RangeSlider min={0} max={1000} step={10} value={[filters.priceFrom || 0, filters.priceTo || 1000]}
										 onValueChange={([priceFrom, priceTo]) => updatePrices(priceFrom, priceTo)} />
				<CheckboxFiltersGroup
					loading={loading}
					title="Ингредиенты"
					name="ingredients"
					className="mt-10 pt-6 border-t border-t-neutral-100"
					limit={6}
					defaultItems={prepareIngredients(ingredients).slice(0, 6)}
					items={prepareIngredients(ingredients)}
					onClickCheckbox={filters.onToggleIngredients}
					selectedIds={filters.ingredients}
				/>
			</div>
		</div>
	);
};