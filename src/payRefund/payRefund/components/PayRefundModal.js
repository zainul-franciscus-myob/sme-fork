import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';

const PayRefundModal = ({
  modalType,
  onCloseModal,
  onConfirmCancel,
  onConfirmDelete,
}) => {
  const cancelModal = (
    <CancelModal
      onCancel={onCloseModal}
      onConfirm={onConfirmCancel}
      title="Cancel pay refund"
      description="Are you sure you want to cancel the alterations in this refund?"
    />
  );

  const deleteModal = (
    <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete refund"
      description="Are you sure you want to delete this refund?"
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

export default PayRefundModal;
