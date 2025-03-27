import React from "react";

export interface PayOrderParams {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<PayOrderParams> = (
	{
		orderId,
		totalAmount,
		paymentUrl
	}
) => (
	<div>
		<h1>Заказ №{orderId}</h1>
		<p>Оплатите заказ на самму {totalAmount}₽. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты.</p>
	</div>
);