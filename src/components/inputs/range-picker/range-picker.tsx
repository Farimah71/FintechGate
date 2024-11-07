import { DatePicker } from "antd";
import { Controller } from "react-hook-form";
import { DateRangePickerProps } from "./range-picker.types";
import { t } from "i18next";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const DateRangePicker = ({
  name,
  label,
  required,
  errors,
  control,
}: DateRangePickerProps) => {
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
          <RangePicker
            {...field}
            className={`range-picker
            ${
              fieldState.isTouched && !fieldState.error
                ? "range-picker-success"
                : fieldState.isTouched && fieldState.error
                ? "range-picker-error"
                : ""
            }`}
            dropdownClassName="responsive-range-picker"
            status={errors ? "error" : ""}
            placeholder={[
              t("input.from.placeholder"),
              t("input.to.placeholder"),
            ]}
            onChange={(dates, dateStrings) => {
              if (dates) {
                field.onChange([dayjs(dateStrings[0]), dayjs(dateStrings[1])]);
              } else {
                field.onChange([]);
              }
            }}
          />
        )}
      />

      {errors && <span className="input-error">{errors?.message}</span>}
    </>
  );
};
