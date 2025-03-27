import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
	className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex justify-between items-center', className)}>
			<div className="flex items-center gap-5 w-[55%]">
				<div className="w-[50px] h-[50px] bg-gray-200 rounded-full animate-pulse"></div>
				<h2 className="w-40 h-5 bg-gray-200 rounded animate-pulse"></h2>
			</div>
			<div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
			<div className="h-5 w-[133px] bg-gray-200 rounded animate-pulse"></div>
		</div>
	);
};