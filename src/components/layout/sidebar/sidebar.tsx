import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { items } from "../../../data/sidebar-menu-items";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "antd";
import fintechLogo from "../../../assets/images/logos/fintechGate-logo.png";

export const Sidebar = () => {
  const [broken, setBroken] = useState(false);

  const { pathname } = useLocation();

  return (
    <div>
      {!broken && (
        <div
          className={`md:w-[140px] w-[100px] pt-10 md:pt-0 shrink-0 bg-dark-active text-white overflow-y-scroll !min-h-screen h-full no-scroll ${
            !broken && "absolute md:relative z-[9999]"
          }`}
        >
          <div className="flex flex-col items-center gap-y-3">
            <div className="sticky md:block hidden top-0 z-20 bg-dark-active">
              <img
                src={fintechLogo}
                width={120}
                alt="Logo"
                className={`mx-auto my-5`}
              />
            </div>

            {items.map((item: any) => (
              <NavLink
                to={item?.key == "dashboard" ? "/" : item.key}
                className={({ isActive }) =>
                  `${
                    isActive ? "active-link" : "inactive-link"
                  } group cursor-pointer items-center text-center flex flex-col gap-2 w-[65%] p-3 ${
                    item.key == "dashboard" &&
                    pathname == "/dashboard" &&
                    "border !border-dark rounded-[10px] active-link"
                  }`
                }
                style={({ isActive }) => ({
                  border: isActive
                    ? "1px solid var(--dark)"
                    : "1px solid transparent",
                  borderRadius: isActive ? "10px" : "",
                  color: isActive ? "white" : "",
                })}
              >
                <span className="text-2xl text-white group-hover:text-primary link-icon">
                  {item?.icon}
                </span>
                <span className="text-gray-700 group-hover:text-white link-label">
                  {item?.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <Button
        className={`${
          broken
            ? "left-2 !bg-transparent"
            : "md:invisible left-[85px] hover:!bg-dark-active"
        } duration-400 -mt-1 !absolute z-[9999] top-3.5 hover:!text-primary text-gray-500 bg-dark`}
        type="text"
        icon={<GiHamburgerMenu size={18} />}
        onClick={() => setBroken((broken) => !broken)}
      />
    </div>
  );
};
