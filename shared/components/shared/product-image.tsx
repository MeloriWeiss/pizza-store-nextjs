import React from "react";
import { cn } from "@/shared/lib/utils";
import { ProductType } from "@/types/product.type";

interface Props {
	size: 20 | 30 | 40;
	imageUrl: string;
	className?: string;
	type?: ProductType;
}

export const ProductImage: React.FC<Props> = ({size, imageUrl, type = ProductType.pizza, className}) => {
	return (
		<div className={cn('flex flex-1 items-center justify-center relative w-full', className)}>
			<img src={imageUrl} alt="Продукт"
				className={cn('relative left-2 top-2 transition-all z-10 duration-300', {
					'w-[300px] h-[300px]': size === 20,
					'w-[400px] h-[400px]': size === 30,
					'w-[500px] h-[500px]': size === 40,
				})}
			/>

			{type === ProductType.pizza &&
				<div>
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-primary/15 w-[450px] h-[450px]"></div>
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-primary/15 w-[370px] h-[370px]"></div>
				</div>
			}
		</div>
	)
}