"use server";

import { CheckoutFormType } from "@/shared/constants";
import { prisma } from "@/prisma/prisma-client";
import { Cart, Order, OrderStatus, Prisma, User, VerificationCode } from "@prisma/client";
import { cookies } from "next/headers";
import { cookiesConfig } from "@/shared/config/cookies-config";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { PaymentData } from "@/types/yookassa";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationTemplate } from "@/shared/components/shared/email-templates/verification";

export async function createOrder(data: CheckoutFormType) {
	try {
		const cookieStore = cookies();
		const cartToken = (await cookieStore).get(cookiesConfig.cartToken)?.value;

		if (!cartToken) {
			throw new Error("Cart token not found");
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
			throw new Error("Cart not found");
		}

		if (userCart.totalAmount === 0) {
			throw new Error("Cart is empty");
		}

		const order = await prisma.order.create({
			data: {
				fullName: data.firstName + " " + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				token: cartToken,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				products: JSON.stringify(userCart.cartItems)
			}
		}) as Order;

		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: "Оплата заказа №" + order.id
		}) as PaymentData;

		if (!paymentData) {
			throw new Error("Payment data not found");
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
				id: order.id
			},
			data: {
				paymentId: paymentData.id
			}
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

		await sendEmail(data.email, `Next Pizza | Оплата заказа ${order.id}`, PayOrderTemplate({
			orderId: order.id,
			totalAmount: order.totalAmount,
			paymentUrl: paymentUrl
		})).then();

		return paymentUrl;

	} catch (error) {
		console.log("[CreateOrder] server error", error);
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();
		if (!currentUser) {
			throw new Error("Пользователь не найден");
		}

		const user = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id)
			}
		}) as User;
		if (!user) {
			throw new Error("Пользователь не найден");
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id)
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : user.password
			}
		});
	} catch (error) {
		console.log("[UPDATE_USER_ERROR]", error);
		throw error;
	}
}

export async function signupUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email
			}
		}) as User;

		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена');
			}

			throw new Error("Пользователь уже существует");
		}

		const newUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10)
			}
		}) as User;

		const code = Math.floor(10000 + Math.random() * 900000).toString();

		console.log(code, newUser.id)

		await prisma.verificationCode.create({
			data: {
				code,
				userId: newUser.id,
			}
		});
		console.log(333);

		await sendEmail(
			newUser.email,
			'Next Pizza | Подтверждение регистрации',
			VerificationTemplate({
				userId: String(newUser.id),
				code
			})
		);

	} catch (error) {
		console.log("[CREATE_USER_ERROR]", error);
		throw error;
	}
}