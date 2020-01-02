import React from 'react';

import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import modalTypes from '../modalTypes';

const SaleSettingsModal = ({
  modalType,
  onCloseModal,
  onConfirmSwitchTab,
  onConfirmDeleteTemplate,
}) => {
  if (modalType === modalTypes.switchTab) {
    return (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onConfirmSwitchTab}
      />
    );
  }

  return (
    <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDeleteTemplate}
      title="Delete this template?"
    />
  );
};

export default SaleSettingsModal;
