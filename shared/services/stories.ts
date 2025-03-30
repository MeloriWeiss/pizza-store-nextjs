import { axiosInstance } from "@/shared/services/instance";
import { ApiRoutes } from "@/shared/services/api-routes";
import { Story } from "@prisma/client";

export const getAll = async () => {
	return (await axiosInstance.get<Story>(ApiRoutes.STORIES)).data;
}