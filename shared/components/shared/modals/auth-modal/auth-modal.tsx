'use client';

import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@/shared/components";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/shared/components/shared/modals/auth-modal/forms/login-form";
import { SignupForm } from "@/shared/components/shared/modals/auth-modal/forms/signup-form";

interface Props {
	open: boolean;
	onClose: () => void;
}

enum AuthType {
	login = 'login',
	signup = 'signup',
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = useState<AuthType>(AuthType.login);

	const onSwitchType = () => {
		setType(type === AuthType.login ? AuthType.signup : AuthType.login);
	}

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogTitle />
			<DialogContent aria-describedby={undefined} className="w-[450px] bg-white p-10">
				{type === AuthType.login
					?
					<LoginForm onClose={handleClose} />
					:
					<SignupForm onClose={handleClose} />
				}
				<hr />
				<div className="flex gap-2">
					<Button
						variant="secondary"
						onClick={() => signIn("github", {
							callbackUrl: "/",
							redirect: true
						})}
						type="button"
						className="gap-2 h-12 p-2 flex-1">
						<img className="w-6 h-6" src="/common/github.svg" alt="GitHub icon" />
						GitHub
					</Button>
					<Button
						variant="secondary"
						onClick={() => signIn("google", {
							callbackUrl: "/",
							redirect: true
						})}
						type="button"
						className="gap-2 h-12 p-2 flex-1">
						<img className="w-6 h-6" src="/common/google.svg" alt="Google icon" />
						Google
					</Button>
				</div>
				<Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
					{type === AuthType.login ? 'Регистрация' : 'Войти'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
