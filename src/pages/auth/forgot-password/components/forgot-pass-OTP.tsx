import { useEffect, useState } from "react";
import { ForgotPasswordRequestOTPCheck } from "../core/_models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { OTPInput } from "../../../../components/form-inputs/OTP-input";
import { useNavigate } from "react-router-dom";
import { useForgotPassOTPCheck } from "../core/_request";
import { useForgetPassStore } from "../../../../zustand/stores";
import { Button } from "antd";
import * as Yup from "yup";
import { t } from "i18next";

export const ForgotPasswordOtp = () => {
  const [otp, setOtp] = useState<string>("");

  const { resetStep, setForgetPassStep, setForgetPassForgetValue, key } =
    useForgetPassStore();

  const { submitForgetPassOTPCheck, isPending } = useForgotPassOTPCheck({
    onSuccess: () => {
      setForgetPassForgetValue(otp);
      setForgetPassStep(3);
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    otp && onSubmit(initialValues);
  }, [otp]);

  const initialValues: ForgotPasswordRequestOTPCheck = {
    key: key,
    forgetValue: otp,
  };

  const registrationSchema = Yup.object().shape({
    key: Yup.string().required(),
    forgetValue: Yup.string().required(),
  });

  const { handleSubmit, control } = useForm<ForgotPasswordRequestOTPCheck>({
    defaultValues: initialValues,
    resolver: yupResolver(registrationSchema),
    mode: "all",
  });

  const onSubmit = (data: ForgotPasswordRequestOTPCheck) => {
    submitForgetPassOTPCheck(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] p-5 text-center mx-auto"
    >
      {/* begin::Heading */}
      <div className="mb-5">
        {/* begin::Title */}
        <h1 className={`dark:text-white text-2xl font-bold`}>
          {t("page_title.getting_closer")}
        </h1>
        {/* end::Title */}

        <div
          className={`text-sm text-gray-700 font-medium mt-2 dark:text-gray-500`}
        >
          {t("page_subtitle.need_verify_phone")}
        </div>
      </div>
      {/* end::Heading */}

      <div className="mb-16 text-primary-active dark:text-primary border shadow-sm border-primary-active rounded-md p-3">
        {key ? (
          <span>
            {t("text.check_phone_1")}
            <b>{key}</b>
          </span>
        ) : (
          <span>{t("text.check_phone_2")}</span>
        )}
      </div>

      <p className={`mb-2 text-primary dark:text-secondary-active opacity-80`}>
        {isPending ? t("text.please_wait") : t("text.enter_code")}
      </p>

      {/* begin::Form group forgetValue */}
      <OTPInput
        name="forgetValue"
        control={control}
        charCount={6}
        autoFocus
        shouldSubmit={(value: string) => setOtp(value)}
      />
      {/* end::Form group */}

      <div className="mt-10 flex flex-col">
        <Button
          className="btn mb-4"
          onClick={() => {
            resetStep();
            navigate("/");
          }}
          size="large"
          htmlType="button"
        >
          {t("button.cancel")}
        </Button>
      </div>
    </form>
  );
};
