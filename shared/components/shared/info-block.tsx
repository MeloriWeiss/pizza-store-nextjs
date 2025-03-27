import React from "react";
import { cn } from "@/shared/lib/utils";
import { Button, Title } from "@/shared/components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
	title: string;
	text: string;
	imageUrl?: string;
	className?: string;
}

export const InfoBlock: React.FC<Props> = (
	{
		title,
		text,
		imageUrl,
		className
	}
) => {
	return (
		<div className={cn('flex items-center justify-between w-[840px] gap-12', className)}>
			<div className="flex flex-col">
				<div className="w-[455px]">
					<Title text={title} size="lg" className="font-extrabold" />
					<p className="text-gray-400 text-lg">{text}</p>
				</div>
				<div className="flex gap-5 mt-11">
					<Link href="/">
						<Button variant="outline" className="gap-2">
							<ArrowLeft/>
							На главную
						</Button>
					</Link>
					<a href="">
						<Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
							Обновить
						</Button>
					</a>
				</div>
			</div>
			<img src={imageUrl} alt={title} width={300} />
		</div>
	);
};