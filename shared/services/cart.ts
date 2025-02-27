import { axiosInstance } from "@/shared/services/instance";
import { CartDTO, CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { ApiRoutes } from "@/shared/services/api-routes";

export const getCart = async () => {
	return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
}

export const updateItemQuantity = async (itemId: number, quantity: number) => {
	return (await axiosInstance.patch<CartDTO>(ApiRoutes.CART + '/' + itemId, {quantity})).data;
}

export const removeItem = async (itemId: number) => {
	return (await axiosInstance.delete<CartDTO>(ApiRoutes.CART + '/' + itemId)).data;
}

export const addItem = async (values: CreateCartItemValues) => {
	return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)).data;
}