import { useEffect, useState } from "react";
import { ConfigProvider, Modal, theme as antTheme } from "antd";
import { ModalProvider } from "./utils/modal-provider";
import { OfflinePrompt } from "./components/offline-prompt";
import { useModal } from "./zustand/stores/modals/modal";
import { useTheme } from "./zustand/stores";
import { TopLoader } from "./components/top-loader";
import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/appRoutes";
import i18n from "./configs/i18n";

const currentLanguage = i18n.language;

export default function App() {
  const [isOnline, setIsOnline] = useState(true);

  const { theme } = useTheme();
  const { modalIcon, modalType } = useModal();
  const [, modalContextHolder] = Modal.useModal();

  useEffect(() => {
    window.onoffline = () => setIsOnline(false);
    window.ononline = () => setIsOnline(true);
  }, []);
  useEffect(() => {
    if (currentLanguage == "ir" || currentLanguage == "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    }
  }, [currentLanguage]);

  const isSystemThemeDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return (
    <>
      {!isOnline && <OfflinePrompt />}
      <Toaster />
      {modalContextHolder}
      <ModalProvider icon={modalType == "info" ? modalIcon : undefined} />
      <ConfigProvider
        theme={{
          algorithm: [
            theme === "dark"
              ? antTheme.darkAlgorithm
              : theme === "light"
              ? antTheme.defaultAlgorithm
              : isSystemThemeDark
              ? antTheme.darkAlgorithm
              : antTheme.defaultAlgorithm,
          ],
          components: {
            Input: {
              inputFontSizeLG: 14,
            },
            Button: {
              colorBgContainerDisabled: "#6aaefe",
              colorTextDisabled: "white",
              fontSizeLG: 14,
              fontWeight: 600,
            },
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
      <TopLoader />
    </>
  );
}
