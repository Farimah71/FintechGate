export const signout = () => {
  localStorage.removeItem("fintech__access_token");
  localStorage.removeItem("fintech__userType");
  window.location.reload();
};
