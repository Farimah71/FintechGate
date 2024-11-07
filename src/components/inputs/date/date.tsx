import { Controller } from "react-hook-form";
import { DateProps } from "./date.types";
import { DatePicker } from "antd";

export const MyDatePicker: React.FC<DateProps> = ({
  control,
  name,
  label,
  required,
  placeholder,
  errors,
  onChangeHandler,
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="w-full">
            <label className="input-label">
              {label}
              {required && <span className="text-danger"> *</span>}
            </label>
            <DatePicker
              {...field}
              {...rest}
              size="middle"
              className="w-full rounded-lg"
              placeholder={placeholder}
            />
            {errors && <span className="input-error">{errors?.message}</span>}
          </div>
        );
      }}
    />
  );
};
