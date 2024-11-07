import { create } from "zustand";

type State = {
  step: number;
  key: string;
  forgetValue: string;
};

type Actions = {
  setForgetPassStep: (step: number) => void;
  setForgetPassKey: (key: string) => void;
  setForgetPassForgetValue: (forgetValue: string) => void;
  resetStep: () => void;
};

const initialState: State = {
  step: 1,
  key: "",
  forgetValue: "",
};

export const useForgetPassStore = create<State & Actions>()((set) => ({
  ...initialState,
  setForgetPassStep: (step) => set(() => ({ step: step })),
  setForgetPassKey: (key) => set(() => ({ key: key })),
  setForgetPassForgetValue: (forgetValue) =>
    set(() => ({ forgetValue: forgetValue })),
  resetStep: () => set(initialState),
}));
