import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangePasswordInputs } from "../core/_models";
import { TextInput } from "../../../../components/form-inputs/text-input";
import { useForgetPassStore } from "../../../../zustand/stores";
import { useChangePassword } from "../core/_request";
import { Button } from "antd";
import { Toast } from "../../../../helper/UI/toast";
import * as yup from "yup";
import { t } from "i18next";

export const ChangePassword = () => {
  const { resetStep, key, forgetValue } = useForgetPassStore();

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    key: yup.string(),
    forgetValue: yup.string(),
    password: yup
      .string()
      .min(8, `${t("error.min")} 8 ${t("error.symbols")}`)
      .max(16, `${t("error.max")} 16 ${t("error.symbols")}`)
      .required(t("error.is_required", { name: t("input.password.label") }))
      .matches(
        /^(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        t("error.password_format")
      ),
    confirmPassword: yup
      .string()
      .min(8, `${t("error.min")} 8 ${t("error.symbols")}`)
      .max(16, `${t("error.max")} 16 ${t("error.symbols")}`)
      .required(
        t("error.is_required", { name: t("input.confirm_password.label") })
      )
      .oneOf([yup.ref("password")], t("error.passwords_dont_match")),
  });

  const defaultValues = {
    key: key,
    forgetValue: forgetValue,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isValid },
  } = useForm<ChangePasswordInputs>({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const { submitChangePassword, isPending } = useChangePassword({
    onSuccess: () => {
      Toast("success");
      resetStep();
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
    submitChangePassword(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] p-5 mx-auto"
    >
      <div className="w-full text-center mb-14">
        <h2 className={`dark:text-white text-2xl font-bold`}>
          {t("page_title.change_password")}
        </h2>
        <p className="text-sm text-gray-700 font-medium mt-2 dark:text-gray-500">
          {t("page_subtitle.choose_new_pass")}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-y-5">
        <TextInput<ChangePasswordInputs>
          type="password"
          name="password"
          label={t("input.new_password.label")}
          placeholder={t("input.new_password.placeholder")}
          register={register}
          errors={touchedFields.password && errors.password}
          control={control}
          required
        />

        <TextInput<ChangePasswordInputs>
          type="password"
          name="confirmPassword"
          label={t("input.repeat_new_password.label")}
          placeholder={t("input.repeat_new_password.placeholder")}
          register={register}
          errors={touchedFields.confirmPassword && errors.confirmPassword}
          control={control}
          required
        />
      </div>

      <div className="md:flex-row flex gap-x-4 mt-10 justify-center flex-col-reverse gap-y-3">
        <Button
          className="btn mb-4"
          onClick={() => {
            resetStep();
            navigate("/");
          }}
          size="large"
          htmlType="button"
        >
          {t("button.cancel")}
        </Button>
        <Button
          type="primary"
          size="large"
          className="shadow-none"
          htmlType="submit"
          disabled={!isValid}
          loading={isPending}
        >
          {t("button.change_password")}
        </Button>
      </div>
    </form>
  );
};
