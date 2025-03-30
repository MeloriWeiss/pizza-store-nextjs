import type { Metadata } from "next";
import React, {Suspense} from "react";
import { Header } from "@/shared/components/shared";

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Pizza ordering app",
};

export default function HomeLayout({
  children,
	modal
}: Readonly<{
  children: React.ReactNode;
	modal: React.ReactNode;
}>) {
  return (
		<main className="min-h-screen">
			<Suspense>
				<Header />
			</Suspense>
			{modal}
			{children}
		</main>
  );
}
