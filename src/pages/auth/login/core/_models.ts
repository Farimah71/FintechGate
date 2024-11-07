export interface LoginRequestInputs {
  emailOrPhone: string;
  password: string;
}

export interface LoginInputs {
  emailOrPhone: string;
  password: string;
  otpCode: string;
  rememberMe?: boolean;
}
