import { Input, InputRef } from "antd";
import { TextboxProps } from "./textbox.types";
import { Controller } from "react-hook-form";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ChangeEvent, forwardRef } from "react";

export const TextBox = forwardRef<InputRef, TextboxProps>(
  (
    {
      control,
      name,
      type = "text",
      label,
      placeholder,
      required,
      errors,
      autoComplete,
      disabled,
      maxChar,
      onChangeHandler,
    },
    ref
  ) => {
    const onChange = (e: ChangeEvent<HTMLInputElement>, field: any) => {
      const value = e.target.value;
      if (onChangeHandler) {
        onChangeHandler(e);
      }
      field.onChange(value);
    };

    return (
      <div>
        <label className="input-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>

        {(type == "text" || type == "number") && (
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                ref={ref}
                size="large"
                type={type}
                maxLength={maxChar}
                placeholder={placeholder}
                status={errors ? "error" : ""}
                suffix={
                  fieldState.isTouched ? (
                    fieldState.error ? (
                      <AiOutlineExclamationCircle size={19} strokeWidth={15} />
                    ) : (
                      <AiOutlineCheck
                        size={20}
                        strokeWidth={70}
                        color="#04B440"
                      />
                    )
                  ) : (
                    <span />
                  )
                }
                style={{
                  borderColor:
                    fieldState.isTouched && !fieldState.error ? "#04B440" : "",
                }}
                autoComplete={autoComplete}
                disabled={disabled}
                onChange={(e) => onChange(e, field)}
              />
            )}
          />
        )}

        {type == "password" && (
          <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
              <Input.Password
                {...field}
                ref={ref}
                size="large"
                placeholder={placeholder}
                status={errors ? "error" : ""}
                suffix={
                  fieldState.isTouched ? (
                    fieldState.error ? (
                      <AiOutlineExclamationCircle size={19} strokeWidth={15} />
                    ) : (
                      <AiOutlineCheck
                        size={20}
                        strokeWidth={70}
                        color="#04B440"
                      />
                    )
                  ) : (
                    <span />
                  )
                }
                style={{
                  borderColor:
                    fieldState.isTouched && !fieldState.error ? "#04B440" : "",
                }}
                autoComplete={autoComplete}
                disabled={disabled}
              />
            )}
          />
        )}
      </div>
    );
  }
);
