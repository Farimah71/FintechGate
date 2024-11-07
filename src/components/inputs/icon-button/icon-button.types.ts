import { ReactNode } from "react";

export type IconButtonProps = {
  iconType?: "edit" | "delete" | "deactivate" | "more" | "changeStatus" | "print" | "cancel";
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  popoverMessage?: string;
  onClick: () => void;
};
