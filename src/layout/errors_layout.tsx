import { Outlet } from "react-router-dom";

export const ErrorsLayout = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-404-light dark:bg-404-dark bg-cover dark:bg-dark-active">
      <div className="lg:w-[700px] w-[350px] h-auto lg:py-20 py-14 rounded-md dark:border-none text-center border shadow-md dark:bg-dark bg-white">
        <Outlet />
      </div>
    </div>
  );
};
