import { ReactNode } from "react";
import { ModalType } from "../../types/modal.type";
import { Button, Modal } from "antd";
import errorGif from "../../assets/images/gif/error-gif.gif";
import { t } from "i18next";

type modalPropsOptions = {
  title: string;
  content: ReactNode;
  onOk: () => void;
};

type FooterProps = {
  onOk: () => void;
};

type TitleProps = {
  title: string;
  type: ModalType;
};

const theme = localStorage.getItem("innowaves__theme");

const ModalFooter: React.FC<FooterProps> = ({ onOk }) => {
  return (
    <div className="w-full flex justify-center items-center mt-6 border-t dark:border-t-gray-800 pt-4">
      <Button
        className="px-6 text-base font-medium dark:bg-black"
        type={theme === "dark" ? "link" : "primary"}
        onClick={onOk}
      >
        {t("button.ok")}
      </Button>
    </div>
  );
};

const ModalTitle: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mb-4">
      <img src={errorGif} className="w-40" alt="" />
      <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>
        {title}
      </p>
    </div>
  );
};

export const renderModal = (
  modalProps: modalPropsOptions,
  modalType: ModalType
) => {
  const theme = localStorage.getItem("innowaves__theme");

  const modalStyles = {
    content: {
      backgroundColor: theme === "dark" ? "#111318" : "#ffffff",
    },
  };

  switch (modalType) {
    case "popupError":
      Modal.error({
        ...modalProps,
        footer: () => <ModalFooter onOk={modalProps.onOk} />,
        title: <ModalTitle type="error" title={modalProps.title} />,
        icon: " ",
        styles: modalStyles,
      });
      break;
    case "info":
      Modal.info({
        ...modalProps,
        footer: () => <ModalFooter onOk={modalProps.onOk} />,
        title: <ModalTitle type="info" title={modalProps.title} />,
        icon: " ",
        styles: modalStyles,
      });
      break;
    case "warning":
      Modal.warning({
        ...modalProps,
        footer: () => <ModalFooter onOk={modalProps.onOk} />,
        title: <ModalTitle type="warning" title={modalProps.title} />,
        icon: " ",
        styles: modalStyles,
      });
      break;
    case "success":
      Modal.success({
        ...modalProps,
        footer: () => <ModalFooter onOk={modalProps.onOk} />,
        title: <ModalTitle type="success" title={modalProps.title} />,
        icon: " ",
        styles: modalStyles,
      });
      break;
    case "":
      Modal.destroyAll();
      break;
    default:
      break;
  }
};
