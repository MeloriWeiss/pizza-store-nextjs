import { Cart, CartItem } from "@prisma/client";

// export type CartItemDTO = CartItem & {cartItems: CartItem};
// export type CartItemDTO = CartItem & {
// 	productVariant: ProductVariant & {
// 		product: Product;
// 	};
// 	ingredients: Ingredient[];
// };

export interface CartDTO extends Cart {
	cartItems: CartItem[];
}

export interface CreateCartItemValues {
	productVariantId: number;
	ingredients?: number[];
}