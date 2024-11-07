import { Empty } from "antd";
import { t } from "i18next";

export const BlankPage = () => {
  return (
    <div className="h-[calc(100vh-300px)] flex items-center justify-center">
      <Empty description={t("text.no_data")} />
    </div>
  );
};
