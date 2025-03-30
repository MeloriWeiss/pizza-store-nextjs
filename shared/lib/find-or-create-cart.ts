import { prisma } from "@/prisma/prisma-client";
import { Cart } from "@prisma/client";

export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token
		}
	}) as Cart;

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token
			}
		}) as Cart;
	}

	return userCart;
}