import React from "react";
import { CheckoutItemDetails } from "@/shared/components/shared/checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "@/shared/components";
import { WhiteBlock } from "@/shared/components/shared/white-block";

interface Props {
	totalAmount: number;
	loading?: boolean;
}

const SERVICE_PERCENTAGE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
	const DELIVERY_PRICE = totalAmount !== 0 ? 250 : 0;

	const servicePrice = totalAmount * SERVICE_PERCENTAGE / 100;
	const totalPrice = totalAmount + servicePrice + DELIVERY_PRICE;

	return (
		<WhiteBlock className="p-6 sticky top-4">
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				{
					loading ? <Skeleton className="w-36 h-[34px] rounded-[12px]" /> :
						<span className="text-[34px] leading-none font-extrabold">{totalPrice} ₽</span>
				}
			</div>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package className="mr-3 text-gray-400" />
						Товары
					</div>
				}
				amount={totalAmount}
				loading={loading}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Percent className="mr-3 text-gray-400" />
						Сервис
					</div>
				}
				amount={servicePrice}
				loading={loading}
			/>
			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck className="mr-3 text-gray-400" />
						Доставка
					</div>
				}
				amount={DELIVERY_PRICE}
				loading={loading}
			/>
			<Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти к оплате
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	);
};