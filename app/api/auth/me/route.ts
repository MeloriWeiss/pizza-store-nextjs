import { NextResponse } from "next/server";
import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
	try {
		const user = await getUserSession();

		if (!user) {
			return NextResponse.json({error: true, message: 'Вы не авторизованы'}, {status: 401});
		}

		const data = await prisma.user.findUnique({
			where: {
				id: Number(user.id)
			},
			select: {
				fullName: true,
				email: true,
				password: false
			}
		});

		return NextResponse.json(data);

	} catch (error) {
		console.log('[USER_GET] server error', error);
		return NextResponse.json({error: true, message: 'Не удалось получить информацию о пользователе'}, {status: 500});
	}
}