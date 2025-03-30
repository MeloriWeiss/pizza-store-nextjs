import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { User, VerificationCode } from "@prisma/client";
import { verificationConfig } from "@/shared/config/verification-config";
import { rebuildVerificationCode } from "@/shared/lib";

export async function GET(request: NextRequest) {
	try {
		const code = request.nextUrl.searchParams.get('code');
		const userId = Number(request.nextUrl.searchParams.get('userId'));

		if (!code) {
			return NextResponse.json({ error: true, message: "Неверный код" }, { status: 400 });
		}
		if (!userId) {
			return NextResponse.json({ error: true, message: "Пользователь не найден" }, { status: 400 });
		}

		const verificationCode = await prisma.verificationCode.findFirst({
			where: {
				AND: [
					{code},
					{userId}
				]
			}
		}) as VerificationCode;
		if (!verificationCode) {
			return NextResponse.json({ error: true, message: "Неверный код" }, { status: 400 });
		}

		if ((new Date()).getTime() - verificationCode.createdAt.getTime() > verificationConfig.codeValidityPeriod) {
			const user = await prisma.user.findFirst({
				where: {
					id: userId
				}
			}) as User;

			if (!user) {
				return NextResponse.json({error: true, message: 'Не удалось обновить верификационный код'}, {status: 400});
			}

			await rebuildVerificationCode(user, verificationCode.id);
			return NextResponse.redirect(new URL('/?not-verified', request.url));
		}

		await prisma.user.update({
			where: {
				id: verificationCode.userId,
			},
			data: {
				verified: new Date()
			}
		});

		await prisma.verificationCode.delete({
			where: {
				id: verificationCode.id
			}
		});

		return NextResponse.redirect(new URL('/?verified', request.url));

	} catch (error) {
		console.error("[VERIFY_GET] server error", error);
		return NextResponse.json({ error: true, message: "Не удалось подтвердить пользователя" }, { status: 500 });
	}
}