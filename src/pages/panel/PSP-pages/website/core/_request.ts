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
import {
  GET_ALL_PSP,
  GET_ALL_WEBSITES,
  GET_WEBSITE_INFO,
  WEBSITE,
} from "./_api";
import { WebsiteInputs } from "./_model";

const createWebsite = (model: WebsiteInputs) =>
  createData<WebsiteInputs, CustomResponse>(WEBSITE, model);

export const useCreateWebsite = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitCreateWebsite, isPending } = useMutation({
    mutationFn: createWebsite,
    onSuccess: onSuccess,
  });

  return { submitCreateWebsite, isPending };
};

// ******************************************************
// ******************************************************

const updateWebsite = (model: WebsiteInputs) =>
  updateData<WebsiteInputs, CustomResponse>(WEBSITE, model);

export const useUpdateWebsite = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitUpdateWebsite, isPending } = useMutation({
    mutationFn: updateWebsite,
    onSuccess: onSuccess,
  });

  return { submitUpdateWebsite, isPending };
};

// ******************************************************
// ******************************************************

const getWebsiteDetails = (id: number) =>
  readData<CustomResponse>(`${GET_WEBSITE_INFO}?id=${id}`);

export const useGetWebsiteDetails = (id: number, enabled: boolean) => {
  const { isPending, isLoading, data } = useQuery({
    queryFn: () => getWebsiteDetails(id),
    queryKey: ["Website_detail"],
    enabled: enabled,
  });

  return { isPending, isLoading, data };
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
