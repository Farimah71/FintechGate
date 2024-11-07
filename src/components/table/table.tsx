import { useState } from "react";
import { Table } from "antd";
import { Input } from "antd";
import { MyTableProps } from "./table.types";
import { t } from "i18next";

import type { GetProps } from "antd";
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export const MyTable = ({
  dataSource,
  columns,
  loading,
  pageSize,
  totalCount,
  currentPage,
  searchColumn,
  searchColumnLabel,
  withShadow = true,
  onChangeHandler,
}: MyTableProps) => {
  const [searchResult, setSearchResult] = useState<string[] | null>(null);

  const theme = localStorage.getItem("innowaves__theme");

  const onSearch: SearchProps["onSearch"] = (value) => {
    const filteredData = dataSource.filter(
      (data: any) =>
        searchColumn &&
        data[searchColumn].toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredData);
  };

  return (
    <div
      className={`bg-white dark:bg-dark-active/90 dark:border border-dark mx-auto max-w-[250px] xs:max-w-[400px] sm:max-w-full w-full ${
        withShadow && "shadow-md"
      }`}
      style={{
        padding: 24,
        borderRadius: "16px",
      }}
    >
      <div className="flex justify-between gap-x-5 my-3">
        <Search
          placeholder={
            searchColumn
              ? t("input.advanced_search_by.placeholder", {
                  column: searchColumnLabel ? searchColumnLabel : searchColumn,
                }) + "..."
              : t("input.advanced_search.placeholder") + "..."
          }
          onSearch={onSearch}
          enterButton
          allowClear
          size="large"
          styles={{
            input: {
              backgroundColor:
                theme === "dark" ? "var(--dark)" : "var(--gray-200)",
              height: "35px",
            },
            affixWrapper: {
              backgroundColor:
                theme === "dark" ? "var(--dark)" : "var(--gray-200)",
              height: "50px",
            },
          }}
        />
      </div>
      {totalCount && totalCount > 0 ? (
        <p className="my-2 text-info/50 dark:text-info/60 text-right">
          {t("text.total")}:{" "}
          <span className="text-info">
            {totalCount} {totalCount === 1 ? t("text.item") : t("text.items")}
          </span>
        </p>
      ) : null}

      <Table
        loading={loading}
        columns={columns}
        dataSource={searchResult ? searchResult : dataSource}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: totalCount,
        }}
        onChange={(page) => onChangeHandler && onChangeHandler(page)}
        sticky={{ offsetHeader: 100 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};
