import { FC, useEffect } from "react";
import { useBreadcrumbStore, usePageTitleStore } from "../../../zustand/stores";
import { BlankPage } from "../blank-page";
import { t } from "i18next";

const breadcrumbItems = [{ title: t("page_title.dashboard") }];

const Dashboard: FC = () => {
  const { setPageTitle } = usePageTitleStore();
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setPageTitle(t("page_title.dashboard"));
    setBreadcrumbItems(breadcrumbItems);
  }, []);

  return <BlankPage />;
};

export default Dashboard;
