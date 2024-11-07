import { ReactNode } from "react";
import { useForgetPassStore } from "../../../zustand/stores/auth/forgetPassword";
import { ForgotPasswordRequest } from "./components/forgot-pass-request";
import { ForgotPasswordOtp } from "./components/forgot-pass-OTP";
import { ChangePassword } from "./components/change-pass";

const ForgotPassword = () => {
  const { step } = useForgetPassStore();

  const renderForm: Record<number, ReactNode> = {
    1: <ForgotPasswordRequest />,
    2: <ForgotPasswordOtp />,
    3: <ChangePassword />,
  };

  return renderForm[step];
};

export default ForgotPassword;
