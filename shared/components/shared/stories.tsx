"use client";

import React, { useEffect, useState } from "react";
import { Api } from "@/shared/services/api-client";
import { Story } from "@prisma/client";
import { Container } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import ReactStories from 'react-insta-stories';

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = useState<Story[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<Story>();

	useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories().then();
	}, []);

	const onOpenStory = (story: Story) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<Container className={cn("flex justify-between items-center gap-2 my-10", className)}>
			{stories.length === 0 &&
				[...Array(6)].map((_, index) => (
					<div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"></div>
				))
			}
			{stories.map(story => (
				<img
					key={story.id}
					onClick={() => onOpenStory(story)}
					height={250}
					width={200}
					className="rounded-md cursor-pointer"
					src={story.previewImageUrl}
					alt="История"
				/>
			))}
			{open &&
				<div className="fixed left-0 top-0 w-full h-full bg-black/80 flex justify-center items-center z-40" onClick={() => setOpen(false)}>
					<div className="relative w-[520px]" onClick={(event) => event.stopPropagation()}>
						<button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
							<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
						</button>
						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={selectedStory?.items.map(item => ({url: item.sourceUrl})) || []}
							defaultInterval={3000}
							width={520}
							height={800}
						/>
					</div>
				</div>
			}
		</Container>
	);
};