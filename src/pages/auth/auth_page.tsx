import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../../layout/auth-layout";

const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));

const AuthPage = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="forgetPassword" element={<ForgotPassword />} />
        <Route index element={<Login />} />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

export default AuthPage;
