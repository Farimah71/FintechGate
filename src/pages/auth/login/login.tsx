import { useState } from "react";
import { RequestLogin } from "./components/request-login";
import { OTPCheck } from "./components/otp-check";

const Login = () => {
  const [step, setStep] = useState(1);
  const [loginInfo, setLoginInfo] = useState<{
    emailOrPhone: string;
    password: string;
  }>({ emailOrPhone: "", password: "" });

  return step === 1 ? (
    <RequestLogin setStepHandler={setStep} setLoginInfo={setLoginInfo} />
  ) : (
    <OTPCheck setStepHandler={setStep} userInfo={loginInfo} />
  );
};

export default Login;
