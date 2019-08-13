import React from 'react';

import DeleteModal from '../../../components/modal/DeleteModal';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const ConfirmModal = ({
  modal: { type = '' },
  confirmModalListeners: {
    onConfirmClose,
    onConfirmCancel,
    onConfirmSave,
    onConfirmDelete,
  },
}) => {
  if (type === 'delete') {
    return (
      <DeleteModal
        onCancel={onConfirmClose}
        onConfirm={onConfirmDelete}
        title="Delete employee"
        description="Are you sure you want to delete this employee?"
      />
    );
  }

  return (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancel}
      onCancel={onConfirmClose}
    />
  );
};

export default ConfirmModal;
