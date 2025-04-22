import { useEffect } from "react";

const usePageTitle = () => {
  const pathname = location.pathname.split("/");
  const title = pathname[pathname.length - 1];
  const titleCapitalize = title.charAt(0).toUpperCase() + title.slice(1);

  useEffect(() => {
    document.title = titleCapitalize + " | Zakat App";
  }, [titleCapitalize]);
};

export default usePageTitle;
