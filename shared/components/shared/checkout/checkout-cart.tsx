import React from "react";
import { CheckoutCartItem, CheckoutItemSkeleton, WhiteBlock } from "@/shared/components/shared";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { Skeleton } from "@/shared/components";

interface Props {
	items: CartStateItem[];
	updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
	loading?: boolean;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = (
	{
		items,
		updateCartItemQuantity,
		removeCartItem,
		loading = false,
		className
	}
) => {
	return (
		<WhiteBlock title="1. Корзина" className={className}>
			<div className="flex flex-col gap-5">
				{/*{loading &&*/}
				{/*	[...Array(items.length)].map((_, index) => <CheckoutItemSkeleton key={index} className="h-[60px]" />)*/}
				{/*}*/}
				{items.map(item => (
					<CheckoutCartItem
						key={item.id}
						id={item.id}
						details={getCartItemDetails(item.ingredients, item.pizzaDoughType as PizzaTypes, item.size as PizzaSizes)}
						imageUrl={item.imageUrl}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						disabled={item.disabled}
						onUpdateCount={(newQuantity) => updateCartItemQuantity(item.id, newQuantity)}
						onRemoveItem={() => removeCartItem(item.id)}
					/>
				))}
			</div>
		</WhiteBlock>
	);
};