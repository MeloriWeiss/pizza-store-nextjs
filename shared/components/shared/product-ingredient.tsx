import React from "react";
import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	onClick?: () => void;
	active?: boolean;
	className?: string;
}

export const ProductIngredient: React.FC<Props> = (
	{
		imageUrl,
		name,
		price,
		active,
		onClick,
		className
	}
) => {
	return (
		<div className={cn("flex items-center flex-col p-1 rounded-md w-32 box-border text-center relative cursor-pointer shadow-md bg-white border border-transparent",
				{ "border-primary": active }, className)}
			onClick={onClick}>
			{active &&
			<CircleCheck className="absolute top-2 right-2 text-primary" />
			}
			<img src={imageUrl} alt={name} width={110} height={110} />
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold">{price} ₽</span>
		</div>
	);
};