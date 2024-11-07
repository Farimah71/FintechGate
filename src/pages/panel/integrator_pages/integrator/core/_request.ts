import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createData,
  readData,
  updateData,
} from "../../../../../core/http-service";
import { CustomResponse } from "../../../../../types/http-response.interface";
import { IntegratorInputs } from "./_model";
import {
  GetAllOptions,
  RequestOptions,
} from "../../../../../types/react-query.type";
import { GET_ALL_INTEGRATORS, GET_INTEGRATOR_INFO, INTEGRATOR } from "./_api";
import { GET_ALL_TAX_OFFICE } from "../../../PSP-pages/PSP/core/_api";

const createIntegrator = (model: IntegratorInputs) =>
  createData<IntegratorInputs, CustomResponse>(INTEGRATOR, model);

export const useCreateIntegrator = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitCreateIntegrator, isPending } = useMutation({
    mutationFn: createIntegrator,
    onSuccess: onSuccess,
  });

  return { submitCreateIntegrator, isPending };
};

// ******************************************************
// ******************************************************

const updateIntegrator = (model: IntegratorInputs) =>
  updateData<IntegratorInputs, CustomResponse>(INTEGRATOR, model);

export const useUpdateIntegrator = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitUpdateIntegrator, isPending } = useMutation({
    mutationFn: updateIntegrator,
    onSuccess: onSuccess,
  });

  return { submitUpdateIntegrator, isPending };
};

// ******************************************************
// ******************************************************

const getIntegratorDetails = (id: number) =>
  readData<CustomResponse>(`${GET_INTEGRATOR_INFO}?id=${id}`);

export const useGetIntegratorDetails = (id: number, enabled: boolean) => {
  const { isPending, isLoading, data } = useQuery({
    queryFn: () => getIntegratorDetails(id),
    queryKey: ["Integrator_detail"],
    enabled: enabled,
  });

  return { isPending, isLoading, data };
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
