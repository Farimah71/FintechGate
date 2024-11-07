import { useMutation } from "@tanstack/react-query";
import { createData } from "../../../../core/http-service";
import { RequestOptions } from "../../../../types/react-query.type";
import {
  ChangePasswordInputs,
  ForgotPasswordRequestInputs,
  ForgotPasswordRequestOTPCheck,
} from "./_models";
import {
  CHANGE_PASSWORD,
  FORGET_PASSWORD_OTP_CHECK,
  FORGET_PASSWORD_REQUEST,
} from "./_api";

const forgetPassRequest = (model: ForgotPasswordRequestInputs) =>
  createData<ForgotPasswordRequestInputs, void>(FORGET_PASSWORD_REQUEST, model);

export const useForgetPassRequest = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitForgetPassRequest, isPending } = useMutation({
    mutationFn: forgetPassRequest,
    onSuccess: onSuccess,
  });

  return { submitForgetPassRequest, isPending };
};

// ******************************************
// ******************************************

const forgetPassOTPCheck = (model: ForgotPasswordRequestOTPCheck) =>
  createData<ForgotPasswordRequestOTPCheck, void>(
    FORGET_PASSWORD_OTP_CHECK,
    model
  );

export const useForgotPassOTPCheck = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitForgetPassOTPCheck, isPending } = useMutation({
    mutationFn: forgetPassOTPCheck,
    onSuccess: onSuccess,
  });

  return { submitForgetPassOTPCheck, isPending };
};

// ******************************************
// ******************************************

const changePassword = (model: ChangePasswordInputs) =>
  createData<ChangePasswordInputs, void>(CHANGE_PASSWORD, model);

export const useChangePassword = ({ onSuccess }: RequestOptions) => {
  const { mutate: submitChangePassword, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: onSuccess,
  });

  return { submitChangePassword, isPending };
};
