import React from "react";
import { FormInput, WhiteBlock } from "@/shared/components/shared";
import { useSession } from "next-auth/react";

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональные данные" className={className}>
			<div className="grid grid-cols-2 gap-5">
				<FormInput name="firstName" className="text-base" placeholder="Имя" label="Имя" required={true} />
				<FormInput name="lastName" className="text-base" placeholder="Фамилия" label="Фамилия" required={true} />
				<FormInput name="email" className="text-base" placeholder="E-mail" label="E-mail" required={true} />
				<FormInput name="phone" className="text-base" placeholder="Телефон" label="Телефон" required={true} />
			</div>
		</WhiteBlock>
	);
};