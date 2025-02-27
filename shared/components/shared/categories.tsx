"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";

interface Props {
	categories: Category[];
	className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
	const activeCategoryId = useCategoryStore(state => state.activeCategoryId);
	return (
		<div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
			{categories.map(({ id, name }) => (
				<a className={cn(
					"flex items-center font-bold h-11 rounded-2xl px-5",
					activeCategoryId === id && "bg-white shadow-md shadow-gray-200 text-primary"
				)}
					 key={id}
					 href={`#${name}`}>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};