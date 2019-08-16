import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import EmailInvoiceModal from './EmailInvoiceModal';
import EmailSettingsModal from './EmailSettingsModal';
import InvoiceDetailModalType from '../InvoiceDetailModalType';

const InvoiceDetailModal = ({
  modalType,
  emailInvoiceDetail,
  isActionsDisabled,
  alert,
  confirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
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
