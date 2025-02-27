"use client";

import React from "react";
import { Product } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
	product: Product;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
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
			toast.success(`${product.name} добавлен${isPizzaForm ? 'а' : ''} в корзину`);
			router.back();
		} catch (error) {
			toast.error("Не удалось добавить товар в корзину");
			console.log(error);
		}
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<VisuallyHidden>
				<DialogTitle></DialogTitle>
			</VisuallyHidden>
			<DialogContent aria-describedby={undefined}
										 className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden", className)}>
				{isPizzaForm ?
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variants={product.variants}
						onSubmit={onSubmit}
						loading={loading}
					/>
					:
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onSubmit}
						price={firstVariant.price}
						loading={loading}
					/>
				}
			</DialogContent>
		</Dialog>
	);
};