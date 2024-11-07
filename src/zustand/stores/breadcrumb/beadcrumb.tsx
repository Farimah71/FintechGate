import { ReactNode } from "react";
import { create } from "zustand";

type State = {
  items: { title?: ReactNode; href?: string }[];
};

type Action = {
  setBreadcrumbItems: (items: { title?: ReactNode; href?: string }[]) => void;
};

const initialState: State = {
  items: [],
};

export const useBreadcrumbStore = create<State & Action>()((set) => ({
  ...initialState,
  setBreadcrumbItems: (items) => set(() => ({ items })),
}));
