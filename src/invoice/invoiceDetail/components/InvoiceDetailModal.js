import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import EmailInvoiceModal from './email/EmailInvoiceModal';
import EmailSettingsModal from './email/EmailSettingsModal';
import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceDetailSaveAndConfirmModal from './InvoiceDetailSaveAndConfirmModal';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const InvoiceDetailModal = ({
  modalType,
  emailInvoiceDetail,
  isActionsDisabled,
  alert,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  applyPaymentUnsavedChangesListeners,
}) => {
  if (modalType === InvoiceDetailModalType.EMAIL_INVOICE) {
    return (
      <EmailInvoiceModal
        onCancel={emailInvoiceDetailModalListeners.onCloseModal}
        onConfirm={emailInvoiceDetailModalListeners.onConfirm}
        onEmailInvoiceDetailChange={emailInvoiceDetailModalListeners.onEmailInvoiceDetailChange}
        emailInvoiceDetail={emailInvoiceDetail}
        isActionsDisabled={isActionsDisabled}
        alert={alert}
        onDismissAlert={emailInvoiceDetailModalListeners.onDismissAlert}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.EMAIL_SETTINGS) {
    return (
      <EmailSettingsModal
        onCancel={emailSettingsModalListeners.onCloseModal}
        onConfirm={emailSettingsModalListeners.onConfirm}
        title="Enter email reply details in settings"
        description="Looks like there are no email reply details for you business in Invoice and quote settings. You'll need to enter these details before you can send this email."
        alert={alert}
        onDismissAlert={emailSettingsModalListeners.onDismissAlert}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SAVE_AND_CREATE_NEW) {
    return (
      <InvoiceDetailSaveAndConfirmModal
        title="Save and create new"
        description="This will save your current invoice and create a new invoice. This means you will no longer be able to change the customer."
        onCancel={saveAndConfirmModalListeners.onCloseModal}
        onConfirmSave={saveAndConfirmModalListeners.onConfirmSaveAndCreateNew}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SAVE_AND_DUPLICATE) {
    return (
      <InvoiceDetailSaveAndConfirmModal
        title="Save and duplicate"
        description="This will save your current invoice and create a new invoice with the same information. This means you'll no longer be able to change the customer."
        onCancel={saveAndConfirmModalListeners.onCloseModal}
        onConfirmSave={saveAndConfirmModalListeners.onConfirmSaveAndDuplicate}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.APPLY_PAYMENT_UNSAVED_CHANGES) {
    return (
      <UnsavedModal
        onConfirmSave={applyPaymentUnsavedChangesListeners.onConfirmSave}
        onConfirmUnsave={applyPaymentUnsavedChangesListeners.onConfirmUnsave}
        onCancel={applyPaymentUnsavedChangesListeners.onCancel}
        isActionsDisabled={isActionsDisabled}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.DELETE) {
    return (
      <DeleteModal
        onCancel={confirmModalListeners.onCloseConfirmModal}
        onConfirm={confirmModalListeners.onDeleteModalConfirm}
        title="Delete invoice"
        description="Are you sure you want to delete this invoice?"
      />
    );
  }

  return (
    <CancelModal
      onCancel={confirmModalListeners.onCloseConfirmModal}
      onConfirm={confirmModalListeners.onCancelModalConfirm}
      title="Cancel invoice alterations"
      description="Are you sure you want to cancel the alterations in this invoice?"
    />
  );
};

export default InvoiceDetailModal;
