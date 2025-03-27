'use client';

import React from "react";
import { AddressInput, ErrorText, FormTextarea, WhiteBlock } from "@/shared/components/shared";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title="3. Адрес доставки" className={className}>
			<div className="flex flex-col gap-5">
				<Controller
					control={control}
					name="address"
					render={({ field, fieldState }) => <>
						<AddressInput onChange={field.onChange} label="Адрес" name="address"/>
						{fieldState.error?.message && <ErrorText>{fieldState.error.message}</ErrorText>}
					</>}
				/>
				<FormTextarea name={"comment"} rows={5} placeholder="Комментарий к заказу" className="text-base" />
			</div>
		</WhiteBlock>
	);
};