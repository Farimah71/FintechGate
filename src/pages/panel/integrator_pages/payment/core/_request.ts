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
import { GET_ALL_PAYMENT , GET_PAYMENT_INFO , PAYMENT } from "./_api";
import { PaymentInputs } from "./_model";

const createPayment = (model: PaymentInputs) =>
  createData<PaymentInputs, CustomResponse>(PAYMENT , model);

export const useCreatePayment = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitCreatePayment, isPending } = useMutation({
    mutationFn: createPayment,
    onSuccess: onSuccess,
  });

  return { submitCreatePayment, isPending };
};

// ******************************************************
// ******************************************************

const updatePayment = (model: PaymentInputs) =>
  updateData<PaymentInputs, CustomResponse>(PAYMENT, model);

export const useUpdatePayment = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitUpdatePayment, isPending } = useMutation({
    mutationFn: updatePayment,
    onSuccess: onSuccess,
  });

  return { submitUpdatePayment, isPending };
};

// ******************************************************
// ******************************************************

const getPaymentDetails = (id: number) =>
  readData<CustomResponse>(`${GET_PAYMENT_INFO}?id=${id}`);

export const useGetPaymentDetails = (id: number, enabled: boolean) => {
  const { isPending, data } = useQuery({
    queryFn: () => getPaymentDetails(id),
    queryKey: ["payment_detail"],
    enabled: enabled,
  });

  return { isPending, data };
};

// ******************************************************
// ******************************************************

const getAllPayment = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_PAYMENT, options);

export const useGetAllPayment = () => {
  const {
    mutate: submitGetAllPayment,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllPayment,
    mutationKey: ["payment"],
  });

  return { submitGetAllPayment, isPending, data };
};