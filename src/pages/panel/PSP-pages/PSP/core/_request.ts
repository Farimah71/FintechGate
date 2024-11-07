import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createData,
  readData,
  updateData,
} from "../../../../../core/http-service";
import { CustomResponse } from "../../../../../types/http-response.interface";
import {
  GetAllOptions,
  RequestOptions,
} from "../../../../../types/react-query.type";
import { GET_ALL_PSP, GET_ALL_TAX_OFFICE, GET_PSP_INFO, PSP } from "./_api";
import { PSPInputs } from "./_model";

const createPSP = (model: PSPInputs) =>
  createData<PSPInputs, CustomResponse>(PSP, model);

export const useCreatePSP = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitCreatePSP, isPending } = useMutation({
    mutationFn: createPSP,
    onSuccess: onSuccess,
  });

  return { submitCreatePSP, isPending };
};

// ******************************************************
// ******************************************************

const updatePSP = (model: PSPInputs) =>
  updateData<PSPInputs, CustomResponse>(PSP, model);

export const useUpdatePSP = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitUpdatePSP, isPending } = useMutation({
    mutationFn: updatePSP,
    onSuccess: onSuccess,
  });

  return { submitUpdatePSP, isPending };
};

// ******************************************************
// ******************************************************

const getPSPDetails = (id: number) =>
  readData<CustomResponse>(`${GET_PSP_INFO}?id=${id}`);

export const useGetPSPDetails = (id: number, enabled: boolean) => {
  const { isPending, isLoading, data } = useQuery({
    queryFn: () => getPSPDetails(id),
    queryKey: ["PSP_detail"],
    enabled: enabled,
  });

  return { isPending, isLoading, data };
};

// ******************************************************
// ******************************************************

const getAllPSPs = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_PSP, options);

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

const getAllTaxOffices = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_TAX_OFFICE, options);

export const useGetAllTaxOffices = () => {
  const {
    mutate: submitGetAllTaxOffices,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllTaxOffices,
    mutationKey: ["Tax_offices"],
  });

  return { submitGetAllTaxOffices, isPending, data };
};
