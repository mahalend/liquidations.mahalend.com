import React from "react";
import Modal from "../../components/Modal";
import TxModal from "./TxModal";

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const DesktopTransactionInfo = (props: Iprops) => {
  const { openModal, onDismiss } = props;

  if (!openModal) return null;

  return (
    <Modal open={openModal} handleClose={() => onDismiss()}>
      <TxModal openModal={openModal} onDismiss={() => onDismiss()} />
    </Modal>
  );
};

export default DesktopTransactionInfo;
