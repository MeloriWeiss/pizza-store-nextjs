import { hashSync } from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient()

const users = [
	{
		fullName: "User",
		email: "user@test.ru",
		password: hashSync("12345678", 10),
		verified: new Date(),
		role: UserRole.USER
	},
	{
		fullName: "Admin",
		email: "admin@test.ru",
		password: hashSync("12345678", 10),
		verified: new Date(),
		role: UserRole.ADMIN
	}
]

const categories = [
	{name: 'Пиццы'},
	{name: 'Завтрак'},
	{name: 'Закуски'},
	{name: 'Коктейли'},
	{name: 'Напитки'},
]

const ingredients = [
	{
		name: 'Сырный бортик',
		price: 179,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-1.png',
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-2.png',
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-3.png',
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-4.png',
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-5.png',
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-6.png',
	},
	{
		name: 'Ветчина',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-7.png',
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-8.png',
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-9.png',
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-10.png',
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-11.png',
	},
	{
		name: 'Красный лук',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-12.png',
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-13.png',
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-14.png',
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-15.png',
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-16.png',
	},
	{
		name: 'Митболы',
		price: 79,
		imageUrl: process.env.BASE_URL + 'ingredients/ingredient-17.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

const products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imageUrl: process.env.BASE_URL + 'products/product-1.png',
		categoryId: 2,
	},
	{
		name: 'Омлет с пепперони',
		imageUrl: process.env.BASE_URL + 'products/product-2.png',
		categoryId: 2,
	},
	{
		name: 'Кофе Латте',
		imageUrl: process.env.BASE_URL + 'products/product-3.png',
		categoryId: 2,
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imageUrl: process.env.BASE_URL + 'products/product-4.png',
		categoryId: 3,
	},
	{
		name: 'Куриные наггетсы',
		imageUrl: process.env.BASE_URL + 'products/product-5.png',
		categoryId: 3,
	},
	{
		name: 'Картофель из печи с соусом 🌱',
		imageUrl: process.env.BASE_URL + 'products/product-6.png',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: process.env.BASE_URL + 'products/product-7.png',
		categoryId: 3,
	},
	{
		name: 'Острый Додстер 🌶️🌶️',
		imageUrl: process.env.BASE_URL + 'products/product-8.png',
		categoryId: 3,
	},
	{
		name: 'Банановый молочный коктейль',
		imageUrl: process.env.BASE_URL + 'products/product-9.png',
		categoryId: 4,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imageUrl: process.env.BASE_URL + 'products/product-10.png',
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imageUrl: process.env.BASE_URL + 'products/product-11.png',
		categoryId: 4,
	},
	{
		name: 'Классический молочный коктейль 👶',
		imageUrl: process.env.BASE_URL + 'products/product-12.png',
		categoryId: 4,
	},
	{
		name: 'Ирландский Капучино',
		imageUrl: process.env.BASE_URL + 'products/product-13.png',
		categoryId: 5,
	},
	{
		name: 'Кофе Карамельный капучино',
		imageUrl: process.env.BASE_URL + 'products/product-14.png',
		categoryId: 5,
	},
	{
		name: 'Кофе Кокосовый латте',
		imageUrl: process.env.BASE_URL + 'products/product-15.png',
		categoryId: 5,
	},
	{
		name: 'Кофе Американо',
		imageUrl: process.env.BASE_URL + 'products/product-16.png',
		categoryId: 5,
	},
	{
		name: 'Кофе Латте',
		imageUrl: process.env.BASE_URL + 'products/product-17.png',
		categoryId: 5,
	},
];

async function up() {
	//@ts-ignore
	await prisma.user.createMany({
		data: users
	});

	await prisma.category.createMany({
		data: categories
	});

	await prisma.productIngredient.createMany({
		data: ingredients
	});

	await prisma.product.createMany({
		data: products
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони фреш',
			imageUrl:
				process.env.BASE_URL + 'products/pizza-1.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5), // нужны id, то есть [{id: 1}, {id: 4}, {id: 7}]
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl:
				process.env.BASE_URL + 'products/pizza-2.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl:
				process.env.BASE_URL + 'products/pizza-3.png',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	});

	//@ts-ignore
	await prisma.productVariant.createMany({
		data: [
			{ productId: pizza1.id, pizzaDoughType: 1, price: 550, size: 20 },
			{ productId: pizza1.id, pizzaDoughType: 2, price: 550, size: 30 },
			{ productId: pizza1.id, pizzaDoughType: 2, price: 650, size: 40 },

			{ productId: pizza2.id, pizzaDoughType: 1, price: 450, size: 20 },
			{ productId: pizza2.id, pizzaDoughType: 1, price: 550, size: 30 },
			{ productId: pizza2.id, pizzaDoughType: 1, price: 590, size: 40 },
			{ productId: pizza2.id, pizzaDoughType: 2, price: 490, size: 20 },
			{ productId: pizza2.id, pizzaDoughType: 2, price: 590, size: 30 },
			{ productId: pizza2.id, pizzaDoughType: 2, price: 670, size: 40 },

			{ productId: pizza3.id, pizzaDoughType: 1, price: 530, size: 20 },
			{ productId: pizza3.id, pizzaDoughType: 1, price: 530, size: 30 },
			{ productId: pizza3.id, pizzaDoughType: 2, price: 630, size: 40 },

			{ productId: 1, price: 80 },
			{ productId: 2, price: 90 },
			{ productId: 3, price: 80 },
			{ productId: 4, price: 80 },
			{ productId: 5, price: 60 },
			{ productId: 6, price: 80 },
			{ productId: 7, price: 80 },
			{ productId: 8, price: 100 },
			{ productId: 9, price: 80 },
			{ productId: 10, price: 80 },
			{ productId: 11, price: 110 },
			{ productId: 12, price: 80 },
			{ productId: 13, price: 90 },
			{ productId: 14, price: 80 },
			{ productId: 15, price: 80 },
			{ productId: 16, price: 80 },
			{ productId: 17, price: 80 }
		]
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '11111'
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '22222'
			},
		]
	});

	await prisma.cartItem.create({
		data: {
				productVariantId: 1,
				cartId: 1,
				quantity: 2,
				ingredients: {
					connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
				}
			}
	});
	await prisma.cartItem.create({
		data: {
				productVariantId: 1,
				cartId: 1,
				quantity: 4,
				ingredients: {
					connect: [{ id: 5 }, { id: 2 }, { id: 3 }, { id: 7 }]
				}
			}
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductIngredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.log(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		await prisma.$disconnect();
		process.exit(1);
	});