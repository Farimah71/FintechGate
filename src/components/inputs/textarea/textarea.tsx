import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";
import { TextareaProps } from "./textarea.types";

export const Textarea = ({
  name,
  placeholder,
  control,
  label,
  required,
  maxLength,
  disabled,
  onBlur,
  ...rest
}: TextareaProps) => {
  return (
    <>
      <label className="input-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            showCount
            maxLength={maxLength ? maxLength : 50}
            placeholder={placeholder}
            onBlur={onBlur && onBlur}
            disabled={disabled}
            {...rest}
          />
        )}
      />
    </>
  );
};
