export interface CartItemBaseProps {
	id: number;
	imageUrl: string;
	details: string;
	name: string;
	price: number;
	quantity: number;
	disabled?: boolean;
}