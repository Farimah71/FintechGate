import { Dispatch, SetStateAction } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { TextInput } from "../../../../components/form-inputs/text-input";
import { useLoginRequest } from "../core/_request";
import { LoginRequestInputs } from "../core/_models";
import { t } from "i18next";
import * as yup from "yup";

type RequestLoginProps = {
  setStepHandler: Dispatch<SetStateAction<number>>;
  setLoginInfo: Dispatch<
    SetStateAction<{ emailOrPhone: string; password: string }>
  >;
};

export const RequestLogin = ({
  setStepHandler,
  setLoginInfo,
}: RequestLoginProps) => {
  const phoneRegex = /^\+?([1-9]{1})?([0-9]{1,2})?([0-9]{10})$/;
  const emailRegex =
    /^(?=.{8,50}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const loginSchema = yup.object().shape({
    emailOrPhone: yup
      .string()
      .required(
        t("error.is_required", { name: t("input.email_or_phone.label") })
      )
      .test(
        "Is emailOrPhone",
        t("error.email/phone_format"),
        (value) => phoneRegex.test(value) || emailRegex.test(value)
      ),
    password: yup
      .string()
      .required(t("error.is_required", { name: t("input.password.label") }))
      .min(8, `${t("error.min")} 8 ${t("error.symbols")}`)
      .max(16, `${t("error.max")} 16 ${t("error.symbols")}`),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<LoginRequestInputs>({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });
  const { submitLoginRequest, LoginRequestPending } = useLoginRequest({
    onSuccess: (response) => {
      if (response) {
        setStepHandler(2);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginRequestInputs> = (data) => {
    setLoginInfo({ emailOrPhone: data.emailOrPhone, password: data.password });
    submitLoginRequest(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] p-5 mb-14 mx-auto lg:mb-0"
    >
      <div className="w-full text-center">
        <h2 className={`dark:text-white text-2xl font-bold`}>
          {t("page_title.signin")}
        </h2>
        <p
          className={`text-sm text-gray-700 font-medium mt-2 dark:text-gray-500`}
        >
          {t("page_subtitle.enter_info")}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-y-5">
        <TextInput<LoginRequestInputs>
          name="emailOrPhone"
          label={t("input.email_or_phone.label")}
          placeholder={t("input.email_or_phone.placeholder")}
          register={register}
          errors={touchedFields.emailOrPhone && errors.emailOrPhone}
          control={control}
          required
        />

        <TextInput<LoginRequestInputs>
          type="password"
          name="password"
          label={t("input.password.label")}
          placeholder={t("input.password.placeholder")}
          register={register}
          errors={touchedFields.password && errors.password}
          control={control}
          required
        />
      </div>

      <div className="text-end mt-2">
        <Link
          to="/auth/forgetPassword"
          className="text-[13px] text-primary hover:text-primary/70 dark:text-primary-active duration-200 font-[500]"
        >
          {t("link.forgot_password")}
        </Link>
      </div>

      <Button
        type="primary"
        size="large"
        className="w-full mt-10 shadow-none"
        htmlType="submit"
        disabled={!isValid}
        loading={LoginRequestPending}
      >
        {t("button.continue")}
      </Button>
    </form>
  );
};
