import type { Metadata } from "next";
import "../globals.css";
import React from "react";

export const metadata: Metadata = {
	title: "Next Pizza",
	description: "Pizza ordering app"
};

export default function DashboardLayout(
	{ children }: Readonly<{ children: React.ReactNode }>
) {
	return (
		<main className="min-h-screen">
			{children}
		</main>
	)
}
