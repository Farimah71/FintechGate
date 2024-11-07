import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { CustomError } from "../types/http-errors.interface";
import { useModal } from "../zustand/stores/modals/modal";
import { Toast } from "../helper/UI/toast";
import { t } from "i18next";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      const customError = error as CustomError;
      useModal.setState({
        modalType: "popupError",
        modalContent: customError?.errors?.data
          ? customError?.errors.data
          : customError.detail,
      });
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      const customError = error as CustomError;
      Toast(
        "error",
        t("toast.something_wrong"),
        customError?.errors?.data ? customError?.errors.data : customError.detail
      );
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 0,
    },
    mutations: {
      throwOnError: false,
      retry: 1,
      gcTime: 0,
    },
  },
});
