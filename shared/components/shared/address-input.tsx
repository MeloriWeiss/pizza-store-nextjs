"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import React from "react";
import { RequiredSymbol } from "@/shared/components";

interface Props {
	name: string;
	label: string;
	required?: boolean;
	onChange?: (value?: string) => void;
	className?: string;
}

export const AddressInput: React.FC<Props> = (
	{
		name,
		label,
		required = true,
		onChange,
		className
	}
) => {
	return (
		<div className={className}>
			{label &&
				<p className="font-medium mb-2">
					{label} {required && <RequiredSymbol />}
				</p>
			}
			<div className="relative">
				<AddressSuggestions uid="dadata-address-order-page" token="6172184c8d505875a99d4fc95042220e997f1c09"
														onChange={(data) => onChange?.(data?.value)} />
			</div>
		</div>
	);
};