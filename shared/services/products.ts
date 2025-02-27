import { axiosInstance } from "@/shared/services/instance";
import { Product } from "@prisma/client";
import { ApiRoutes } from "@/shared/services/api-routes";

export const search = async (query: string) => {
	const config = { params: { query } };
	return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, config)).data;
};