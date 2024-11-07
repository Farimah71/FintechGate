import { MenuProps, Switch } from "antd";
import { HiExclamationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { extractFromToken } from "../helper/jwt-decoder";
import { t } from "i18next";
import EngFlag from "../assets/images/flags/united-states.svg";
// import SpainFlag from "../assets/images/flags/spain.svg";
// import GerFlag from "../assets/images/flags/germany.svg";
// import FraFlag from "../assets/images/flags/france.svg";
// import IrFlag from "../assets/images/flags/iran.svg";
import TrFlag from "../assets/images/flags/turkey.svg";
import avatar from "../assets/images/avatars/300-23.jpg";
import i18n from "../configs/i18n";
import { signout } from "../helper/signout";

const lang = localStorage.getItem("i18nextLng");
const selectedLang = lang ? lang : "tr";

const setLang = (langCode: string) => {
  i18n.changeLanguage(langCode);
  window.location.reload();
};

const renderflag: Record<string, string> = {
  en: EngFlag,
  "en-US": EngFlag,
  // ir: IrFlag,
  // es: SpainFlag,
  // de: GerFlag,
  // fr: FraFlag,
  tr: TrFlag,
};
const LanguageName: Record<string, string> = {
  "en-US": t("language.en"),
  en: t("language.en"),
  // ir: t("language.ir"),
  // de: t("language.de"),
  // es: t("language.es"),
  // fr: t("language.fr"),
  tr: t("language.tr"),
};

export const items: MenuProps["items"] = [
  {
    type: "group",
    label: (
      <div className="flex items-center gap-x-3 p-2 w-32 sm:w-60 font-semibold !text-gray-600">
        <img src={avatar} width={50} height={50} className="rounded-lg" />
        <div className="flex flex-col mt-2">
          <div className="flex gap-x-2 select-none">
            <span className="font-extrabold text-gray-700 dark:text-gray-500">
              {extractFromToken("name")} {extractFromToken("family_name")}
            </span>
            <span className="bg-success-light hidden sm:block text-xs font-semibold text-success dark:bg-dark rounded-full px-2 pt-0.5">
              Pro
            </span>
          </div>
          <Link
            to={""}
            className="text-secondary-clarity hidden sm:block opacity-80 hover:text-primary duration-200 w-48 break-all"
            role="button"
          >
            {extractFromToken("email")}
          </Link>
        </div>
      </div>
    ),
  },
  { type: "divider" },
  {
    label: (
      <Link
        to="profile"
        className="p-2 w-32 sm:w-60 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
      >
        {t("user_profile_dropdown.my_profile")}
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link
        to=""
        className="p-2 w-32 sm:w-60 flex font-semibold !text-gray-600 hover:!text-primary-active"
      >
        <span> {t("user_profile_dropdown.my_projects")}</span>
        <span className="rounded-full mx-2 hidden sm:block bg-danger-light dark:bg-danger/10 text-danger px-1.5">
          3
        </span>
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link
        to=""
        className="p-2 w-32 sm:w-60 relative inline-block font-semibold !text-gray-600 hover:!text-primary-active"
      >
        {t("user_profile_dropdown.my_subscriptions")}
      </Link>
    ),
    key: "2",
    children: [
      {
        label: (
          <Link
            to=""
            className="p-2 sm:w-40 w-32 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
          >
            {t("user_profile_dropdown.referrals")}
          </Link>
        ),
        key: "2-1",
      },
      {
        label: (
          <Link
            to=""
            className="p-2 sm:w-40 w-32 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
          >
            {t("user_profile_dropdown.billing")}
          </Link>
        ),
        key: "2-2",
      },
      {
        label: (
          <Link
            to=""
            className="p-2 sm:w-40 w-32 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
          >
            {t("user_profile_dropdown.payments")}
          </Link>
        ),
        key: "2-3",
      },
      {
        label: (
          <Link
            to=""
            className="p-2 sm:w-40 w-32 inline-flex justify-between font-semibold !text-gray-600 hover:!text-primary-active"
          >
            <span>{t("user_profile_dropdown.statements")}</span>
            <div>
              <HiExclamationCircle className="mt-1" />
            </div>
          </Link>
        ),
        key: "2-4",
      },
      {
        type: "divider",
      },
      {
        type: "group",
        label: (
          <div className="p-2 sm:w-40 w-32 flex justify-between font-semibold cursor-default !text-gray-600 hover:!text-primary-active">
            <Switch size="small" defaultChecked className="mt-0.5" />
            <span className="mx-3 text-gray-500">
              {t("user_profile_dropdown.notifications")}
            </span>
          </div>
        ),
        key: "2-5",
      },
    ],
  },
  {
    label: (
      <Link
        to=""
        className="p-2 w-32 sm:w-60 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
      >
        {t("user_profile_dropdown.my_statements")}
      </Link>
    ),
    key: "3",
  },
  {
    type: "divider",
  },
  {
    label: (
      <div className="p-2 w-32 sm:w-60 inline-flex justify-between font-semibold !text-gray-600 hover:!text-primary-active">
        <span>{t("user_profile_dropdown.language")}</span>
        <span className="bg-gray-100 dark:bg-transparent px-2 py-1.5 -mt-1 rounded-md text-[11px] flex gap-x-2">
          <span className="hidden sm:block">{LanguageName[selectedLang]}</span>
          <img
            src={renderflag[selectedLang]}
            alt="flag"
            width={15}
            className="rounded-md"
          />
        </span>
      </div>
    ),
    key: "4",
    children: [
      {
        className: `${
          (selectedLang == "en" || selectedLang == "en-US") &&
          "!bg-gray-100 dark:!bg-transparent"
        }`,
        label: (
          <div
            className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold text-gray-600 hover:text-primary-active"
            onClick={() => setLang("en")}
          >
            <img src={EngFlag} width={22} className="rounded-md" />
            <span
              className={`${
                (selectedLang == "en" || selectedLang == "en-US") &&
                "dark:!bg-transparent dark:!text-primary"
              }`}
            >
              {t("language.en")}
            </span>
          </div>
        ),
        key: "4-1",
      },
      // {
      //   className: `${
      //     selectedLang == "ir" && "!bg-gray-100 dark:!bg-transparent"
      //   }`,
      //   label: (
      //     <div
      //       className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold !text-gray-600 hover:!text-primary-active"
      //       onClick={() => setLang("ir")}
      //     >
      //       <img src={IrFlag} width={22} className="rounded-md" />
      //       <span
      //         className={`${
      //           selectedLang == "ir" &&
      //           "dark:!bg-transparent dark:!text-primary"
      //         }`}
      //       >
      //         {t("language.ir")}
      //       </span>
      //     </div>
      //   ),
      //   key: "4-2",
      // },
      {
        className: `${
          selectedLang == "tr" && "!bg-gray-100 dark:!bg-transparent"
        }`,
        label: (
          <div
            className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold !text-gray-600 hover:!text-primary-active"
            onClick={() => setLang("tr")}
          >
            <img src={TrFlag} width={22} className="rounded-md" />
            <span
              className={`${
                selectedLang == "tr" &&
                "dark:!bg-transparent dark:!text-primary"
              }`}
            >
              {t("language.tr")}
            </span>
          </div>
        ),
        key: "4-3",
      },
      // {
      //   className: `${
      //     selectedLang == "de" && "!bg-gray-100 dark:!bg-transparent"
      //   }`,
      //   label: (
      //     <div
      //       className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold !text-gray-600 hover:!text-primary-active"
      //       onClick={() => setLang("de")}
      //     >
      //       <img src={GerFlag} width={22} className="rounded-md" />
      //       <span
      //         className={`${
      //           selectedLang == "de" &&
      //           "dark:!bg-transparent dark:!text-primary"
      //         }`}
      //       >
      //         {t("language.de")}
      //       </span>
      //     </div>
      //   ),
      //   key: "4-4",
      // },
      // {
      //   className: `${
      //     selectedLang == "es" && "!bg-gray-100 dark:!bg-transparent"
      //   }`,
      //   label: (
      //     <div
      //       className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold !text-gray-600 hover:!text-primary-active"
      //       onClick={() => setLang("es")}
      //     >
      //       <img src={SpainFlag} width={22} className="rounded-md" />
      //       <span
      //         className={`${
      //           selectedLang == "es" &&
      //           "dark:!bg-transparent dark:!text-primary"
      //         }`}
      //       >
      //         {t("language.es")}
      //       </span>
      //     </div>
      //   ),
      //   key: "4-5",
      // },
      // {
      //   className: `${
      //     selectedLang == "fr" && "!bg-gray-100 dark:!bg-transparent"
      //   }`,
      //   label: (
      //     <div
      //       className="p-2 sm:w-40 w-28 flex gap-x-3 font-semibold !text-gray-600 hover:!text-primary-active"
      //       onClick={() => setLang("fr")}
      //     >
      //       <img src={FraFlag} width={22} className="rounded-md" />
      //       <span
      //         className={`${
      //           selectedLang == "fr" &&
      //           "dark:!bg-transparent dark:!text-primary"
      //         }`}
      //       >
      //         {t("language.fr")}
      //       </span>
      //     </div>
      //   ),
      //   key: "4-6",
      // },
    ],
  },
  {
    label: (
      <Link
        to=""
        className="p-2 w-32 sm:w-60 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
      >
        {t("user_profile_dropdown.account_settings")}
      </Link>
    ),
    key: "5",
  },
  {
    label: (
      <div
        className="p-2 w-32 sm:w-60 inline-block font-semibold !text-gray-600 hover:!text-primary-active"
        onClick={() => signout()}
      >
        {t("user_profile_dropdown.sign_out")}
      </div>
    ),
    key: "6",
  },
];
