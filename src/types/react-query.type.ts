import { CustomError } from "./http-errors.interface";

export type RequestOptions = {
  onSuccess: (response: any) => void;
  onError?: (error: CustomError) => void;
};

export type FiltersType = {
  property: string;
  operation: number;
  values: string[];
};

export interface GetAllOptions {
  pageNumber?: number;
  pageSize?: number;
  filters: FiltersType[];
  orderBy: string;
  includeProperties: string;
}
