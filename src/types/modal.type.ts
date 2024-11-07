export type ModalType =
  | "popupError"
  | "error"
  | "info"
  | "confirm"
  | "warning"
  | "delete"
  | "success"
  | "";

export type ModalProps = {
  isOpen: boolean;
  isCreate?: boolean;
  refetchHandler?: () => void;
  onCloseHandler: () => void;
};
