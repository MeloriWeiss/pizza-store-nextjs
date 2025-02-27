
import React from "react";
import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "@/shared/components/shared/cart-item-details/cart-item-details.type";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from "@/shared/components/shared/cart-item-details";
import { CountButtons } from "@/shared/components/shared/count-buttons";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
	onUpdateCount?: (newQuantity: number) => void;
	onRemoveItem?: () => void;
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = (
	{
		id,
		imageUrl,
		name,
		price,
		quantity,
		details,
		onUpdateCount,
		onRemoveItem,
		className
	}
	) => {
	return (
		<div className={cn("flex bg-white p-5 gap-6 rounded-xl", className)}>
			<CartItemDetailsImage src={imageUrl} />
			<div className="flex-1">
				<CartItemInfo name={name} details={details} />
				<hr className="my-3"/>
				<div className="flex items-center justify-between">
					<CountButtons onClick={onUpdateCount} value={quantity}></CountButtons>
					<div className="flex items-center gap-3">
						<CartItemDetailsPrice value={price} />
						<Trash2Icon onClick={onRemoveItem} className="text-gray-400 cursor-pointer hover:text-gray-600 transition-all" size={16} />
					</div>
				</div>
			</div>
		</div>
	);
};