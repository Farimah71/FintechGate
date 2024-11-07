import { t } from "i18next";
import toast from "react-hot-toast";

export const Toast = (
  type: "success" | "error",
  title?: string,
  content?: string | string[]
) => {
  return type == "error"
    ? toast.error(
        <div className="flex flex-col bg-white dark:bg-dark dark:text-gray-500">
          <span className="font-bold mb-1">{title}</span>
          <span className="flex flex-col gap-y-2">{content}</span>
        </div>,

        {
          position: "top-center",
          className: "dark:bg-dark",
        }
      )
    : toast.success(
        <div className="flex flex-col bg-white dark:bg-dark dark:text-gray-500">
          <span className="font-bold mb-1">
            {title ? title : t("toast.well_done")}
          </span>
          <span className="flex flex-col gap-y-2">
            {content ? content : t("toast.data_saved")}
          </span>
        </div>,

        {
          position: "top-center",
          className: "dark:bg-dark",
        }
      );
};
