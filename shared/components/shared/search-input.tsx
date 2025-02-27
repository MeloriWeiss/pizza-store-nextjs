"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { useDebounce } from "use-debounce";

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [focused, setFocused] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function getProducts() {
			try {
				const products = await Api.products.search(searchQuery);
				setProducts(products);
			} catch (error) {
				console.log(error);
			}
		}
		getProducts().then();
	}, [debouncedSearchQuery]);

	const onClickSearchItem = () => {
		setFocused(false);
		setSearchQuery("");
	};

	return (
		<>
			{focused &&
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" onClick={() => setFocused(false)}></div>
			}
			<div className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					type="text"
					className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
				/>
				{products.length > 0 &&
					<div
						className={cn("absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
							focused && "visible opacity-100 top-12")}>
						{products.map(product => (
							<Link href={`/product/${product.id}`} key={product.id} onClick={onClickSearchItem}>
								<div className="flex items-center gap-2 px-3 py-2 hover:bg-primary/10 cursor-pointer">
									<img src={product.imageUrl} alt={product.name} className="w-8 h-8" />
									<span>{product.name}</span>
								</div>
							</Link>
						))}
					</div>
				}
			</div>
		</>
	);
};