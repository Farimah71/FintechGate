import { FC, ReactNode } from "react";
import { IconButtonProps } from "./icon-button.types";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { FcCancel } from "react-icons/fc";
import { MdOutlinePublishedWithChanges , MdPrint , MdOutlineCancel } from "react-icons/md";
import { Button } from "antd";
import clsx from "clsx";

export const IconButton: FC<IconButtonProps> = ({
  icon,
  iconType,
  disabled,
  loading,
  popoverMessage,
  onClick,
}) => {
  const renderIcon: Record<string, ReactNode> = {
    edit: <EditFilled />,
    delete: <DeleteFilled />,
    deactivate: <FcCancel size={20} />,
    changeStatus:<MdOutlinePublishedWithChanges size={20} />,
    print:<MdPrint size={20} />,
    cancel:<MdOutlineCancel size={20} />
  };
  const classes = clsx({
    "btn-disabled": disabled,
    [`btn-${iconType}`]:iconType,
  });

  return (
    <Button
      className={`icon-button ${classes}`}
      icon={iconType ? renderIcon[iconType] : icon}
      disabled={disabled}
      loading={loading}
      title={popoverMessage}
      onClick={onClick}
    />
  );
};
