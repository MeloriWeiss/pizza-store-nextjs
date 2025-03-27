import { create } from "zustand/react";
import { CartStateItem, getCartDetails } from "@/shared/lib/get-cart-details";
import { Api } from "@/shared/services/api-client";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { addItem } from "@/shared/services/cart";

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];
	fetchCartItems: () => Promise<void>;
	updateCartItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
	loading: true,
	error: false,
	totalAmount: 0,
	items: [],

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.getCart();
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateCartItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item => item.id === id ? {
					...item,
					disabled: true
				} : item)
			}));
			const data = await Api.cart.removeItem(id);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item => ({
					...item,
					disabled: false,
				}))
			}));
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false });
			const data = await Api.cart.addItem(values);
			set(getCartDetails(data));
		} catch (error) {
			console.error(error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	}
}));