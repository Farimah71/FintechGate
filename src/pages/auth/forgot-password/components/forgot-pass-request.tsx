import { Link } from "react-router-dom";
import { Button } from "antd";
import { TextInput } from "../../../../components/form-inputs/text-input";
import { ForgotPasswordRequestInputs } from "../core/_models";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgetPassRequest } from "../core/_request";
import { useForgetPassStore } from "../../../../zustand/stores";
import * as Yup from "yup";
import { t } from "i18next";

export const ForgotPasswordRequest = () => {
  const { setForgetPassStep, setForgetPassKey } = useForgetPassStore();

  const validationSchema = Yup.object().shape({
    key: Yup.string()
      .required(t("error.is_required", { name: t("input.phone.label") }))
      .matches(/^\+?(0?)([1-9]{1})([0-9]{1,2})?([0-9]{9})$/, {
        message: t("error.valid_phone"),
        excludeEmptyString: false,
      }),
    type: Yup.number().required(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, touchedFields, errors },
  } = useForm<ForgotPasswordRequestInputs>({
    defaultValues: { type: 2 },
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const { submitForgetPassRequest, isPending } = useForgetPassRequest({
    onSuccess: () => {
      setForgetPassStep(2);
    },
  });

  const onSubmit = (data: ForgotPasswordRequestInputs) => {
    setForgetPassKey(data.key);
    submitForgetPassRequest(data);
  };

  return (
    <form
      className="w-full max-w-[500px] p-5 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center mb-8">
        {/* begin::Title */}
        <h1 className="dark:text-white text-2xl font-bold mb-3">
          {t("page_title.forgot_password")}
        </h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-sm text-gray-700 font-medium mt-2 dark:text-gray-500">
          {t("page_subtitle.enter_your_info")}
        </div>
        {/* end::Link */}
      </div>

      <TextInput<ForgotPasswordRequestInputs>
        name="key"
        label={t("input.phone.label")}
        placeholder={t("input.phone.placeholder")}
        errors={touchedFields.key && errors.key}
        register={register}
        control={control}
        autoComplete="off"
        required
      />

      <div className="flex gap-x-3 justify-center mt-10">
        <Link to="/auth/login">
          <Button size="large" className="shadow-none" htmlType="button">
            {t("button.cancel")}
          </Button>
        </Link>
        <Button
          type="primary"
          size="large"
          className="shadow-none"
          htmlType="submit"
          disabled={!isValid}
          loading={isPending}
        >
          {t("button.submit")}
        </Button>
      </div>
    </form>
  );
};
