import React from 'react';

import CancelModal from '../../components/modal/CancelModal';
import DeleteModal from '../../components/modal/DeleteModal';
import modalTypes from '../modalTypes';

const SuperFundDetailModal = ({
  modalType,
  listeners: {
    onModalClose,
    onCancelModalConfirm,
    onDeleteModalConfirm,
  },
}) => {
  if (modalType === modalTypes.cancel) {
    return (
      <CancelModal
        onConfirm={onCancelModalConfirm}
        onCancel={onModalClose}
        title="Cancel super fund alterations"
        description="Are you sure you want to cancel the alterations in this super fund?"
      />
    );
  }

  return (
    <DeleteModal
      onConfirm={onDeleteModalConfirm}
      onCancel={onModalClose}
      title="Delete super fund"
      description="Are you sure you want to delete super fund?"
    />
  );
};

export default SuperFundDetailModal;
