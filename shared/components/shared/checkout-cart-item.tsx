'use client';

import React from "react";
import { CartItemBaseProps } from "@/shared/components/shared/cart-item-details/cart-item-details.type";
import { cn } from "@/shared/lib/utils";
import {
	CartItemDetailsImage,
	CartItemDetailsInfo,
	CartItemDetailsPrice
} from "@/shared/components/shared/cart-item-details";
import { CountButtons } from "@/shared/components/shared";
import { X } from "lucide-react";

export interface CartItemProps extends CartItemBaseProps {
	onUpdateCount?: (newQuantity: number) => void;
	onRemoveItem?: () => void;
	className?: string;
}

export const CheckoutCartItem: React.FC<CartItemProps> = (
	{
		name,
		price,
		imageUrl,
		quantity,
		details,
		disabled,
		onUpdateCount,
		onRemoveItem,
		className
	}
) => {
	return (
		<div className={cn('flex justify-between items-center', {
			'opacity-50 transition-all pointer-events-none': disabled
		}, className)}>
			<div className="flex items-center gap-5 flex-1">
				<CartItemDetailsImage src={imageUrl} />
				<CartItemDetailsInfo name={name} details={details} />
			</div>
			<CartItemDetailsPrice value={price} />
			<div className="flex items-center gap-5 ml-20">
				<CountButtons onClick={onUpdateCount} value={quantity} />
				<button onClick={onRemoveItem}>
					<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20}></X>
				</button>
			</div>
		</div>
	);
};