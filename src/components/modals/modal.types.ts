import { ReactNode } from "react";

export type ModalProps = {
  title: string;
  okText?: string;
  okButtonDisabled?: boolean;
  modalOpen: boolean;
  loading?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  modalCloseHandler: () => void;
  onOk?: () => void;
};
