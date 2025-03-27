import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, ChooseProductForm } from "@/shared/components/shared";
import React from "react";
import { Product } from "@prisma/client";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id)
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							variants: true
						}
					}
				}
			},
			variants: {
				orderBy: {}
			}
		}
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<ChooseProductForm product={product as Product} />
		</Container>
	);
}