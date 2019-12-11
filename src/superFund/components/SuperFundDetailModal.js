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
      />
    );
  }

  return (
    <DeleteModal
      onConfirm={onDeleteModalConfirm}
      onCancel={onModalClose}
      title="Delete this super fund?"
    />
  );
};

export default SuperFundDetailModal;
