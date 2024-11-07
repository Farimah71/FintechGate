import { useEffect } from "react";
import { LuSunMoon } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { themeToggleHandler } from "../../helper/UI/toggle-theme";
import { Dropdown } from "antd";
import { ThemeType } from "../../types/theme.type";
import { useTheme } from "../../zustand/stores";
import { items } from "../../data/theme-menu";

const currentTheme = localStorage.getItem("fintech__theme");

export const Theme = () => {
  const { theme } = useTheme();

  useEffect(() => {
    themeToggleHandler(currentTheme ? (currentTheme as ThemeType) : "system");
  }, []);

  return (
    <Dropdown menu={{ items, selectable: true }} className="translate-y-1">
      {theme == "dark" ? (
        <IoMoonOutline
          size={43}
          role="button"
          className="hover:bg-primary-light/10 dark:hover:bg-light-inverse text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg p-3"
        />
      ) : theme == "light" ? (
        <LuSunMoon
          size={43}
          role="button"
          className="hover:bg-primary-light/10 dark:hover:bg-light-inverse text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg p-3"
        />
      ) : (
        <HiOutlineComputerDesktop
          size={45}
          role="button"
          className="hover:bg-primary-light/10 dark:hover:bg-light-inverse text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg p-3"
        />
      )}
    </Dropdown>
  );
};
