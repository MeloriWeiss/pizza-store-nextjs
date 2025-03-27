'use client';

import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from "@/shared/components/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
	hasSearch?: boolean;
	hasCartButton?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCartButton = true, className }) => {
	const [openAuthModal, setOpenAuthModal] = useState(false);
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has('paid')) {
			toast.success('Заказ успешно оплачен!');
		}
	}, []);

	return (
		<header className={cn("border-b", className)}>
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
				{hasSearch &&
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				}
				<div className="flex items-center gap-3">
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
					<ProfileButton onSignIn={() => setOpenAuthModal(true)} />
					{hasCartButton &&
						<CartButton></CartButton>
					}
				</div>
			</Container>
		</header>
	);
};