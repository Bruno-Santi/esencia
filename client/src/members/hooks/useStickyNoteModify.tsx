import { useState } from "react";

export const useStickyNoteModify = () => {
  const [stickyModalModify, setStickyModalModify] = useState(false);
  const toggleModalModify = () => setStickyModalModify(!stickyModalModify);

  return {
    toggleModalModify,
    stickyModalModify,
  };
};
