import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { UploaderProps } from "../../inputs/upload/uploader.types";

export type UploadInputProps<TFormValues extends FieldValues> = Omit<
  UploaderProps,
  "name"
> & {
  control: any;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
};
