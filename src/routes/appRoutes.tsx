import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { tokenExpirationCheck } from "../helper/token-exp-check";
import { SplashScreen } from "../components/splash-screen";

const AuthPage = lazy(() => import("../pages/auth/auth_page"));
const PrivateRoutes = lazy(() => import("./private/privateRoutes"));
const ErrorPage = lazy(() => import("../pages/not-found/notFound_page"));

export default function AppRouter() {
  const app_token = localStorage.getItem("fintech__access_token");

  useEffect(() => {
    const interval = setInterval(() => {
      tokenExpirationCheck();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={<SplashScreen />}>
      <Routes>
        {app_token ? (
          <>
            <Route path="dashboard/*" element={<PrivateRoutes />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="error/*" element={<ErrorPage />} />
          </>
        ) : (
          <>
            <Route path="auth/*" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/error/404"} />} />
      </Routes>
    </Suspense>
  );
}
