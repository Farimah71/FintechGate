import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyModal } from "../../../../../components/modals";
import { ModalProps } from "../../../../../types/modal.type";
import { Toast } from "../../../../../helper/UI/toast";
import { MySelect } from "../../../../../components/inputs/select";
import { SelectOption } from "../../../../../types/select.type";
import { generateDataToSend } from "../../../../../helper/generate-data-to-send";
import { convertToSelectOption } from "../../../../../helper/convert-to-select-option";
import { Button, Tag } from "antd";
import { InvoiceInputs } from "../core/_model";
import { useCreateInvoice } from "../core/_request";
import * as yup from "yup";
import { t } from "i18next";
import { MyDatePicker } from "../../../../../components/inputs/date";
import { useGetAllPSPs } from "../../../PSP-pages/PSP/core/_request";

type CreateProps = ModalProps;

export const Form = ({
  isOpen,
  onCloseHandler,
  refetchHandler,
}: CreateProps) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [createMode, setCreateMode] = useState<"all" | "special">("all");

  const {
    submitGetAllPSPs,
    isPending: pspPending,
    data: pspData,
  } = useGetAllPSPs();
  const { submitCreateInvoice, isPending: createPending } = useCreateInvoice({
    onSuccess: () => {
      Toast("success");
      onCloseHandler();
      refetchHandler && refetchHandler();
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      submitGetAllPSPs(generateDataToSend(null));
    }
  }, [isOpen]);
  useEffect(() => {
    if (pspData?.totalCount) {
      const options = convertToSelectOption(pspData.responseValue);
      options && setOptions(options);
    }
  }, [pspData]);

  const schema = yup.object().shape({
    pspid: yup.number().required().label("PSP"),
    invoiceDate: yup.mixed().required().label(t("input.invoice_date.label")),
  });

  const {
    // register,
    reset,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<InvoiceInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if (createMode === "special") {
      reset({
        pspid: null!,
      });
    } else {
      reset({
        pspid: 0,
      });
    }
  }, [createMode]);

  const onSubmit: SubmitHandler<InvoiceInputs> = (data) => {
    submitCreateInvoice({
      pspid: data.pspid,
      invoiceDate: "2024-1-16",
    });
  };
  const closeHandler = () => {
    onCloseHandler();
  };

  const modalFooter = (
    <div className="flex gap-x-3 justify-end">
      <Button title={t("button.discard")} onClick={closeHandler}>
        {t("button.discard")}
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        onClick={handleSubmit(onSubmit)}
        loading={createPending}
        disabled={!isValid}
      >
        {t("button.create")}
      </Button>
    </div>
  );

  return (
    <MyModal
      title={t("page_title.invoice")}
      modalOpen={isOpen}
      modalCloseHandler={closeHandler}
      footer={modalFooter}
    >
      <div className="w-full grid grid-cols-2 mt-6">
        <Tag
          color={createMode === "all" ? "green" : ""}
          onClick={() => setCreateMode("all")}
          className="flex justify-center items-center p-2 m-0 border border-r-0 rounded-none rounded-l-md cursor-pointer"
        >
          Create for all PSP
        </Tag>
        <Tag
          color={createMode === "special" ? "green" : ""}
          onClick={() => setCreateMode("special")}
          className="flex justify-center items-center p-2 m-0 border rounded-none rounded-r-md cursor-pointer"
        >
          Create for a special PSP
        </Tag>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 mb-10 flex flex-col"
      >
        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          {createMode === "special" && (
            <div className="sm:w-1/2">
              <MySelect
                name="pspid"
                label={t("input.psp_id.label")}
                errors={touchedFields.pspid && errors.pspid}
                control={control}
                options={options}
                loading={pspPending}
                required
              />
            </div>
          )}

          <div className="sm:w-1/2">
            <MyDatePicker
              name="invoiceDate"
              control={control}
              label={t("input.invoice_date.label")}
              errors={touchedFields.invoiceDate && errors.invoiceDate}
              required
            />
          </div>
        </div>
      </form>
    </MyModal>
  );
};
