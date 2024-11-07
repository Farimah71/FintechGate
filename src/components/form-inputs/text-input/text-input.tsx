import { FieldValues } from "react-hook-form";
import { TextBox } from "../../inputs/textbox";
import { TextInputProps } from "./text-input.types";

export const TextInput = <TFormValues extends FieldValues>({
  errors,
  name,
  required,
  maxChar,
  register,
  onChangeHandler,
  ...rest
}: TextInputProps<TFormValues>) => {
  return (
    <>
      <TextBox
        {...register(name)}
        required={required}
        maxChar={maxChar}
        errors={errors}
        onChangeHandler={(e) => onChangeHandler && onChangeHandler(e)}
        {...rest}
      />
      {errors && <span className="input-error">{errors?.message}</span>}
    </>
  );
};
