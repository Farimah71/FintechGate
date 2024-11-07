import { Modal } from "antd";
import { ModalProps } from "../modal.types";

export const ErrorModal = ({
  modalOpen,
  modalCloseHandler,
  onOk,
  children,
}: ModalProps) => {
  return (
    <Modal centered open={modalOpen} onOk={onOk} onCancel={modalCloseHandler}>
      {children}
    </Modal>
  );
};
