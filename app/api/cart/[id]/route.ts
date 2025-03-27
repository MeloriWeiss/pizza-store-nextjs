import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { cookiesConfig } from "@/shared/config/cookies-config";

export async function PATCH(request: NextRequest, {params}) {
	const id = Number((await params).id);

	try {
		const data: {quantity: number} = await request.json();
		const token = request.cookies.get(cookiesConfig.cartToken)?.value;

		if (!token) {
			return NextResponse.json({error: true, message: 'Токен корзины не найден'});
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: id
			}
		});

		if (!cartItem) {
			return NextResponse.json({error: true, message: 'Товар в корзине не найден'});
		}

		await prisma.cartItem.update({
			where: {
				id: id
			},
			data: {
				quantity: data.quantity
			}
		});

		const updatedUserCart = await updateCartTotalAmount(token);
		return NextResponse.json(updatedUserCart);

	} catch (error) {
		console.log('CART_PATCH_SERVER_ERROR', error);
		return NextResponse.json({error: true, message: 'Не удалось обновить корзину'}, {status: 500});
	}
}

export async function DELETE(request: NextRequest, {params}) {
	const id = Number((await params).id);

	try {
		const token = request.cookies.get(cookiesConfig.cartToken)?.value;

		if (!token) {
			return NextResponse.json({error: true, message: 'Токен корзины не найден'});
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id
			}
		});

		if (!cartItem) {
			return NextResponse.json({error: true, message: 'Товар в корзине не найден'});
		}

		await prisma.cartItem.deleteMany({
			where: {
				id
			}
		});

		const updatedUserCart = await updateCartTotalAmount(token);
		return NextResponse.json(updatedUserCart);

	} catch (error) {
		console.log('CART_DELETE_SERVER_ERROR', error);
		return NextResponse.json({error: true, message: 'Не удалось очистить корзину'}, {status: 500});
	}
}