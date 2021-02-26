import React from 'react';

import DeleteModal from '../../../../../components/modal/DeleteModal';

const DeleteConfirmationModal = ({
  confirmModalListeners: { onCancel, onConfirm },
}) => {
  return (
    <DeleteModal
      onCancel={onCancel}
      onConfirm={onConfirm}
      title="Delete this transaction?"
    />
  );
};

export default DeleteConfirmationModal;
