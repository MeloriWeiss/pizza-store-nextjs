import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { User, UserRole, VerificationCode } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { rebuildVerificationCode, sendEmail } from "@/shared/lib";
import { VerificationTemplate } from "@/shared/components/shared/email-templates/verification";
import { verificationConfig } from "@/shared/config/verification-config";

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			profile(profile) {
				return {
					id: String(profile.id),
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: UserRole.USER
				};
			}
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}
				const values = {
					email: credentials.email
				};

				const user = await prisma.user.findFirst({
					where: values
				}) as User;
				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(credentials.password, user.password);
				if (!isPasswordValid) {
					return null;
				}

				if (!user.verified) {
					const existingCode = await prisma.verificationCode.findFirst({
						where: {
							userId: user.id
						}
					}) as VerificationCode;

					if (!existingCode) {
						const code = Math.floor(10000 + Math.random() * 900000).toString();
						await prisma.verificationCode.create({
							data: {
								code,
								userId: Number(user.id)
							}
						});

						await sendEmail(
							user.email,
							"Next Pizza | Подтверждение регистрации",
							VerificationTemplate({
								userId: String(user.id),
								code
							})
						);
						return null;
					}

					if ((new Date()).getTime() - existingCode.createdAt.getTime() > verificationConfig.codeValidityPeriod) {
						await rebuildVerificationCode(user);
						return null;
					}

					await sendEmail(
						user.email,
						"Next Pizza | Подтверждение аккаунта",
						VerificationTemplate({
							userId: String(user.id),
							code: existingCode.code
						})
					);
					return null;
				}

				return {
					id: user.id,
					email: user.email,
					name: user.fullName,
					role: user.role
				};
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt"
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === "credentials") {
					return true;
				}
				if (!user.email) {
					return false;
				}

				const foundUser = await prisma.user.findFirst({
					where: {
						OR: [
							{ provider: account?.provider, providerId: account?.providerAccountId },
							{ email: user.email }
						]
					}
				}) as User;

				if (foundUser) {
					await prisma.user.update({
						where: {
							id: foundUser.id
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId
						}
					});
					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || `User #${user.id}`,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId
					}
				});

				return true;
			} catch (error) {
				console.error("[SignInError]", error);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token;
			}
			const user = await prisma.user.findFirst({
				where: {
					email: token.email
				}
			}) as User;
			if (user) {
				token.id = String(user.id);
				token.email = String(user.email);
				token.fullName = String(user.fullName);
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		}
	}
};