import React from "react";
import { CartItem } from "@prisma/client";

export interface PayOrderParams {
	orderId: number;
	totalAmount: number;
	products: CartItem[];
}

export const OrderSucceededTemplate: React.FC<PayOrderParams> = (
	{
		orderId,
		totalAmount,
		products
	}
) => (
	<div>
		<h1>Спасибо за покупку!</h1>
		<p>Заказ №{orderId} на самму {totalAmount}₽ успешно оплачен! Список товаров:</p>
		<hr/>
		<ul>
			{products.map(product => (
				<li key={product.id}>
					{product.productVariant.product.name} | {product.productVariant.price}₽ &times; {product.quantity} шт.
				</li>
			))}
		</ul>
	</div>
);