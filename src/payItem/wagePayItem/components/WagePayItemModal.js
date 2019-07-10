import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';

const WagePayItemModal = ({
  modalType,
  onCloseModal,
  onConfirmCancel,
  onConfirmDelete,
}) => {
  const cancelModal = (
    <CancelModal
      onCancel={onCloseModal}
      onConfirm={onConfirmCancel}
      title="Cancel wage pay item"
      description="Are you sure you want to cancel the alterations in this pay item?"
    />
  );

  const deleteModal = (
    <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete wage pay item"
      description="Are you sure you want to delete this pay item?"
    />
  );

  return modalType === 'cancel' ? cancelModal : deleteModal;
};

export default WagePayItemModal;
