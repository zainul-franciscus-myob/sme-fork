import React from 'react';

import CancelModal from '../../../../components/modal/CancelModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';
import modalTypes from '../modalTypes';

const BusinessSettingsModal = ({
  modalType,
  onConfirmCancel,
  onConfirmClose,
  onConfirmSave,
  onConfirmSwitchTab,
}) => {
  if (modalType === modalTypes.unsaved) {
    return (
      <UnsavedModal
        onConfirmSave={onConfirmSave}
        onConfirmUnsave={onConfirmCancel}
        onCancel={onConfirmClose}
      />
    );
  }
  if (modalType === modalTypes.cancel) {
    return (
      <CancelModal onConfirm={onConfirmCancel} onCancel={onConfirmClose} />
    );
  }

  if (modalType === modalTypes.switchTab) {
    return (
      <CancelModal onCancel={onConfirmClose} onConfirm={onConfirmSwitchTab} />
    );
  }

  return undefined;
};

export default BusinessSettingsModal;
