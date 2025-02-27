'use client';

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { CartDrawer } from "@/shared/components/shared";
import { useCartStore } from "@/shared/store";

interface Props {
	className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
	const totalAmount = useCartStore(state => state.totalAmount);
	const items = useCartStore(state => state.items);

	return (
		<CartDrawer>
			<Button className={cn("group relative", className)}>
				<b>{totalAmount} ₽</b>
				<span className="h-full w-[1px] bg-white/30 mx-3"></span>
				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart size={16} className="relative" strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight size={20}
										className="absolute right-5 transition diration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
			</Button>
		</CartDrawer>
	);
};