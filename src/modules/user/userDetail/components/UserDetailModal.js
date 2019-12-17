import React from 'react';

import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalType from './ModalType';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const UserDetailModal = ({
  modalType,
  onCloseModal,
  onDeleteModal,
  onConfirmSave,
  onConfirmCancelButtonClick,
}) => {
  if (modalType === ModalType.DELETE) {
    return (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this user?"
      />
    );
  }

  return (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancelButtonClick}
      onCancel={onCloseModal}
    />
  );
};

export default UserDetailModal;
