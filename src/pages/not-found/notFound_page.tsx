import { Route, Routes } from "react-router-dom";
// import { Error500 } from "./components/Error500";
import Error404 from "./not-found";
import { ErrorsLayout } from "../../layout/errors_layout";

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="404" element={<Error404 />} />
      {/* <Route path="500" element={<Error500 />} /> */}
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export default ErrorsPage;
