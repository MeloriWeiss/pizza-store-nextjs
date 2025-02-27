export const mapPizzaSizes = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая'
} as const;

export const pizzaSizes = Object.entries(mapPizzaSizes).map(([value, name]) => ({
	name, value
}));

export type PizzaSizes = keyof typeof mapPizzaSizes;