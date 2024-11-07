export interface ForgotPasswordRequestInputs {
  key: string;
  type: number;
}

export interface ForgotPasswordRequestOTPCheck {
  key: string;
  forgetValue: string;
}

export interface ChangePasswordInputs {
  key?: string;
  forgetValue?: string;
  password: string;
  confirmPassword: string;
}
