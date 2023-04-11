import React from "react";
import { useActivePopups } from "../../state/application/hooks";
import { PopupContent } from "../../utils/interface";

import TransactionSnackbar from "./TransactionSnackbar";

export default function Popups() {
  const activePopups = useActivePopups();

  return (
    <>
      {activePopups.map((p: { content: PopupContent }, i: number) => (
        <TransactionSnackbar
          key={i}
          index={i}
          notificationCount={i + 1}
          open
          content={p.content}
        />
      ))}
    </>
  );
}
