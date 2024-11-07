import { InputBaseType } from "../../../types/input-base.type";

type InputTypes = "text" | "password" | "number";

export type TextboxProps = InputBaseType & {
  type?: InputTypes;
  placeholder?: string;
  maxChar?: number;
};
