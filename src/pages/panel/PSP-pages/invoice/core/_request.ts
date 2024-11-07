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
import { GET_ALL_INVOICE, GET_INVOICE_INFO , INVOICE } from "./_api";
import { InvoiceInputs } from "./_model";

const createInvoice = (model: InvoiceInputs) =>
  createData<InvoiceInputs, CustomResponse>(INVOICE, model);

export const useCreateInvoice = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitCreateInvoice, isPending } = useMutation({
    mutationFn: createInvoice,
    onSuccess: onSuccess,
  });

  return { submitCreateInvoice, isPending };
};

// ******************************************************
// ******************************************************

const updateInvoice = (model: InvoiceInputs) =>
  updateData<InvoiceInputs, CustomResponse>(INVOICE, model);

export const useUpdateInvoice = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitUpdateInvoice, isPending } = useMutation({
    mutationFn: updateInvoice,
    onSuccess: onSuccess,
  });

  return { submitUpdateInvoice, isPending };
};

// ******************************************************
// ******************************************************

const getInvoiceDetails = (id: number) =>
  readData<CustomResponse>(`${GET_INVOICE_INFO}?id=${id}`);

export const useGetInvoiceDetails = (id: number, enabled: boolean) => {
  const { isPending, data } = useQuery({
    queryFn: () => getInvoiceDetails(id),
    queryKey: ["invoice_detail"],
    enabled: enabled,
  });

  return { isPending, data };
};

// ******************************************************
// ******************************************************

const getAllInvoice = (options: GetAllOptions) =>
  createData<GetAllOptions, CustomResponse>(GET_ALL_INVOICE, options);

export const useGetAllInvoice = () => {
  const {
    mutate: submitGetAllInvoice,
    isPending,
    data,
  } = useMutation({
    mutationFn: getAllInvoice,
    mutationKey: ["Invoices"],
  });

  return { submitGetAllInvoice, isPending, data };
};