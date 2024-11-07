import { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { t } from "i18next";

type FilterType = "day" | "week" | "year";

export const CalendarFilter = () => {
  const [isSelected, setIsSelected] = useState<FilterType>("day");
  const [date, setDate] = useState("");

  const renderDate = () => {
    return today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const today = new Date();

  useEffect(() => {
    const date = renderDate();
    setDate(date);
  }, []);

  return (
    <div className="flex gap-x-3 flex-col gap-y-1 xs:flex-row">
      <div className="flex gap-x-3">
        <span
          className={`${
            isSelected === "day" &&
            "bg-gray-100 dark:bg-dark/80 text-primary-light dark:text-primary"
          } p-2 text-gray-500 dark:text-gray-600 rounded-md  xs:text-xs text-[11px] cursor-pointer duration-300 hover:!text-primary-light hover:bg-gray-100 dark:hover:bg-dark/80`}
          onClick={() => setIsSelected("day")}
        >
          {t("filter.day")}
        </span>
        <span
          className={`${
            isSelected === "week" &&
            "bg-gray-100 dark:bg-dark/80 text-primary-light dark:text-primary"
          } p-2 text-gray-500 dark:text-gray-600 rounded-md  xs:text-xs text-[11px] cursor-pointer duration-300 hover:!text-primary-light hover:bg-gray-100 dark:hover:bg-dark/80`}
          onClick={() => setIsSelected("week")}
        >
          {t("filter.week")}
        </span>
        <span
          className={`${
            isSelected === "year" &&
            "bg-gray-100 dark:bg-dark/80 text-primary-light dark:text-primary"
          } p-2 text-gray-500 dark:text-gray-600 rounded-md  xs:text-xs text-[11px] cursor-pointer duration-300 hover:!text-primary-light hover:bg-gray-100 dark:hover:bg-dark/80`}
          onClick={() => setIsSelected("year")}
        >
          {t("filter.year")}
        </span>
      </div>

      <div className="flex gap-x-2">
        <div
          className={`bg-gray-100 dark:bg-dark/80 p-2 text-gray-500 dark:text-gray-600 rounded-md xs:text-xs text-[11px] cursor-pointer duration-300 hover:!text-primary-light dark:hover:!text-primary hover:bg-gray-100 dark:hover:bg-dark/80`}
        >
          {t("filter.today")}: {date}
        </div>

        <span className="hover:bg-gray-100 rounded-md p-2 cursor-pointer dark:hover:bg-dark">
          <FaRegSquarePlus
            className="text-primary-light dark:text-primary xs:text-lg"
          />
        </span>
      </div>
    </div>
  );
};
