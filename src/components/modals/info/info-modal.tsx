import { Modal } from "antd";
import { ModalProps } from "../modal.types";

export const InfoModal = ({
  title,
  modalOpen,
  modalCloseHandler,
  onOk,
  children,
}: ModalProps) => {
  return (
    <Modal
      centered
      title={title}
      open={modalOpen}
      onOk={onOk}
      onCancel={modalCloseHandler}
    >
      {children}
    </Modal>
  );
};
