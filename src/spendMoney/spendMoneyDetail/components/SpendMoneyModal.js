import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from './ModalType';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const SpendMoneyModal = ({
  modal: { type = '' },
  onDismissModal,
  onConfirmSave,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onDeleteAttachmentModal,
}) => {
  if (type === ModalType.DELETE) {
    return (
      <DeleteModal
        onConfirm={onConfirmDeleteButtonClick}
        onCancel={onDismissModal}
        title="Delete this transaction?"
        description="This can't be undone, or recovered later."
      />
    );
  }
  if (type === ModalType.CANCEL) {
    return (
      <CancelModal
        onConfirm={onConfirmCancelButtonClick}
        onCancel={onDismissModal}
        title="Discard unsaved changes?"
        description="You've made changes that will be lost if you don't go back and save them."
      />
    );
  }
  if (type === ModalType.DELETE_ATTACHMENT) {
    return (
      <DeleteModal
        onCancel={onDismissModal}
        onConfirm={onDeleteAttachmentModal}
        title="Delete attachment"
        description="Are you sure you want delete this attachment?"
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

export default SpendMoneyModal;
