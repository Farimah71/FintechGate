import { FiltersType } from "../types/react-query.type";

export const generateDataToSend = (
  filterOption: FiltersType[] | null,
  includeProperties?: string,
  pageNum?: number,
  pageSize?: number
) => {
  const rawOptions = {
    filters: [],
    orderBy: "",
    includeProperties: includeProperties || "",
  };

  if (filterOption) {
    if (pageNum && pageSize) {
      return {
        ...rawOptions,
        filters: filterOption,
        pageNumber: pageNum,
        pageSize: pageSize,
      };
    }
    return { ...rawOptions, filters: filterOption };
  } else {
    return rawOptions;
  }
};
