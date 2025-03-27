"use client";

import React, { PropsWithChildren } from "react";
import { Button, Sheet } from "@/shared/components/ui";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "@/shared/components/shared/cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaTypes } from "@/shared/constants/pizza-types";
import { PizzaSizes } from "@/shared/constants/pizza-sizes";
import { getEndOfWord } from "@/shared/lib/get-end-of-word";
import Image from "next/image";
import { Title } from "@/shared/components/shared/title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
	const {items, totalAmount, updateCartItemQuantity, removeCartItem} = useCart();

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
					<SheetHeader>
						<SheetTitle>
							{totalAmount > 0 &&
								<div>
									В корзине <span className="font-bold">{`${items.length} товар${getEndOfWord(items.length)}`}</span>
								</div>
							}
						</SheetTitle>
					</SheetHeader>
					<SheetDescription />

					{!totalAmount &&
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image src="/common/empty-box.png" alt="Пустая корзина" width={120} height={120} />
							<Title text="Корзина пустая" size="sm" className="text-center font-bold my-2" />
							<p className="text-center text-neutral-500 mb-5">
								Добавьте хотя бы одну пиццу, чтобы совершить заказ
							</p>
							<SheetClose asChild={true}>
								<Button className="w-56 h-12 text-base" size="lg">
									<ArrowLeft className="w-5 mr-2" />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					}

					{totalAmount > 0 &&
						<>
							<div className="-mx-3 mt-5 overflow-auto scrollbar flex-1">
								{items.map(item => (
									<CartDrawerItem
										key={item.id}
										id={item.id}
										imageUrl={item.imageUrl}
										details={getCartItemDetails(item.ingredients, item.pizzaDoughType as PizzaTypes, item.size as PizzaSizes)}
										name={item.name}
										price={item.price}
										disabled={item.disabled}
										quantity={item.quantity}
										onUpdateCount={(newQuantity) => updateCartItemQuantity(item.id, newQuantity)}
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
									<Link href="/checkout">
										<Button type="submit" className="w-full h-12 text-base">
											Оформить заказ
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					}
				</div>
			</SheetContent>
		</Sheet>
	);
};