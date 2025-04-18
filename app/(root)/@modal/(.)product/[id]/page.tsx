import { prisma } from "@/prisma/prisma-client";
import { ChooseProductModal } from "@/shared/components/shared";
import { notFound } from "next/navigation";
import { Product, User } from "@prisma/client";

export default async function ProductModalPage({ params }) {
	const { id } = await params;
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			variants: true,
		}
	});

	if (!product) {
		return notFound();
	}

	return (
		<ChooseProductModal product={product as Product}></ChooseProductModal>
	);
}