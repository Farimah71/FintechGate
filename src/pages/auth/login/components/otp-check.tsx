import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { OTPInput } from "../../../../components/form-inputs/OTP-input";
import { CountDown } from "../../../../components/count-down";
import { Button } from "antd";
import * as Yup from "yup";
import { t } from "i18next";
import { LoginInputs } from "../core/_models";
import { useLogin } from "../core/_request";
import { useNavigate } from "react-router-dom";
import { extractFromToken } from "../../../../helper/jwt-decoder";

export const OTPCheck = ({
  userInfo,
  setStepHandler,
}: {
  userInfo?: { emailOrPhone: string; password: string };
  setStepHandler: Dispatch<SetStateAction<number>>;
}) => {
  const [otp, setOtp] = useState<string>("");
  const [isResendCode, setIsResendCode] = useState<boolean>(false);

  const navigate = useNavigate();

  const { submitLogin, loginPending } = useLogin({
    onSuccess: (response) => {
      localStorage.setItem("fintech__access_token", response?.token);
      localStorage.setItem("fintech__userType", extractFromToken("UserType"));
      setStepHandler(1);
      navigate("/");
      window.location.reload();
    },
  });

  useEffect(() => {
    otp && onSubmit(initialValues);
  }, [otp]);

  const initialValues: LoginInputs = {
    emailOrPhone: userInfo?.emailOrPhone!,
    password: userInfo?.password!,
    otpCode: otp,
    rememberMe: false,
  };

  const registrationSchema = Yup.object().shape({
    emailOrPhone: Yup.string().required(),
    password: Yup.string().required(),
    otpCode: Yup.string().required(),
    rememberMe: Yup.boolean(),
  });

  const { handleSubmit, control } = useForm<LoginInputs>({
    resolver: yupResolver(registrationSchema),
    mode: "all",
  });

  const onSubmit = (values: LoginInputs) => {
    submitLogin(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] p-5 text-center mx-auto"
    >
      {/* begin::Heading */}
      <div className="mb-20">
        {/* begin::Title */}
        <h1 className={`dark:text-white text-2xl font-bold`}>
          {t("page_title.on_final_step")}
        </h1>
        {/* end::Title */}

        <div
          className={`text-sm text-gray-700 font-medium mt-2 dark:text-gray-500`}
        >
          {t("page_subtitle.need_verify_phone")}
        </div>
        <div className="my-6 text-primary-active dark:text-primary border shadow-sm border-primary-active rounded-md p-3">
          {userInfo && userInfo?.emailOrPhone ? (
            <span>
              {t("text.check_phone_1")}
              <b>{userInfo.emailOrPhone}</b>
            </span>
          ) : (
            <span>{t("text.check_phone_2")}</span>
          )}
        </div>
      </div>
      {/* end::Heading */}

      <p className={`mb-2 text-primary dark:text-secondary-active opacity-80 ${loginPending && "animate-pulse"}`}>
        {loginPending ? t("text.please_wait") : t("text.enter_code")}
      </p>

      {/* begin::Form group emailCode */}
      <OTPInput
        name="emailCode"
        control={control}
        charCount={6}
        autoFocus
        shouldSubmit={(value: string) => setOtp(value)}
      />
      {/* end::Form group */}

      {/* begin::Count down */}
      <div className="mt-2 text-primary flex justify-between">
        {!isResendCode && (
          <CountDown
            totalSeconds={5 * 60}
            label={t("text.count_down_label")}
            onFinishTimer={() => setIsResendCode(true)}
          />
        )}

        <span role="button" className="ms-auto dark:text-primary-active">
          {t("text.resend_code")}
        </span>
      </div>
      {/* end::Count down */}

      <div className="mt-20 flex flex-col">
        <Button
          className="btn mb-4"
          onClick={() => setStepHandler(1)}
          size="large"
          htmlType="button"
        >
          {t("button.back")}
        </Button>
      </div>
    </form>
  );
};
