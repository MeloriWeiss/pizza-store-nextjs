import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

export const useIngredients = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getIngredients() {
			try {
				setLoading(true);
				const newIngredients = await Api.ingredients.getAll();
				setIngredients(newIngredients);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
		getIngredients().then();
	}, []);

	return {
		ingredients,
		loading
	};
}