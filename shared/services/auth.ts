import { axiosInstance } from "@/shared/services/instance";
import { User } from "@prisma/client";
import { ApiRoutes } from "@/shared/services/api-routes";

export const getMe = async () => {
	return (await axiosInstance.get<User>(ApiRoutes.AUTH + '/me')).data;
}