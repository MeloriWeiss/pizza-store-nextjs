import React from "react";
import { cn } from "@/shared/lib/utils";

interface Props {
	className?: string;
}

export const ErrorText: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<p className={cn('text-red-500 text-sm', className)}>{children}</p>
	);
};