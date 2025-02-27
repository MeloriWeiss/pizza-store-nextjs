import { create } from "zustand/react";

interface State {
	activeCategoryId: number;
	setActiveCategoryId: (activeId: number) => void;
}

export const useCategoryStore = create<State>(set => ({
	activeCategoryId: 1,
	setActiveCategoryId: (activeCategoryId: number) => set({activeCategoryId})
}));