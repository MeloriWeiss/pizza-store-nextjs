import React from "react";
import { cn } from "@/shared/lib/utils";
import { ProductImage, Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { ProductType } from "@/types/product.type";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	onSubmit: VoidFunction;
	loading?: boolean;
	hasVariants?: boolean;
	className?: string;
}

export const ChooseProductForm: React.FC<Props> = (
	{
		imageUrl,
		name,
		price,
		onSubmit,
		loading,
		hasVariants,
		className
	}
) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage imageUrl={imageUrl} size={20} type={ProductType.product}/>
			<div className="w-[490px] bg-[#F7F6F5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1"/>
				<Button
					loading={loading}
					disabled={!hasVariants && hasVariants !== undefined}
					onClick={() => onSubmit()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за {price} ₽
				</Button>
			</div>
		</div>
	);
};