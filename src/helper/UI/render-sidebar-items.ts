import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const setMenuItem = (
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  type?: string
): MenuItem => {
  return {
    type,
    key,
    icon,
    disabled,
    children,
    label,
  } as MenuItem;
};
