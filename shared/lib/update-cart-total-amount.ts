import { prisma } from "@/prisma/prisma-client";
import { calculateCartItemTotalPrice } from "@/shared/lib/calc-cart-item-total-price";

export const updateCartTotalAmount = async (token: string) => {
	//@ts-ignore
	const userCart = await prisma.cart.findFirst({
		where: {
			token
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

	if (!userCart) {
		return;
	}

	const totalAmount = userCart.cartItems.reduce((totalPrice, item) => totalPrice + calculateCartItemTotalPrice(item), 0);

	//@ts-ignore
	return prisma.cart.update({
		where: {
			id: userCart.id
		},
		data: {
			totalAmount
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
}