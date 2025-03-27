import { useEffect } from "react";
import { useCartStore } from "@/shared/store";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

type ReturnProps = {
	items: CartStateItem[],
	totalAmount: number,
	updateCartItemQuantity: (id: number, quantity: number) => Promise<void>,
	removeCartItem: (id: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore(state => state);

	useEffect(() => {
		cartState.fetchCartItems().then();
	}, []);

	return cartState;
}