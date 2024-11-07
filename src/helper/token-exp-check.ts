import { extractFromToken } from "./jwt-decoder";
import { signout } from "./signout";

export const tokenExpirationCheck = () => {
  const app_token = localStorage.getItem("fintech__access_token");

  try {
    if (app_token) {
      const exp = extractFromToken("exp");
      const tokenExpiration = new Date(exp * 1000);

      if (tokenExpiration < new Date()) {
        signout();
      }
    }
  } catch (error) {
    console.error("AN ERROR OCCURED WHILE CHECKING TOKEN EXPIRATION", error);
  }
};
