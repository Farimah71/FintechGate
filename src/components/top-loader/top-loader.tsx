import LoadingBar from "react-top-loading-bar";
import { useContentLoadingStore } from "../../zustand/stores";

export const TopLoader = () => {
  const { isContentLoading } = useContentLoadingStore();

  return (
    <LoadingBar color="var(--primary)" progress={isContentLoading ? 100 : 0} />
  );
};
