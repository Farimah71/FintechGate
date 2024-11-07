import { VscDebugDisconnect } from "react-icons/vsc";
import { t } from "i18next";

export const OfflinePrompt = () => {
  return (
    <div className="text-gray-500 bg-black text-center flex gap-x-3 justify-center py-2">
      <VscDebugDisconnect size={25} />
      <span>{t("text.offline")}</span>
    </div>
  );
};
