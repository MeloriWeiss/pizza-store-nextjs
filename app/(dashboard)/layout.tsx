import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import React from "react";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: "--font-nunito",
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Next Pizza",
  description: "Pizza ordering app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={nunito.className}>
      <main className="min-h-screen">
        {children}
      </main>
      </body>
    </html>
  );
}
