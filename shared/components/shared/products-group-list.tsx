'use client';

import React, { useRef } from "react";
import { ProductCard, Title } from "@/shared/components/shared";
import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@reactuses/core";
import { useCategoryStore } from "@/shared/store/category";
import { Product } from "@prisma/client";

interface Props {
	title: string;
	products: Product[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = (
	{ title, products, categoryId, className, listClassName }
) => {
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.4,
	};

	const setActiveCategoryId = useCategoryStore(state => state.setActiveCategoryId);

	const intersectionRef = useRef(null);
	const intersection = useIntersectionObserver(
		intersectionRef,
		(entry) => {
			if (entry[0].isIntersecting) {
				setActiveCategoryId(categoryId);
			}
		},
		options
	);

	return (
		<div className={className} ref={intersectionRef} id={title}>
			<Title text={title} size="lg" className="font-extrabold mb-5"/>
			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{products.map((product, index) => (
					<ProductCard
						id={product.id}
						name={product.name}
						price={product.variants[0].price}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						key={product.id}/>
				))}
			</div>
		</div>
	);
};