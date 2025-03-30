import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { cookiesConfig } from "@/shared/config/cookies-config";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { CartItem } from "@prisma/client";

export async function GET(request: NextRequest) {
	try {
		const token = request.cookies.get(cookiesConfig.cartToken)?.value;

		if (!token) {
			return NextResponse.json({totalAmount: 0, cartItems: []});
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{token}
				]
			},
			include: {
				cartItems: {
					orderBy: {
						createdAt: 'desc'
					},
					include: {
						productVariant: {
							include: {
								product: true
							}
						},
						ingredients: true
					}
				}
			}
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log('[CART_GET] server error', error);
		return NextResponse.json({error: true, message: 'Не удалось получить корзину'}, {status: 500})
	}
}

export async function POST(request: NextRequest) {
	try {
		let token = request.cookies.get(cookiesConfig.cartToken)?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data: CreateCartItemValues = await request.json();

		const suitableCartItems: CartItem[] = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productVariantId: data.productVariantId,
				ingredients: {
					every: {
						id: {
							in: data.ingredients
						}
					},
				}
			},
			include: {
				ingredients: true
			}
		});

		let existingCartItem: CartItem | null = null;

		if (suitableCartItems) {
			suitableCartItems.forEach(cartItem => {

				const foundIngredients: number[] = [];
				cartItem.ingredients.forEach(ingredient => {
					const foundIngredient = data.ingredients?.find(ingredientId => ingredientId === ingredient.id);
					if (foundIngredient) {
						foundIngredients.push(foundIngredient);
					}
				});
				if (foundIngredients.length === cartItem.ingredients.length) {
					existingCartItem = cartItem;
				}
			});
		}

		if (existingCartItem && existingCartItem.ingredients.length === data.ingredients?.length) {
			await prisma.cartItem.update({
				where: {
					id: existingCartItem.id
				},
				data: {
					quantity: existingCartItem.quantity + 1
				}
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariantId: data.productVariantId,
					quantity: 1,
					ingredients: {
						connect: data.ingredients?.map(id => ({id}))
					}
				}
			});
		}

		const updatedUserCart = await updateCartTotalAmount(token);
		const response = NextResponse.json(updatedUserCart);
		response.cookies.set(cookiesConfig.cartToken, token);
		return response;

	} catch (error) {
		console.log('[CART_POST] server error', error);
		return NextResponse.json({error: true, message: 'Не удалось создать корзину'}, {status: 500});
	}
}