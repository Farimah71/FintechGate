import { create } from "zustand";

type State = {
  pageTitle: string;
};

type Action = {
  setPageTitle: (items: string) => void;
};

const initialState: State = {
  pageTitle: "",
};

export const usePageTitleStore = create<State & Action>()((set) => ({
  ...initialState,
  setPageTitle: (pageTitle) => set(() => ({ pageTitle })),
}));
