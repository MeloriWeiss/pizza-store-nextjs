import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackData } from "@/types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { Order, OrderStatus } from "@prisma/client";
import { sendEmail } from "@/shared/lib";
import { OrderSucceededTemplate } from "@/shared/components/shared/email-templates/order-succeeded";

export async function POST(request: NextRequest) {
	try {
		const data = (await request.json()) as PaymentCallbackData;

		const order = await prisma.order.findFirst({
			where: {
				id: Number(data.object.metadata.order_id),
			},
			include: {
				user: true
			}
		}) as Order;

		if (!order) {
			return NextResponse.json({error: true, message: 'Заказ не найден'});
		}

		const isSucceeded = data.object.status === 'succeeded';

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			}
		});

		if (isSucceeded) {
			await sendEmail(order.email, 'Next Pizza | Заказ успешно оплачен', OrderSucceededTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				products: JSON.parse(order.products)
			}));
		}

	} catch (error) {
		console.log('[CheckoutPaymentCallback] error', error);
		return NextResponse.json({error: true, message: 'Ошибка обработки платежа'});
	}
}