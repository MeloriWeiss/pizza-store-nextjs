import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "@/shared/components/shared";

interface Props {
	title?: string;
	endAdornment?: React.ReactNode;
	className?: string;
	contentClassName?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = (
	{
		title,
		endAdornment,
		contentClassName,
		className,
		children
	}
) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title &&
				<div className="flex justify-between items-center p-5 px-7 border-b border-gray-100">
					<Title text={title} size="sm" className="font-bold" />
					{endAdornment}
				</div>
			}
			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	);
};