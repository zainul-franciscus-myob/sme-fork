import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const QuoteDetailModal = ({
  modalType,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
}) => ({
  [ModalType.DELETE]: (
    <DeleteModal
      onConfirm={onConfirmDeleteButtonClick}
      onCancel={onDismissModal}
      title="Delete quote"
      description="Are you sure you want to delete quote?"
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
      title="Cancel quote alterations"
      description="Are you sure you want to cancel the alterations in this quote?"
    />
  ),
  [ModalType.UNSAVED]: (
    <UnsavedModal
      onConfirmSave={onConfirmSaveButtonClick}
      onConfirmUnsave={onConfirmUnsaveButtonClick}
      onCancel={onDismissModal}
    />
  ),
}[modalType] || null);

export default QuoteDetailModal;
