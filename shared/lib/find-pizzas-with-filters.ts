import { priceRangeConfig } from "@/shared/config/price-range-config";
import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	doughTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

export const findPizzasWithFilters = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(",").map(Number);
	const doughTypes = params.doughTypes?.split(",").map(Number);
	const ingredientsIds = params.ingredients?.split(",").map(Number);

	const minPrice = Number(params.priceFrom) || priceRangeConfig.DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || priceRangeConfig.DEFAULT_MAX_PRICE;

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc'
				},
				where: {
					ingredients: ingredientsIds
						? {
							some: {
								id: {
									in: ingredientsIds
								}
							}
						}
						: undefined,
					variants: {
						some: {
							size: sizes ? {
								in: sizes
							} : undefined,
							pizzaDoughType: doughTypes ? {
								in: doughTypes
							} : undefined,
							price: {
								gte: minPrice,
								lte: maxPrice,
							}
						}
					}
				},
				include: {
					ingredients: true,
					variants: {
						orderBy: {
							price: 'asc'
						}
					}
				}
			}
		}
	});

	return categories;
};