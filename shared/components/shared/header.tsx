import React from "react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Button } from "@/shared/components/ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { CartButton, Container, SearchInput } from "@/shared/components/shared";
import Link from "next/link";

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn("border border-b", className)}>
			<Container className="flex items-center justify-between py-8">
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="logo" width={35} height={35}></Image>
						<div>
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
						</div>
					</div>
				</Link>
				<div className="mx-10 flex-1">
					<SearchInput />
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Войти
					</Button>
					<CartButton></CartButton>
				</div>
			</Container>
		</header>
	);
};