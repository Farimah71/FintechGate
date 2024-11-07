import { InputBaseType } from "../../../types/input-base.type";

export type TextareaProps = InputBaseType & {
  placeholder: string;
  maxLength?: number;
  onBlur?: () => void;
};
