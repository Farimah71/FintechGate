import { ColumnFilterItem, CompareFn } from "antd/es/table/interface";
import { ReactNode } from "react";

type FieldType = {
  name: string;
  dataIndex?: string;
  key?: string;
  width?: number;
  filters?: ColumnFilterItem[];
  sorter?: CompareFn<any> | boolean;
  render?: (text: string, input?: any, record?: any) => ReactNode;
  onFilter?: (a: any, b: any) => boolean;
  editable?: boolean;
  ellipsis?: boolean;
};

export const generateColumns = (fields: FieldType[]) => {
  return fields.map((field) => ({
    title: field.name,
    dataIndex: field.dataIndex ? field.dataIndex : field.name,
    key: field.key ? field.key : field.name,
    width: field.width && field.width,
    filters: field.filters && field.filters,
    render: field.render && field.render,
    sorter: field.sorter && field.sorter,
    onFilter: field.onFilter && field.onFilter,
    editable: field.editable && field.editable,
    ellipsis: field.ellipsis && field.ellipsis,
  }));
};
