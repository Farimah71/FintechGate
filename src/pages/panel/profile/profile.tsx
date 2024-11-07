import { useEffect } from "react";
import { useBreadcrumbStore, usePageTitleStore } from "../../../zustand/stores";
import { PieChartOutlined } from "@ant-design/icons";
import { t } from "i18next";

const breadcrumbItems = [
  {
    title: (
      <span>
        <PieChartOutlined className="mx-1" />
        {t("page_title.dashboard")}
      </span>
    ),
    href: "/dashboard",
  },
  { title: t("page_title.profile") },
];

const Profile = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { setPageTitle } = usePageTitleStore();

  useEffect(() => {
    setPageTitle(t("page_title.profile"));
    setBreadcrumbItems(breadcrumbItems);
  }, []);

  return <>Profile</>;
};

export default Profile;
