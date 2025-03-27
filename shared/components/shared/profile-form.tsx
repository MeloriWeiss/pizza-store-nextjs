import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, SignupFormType } from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			repeatPassword: '',
		}
	});



	return (
		<div></div>
	);
};