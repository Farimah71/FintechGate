import { create } from "zustand";
import { ModalType } from "../../../types/modal.type";
import { ReactNode } from "react";

type State = {
  modalType: ModalType;
  modalTitle: string;
  modalContent: string | string[];
  modalIcon?: ReactNode;
};

type Actions = {
  setModalType: (type: ModalType) => void;
  setModalTitle: (title: string) => void;
  setModalContent: (content: string | string[]) => void;
  setModalIcon: (icon: ReactNode) => void;
};

const initialState: State = {
  modalType: "",
  modalTitle: "",
  modalContent: "",
  modalIcon: null,
};

export const useModal = create<State & Actions>()((set) => ({
  ...initialState,
  setModalType: (type) => set(() => ({ modalType: type })),
  setModalTitle: (title) => set(() => ({ modalTitle: title })),
  setModalContent: (content) =>
    set(() => ({
      modalContent: Array.isArray(content)
        ? content.map((c) => c)
        : content,
    })),
  setModalIcon: (icon) => set(() => ({ modalIcon: icon })),
}));
