export const mapPizzaTypes = {
	1: 'традиционное',
	2: 'тонкое'
} as const;

export const pizzaTypes = Object.entries(mapPizzaTypes).map(([value, name]) => ({
	name, value
}))

export type PizzaTypes = keyof typeof mapPizzaTypes;