export const toggleHTMLDirection = () => {
  const direction = document.dir;
  if (direction == "ltr") {
    document.documentElement.setAttribute("dir", "rtl");
    console.log("ltr");
  } else {
    console.log("rtl");

    document.documentElement.setAttribute("dir", "ltr");
  }
};
