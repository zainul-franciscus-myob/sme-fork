import React from 'react';

import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import RecurringInvoiceModalType from '../types/RecurringInvoiceModalType';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const RecurringInvoiceModal = ({
  modalType,
  isActionsDisabled,
  confirmModalListeners,
  redirectToUrlListeners,
}) => {
  if (modalType === RecurringInvoiceModalType.REDIRECT_TO_URL) {
    return (
      <UnsavedModal
        onConfirmSave={redirectToUrlListeners.onConfirmSave}
        onConfirmUnsave={redirectToUrlListeners.onConfirmUnsave}
        onCancel={redirectToUrlListeners.onCancel}
        isActionsDisabled={isActionsDisabled}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    );
  }

  if (modalType === RecurringInvoiceModalType.DELETE) {
    return (
      <DeleteModal
        onCancel={confirmModalListeners.onCloseConfirmModal}
        onConfirm={confirmModalListeners.onDeleteModalConfirm}
        title="Delete this recurring transaction?"
      />
    );
  }

  return (
    <CancelModal
      onCancel={confirmModalListeners.onCloseConfirmModal}
      onConfirm={confirmModalListeners.onCancelModalConfirm}
    />
  );
};

export default RecurringInvoiceModal;
