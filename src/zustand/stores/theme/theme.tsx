import { create } from "zustand";
import { ThemeType } from "../../../types/theme.type";

type State = {
  theme: ThemeType;
};

type Actions = {
  setTheme: (theme: ThemeType) => void;
};

const initialState: State = {
  theme: document.documentElement.getAttribute("class") as ThemeType,
};

export const useTheme = create<State & Actions>()((set) => ({
  ...initialState,
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem("fintech__theme", theme);
      return { theme: theme };
    }),
}));
