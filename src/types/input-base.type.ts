import { ChangeEvent } from "react";
import { Control, FieldError } from "react-hook-form";

export type InputBaseType = {
  name: string;
  label?: string;
  required?: boolean;
  errors?: FieldError | false | undefined;
  autoComplete?: "on" | "off";
  disabled?: boolean;
  control: Control<any>;
  onChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
};