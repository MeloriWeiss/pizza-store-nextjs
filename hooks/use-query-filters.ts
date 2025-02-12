import { useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "@/hooks/use-filters";

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter();

	useEffect(() => {
		const params = {
			priceTo: (filters.priceTo !== 1000 && filters.priceTo) ? filters.priceTo : undefined,
			priceFrom: filters.priceFrom || undefined,
			sizes: Array.from(filters.sizes),
			doughTypes: Array.from(filters.doughTypes),
			ingredients: Array.from(filters.ingredients)
		};

		const query = qs.stringify(params, { arrayFormat: "comma" });
		router.push(`?${query}`, { scroll: false });
	}, [filters.priceTo, filters.priceFrom, filters.sizes, filters.doughTypes, filters.ingredients]);
}