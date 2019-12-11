import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from './ModalType';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const TransferMoneyDetailModal = ({
  modal: { type = '' },
  onDismissModal,
  onConfirmSave,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
}) => {
  if (type === ModalType.DELETE) {
    return (
      <DeleteModal
        onConfirm={onConfirmDeleteButtonClick}
        onCancel={onDismissModal}
        title="Delete this transaction?"
      />
    );
  }
  if (type === ModalType.CANCEL) {
    return (
      <CancelModal
        onConfirm={onConfirmCancelButtonClick}
        onCancel={onDismissModal}
      />
    );
  }
  return (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmSaveText="Record"
      onConfirmUnsave={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
      title="Record changes?"
      description="Looks like you've made changes. Do you want to record these changes?"
    />
  );
};

export default TransferMoneyDetailModal;
