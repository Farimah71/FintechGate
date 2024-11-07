import { Select } from "antd";
import { SelectProps } from "./select.types";
import { Controller } from "react-hook-form";
import { clsx } from "clsx";
import { t } from "i18next";

export const MySelect = ({
  name,
  options,
  label,
  loading,
  required,
  disabled,
  errors,
  control,
  onChangeHandler,
}: SelectProps) => {
  const classes = clsx({ "select-disabled": disabled });

  return (
    <>
      <label className="input-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            listHeight={130}
            showSearch
            allowClear
            className={`select ${classes}
            ${!fieldState.isTouched && !disabled && "select-untouched"}
            ${
              fieldState.isTouched && !fieldState.error
                ? "select-success"
                : fieldState.isTouched && fieldState.error
                ? "select-error"
                : ""
            }`}
            onChange={(value) => {
              field.onChange(value);
              onChangeHandler && onChangeHandler(value);
            }}
            placeholder={t("select.placeholder")}
            optionFilterProp="label"
            status={errors ? "error" : ""}
            options={options}
            loading={loading}
            disabled={disabled}
            variant="borderless"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          />
        )}
      />

      {errors && <span className="input-error">{errors?.message}</span>}
    </>
  );
};
