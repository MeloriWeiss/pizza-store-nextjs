import { redirect } from "next/navigation";
import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		return redirect('/not-auth');
	}

	const user = await prisma.user.findFirst({
		where: {
			id: session.id
		}
	});

	return (
		<ProfileForm data={user} />
	)
}