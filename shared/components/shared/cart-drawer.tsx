"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { Button, Sheet } from "@/shared/components/ui";
import {
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "@/shared/components/shared/cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { getEndOfWord } from "@/shared/lib/get-end-of-word";

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ className, children }) => {
	const items = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);
	const fetchCartItems = useCartStore(state => state.fetchCartItems);
	const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
	const removeCartItem = useCartStore(state => state.removeCartItem);

	useEffect(() => {
		fetchCartItems().then();
	}, []);

	const onUpdateCartItemCount = (id: number, quantity: number, newQuantity: number) => {
		updateItemQuantity(id, newQuantity).then();
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{`${items.length} товар${getEndOfWord(items.length)}`}</span>
					</SheetTitle>
				</SheetHeader>
				<SheetDescription />

				<div className="-mx-3 mt-5 overflow-auto scrollbar flex-1">
					{items.map(item => (
						<CartDrawerItem
							key={item.id}
							id={item.id}
							imageUrl={item.imageUrl}
							details={getCartItemDetails(item.ingredients, item.pizzaDoughType as PizzaTypes, item.size as PizzaSizes)}
							name={item.name}
							price={item.price}
							quantity={item.quantity}
							onUpdateCount={(newQuantity) => onUpdateCartItemCount(item.id, item.quantity, newQuantity)}
							onRemoveItem={() => removeCartItem(item.id)}
							className="mb-2"
						/>
					))}
				</div>

				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<div className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
							</div>
							<span className="font-bold text-lg">{totalAmount} ₽</span>
						</div>
						<Link href="/cart">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};