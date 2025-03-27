'use client';

import React from "react";
import { useFormContext } from "react-hook-form";
import { ClearButton, ErrorText, Input, RequiredSymbol, Textarea } from "@/shared/components";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormTextarea: React.FC<Props> = (
	{
		name,
		label,
		required,
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
					{label} {required && <RequiredSymbol />}
				</p>
			}
			<div className="relative">
				<Textarea className="text-md resize-none" {...register(name)} {...props} />
				{value && <ClearButton onClick={onClearValue} />}
			</div>
			{errorText && <ErrorText className="mt-2">{errorText}</ErrorText>}
		</div>
	);
};