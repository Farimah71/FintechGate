import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyModal } from "../../../../../components/modals";
import { ModalProps } from "../../../../../types/modal.type";
import { TextInput } from "../../../../../components/form-inputs/text-input";
import { Toast } from "../../../../../helper/UI/toast";
import { Textarea } from "../../../../../components/inputs/textarea";
import { MySelect } from "../../../../../components/inputs/select";
import { SelectOption } from "../../../../../types/select.type";
import { generateDataToSend } from "../../../../../helper/generate-data-to-send";
import { convertToSelectOption } from "../../../../../helper/convert-to-select-option";
import { Spinner } from "../../../../../components/UI/spinner";
import { Button } from "antd";
import { IntegratorInputs } from "../core/_model";
import { queryClient } from "../../../../../lib/react-query";
import {
  useCreateIntegrator,
  useGetAllTaxOffices,
  useGetIntegratorDetails,
  useUpdateIntegrator,
} from "../core/_request";
import * as yup from "yup";
import { t } from "i18next";

type CreateProps = ModalProps & {
  editId?: number | null;
  resetEditId?: Dispatch<SetStateAction<number | null>>;
  isCommission?: boolean;
  setCommission: Dispatch<SetStateAction<boolean>>;
};

export const Form = ({
  isOpen,
  editId,
  resetEditId,
  onCloseHandler,
  refetchHandler,
  isCommission,
  setCommission,
}: CreateProps) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  const {
    submitGetAllTaxOffices,
    isPending: taxOfficePending,
    data: taxOfficeData,
  } = useGetAllTaxOffices();
  const { submitCreateIntegrator, isPending: createPending } =
    useCreateIntegrator({
      onSuccess: () => {
        Toast("success");
        onCloseHandler();
        refetchHandler && refetchHandler();
      },
    });
  const { submitUpdateIntegrator, isPending: updatePending } =
    useUpdateIntegrator({
      onSuccess: () => {
        Toast("success");
        resetEditId && resetEditId(null);
        isCommission && setCommission(false);
        onCloseHandler();
        refetchHandler && refetchHandler();
      },
    });
  const { data: editData, isPending: fetchPending } = useGetIntegratorDetails(
    editId ? editId : 0,
    !!editId
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["Integrator_detail"] });
      reset();
    };
  }, []);
  useEffect(() => {
    if (isOpen) {
      reset();
      submitGetAllTaxOffices(generateDataToSend(null));
    }
  }, [isOpen]);
  useEffect(() => {
    if (taxOfficeData?.totalCount) {
      const options = convertToSelectOption(taxOfficeData.responseValue);
      options && setOptions(options);
    }
  }, [taxOfficeData]);
  useEffect(() => {
    if (editData?.responseValue) {
      reset(editData.responseValue);
    }
  }, [editData]);

  const schema = yup.object().shape({
    id: yup.number(),
    taxId: yup
      .string()
      .required(t("error.is_required", { name: t("input.tax_id.label") })),
    taxOfficeId: yup
      .number()
      .required(t("error.is_required", { name: t("input.tax_office.label") })),
    title: yup
      .string()
      .required(t("error.is_required", { name: t("input.title.label") })),
    code: yup
      .string()
      .required(t("error.is_required", { name: t("input.code.label") })),
    commission: yup
      .number()
      .required(t("error.is_required", { name: t("input.commission.label") })),
    iban: yup
      .string()
      .required(t("error.is_required", { name: t("input.iban.label") })),
    ibanOwner: yup
      .string()
      .required(t("error.is_required", { name: t("input.iban_owner.label") })),
    address: yup.string(),
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<IntegratorInputs>({
    defaultValues: {
      id: editId ? editId : undefined,
      commission: isCommission ? editData?.responseValue.commission : 0,
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<IntegratorInputs> = (data) => {
    editId ? submitUpdateIntegrator(data) : submitCreateIntegrator(data);
  };
  const closeHandler = () => {
    resetEditId && resetEditId(null);
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
        loading={createPending || updatePending}
        disabled={!isValid}
      >
        {editId ? t("button.save") : t("button.create")}
      </Button>
    </div>
  );

  return (
    <MyModal
      title={t("page_title.psp")}
      modalOpen={isOpen}
      modalCloseHandler={closeHandler}
      footer={modalFooter}
    >
      {editId && fetchPending && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 mb-10 flex flex-col"
      >
        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          <div className="sm:w-1/2">
            <TextInput<IntegratorInputs>
              name="title"
              label={t("input.title.label")}
              placeholder={t("input.title.placeholder")}
              register={register}
              errors={touchedFields.title && errors.title}
              control={control}
              required
              disabled={isCommission}
            />
          </div>

          <div className="sm:w-1/2">
            <TextInput<IntegratorInputs>
              name="code"
              label={t("input.code.label")}
              placeholder={t("input.code.placeholder")}
              register={register}
              errors={touchedFields.code && errors.code}
              control={control}
              required
              disabled={isCommission}
            />
          </div>
        </div>

        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          <div className="sm:w-1/2">
            <TextInput<IntegratorInputs>
              type="number"
              name="taxId"
              label={t("input.tax_id.label")}
              placeholder={"1234567"}
              errors={touchedFields.taxId && errors.taxId}
              control={control}
              register={register}
              required
              disabled={isCommission}
            />
          </div>

          <div className="sm:w-1/2">
            <TextInput<IntegratorInputs>
              name="iban"
              label={t("input.iban.label")}
              placeholder={t("input.iban.placeholder")}
              register={register}
              errors={touchedFields.iban && errors.iban}
              control={control}
              required
              disabled={isCommission}
            />
          </div>
        </div>

        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          <div className="sm:w-1/2">
            <TextInput<IntegratorInputs>
              name="ibanOwner"
              label={t("input.iban_owner.label")}
              placeholder={t("input.iban_owner.placeholder")}
              register={register}
              errors={touchedFields.ibanOwner && errors.ibanOwner}
              control={control}
              required
              disabled={isCommission}
            />
          </div>
          <div className="sm:w-1/2">
            <MySelect
              name="taxOfficeId"
              label={t("input.tax_office.label")}
              errors={touchedFields.taxOfficeId && errors.taxOfficeId}
              control={control}
              options={options}
              loading={taxOfficePending}
              required
              disabled={isCommission}
            />
          </div>
        </div>
        {isCommission && (
          <div className="mt-4 sm:w-1/2">
            <TextInput<IntegratorInputs>
              type="number"
              name="commission"
              label={t("input.commission.label")}
              placeholder={t("input.commission.placeholder")}
              errors={touchedFields.commission && errors.commission}
              control={control}
              register={register}
              required
            />
          </div>
        )}

        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          <div className="sm:w-full">
            <Textarea
              name="address"
              control={control}
              label={t("input.address.label")}
              placeholder={t("input.address.placeholder")}
              maxLength={150}
              disabled={isCommission}
            />
          </div>
        </div>
      </form>
    </MyModal>
  );
};
