import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { PaymentInputs } from "../core/_model";
import {
  useCreatePayment,
  // useUpdatePayment
} from "../core/_request";
import * as yup from "yup";
import { t } from "i18next";
import { MyDatePicker } from "../../../../../components/inputs/date";
import { useGetAllIntegrators } from "../../../integrator_pages/integrator/core/_request";

type CreateProps = ModalProps & {
  editId?: number | null;
  resetEditId?: Dispatch<SetStateAction<number | null>>;
};

export const Form = ({
  isOpen,
  onCloseHandler,
  refetchHandler,
}: CreateProps) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [createMode , setCreateMode]=useState<"all" | "special">("all");

  const {
    submitGetAllIntegrators,
    isPending: integratorPending,
    data: integratorData,
  } = useGetAllIntegrators();
  const { submitCreatePayment , isPending: createPending } = useCreatePayment({
    onSuccess: () => {
      Toast("success");
      onCloseHandler();
      refetchHandler && refetchHandler();
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
      submitGetAllIntegrators(generateDataToSend(null));
    }
  }, [isOpen]);
  useEffect(() => {
    if (integratorData?.totalCount) {
      const options = convertToSelectOption(integratorData.responseValue);
      options && setOptions(options);
    }
  }, [integratorData]);

  const schema = yup.object().shape({
    integratorId:yup.number().required().label("Integrator"),
    paymentDate:yup.date().required().label(t('input.payment_date.label'))
  });

  const {
    // register,
    reset,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<PaymentInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    if(createMode==="special") {
      reset({
        integratorId:null!
      });
    } else {
      reset({
        integratorId:0
      });
    }
  } , [createMode]);

  const onSubmit: SubmitHandler<PaymentInputs> = (data) => {
    submitCreatePayment({
      integratorId:data.integratorId,
      paymentDate:data.paymentDate
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
      title={t("page_title.payment")}
      modalOpen={isOpen}
      modalCloseHandler={closeHandler}
      footer={modalFooter}
    >
      <div className="w-full grid grid-cols-2 mt-6">
        <Tag color={createMode === "all" ? "green" : ""} onClick={() => setCreateMode("all")} className="flex justify-center items-center p-2 m-0 border border-r-0 rounded-none rounded-l-md cursor-pointer">
          Create for all integrator
        </Tag>
        <Tag color={createMode === "special" ? "green" : ""} onClick={() => setCreateMode("special")} className="flex justify-center items-center p-2 m-0 border rounded-none rounded-r-md cursor-pointer">
          Create for a special integrator
        </Tag>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 mb-10 flex flex-col"
      >
        <div className="mt-4 flex sm:flex-row flex-col gap-y-4 gap-x-5">
          {createMode === "special" &&
          <div className="sm:w-1/2">
            <MySelect
              name="integratorId"
              label={t("input.integrator_id.label")}
              errors={touchedFields.integratorId && errors.integratorId}
              control={control}
              options={options}
              loading={integratorPending}
              required
            />
          </div>
          }

          <div className="sm:w-1/2">
            <MyDatePicker
            name="paymentDate"
            control={control}
            label={t("input.payment_date.label")}
            errors={touchedFields.paymentDate && errors.paymentDate}
            onChangeHandler={(value) => console.log(value)}
             />
          </div>
        </div>
      </form>
    </MyModal>
  );
};
