import { jwtDecode } from "jwt-decode";

export const extractFromToken = (key: string) => {
  if (!localStorage) {
    return;
  }

  const token = localStorage.getItem("fintech__access_token");
  const decoded = token && jwtDecode<any>(token);
  return decoded[key];
};
