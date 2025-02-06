'use client';

import React, { useRef, useState } from "react";
import { ProductCard, Title } from "@/components/shared";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@reactuses/core";
import { useCategoryStore } from "@/store/category";

interface Props {
	title: string;
	products: any[];
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
					<ProductCard id={product.id} name={product.name} price={product.items[0].price} imageUrl={product.imageUrl} key={product.id}/>
				))}
			</div>
		</div>
	);
};