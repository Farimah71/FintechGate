import { ThemeType } from "../../types/theme.type";
import { useTheme } from "../../zustand/stores";

export const themeToggleHandler = (theme: ThemeType) => {
  localStorage.setItem("fintech__theme", theme);
  useTheme.setState({ theme: theme });

  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (theme == "dark") {
    document.documentElement.classList.replace("light", "dark");
  } else if (theme == "light") {
    document.documentElement.classList.replace("dark", "light");
  } else {
    isSystemDark
      ? document.documentElement.classList.replace("light", "dark")
      : document.documentElement.classList.replace("dark", "light");
  }

  window.dispatchEvent(new Event("storage"));
};
