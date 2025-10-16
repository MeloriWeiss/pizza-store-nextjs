import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signupFormSchema, SignupFormType } from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button, FormInput, Title } from "@/shared/components";
import { signupUser } from "@/app/actions";

interface Props {
	onClose?: VoidFunction;
}

export const SignupForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<SignupFormType>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			repeatPassword: ""
		}
	});

	const onSubmit = async (data: SignupFormType) => {
		try {
			const response = await signupUser({
				email: data.email,
				fullName: data.fullName,
				password: data.password
			});
			toast.success("На вашу почту отправлено письмо для подтверждения регистрации", { duration: 5000 });
			onClose?.();
		} catch (error) {
			console.error("[SignupError]", error);
			toast.error("Не удалось зарегистрироваться");
		}
	};

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Регистрация" size="md" className="font-bold" />
						<p className="text-gray-400">Создайте свой аккаунт</p>
					</div>
					<img className="h-14 w-14" src="/auth/login-phone.png" alt="Телефон" />
				</div>
				<FormInput name="fullName" label="Полное имя" required />
				<FormInput name="email" label="E-mail" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<FormInput name="repeatPassword" label="Повторите пароль" type="password" required />
				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit">
					Зарегистрироваться
				</Button>
			</form>
		</FormProvider>
	);
};