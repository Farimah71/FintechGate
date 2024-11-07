import { useMutation } from "@tanstack/react-query";
import { createData } from "../../../../core/http-service";
import { LOGIN, LOGIN_REQUEST } from "./_api";
import { LoginInputs, LoginRequestInputs } from "./_models";
import { RequestOptions } from "../../../../types/react-query.type";

const loginReq = (model: LoginRequestInputs) =>
  createData<LoginRequestInputs, void>(LOGIN_REQUEST, model);

export const useLoginRequest = ({ onSuccess }: RequestOptions) => {
  const {
    mutate: submitLoginRequest,
    isPending: LoginRequestPending,
    data,
  } = useMutation({
    mutationFn: loginReq,
    onSuccess: onSuccess,
  });

  return { submitLoginRequest, LoginRequestPending, data };
};

// ********************************************
// ********************************************

const login = (model: LoginInputs) =>
  createData<LoginInputs, void>(LOGIN, model);

export const useLogin = ({ onSuccess }: RequestOptions) => {
  const {
    mutate: submitLogin,
    isPending: loginPending,
    data,
  } = useMutation({
    mutationFn: login,
    onSuccess: onSuccess,
  });

  return { submitLogin, loginPending, data };
};
