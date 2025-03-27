'use client';

import React from "react";
import { ClearButton, ErrorText, RequiredSymbol } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<Props> = (
	{
		name,
		label,
		required = true,
		className,
		...props
	}
) => {
	const {
		register,
		formState: {errors},
		watch,
		setValue
	} = useFormContext();

	const value = watch(name);
	const errorText = errors[name]?.message;

	const onClearValue = () => {
		setValue(name, '', {shouldValidate: true});
	}

	return (
		<div className={className}>
			{label &&
				<p className="font-medium mb-2">
					{label} {required && <RequiredSymbol/>}
				</p>
			}
			<div className="relative">
				<Input className="h-12 text-md" {...register(name)} {...props} />
				{value && <ClearButton onClick={onClearValue} />}
			</div>
			{errorText && <ErrorText className="mt-2">{errorText}</ErrorText>}
		</div>
	);
};