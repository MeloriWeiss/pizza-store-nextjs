import { axiosInstance } from "@/shared/services/instance";
import { ApiRoutes } from "@/shared/services/api-routes";
import { Ingredient } from "@prisma/client";

export const getAll = async () => {
	return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
}