import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Введите корректную почту" }),
	password: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" }),
});

export const signupFormSchema = loginFormSchema.merge(
	z.object({
		fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
		repeatPassword: z.string().min(8),
	})
).refine(data => data.password === data.repeatPassword, {
	message: "Пароли не совпадают",
	path: ["repeatPassword"],
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
export type SignupFormType = z.infer<typeof signupFormSchema>;