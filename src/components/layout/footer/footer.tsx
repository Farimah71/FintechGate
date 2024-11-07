import { Footer } from "antd/es/layout/layout";

export const PanelFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      className="dark:bg-black bg-gray-100 text-gray-300 dark:text-gray-800"
      style={{
        textAlign: "center",
      }}
    >
      &copy; {currentYear} Innowaves
    </Footer>
  );
};
