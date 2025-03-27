import React from "react";
import { ProductIngredient } from "@prisma/client";

interface Props {
	name: string;
	details: string
}

export const CartItemDetailsInfo: React.FC<Props> = ({ name, details }) => {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
			</div>
			{details && <p className="text-xs text-gray-400 max-w-[95%]">{details}</p>}
		</div>
	);
};