import React from 'react';

import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalType from '../ModalType';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const GeneralJournalDetailModal = ({
  modal: { type = '' },
  listeners: {
    onDismissModal,
    deleteModal,
    cancelModal,
    unsavedModal,
  },
}) => {
  if (type === ModalType.DELETE) {
    return (
      <DeleteModal
        onConfirm={deleteModal.onConfirm}
        onCancel={onDismissModal}
        title="Delete this transaction?"
      />
    );
  }
  if (type === ModalType.CANCEL) {
    return (
      <CancelModal
        onConfirm={cancelModal.onConfirm}
        onCancel={onDismissModal}
      />
    );
  }
  return (
    <UnsavedModal
      onConfirmSave={unsavedModal.onConfirmSave}
      onConfirmSaveText="Record"
      onConfirmUnsave={unsavedModal.onConfirmUnsave}
      onCancel={onDismissModal}
      title="Record changes?"
      description="Looks like you've made changes. Do you want to record these changes?"
    />
  );
};

export default GeneralJournalDetailModal;
