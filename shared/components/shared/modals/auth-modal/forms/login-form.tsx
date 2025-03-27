import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormType } from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Title } from "@/shared/components";
import toast from "react-hot-toast";
import { signIn, SignInResponse } from "next-auth/react";

interface Props {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		}
	});

	const onSubmit = async (data: LoginFormType) => {
		try {
			const response = await signIn('credentials', {
				...data,
				redirect: false
			});
			if (!(response as SignInResponse).ok) {
				throw Error();
			}
			toast.success('Вы успешно авторизовались');
			onClose?.();
		} catch (error) {
			console.error('[LoginError]', error);
			toast.error('Не удалось войти в аккаунт');
		}
	}

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">Введите почту, чтобы войти в аккаунт</p>
					</div>
					<img className="h-14 w-14" src="/auth/login-phone.png" alt="Телефон" />
				</div>
				<FormInput name="email" label="E-mail" required />
				<FormInput name="password" label="Пароль" type="password" required />
				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit">
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};