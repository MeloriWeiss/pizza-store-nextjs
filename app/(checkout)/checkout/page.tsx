"use client";

import {
	CheckoutSidebar,
	Title,
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm
} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormType } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false);
	const { items, totalAmount, updateCartItemQuantity, removeCartItem, loading } = useCart();
	const form = useForm<CheckoutFormType>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: ""
		}
	});

	const onSubmit = async (data: CheckoutFormType) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);
			toast.success('Переход к оплате...');

			if (url) {
				location.href = url;
			}

		} catch (error) {
			console.log(error);
			setSubmitting(false);
			toast.error('Не удалось создать заказ');
		}
	};

	return (
		<div className="mt-10">
			<Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex gap-10">
						<div className="flex flex-col gap-10 flex-1 mb-10">
							<CheckoutCart
								items={items}
								updateCartItemQuantity={updateCartItemQuantity}
								removeCartItem={removeCartItem}
								loading={loading}
							/>
							<CheckoutPersonalForm />
							<CheckoutAddressForm />
						</div>
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
						</div>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}