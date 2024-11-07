import { ReactNode, useEffect } from "react";
import { useModal } from "../zustand/stores/modals/modal";
import { renderModal } from "../helper/UI/render-modal";
import { t } from "i18next";

export const ModalProvider = ({ icon }: { icon?: ReactNode }) => {
  const { modalType, modalTitle, modalContent, setModalType } = useModal();

  const modalProps = {
    title: modalType == "popupError" ? t("toast.something_wrong") : modalTitle,
    content:
      Array.isArray(modalContent) && modalContent.length > 0 ? (
        modalContent.map((content, index) => {
          return (
            <div
              key={`${index} - ${content.toString().substring(5)}`}
              className={`flex gap-1 mb-2 justify-center`}
            >
              <span
                className={`bg-red-50 text-red-400 p-2 rounded-lg text-center dark:bg-danger/20`}
              >
                {content.toString()}
              </span>
            </div>
          );
        })
      ) : (
        <div className={`flex gap-1 mb-2 justify-center`}>
          <span
            className={`bg-red-50 text-red-400 p-2 rounded-lg dark:bg-danger/20`}
          >
            {modalContent.toString()}
          </span>
        </div>
      ),
    onOk: () => setModalType(""),
    icon: icon && icon,
  };

  useEffect(() => {
    renderModal(modalProps, modalType);
  }, [modalType]);

  return <></>;
};
