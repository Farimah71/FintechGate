import { useEffect, useState } from "react";
import { OTPInputProps } from "./OTP.types";
import { Controller } from "react-hook-form";
import OtpInput from "react-otp-input";

export const OTPInput = ({
  name,
  control,
  charCount,
  inputType,
  autoFocus,
  shouldSubmit,
}: OTPInputProps) => {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === charCount) {
      shouldSubmit(otp);
    }
  }, [otp]);

  const theme = localStorage.getItem("fintech__theme");

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <OtpInput
          value={otp}
          onChange={setOtp}
          shouldAutoFocus={autoFocus}
          numInputs={charCount}
          renderSeparator={<pre> </pre>}
          renderInput={(props) => <input {...props} />}
          inputType={inputType}
          inputStyle={{
            width: "15%",
            height: "65px",
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            fontSize: 15,
            backgroundColor: theme === "dark" ? "black" : "white",
          }}
          containerStyle={{
            justifyContent: "center",
          }}
        />
      )}
    />
  );
};
