"use client";

import React from "react";
import { Product } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "@/shared/components/shared";
import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";

interface Props {
	product: Product;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<VisuallyHidden>
				<DialogTitle></DialogTitle>
			</VisuallyHidden>
			<DialogContent aria-describedby={undefined}
										 className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[520px] bg-white overflow-hidden", className)}>
				<ChooseProductForm product={product} onSubmitAdditional={() => router.back()}/>
			</DialogContent>
		</Dialog>
	);
};