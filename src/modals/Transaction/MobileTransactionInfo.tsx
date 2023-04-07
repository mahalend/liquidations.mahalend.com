import React from "react";
import TxModal from './TxModal';
import Modal from "../../components/Modal";

interface Iprops {
  openModal: boolean;
  onDismiss: () => void;
}

const DesktopTransactionInfo = (props: Iprops) => {
  const {
    openModal,
    onDismiss,
  } = props;

  if (!openModal) return null;

  return (
    <Modal
      open={openModal}
      handleClose={() => onDismiss()}
    >
      <TxModal openModal={openModal} onDismiss={() => onDismiss()}/>
    </Modal>
  )
};

export default DesktopTransactionInfo;
