import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: UserRole;
			name: string;
			image: string;
		}
	}

	interface User extends DefaultUser {
		role: UserRole;
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string;
		fullName: string;
		role: UserRole;
	}
}