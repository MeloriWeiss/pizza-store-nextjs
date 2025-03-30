import React from "react";
import { CartItem } from "@prisma/client";

interface VerificationParams {
	userId: string;
	code: string;
}

export const VerificationTemplate: React.FC<VerificationParams> = ({ userId, code }) => (
	<div>
		<p>Код подтверждения: <h2>{code}</h2></p>
		<p>Перейдите <a href={`${process.env.BASE_URL}api/auth/verify?userId=${userId}&code=${code}`}>по ссылке</a> для подтверждения аккаунта</p>
	</div>
);