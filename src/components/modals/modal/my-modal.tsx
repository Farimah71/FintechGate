import { Modal } from "antd";
import { ModalProps } from "../modal.types";
import { t } from "i18next";

export const MyModal = ({
  title,
  okText = t("button.submit"),
  okButtonDisabled = true,
  modalOpen,
  loading,
  children,
  footer,
  modalCloseHandler,
  onOk,
}: ModalProps) => {
  return (
    <Modal
      confirmLoading={loading}
      centered
      width={900}
      title={title}
      open={modalOpen}
      onOk={onOk}
      onCancel={modalCloseHandler}
      cancelText={t("button.discard")}
      okText={okText}
      okButtonProps={{ disabled: okButtonDisabled, htmlType: "submit" }}
      footer={footer}
    >
      {children}
    </Modal>
  );
};
