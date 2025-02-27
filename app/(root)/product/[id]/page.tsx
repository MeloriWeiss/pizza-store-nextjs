import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, ProductImage, ProductVariants, Title } from "@/shared/components/shared";

export default async function ProductPage({ params }) {
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
		<Container className="flex flex-col my-10">
			<div className="flex flex-1">
				<ProductImage imageUrl={product.imageUrl} size={40}></ProductImage>
				<div className="w-[490px] bg-[#FCFCFC] p-7 rounded-xl">
					<Title text={product.name} size="md" className="font-extrabold mb-1" />
					<p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem eos
						explicabo molestiae tempore. Amet error esse eveniet facere neque optio pariatur quaerat qui quidem sint
						tempora, ut, voluptate voluptates.
					</p>
					<ProductVariants selectedValue={'2'} variants={[
						{
							name: 'Маленькая',
							value: '1',
							disabled: false
						},
						{
							name: 'Средняя',
							value: '2',
							disabled: false
						},
						{
							name: 'Большая',
							value: '3',
							disabled: true
						},
					]}/>
				</div>
			</div>
		</Container>
	);
}