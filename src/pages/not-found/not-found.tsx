import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import NotFound from "../../assets/images/errors/404-error.png";
import NotFoundDark from "../../assets/images/errors/404-error-dark.png";
import { t } from "i18next";

const Error404: FC = () => {
  return (
    <>
      {/* begin::Title */}
      <h1 className="font-extrabold text-3xl text-gray-900 dark:text-dark-light mb-4">
        {t("text.oops")}
      </h1>
      {/* end::Title */}

      {/* begin::Text */}
      <div className="font-normal text-sm text-gray-500 dark:text-dark-light/30 mb-7">
        {t("text.cant_find_page")}
      </div>
      {/* end::Text */}

      {/* begin::Illustration */}
      <div className="mb-3 mx-auto w-fit">
        <img
          src={NotFound}
          className="max-w-full max-h-[300px] dark:hidden block"
          alt="404 error"
        />
        <img
          src={NotFoundDark}
          className="max-w-full max-h-[300px] dark:block hidden"
          alt="404 error"
        />
      </div>
      {/* end::Illustration */}

      {/* begin::Link */}
      <div className="mb-0">
        <Button type="primary" size="large">
          <Link to={"/dashboard"}>{t("button.return_home")}</Link>
        </Button>
      </div>
      {/* end::Link */}
    </>
  );
};

export default Error404;
