'use client';

import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from "@/shared/components/shared";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
	hasSearch?: boolean;
	hasCartButton?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCartButton = true, className }) => {
	const router = useRouter();
	const [openAuthModal, setOpenAuthModal] = useState(false);
	const searchParams = useSearchParams();
	const {data: session} = useSession();

	useEffect(() => {
		if (searchParams.has('paid')) {
			toast.success('Заказ успешно оплачен!');
			router.replace('/');
		}
		if (searchParams.has('verified')) {
			toast.success('Почта успешно подтверждена!');
			router.replace('/');
		}
		if (searchParams.has('not-verified')) {
			toast.error('Код подтверждения истёк. Мы отправили новый код на вашу почту', {duration: 5000});
			router.replace('/');
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