import { t } from "i18next";
import { Link } from "react-router-dom";
import { getDocumentDirection } from "../../helper/UI/get-doc-direction";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { LuBadgeHelp } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { useState } from "react";
import { Popover } from "antd";

export const SideButtons = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div
      className={`flex flex-col gap-y-2 fixed top-[calc(50%-120px)] z-50
        ${getDocumentDirection() == "rtl" ? "left-2" : "right-2"} 
      `}
    >
      {isShow && (
        <div>
          <div className="flex flex-col gap-y-2 items-end">
            <Link
              to="help"
              className="group flex flex-col gap-y-3 items-center bg-white text-gray-800 dark:text-gray-500 dark:bg-dark-active dark:hover:text-gray-200 hover:text-white hover:bg-black duration-300 shadow-lg font-semibold text-xs rounded-md p-2 w-fit"
            >
              <HiOutlineSquare3Stack3D
                size={25}
                className="text-gray-600 group-hover:text-white"
              />
              {t("button.prebuilts")}
            </Link>
            <Link
              to="help"
              className="group flex flex-col gap-y-3 items-center bg-white text-gray-800 dark:text-gray-500 dark:bg-dark-active dark:hover:text-gray-200 hover:text-white hover:!bg-primary duration-300 shadow-lg font-semibold text-xs rounded-md p-2 w-fit"
            >
              <LuBadgeHelp
                size={25}
                className="text-gray-600 group-hover:text-white"
              />
              {t("button.get_help")}
            </Link>
            <Link
              to={"purchase"}
              className="group flex flex-col gap-y-3 items-center bg-white text-gray-800 dark:text-gray-500 dark:bg-dark-active dark:hover:text-gray-200 hover:text-white hover:!bg-success duration-300 shadow-lg font-semibold text-xs rounded-md p-2 w-fit"
            >
              <BsCart2
                size={23}
                className="text-gray-600 group-hover:text-white"
              />
              {t("button.buy_now")}
            </Link>
          </div>
        </div>
      )}

      <div
        onClick={() => setIsShow((isShow) => !isShow)}
        className="group top-[575px] bg-white cursor-pointer text-center self-end aspect-square duration-300 shadow-lg dark:bg-dark-active font-bold text-base rounded-md p-2 text-gray-700 w-fit"
      >
        {isShow ? (
          <IoMdClose
            size={20}
            className="text-gray-600 group-hover:text-primary-light"
          />
        ) : (
          <Popover content={t("popover.explore")} placement="left">
            <LuBadgeHelp size={20} className="text-primary-light" />
          </Popover>
        )}
      </div>
    </div>
  );
};
