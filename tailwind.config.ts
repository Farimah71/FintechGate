import { colord, extend } from "colord";
import type { Config } from "tailwindcss";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

type colorObject = {
  [key: string]: string | {};
};

export const tailwindColors: colorObject = {
  current: "currentColor",
  transparent: "transparent",

  // Primary colors
  primary: "#3e6ac9",
  "primary-active": "#1042b0",
  "primary-light": "#4a96d4",
  "primary-clarity": "rgba(#3e6ac9, 0.2)",
  "primary-inverse": "var(--white)",

  // Secondary colors
  secondary: "var(--gray-200)",
  "secondary-active": "var(--gray-400)",
  "secondary-light": "#F9F9F9",
  "secondary-clarity": "rgba(#F9F9F9, 0.2)",
  "secondary-inverse": "var(--gray-800)",

  // Light colors
  light: "var(--gray-100)",
  "light-active": "var(--gray-200)",
  "light-light": "#ffffff",
  "light-clarity": "rgba(--white, 0.2)",
  "light-inverse": "var(--gray-800)",

  // Success colors
  success: "#17C653",
  "success-active": "#04B440",
  "success-light": "#DFFFEA",
  "success-clarity": "rgba(#17C653, 0.2)",
  "success-inverse": "var(--white)",

  // Info colors
  info: "#7239EA",
  "info-active": "#5014D0",
  "info-light": "#F8F5FF",
  "info-clarity": "rgba(#7239EA, 0.2)",
  "info-inverse": "var(--white)",

  // Warning colors
  warning: "#F6C000",
  "warning-active": "#DEAD00",
  "warning-light": "#FFF8DD",
  "warning-clarity": "rgba(#F6C000, 0.2)",
  "warning-inverse": "var(--white)",

  // Danger colors
  danger: "#F8285A",
  "danger-active": "#D81A48",
  "danger-light": "#FFEEF3",
  "danger-clarity": "rgba(#F8285A, 0.2)",
  "danger-inverse": "var(--white)",

  // Dark colors
  dark: "#1E2129",
  "dark-active": "#111318",
  "dark-light": "#F9F9F9",
  "dark-clarity": "rgba(#1E2129, 0.2)",
  "dark-inverse": "var(--white)",

  "text-muted": "var(--gray-500)",

  gray: {
    100: "var(--gray-100)",
    200: "var(--gray-200)",
    300: "var(--gray-300)",
    400: "var(--gray-400)",
    500: "var(--gray-500)",
    600: "var(--gray-600)",
    700: "var(--gray-700)",
    800: "var(--gray-800)",
    900: "var(--gray-900)",
  },
};

export const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: tailwindColors,
      backgroundImage: {
        "404-light": "url('/src/assets/images/bg/bg7.jpg')",
        "404-dark": "url('/src/assets/images/bg/bg7-dark.jpg')",
      },
      fontSize: {
        xs: "12px",
      },
      borderRadius: {
        "2.5xl": "20px",
      },
      screens: {
        xs: "350px",
      },
    },
    container: {
      center: true,
      padding: "3rem",
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
