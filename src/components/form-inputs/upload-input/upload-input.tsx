import { FieldValues } from "react-hook-form";
import { Uploader } from "../../inputs/upload";
import { UploadInputProps } from "./upload-input.types";

export const UploadInput = <TFormValues extends FieldValues>({
  name,
  register,
  ...rest
}: UploadInputProps<TFormValues>) => {
  return <Uploader {...register(name)} {...rest} />;
};
