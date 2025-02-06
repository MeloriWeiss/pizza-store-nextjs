"use client";

import React, { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "@/components/shared/filter-checkbox";
import { Input } from "@/components/ui";

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
	{
		title,
		items,
		defaultItems,
		limit = 5,
		searchInputPlaceholder = "Поиск...",
		onChange,
		defaultValue,
		className
	}
) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

	const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

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
						onCheckedChange={console.log}
						checked={false}
						endAdornment={item.endAdornment}
						key={item.value}
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