import React from "react";
import { cn } from "@/shared/lib/utils";
import { CountIconButton } from "@/shared/components/shared";

export interface CountButtonProps {
	value?: number;
	size?: 'sm' | 'lg';
	onClick?: (newValue: number) => void;
	className?: string;
}

export const CountButtons: React.FC<CountButtonProps> = (
	{
		value = 1,
		size = 'sm',
		onClick,
		className
	}
) => {
	return (
		<div className={cn("inline-flex items-center justify-between gap-3", className)}>
			<CountIconButton
				onClick={() => onClick?.(value - 1)}
				disabled={value === 1}
				size={size}
				type={'minus'}
			/>
			<b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>
			<CountIconButton
				onClick={() => onClick?.(value + 1)}
				size={size}
				type={'plus'}
			/>
		</div>
	);
};