import { AllowedInputTypes } from "react-otp-input";

export type OTPInputProps = {
  name: string;
  control: any;
  charCount: number;
  inputType?: AllowedInputTypes;
  autoFocus: boolean;
  shouldSubmit: (value: string) => void;
};
