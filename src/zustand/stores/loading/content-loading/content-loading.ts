import { create } from "zustand";

type State = {
  isContentLoading: boolean;
};

type Action = {
  setIsContentLoading: (status: boolean) => void;
};

const initialState: State = {
  isContentLoading: false,
};

export const useContentLoadingStore = create<State & Action>()((set) => ({
  ...initialState,
  setIsContentLoading: (status) => set(() => ({ isContentLoading: status })),
}));
