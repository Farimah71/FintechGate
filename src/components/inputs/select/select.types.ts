import { InputBaseType } from "../../../types/input-base.type";
import { SelectOption } from "../../../types/select.type";

export type SelectProps = InputBaseType & {
  loading?: boolean;
  options: SelectOption[];
  onChangeHandler?: (value: string | number) => void;
};
