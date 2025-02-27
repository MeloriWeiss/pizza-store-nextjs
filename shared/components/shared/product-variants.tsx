'use client';

import React from "react";
import { cn } from "@/shared/lib/utils";

export type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
}

interface Props {
	variants: readonly Variant[];
	defaultValue?: string;
	onClick?: (value: Variant['value']) => void;
	value?: Variant['value'];
	className?: string;
}

export const ProductVariants: React.FC<Props> = (
	{
		variants,
		defaultValue,
		onClick,
		value,
		className
	}
) => {
	return (
		<div className={cn("flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none]", className)}>
			{variants.map(variant => (
				<button key={variant.value} onClick={() => onClick?.(variant.value)}
								className={cn('flex items-center justify-center h-[36px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm', {
									'bg-white shadow': variant.value === value,
									'text-gray-500 opacity-50 pointer-events-none': variant.disabled
								})}>
					{variant.name}
				</button>
			))}
		</div>
	);
};
