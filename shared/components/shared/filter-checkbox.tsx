import React from "react";
import { Checkbox } from "@/shared/components/ui";

export interface FilterCheckboxProps {
	text: string;
	value: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
	name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = (
	{
		text,
		value,
		endAdornment,
		onCheckedChange,
		checked,
		name
	}
) => {
	const id = `checkbox-${name || value}-${value}`;

	return (
		<div className="flex items-center space-x-2 select-none">
			<Checkbox
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className="rounded-[8px] w-6 h-6"
				id={id}
			/>
			<label htmlFor={id} className="leading-none cursor-pointer flex-1">
				{text}
			</label>
			{endAdornment}
		</div>
	);
};