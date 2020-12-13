import { connect } from 'react-redux';
import React from 'react';

import {
  getSaveAndCreateNewModalBody,
  getSaveAndDuplicateModalBody,
} from '../selectors/invoiceSaveSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmailInvoiceModal from './email/EmailInvoiceModal';
import EmailSettingsModal from './email/EmailSettingsModal';
import ExportPdfModal from './modal/ExportPdfModal';
import InvalidAbnModal from './modal/InvalidAbnModal';
import InvoiceDetailModalType from '../types/InvoiceDetailModalType';
import InvoiceDetailPreConversionModal from './modal/InvoiceDetailPreConversionModal';
import InvoiceDetailSaveAndConfirmModal from './modal/InvoiceDetailSaveAndConfirmModal';
import QuickQuoteModal from './modal/QuickQuoteModal';
import SaveAmountDueWarningModal from './modal/SaveAmountDueWarningModal';
import SendEInvoiceModal from './modal/SendEInvoiceModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const InvoiceDetailModal = ({
  modalType,
  saveAndCreateNewModalBody,
  saveAndDuplicateModalBody,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  alert,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  applyPaymentUnsavedChangesListeners,
  redirectToUrlListeners,
  exportPdfModalListeners,
  preConversionModalListeners,
  quickQuoteModalListeners,
  sendEInvoiceModalListeners,
  invalidAbnModalListeners,
}) => {
  if (modalType === InvoiceDetailModalType.EMAIL_INVOICE) {
    return (
      <EmailInvoiceModal
        emailInvoiceDetail={emailInvoiceDetail}
        templateOptions={templateOptions}
        isActionsDisabled={isActionsDisabled}
        alert={alert}
        onCancel={emailInvoiceDetailModalListeners.onCloseModal}
        onConfirm={emailInvoiceDetailModalListeners.onConfirm}
        onEmailInvoiceDetailChange={
          emailInvoiceDetailModalListeners.onEmailInvoiceDetailChange
        }
        onDismissAlert={emailInvoiceDetailModalListeners.onDismissAlert}
        onAddAttachments={emailInvoiceDetailModalListeners.onAddAttachments}
        onRemoveAttachment={emailInvoiceDetailModalListeners.onRemoveAttachment}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.EMAIL_SETTINGS) {
    return (
      <EmailSettingsModal
        onChange={emailSettingsModalListeners.onChange}
        onCancel={emailSettingsModalListeners.onCloseModal}
        onConfirm={emailSettingsModalListeners.onConfirm}
        alert={alert}
        onDismissAlert={emailSettingsModalListeners.onDismissAlert}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SAVE_AMOUNT_DUE_WARNING) {
    return (
      <SaveAmountDueWarningModal
        onConfirm={saveAndConfirmModalListeners.onConfirmSaveAmountDueWarning}
        onCancel={saveAndConfirmModalListeners.onCloseModal}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SAVE_AND_CREATE_NEW) {
    return (
      <InvoiceDetailSaveAndConfirmModal
        title="Save and create new"
        description={saveAndCreateNewModalBody}
        onCancel={saveAndConfirmModalListeners.onCloseModal}
        onConfirmSave={saveAndConfirmModalListeners.onConfirmSaveAndCreateNew}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SAVE_AND_DUPLICATE) {
    return (
      <InvoiceDetailSaveAndConfirmModal
        title="Save and duplicate"
        description={saveAndDuplicateModalBody}
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
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    );
  }

  if (modalType === InvoiceDetailModalType.REDIRECT_TO_URL) {
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

  if (modalType === InvoiceDetailModalType.QUICK_QUOTE) {
    return (
      <QuickQuoteModal
        onSelectCustomerQuote={quickQuoteModalListeners.onSelectCustomerQuote}
        onCloseModal={quickQuoteModalListeners.onCloseModal}
        onConvertCustomerQuote={quickQuoteModalListeners.onConvertCustomerQuote}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SEND_EINVOICE) {
    return (
      <SendEInvoiceModal
        alert={alert}
        onCloseModal={sendEInvoiceModalListeners.onCloseModal}
        onDismissAlert={sendEInvoiceModalListeners.onDismissAlert}
        onSendEInvoice={sendEInvoiceModalListeners.onSendEInvoice}
      />
    );
  }

  if (modalType === InvoiceDetailModalType.SEND_EINVOICE_ABN_WARNING) {
    return (
      <InvalidAbnModal
        onCancel={invalidAbnModalListeners.onCloseModal}
        title="Invalid or empty ABN"
        body="You can't send this as an e-invoice as the customer does not have a valid ABN entered."
      />
    );
  }

  if (modalType === InvoiceDetailModalType.EXPORT_PDF) {
    return <ExportPdfModal listeners={exportPdfModalListeners} />;
  }

  if (modalType === InvoiceDetailModalType.DELETE) {
    return (
      <DeleteModal
        onCancel={confirmModalListeners.onCloseConfirmModal}
        onConfirm={confirmModalListeners.onDeleteModalConfirm}
        title="Delete this invoice?"
      />
    );
  }

  if (modalType === InvoiceDetailModalType.CREATE_PRE_CONVERSION_INVOICE) {
    return (
      <InvoiceDetailPreConversionModal
        onCancel={preConversionModalListeners.onCancel}
        onConfirm={preConversionModalListeners.onConfirm}
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

const mapStateToProps = (state) => ({
  saveAndCreateNewModalBody: getSaveAndCreateNewModalBody(state),
  saveAndDuplicateModalBody: getSaveAndDuplicateModalBody(state),
});

export default connect(mapStateToProps)(InvoiceDetailModal);
