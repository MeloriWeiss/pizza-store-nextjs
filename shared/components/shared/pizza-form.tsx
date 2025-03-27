"use client";

import React from "react";
import { ProductType } from "@/types/product.type";
import { cn } from "@/shared/lib/utils";
import { ProductImage, Title, ProductVariants, ProductIngredient } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { pizzaTypes, PizzaTypes } from "@/shared/constants/pizza-types";
import { ProductVariant, ProductIngredient as Ingredient } from "@prisma/client";
import { getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	onSubmit: (variantId: number, ingredients: number[]) => void;
	loading?: boolean;
	hasVariants?: boolean;
	className?: string;
}

export const PizzaForm: React.FC<Props> = (
	{
		imageUrl,
		name,
		ingredients,
		variants,
		onSubmit,
		loading,
		hasVariants,
		className
	}
) => {
	const {
		size,
		type,
		selectedIngredients,
		currentPizzaSizes,
		currentVariantId,
		setSize,
		setType,
		onToggleIngredient
	} = usePizzaOptions(variants);

	const {totalPrice, textDetails} = getPizzaDetails(size, type, variants, ingredients, selectedIngredients);

	const handleClickAdd = () => {
		if (currentVariantId) {
			onSubmit(currentVariantId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn("flex flex-1 min-h-[520px]", className)}>
			<ProductImage imageUrl={imageUrl} size={size} type={ProductType.pizza} />
			<div className="w-[490px] bg-[#F7F6F5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />
				<p className="text-gray-400">{textDetails}</p>
				<div className="flex flex-col gap-1 mt-6">
					<ProductVariants variants={currentPizzaSizes} value={String(size)}
													 onClick={value => setSize(Number(value) as PizzaSizes)} />
					<ProductVariants variants={pizzaTypes} value={String(type)}
													 onClick={value => setType(Number(value) as PizzaTypes)} />
				</div>
				<div className="bg-gray-50 mt-5 p-5 rounded-md h-[400px] overflow-auto scrollbar">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map(ingredient => (
							<ProductIngredient
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								onClick={() => onToggleIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)} />
						))}
					</div>
				</div>
				<Button
					loading={loading}
					disabled={!hasVariants && hasVariants !== undefined}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
					onClick={handleClickAdd}>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};