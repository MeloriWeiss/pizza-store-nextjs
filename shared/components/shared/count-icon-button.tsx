import React from "react";
import { CountButtonProps } from "@/shared/components/shared/count-buttons";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { Minus, Plus } from "lucide-react";

interface IconButtonProps {
	size?: CountButtonProps['size'];
	disabled?: boolean;
	type?: 'plus' | 'minus';
	onClick?: () => void;
}

export const CountIconButton: React.FC<IconButtonProps> = (
	{
		size = 'sm',
		disabled,
		type,
		onClick
	}
) => {
	return (
		<Button
			variant="outline"
			disabled={disabled}
			onClick={onClick}
			className={cn("p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400", {
				"w-[30px] h-[30px] rounded-[10px]": size === "sm",
				"w-[38px] h-[38px] rounded-md": size === "lg"
			})}>
			{type === "plus" ? (
				<Plus className={size === "sm" ? "h-4" : "h-5"} />
			) : (
				<Minus className={size === "sm" ? "h-4" : "h-5"} />
			)}
		</Button>
	);
};