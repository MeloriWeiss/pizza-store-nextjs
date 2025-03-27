'use client';

import React from "react";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { Product } from "@prisma/client";
import { PizzaForm } from "@/shared/components/shared/pizza-form";
import { ProductForm } from "@/shared/components/shared/product-form";

interface Props {
	product: Product;
	onSubmitAdditional?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({ product, onSubmitAdditional }) => {
	const firstVariant = product.variants[0];
	const isPizzaForm = Boolean(firstVariant.pizzaDoughType);
	const addCartItem = useCartStore(state => state.addCartItem);
	const loading = useCartStore(state => state.loading);

	const onSubmit = async (productVariantId?: number, ingredients?: number[]) => {
		try {
			const variantId = productVariantId || firstVariant.id;
			await addCartItem({
				productVariantId: variantId,
				ingredients
			});
			toast.success(`${product.name} добавлен${isPizzaForm ? "а" : ""} в корзину`);
			onSubmitAdditional?.();
		} catch (error) {
			toast.error("Не удалось добавить товар в корзину");
			console.log(error);
		}
	};

	if (isPizzaForm) {
		return (
			<PizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				variants={product.variants}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}
	return (
		<ProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={onSubmit}
			price={firstVariant.price}
			loading={loading}
		/>
	);
}