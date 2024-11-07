// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Button, Menu } from "antd";
// import { getDocumentDirection } from "../../../helper/UI/get-doc-direction";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { items } from "../../../data/sidebar-menu-items";
// import Sider from "antd/es/layout/Sider";
// import fintechLogo from "../../../assets/images/logos/fintechGate-logo.png";

// export const Sidebar = ({
//   brokenHandler,
//   collapseHandler,
// }: {
//   brokenHandler: Dispatch<SetStateAction<boolean>>;
//   collapseHandler: Dispatch<SetStateAction<boolean>>;
// }) => {
//   const [broken, setBroken] = useState(false);
//   // const [collapsed, setCollapsed] = useState(false);

//   const location = useLocation();
//   const path = location.pathname;
//   const isDashboard = path === "/dashboard";
//   const selectedKey = isDashboard ? path.split("/")[1] : path.split("/")[2];

//   useEffect(() => {
//     brokenHandler(broken);
//   }, [broken]);
//   useEffect(() => {
//     collapseHandler(collapsed);
//   }, [collapsed]);
//   console.log("broken: " + broken);
//   console.log("collapsed: " + collapsed);
//   return (
//     <Sider
//       className={`h-full duration-100 ${broken && "!absolute z-20"}`}
//       theme="dark"
//       trigger={null}
//       breakpoint="md"
//       collapsedWidth={broken ? 0 : undefined}
//       onBreakpoint={(broken) => setBroken(!broken)}
//       collapsed
//       // collapsible
//       // onCollapse={(collapsed) => setCollapsed(!collapsed)}
//     >
//       <div
//         className={`fixed duration-300 h-screen overflow-y-scroll no-scroll z-20 bg-black dark:border-gray-900 ${
//           getDocumentDirection() === "rtl" ? "dark:border-l" : "dark:border-r"
//         } ${broken && "w-0"}`}
//       >
//         <div className="demo-logo-vertical bg-black sticky top-0 z-20 px-3">
//           <img
//             src={fintechLogo}
//             width={120}
//             alt="Logo"
//             className={`mx-auto my-5 pb-10`}
//           />
//         </div>
//         <Menu
//           theme="dark"
//           style={{ fontFamily: "Inter", backgroundColor: "var(--coal-black)" }}
//           defaultSelectedKeys={[selectedKey]}
//           mode="vertical"
//           items={items}
//         />

//         <Button
//           className={`${
//             broken ? "left-2" : "left-[132px] md:invisible !bg-dark/50"
//           } z-50 duration-400 -mt-1 !fixed top-3.5 hover:!text-primary text-gray-500 !bg-transparent`}
//           type="text"
//           icon={<GiHamburgerMenu size={22} />}
//           onClick={() => setBroken((broken) => !broken)}
//         />
//       </div>
//     </Sider>
//   );
// };
