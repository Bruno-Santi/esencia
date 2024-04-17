import { useEffect } from "react";

export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Esencia.app";
    };
  }, [title]);
};
