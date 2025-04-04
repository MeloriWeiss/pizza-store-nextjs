import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from "@/shared/components/shared";
import { Suspense } from "react";
import { findPizzasWithFilters } from "@/shared/lib";
import { GetSearchParams } from "@/shared/lib/find-pizzas-with-filters";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Home({searchParams}: {searchParams: SearchParams}) {
	const params = await searchParams;
	const categories = await findPizzasWithFilters(params as GetSearchParams);

	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar categories={categories.filter(category => category.products.length)}/>
			<Stories/>
			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(category => (
								category.products.length > 0 && (
									<ProductsGroupList
										title={category.name}
										categoryId={category.id}
										key={category.id}
										products={category.products}
									/>
								)
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
