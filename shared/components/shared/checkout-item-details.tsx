import React from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components";

interface Props {
	title?: React.ReactNode;
	loading?: React.ReactNode;
	amount?: number;
	className?: string;
}

export const CheckoutItemDetails: React.FC<Props> = ({ title, loading = false, amount, className }) => {
	return (
		<div className={cn("flex my-4", className)}>
			<div className="flex flex-1 text-lg text-neutral-500">
				{title}:
				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
			</div>
			{loading ? <Skeleton className="h-6 w-14 rounded-[8px]" /> : <span className="font-bold text-lg">{amount} ₽</span>}
		</div>
	);
};