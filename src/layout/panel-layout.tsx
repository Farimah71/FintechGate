import { useState } from "react";
import { Breadcrumb, Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
// import { PanelFooter } from "../components/layout/footer";
import { PanelHeader } from "../components/layout/header";
// import { SideButtons } from "../components/side-buttons";
import { useBreadcrumbStore, usePageTitleStore } from "../zustand/stores";
import { CalendarFilter } from "../components/calendar-filter";
import { Sidebar } from "../components/layout/sidebar";

const { Content } = Layout;

type buttonProps = {
  visible?: boolean;
  title: string;
  clickHandler?: () => void;
};

const PanelLayout = () => {
  const [buttonProps, setButtonProps] = useState<buttonProps>();

  const { items } = useBreadcrumbStore();
  const { pageTitle } = usePageTitleStore();

  return (
    <>
      <Layout
        style={{ minHeight: "100vh" }}
        className="transition-all duration-500 flex flex-row"
      >
        <Sidebar />
        <Layout className={`dark:bg-dark-active bg-gray-50 `}>
          <PanelHeader />
          <div className="flex md:justify-between xs:justify-end py-2 mb-5 z-[999] border-y-[0.2px] dark:border-dark bg-white dark:bg-black sticky top-16">
            <div className="hidden md:flex px-5 gap-x-2 items-baseline">
              <span className="dark:text-white text-gray-900 font-semibold md:text-lg text-base inline-block">
                {pageTitle}
              </span>
              <span className="text-gray-200 dark:text-dark mt-1"> | </span>
              <Breadcrumb items={items} separator="-" className="mt-1" />
            </div>
            <div className="px-3">
              <CalendarFilter />
            </div>
          </div>
          <Content className="sm:container">
            <div className="md:hidden flex px-5 gap-x-2 items-baseline">
              <span className="dark:text-white text-gray-900 font-semibold md:text-lg text-base inline-block">
                {pageTitle}
              </span>
              <span className="text-gray-200 dark:text-dark mt-1"> | </span>
              <Breadcrumb items={items} separator="-" className="mt-1" />
            </div>
            <div className="flex justify-end mb-3 items-baseline">
              <Button
                type="primary"
                onClick={buttonProps?.clickHandler}
                className={`${buttonProps?.visible ? "block" : "hidden"}`}
              >
                {buttonProps?.title}
              </Button>
            </div>

            {/*  !!!!!!!Below div classes should be applied to outlet elements and removed from here!!!!!!! */}
            {/* <div
              className="bg-white dark:bg-dark-active/90 dark:border border-dark shadow-md"
              style={{
                padding: 24,
                borderRadius: "16px",
              }}
            > */}
            <Outlet context={{ buttonProps, setButtonProps }} />
            {/* </div> */}
          </Content>
          {/* <PanelFooter /> */}
        </Layout>
      </Layout>

      {/* Fixed side buttons */}
      {/* <SideButtons /> */}
    </>
  );
};

export default PanelLayout;
