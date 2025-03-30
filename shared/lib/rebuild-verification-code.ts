import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/shared/lib/send-email";
import { VerificationTemplate } from "@/shared/components/shared/email-templates/verification";
import { User } from "@prisma/client";

export const rebuildVerificationCode = async (user: User) => {
	await prisma.verificationCode.delete({
		where: {
			userId: Number(user.id)
		}
	});

	const code = Math.floor(10000 + Math.random() * 900000).toString();
	await prisma.verificationCode.create({
		data: {
			code,
			userId: Number(user.id)
		}
	});

	await sendEmail(
		user.email,
		'Next Pizza | Подтверждение регистрации',
		VerificationTemplate({
			userId: String(user.id),
			code
		})
	);
}