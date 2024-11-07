import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PanelLayout = lazy(() => import("../../layout/panel-layout"));
const Dashboard = lazy(() => import("../../pages/panel/dashboard"));
const Profile = lazy(() => import("../../pages/panel/profile"));
// const User = lazy(() => import("../../pages/panel/user"));
const PSP = lazy(() => import("../../pages/panel/PSP-pages/PSP"));
const Integrator = lazy(
  () => import("../../pages/panel/integrator_pages/integrator")
);
const Website = lazy(() => import("../../pages/panel/PSP-pages/website"));
const Transaction = lazy(
  () => import("../../pages/panel/PSP-pages/transaction")
);
const Invoice = lazy(() => import("../../pages/panel/PSP-pages/invoice"));
const Payment = lazy(
  () => import("../../pages/panel/integrator_pages/payment")
);

const userType = localStorage.getItem("fintech__userType");

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<PanelLayout />}>
        <Route path="profile" element={<Profile />} />
        {/* <Route path="user" element={<User />} /> */}
        {(userType == "2" || userType == "1") && (
          <>
            <Route path="PSP" element={<PSP />} />
            <Route path="website" element={<Website />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="invoice" element={<Invoice />} />
          </>
        )}
        {(userType == "3" || userType == "1") && (
          <>
            <Route path="integrator" element={<Integrator />} />
            <Route path="payment" element={<Payment />} />
          </>
        )}
        <Route index element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
}
