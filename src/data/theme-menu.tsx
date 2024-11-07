import { MenuProps } from "antd";
import { LuSunMoon } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { themeToggleHandler } from "../helper/UI/toggle-theme";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { t } from "i18next";

export const items: MenuProps["items"] = [
  {
    label: (
      <div
        className={`flex gap-x-2 w-32 h-8 items-center text-gray-600`}
        onClick={() => themeToggleHandler("light")}
      >
        <LuSunMoon size={19} />
        <span className="font-semibold">{t("button.light")}</span>
      </div>
    ),
    key: "0",
  },
  {
    label: (
      <div
        className={`flex gap-x-2 w-32 h-8 items-center text-gray-600`}
        onClick={() => themeToggleHandler("dark")}
      >
        <IoMoonOutline size={18} />
        <span className="font-semibold px-1">{t("button.dark")}</span>
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div
        className={`flex gap-x-2 w-32 h-8 items-center text-gray-600`}
        onClick={() => themeToggleHandler("system")}
      >
        <HiOutlineComputerDesktop size={18} />
        <span className="font-semibold px-1">{t("button.system")}</span>
      </div>
    ),
    key: "2",
  },
];
