import { useMutation } from "@tanstack/react-query";
import { createData } from "../../../../../core/http-service";
import { CustomResponse } from "../../../../../types/http-response.interface";
import { GetAllOptions } from "../../../../../types/react-query.type";
import {
  GET_ALL_INTEGRATORS,
  GET_ALL_PSPS,
  GET_ALL_TRANSACTIONS,
  GET_ALL_WEBSITES,
} from "./_api";

// const getWebsiteDetails = (id: number) =>
//   readData<CustomResponse>(`${GET_WEBSITE_INFO}?id=${id}`);

// export const useGetWebsiteDetails = (id: number, enabled: boolean) => {
//   const { isPending, isLoading, data } = useQuery({
//     queryFn: () => getWebsiteDetails(id),
//     queryKey: ["Website_detail"],
//     enabled: enabled,
//   });

//   return { isPending, isLoading, data };
// };

// ******************************************************
// ******************************************************

const getAllTransactions = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_TRANSACTIONS, options);

export const useGetAllTransactions = () => {
  const {
    mutate: submitGetAllTransactions,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllTransactions,
    mutationKey: ["Transactions"],
  });

  return { submitGetAllTransactions, isPending, data };
};

// ******************************************************
// ******************************************************

const getAllPSPs = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_PSPS, options);

export const useGetAllPSPs = () => {
  const {
    mutate: submitGetAllPSPs,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllPSPs,
    mutationKey: ["PSPs"],
  });

  return { submitGetAllPSPs, isPending, data };
};

// ******************************************************
// ******************************************************

const getAllIntegrators = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_INTEGRATORS, options);

export const useGetAllIntegrators = () => {
  const {
    mutate: submitGetAllIntegrators,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllIntegrators,
    mutationKey: ["Integrators"],
  });

  return { submitGetAllIntegrators, isPending, data };
};

// ******************************************************
// ******************************************************

const getAllWebsites = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_WEBSITES, options);

export const useGetAllWebsites = () => {
  const {
    mutate: submitGetAllWebsites,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllWebsites,
    mutationKey: ["Websites"],
  });

  return { submitGetAllWebsites, isPending, data };
};
