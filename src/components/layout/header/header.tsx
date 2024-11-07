import { Header } from "antd/es/layout/layout";
import { UserProfile } from "../../user-profile";
// import { TbNotification } from "react-icons/tb";
// import { TbLayoutGrid } from "react-icons/tb";
// import { MdNotificationsNone } from "react-icons/md";
// import { LuClipboardCheck } from "react-icons/lu";
// import { RiSearchLine } from "react-icons/ri";
import { Theme } from "../../theme";
import logo from "../../../assets/images/logos/fintechGate-logo.png";

export const PanelHeader = () => {
  return (
    <Header className="dark:bg-black flex items-center justify-between p-4 bg-white sticky z-[999] top-0">
      <div className="flex gap-x-3 justify-start items-baseline shrink-0">
        <img
          src={logo}
          width={90}
          alt="logo"
          className="select-none md:hidden ms-6"
        />
      </div>
      <div className="flex gap-x-3 items-center justify-between -translate-y-1">
        <div className="flex flex-row items-baseline md:gap-x-1">
          {/* <RiSearchLine
            role="button"
            className="w-9 h-9 p-2.5 md:p-2 sm:block hover:bg-primary-light/10 dark:hover:bg-dark text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg"
          />
          <MdNotificationsNone
            role="button"
            className="w-9 h-9 p-2 md:p-1.5 sm:block font-bold hover:bg-primary-light/10 dark:hover:bg-dark text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg"
          />
          <LuClipboardCheck
            role="button"
            className="w-9 h-9 p-2.5 md:p-2 sm:block hover:bg-primary-light/10 dark:hover:bg-dark text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg"
          />
          <div className="relative group rounded-lg hover:bg-primary-light/10 dark:hover:bg-dark">
            <span className="rounded-full border-success border-[1.5px] animate-ping w-6 h-6 cursor-pointer inline-block absolute right-[6px] top-1.5"></span>
            <TbNotification
              role="button"
              className="w-9 h-9 p-2 md:p-1.5 sm:block text-gray-500 dark:text-gray-700 group-hover:!text-primary"
            />
          </div>
          <TbLayoutGrid
            role="button"
            className="w-9 h-9 p-2.5 md:p-2 sm:block hover:bg-primary-light/10 dark:hover:bg-dark text-gray-500 dark:text-gray-700 hover:!text-primary rounded-lg"
          /> */}
          <Theme />
        </div>
        <UserProfile />
      </div>
    </Header>
  );
};
