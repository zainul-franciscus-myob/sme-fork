import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';

const SupplierReturnPurchaseModal = ({
  modalType,
  onCloseModal,
  onConfirmCancel,
  onConfirmDelete,
}) => {
  const cancelModal = (
    <CancelModal onCancel={onCloseModal} onConfirm={onConfirmCancel} />
  );

  const deleteModal = (
    <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete this transaction?"
    />
  );

  switch (modalType) {
    case 'cancel':
      return cancelModal;
    case 'delete':
      return deleteModal;
    default:
      return null;
  }
};

export default SupplierReturnPurchaseModal;
