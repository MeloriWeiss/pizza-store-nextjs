'use client';

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignupFormType } from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Button, Container, FormInput, Title } from "@/shared/components";
import { updateUserInfo } from "@/app/actions";

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			repeatPassword: ""
		}
	});

	const onSubmit = async (data: SignupFormType) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password
			});
			toast.success("Данные обновлены");
		} catch (error) {
			console.error("[UpdateUserDataClientError", error);
			return toast.error("Ошибка обновления данных");
		}
	};

	const onSignOut = () => {
		signOut({
			callbackUrl: "/"
		}).then();
	};

	return (
		<Container className="my-20 flex flex-col items-center">
			<Title text="Личные данные" size="md" className="font-bold" />
			<FormProvider {...form}>
				<form className="flex flex-col gap-5 w-96 mt-8" onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label="E-mail" required />
					<FormInput name="fullName" label="Полное имя" required />
					<FormInput type="password" name="password" label="Новый пароль" required />
					<FormInput type="password" name="repeatPassword" label="Повторите пароль" required />

					<Button loading={form.formState.isSubmitting} className="text-base mt-10" type="submit">
						Сохранить
					</Button>

					<Button
						onClick={onSignOut}
						variant="secondary"
						loading={form.formState.isSubmitting}
						className="text-base"
						type="button">
						Выйти
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};