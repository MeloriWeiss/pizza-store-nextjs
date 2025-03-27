import React from "react";
import Link from "next/link";
import { Title } from "@/shared/components/shared";
import { Button } from "@/shared/components/ui";
import { Plus } from "lucide-react";
import { ProductIngredient as Ingredient } from "@prisma/client";

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
	className?: string;
}

export const ProductCard: React.FC<Props> = (
	{id, name, price, imageUrl, ingredients, className}
) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`} scroll={false}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<img src={imageUrl} alt={`Фото продукта ${name}`} className="w-[215px] h-[215px]" />
				</div>
				<Title text={name} size="sm" className="mb-1 mt-3 font-bold"></Title>
				<p className="text-sm text-gray-400">
					{ingredients.map(ingredient => ingredient.name).join(', ')}
				</p>
				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{price} ₽</b>
					</span>
					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1"/>
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	)
}