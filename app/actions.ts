'use server';

import { CheckoutFormType } from "@/shared/constants";
import { prisma } from "@/prisma/prisma-client";
import { Cart, Order, OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { cookiesConfig } from "@/shared/config/cookies-config";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { PaymentData } from "@/types/yookassa";

export async function createOrder(data: CheckoutFormType) {
	try {
		const cookieStore = cookies();
		const cartToken = (await cookieStore).get(cookiesConfig.cartToken)?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token: cartToken
			},
			include: {
				user: true,
				cartItems: {
					include: {
						ingredients: true,
						productVariant: {
							include: {
								product: true
							}
						}
					}
				}
			}
		}) as Cart;

		if (!userCart) {
			throw new Error('Cart not found');
		}

		if (userCart.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		const order = await prisma.order.create({
			data: {
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				token: cartToken,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				products: JSON.stringify(userCart.cartItems),
			}
		}) as Order;

		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата заказа №' + order.id
		}) as PaymentData;

		if (!paymentData) {
			throw new Error('Payment data not found');
		}

		await prisma.cart.update({
			where: {
				id: userCart.id
			},
			data: {
				totalAmount: 0
			}
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id
			}
		});

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			}
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendEmail(data.email, `Next Pizza | Оплата заказа ${order.id}`, PayOrderTemplate({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl: paymentUrl,
		})).then();

		return paymentUrl;

	} catch (error) {
		console.log('[CreateOrder] server error', error);
	}
}