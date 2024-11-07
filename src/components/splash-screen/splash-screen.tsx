import { t } from "i18next";
import { Loading } from "../UI/loading";
import Logo from "../../assets/images/logos/fintechGate-logo.png";

export const SplashScreen = () => {
  return (
    <div className="w-full h-screen dark:bg-black bg-blue-50">
      <div className="m-auto w-fit flex flex-col gap-5 items-center h-screen justify-center">
        <img src={Logo} width={120} alt="Logo" className="show-light" />
        {/* <img src={LogoDark} width={80} alt="Logo" className="show-dark" /> */}
        <div className="flex gap-x-4">
          <Loading />
          <span className="text-gray-400 mt-1 dark:text-gray-700">
            {t("text.loading")}
          </span>
        </div>
      </div>
    </div>
  );
};
