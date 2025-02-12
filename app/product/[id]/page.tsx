import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({params}) {
	const { id } = await params;

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id)
		}
	});

	if (!product) {
		return notFound();
	}

	return (
		<p>Product {id}</p>
	)
}