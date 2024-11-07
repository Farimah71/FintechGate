import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import { Checkboxprops } from "./checkbox.types";

export const MyCheckbox = ({ name, label, control }: Checkboxprops) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox className="capitalize" {...field}>
          {label}
        </Checkbox>
      )}
    />
  );
};
