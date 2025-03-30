import type { Metadata } from "next";
import "../globals.css";
import React, { Suspense } from "react";
import { Container, Header } from "@/shared/components/shared";

export const metadata: Metadata = {
	title: "Next Pizza | Корзина",
	description: "Pizza ordering app"
};

export default function CheckoutLayout(
	{ children }: Readonly<{ children: React.ReactNode }>
) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCartButton={false} className="border-gray-200"/>
				</Suspense>
				{children}
			</Container>
		</main>
	)
}
