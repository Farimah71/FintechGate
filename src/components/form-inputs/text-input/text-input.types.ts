import {
  Control,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TextboxProps } from "../../inputs/textbox/textbox.types";
import { ChangeEvent } from "react";

export type TextInputProps<TFormValues extends FieldValues> = Omit<
  TextboxProps,
  "name"
> & {
  control: Control<any>;
  name: Path<TFormValues>;
  errors?: FieldError | false | undefined;
  maxChar?: number;
  register: UseFormRegister<TFormValues>;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
};
