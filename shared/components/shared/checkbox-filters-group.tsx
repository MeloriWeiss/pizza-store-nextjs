"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "@/shared/components/shared/filter-checkbox";
import { Input, Skeleton } from "@/shared/components/ui";

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selectedIds?: Set<string>;
	name?: string;
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
	{
		title,
		items,
		defaultItems,
		limit = 5,
		loading,
		searchInputPlaceholder = "Поиск...",
		onClickCheckbox,
		defaultValue,
		selectedIds,
		name,
		className
	}
) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : (defaultItems || items).slice(0, limit);

	const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>
				{
					Array(limit).fill(0).map((_, index) => (
						<Skeleton key={index} className="h-6 mt-4 bg-gray-100 rounded-[8px]"/>
					))
				}
				<Skeleton className="w-28 h-6 mt-4 bg-gray-100 rounded-[8px]"/>
			</div>
		)
	}

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>
			{showAll &&
				<div className="mb-5">
					<Input onChange={onChangeSearchInput}
								 placeholder={searchInputPlaceholder}
								 className="bg-gray-50 border-none" />
				</div>
			}
			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<FilterCheckbox
						text={item.text}
						value={item.value}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						checked={selectedIds?.has(item.value)}
						endAdornment={item.endAdornment}
						key={item.value}
						name={name}
					/>
				))}
			</div>
			{(items.length > limit && !searchValue.length) &&
				<div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
					<button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
						{showAll ? "Скрыть" : "Показать все"}
					</button>
				</div>
			}
		</div>
	);
};