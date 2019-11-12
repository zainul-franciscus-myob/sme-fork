import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import EmailQuoteModal from './email/EmailQuoteModal';
import EmailSettingsModal from './email/EmailSettingsModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../ModalType';
import QuoteDetailSaveAndConfirmModal from './QuoteDetailSaveAndConfirmModal';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const QuoteDetailModal = ({
  modalType,
  template,
  templateOptions,
  isActionDisabled,
  emailQuoteDetail,
  modalAlert,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmExportPdfButtonClick,
  onConfirmEmailQuoteButtonClick,
  onChangeExportPdfForm,
  onEmailQuoteDetailChange,
  onDismissAlert,
  onAddAttachments,
  onRemoveAttachment,
  onCancelEmailQuoteButtonClick,
  onConfirmEmailSettingButtonClick,
  onCloseEmailSettingButtonClick,
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
  [ModalType.SAVE_AND_CREATE_NEW]: (
    <QuoteDetailSaveAndConfirmModal
      title="Save and create new"
      description="This will save your current quote and create a new quote. This means you will no longer be able to change the customer."
      onCancel={onDismissModal}
      onConfirmSave={onConfirmSaveAndCreateNewButtonClick}
    />
  ),
  [ModalType.SAVE_AND_DUPLICATE]: (
    <QuoteDetailSaveAndConfirmModal
      title="Save and duplicate"
      description="This will save your current quote and create a new quote with the same information. This means you will no longer be able to change the customer."
      onCancel={onDismissModal}
      onConfirmSave={onConfirmSaveAndDuplicateButtonClick}
    />
  ),
  [ModalType.EXPORT_PDF]: (
    <ExportPdfModal
      template={template}
      templateOptions={templateOptions}
      isActionDisabled={isActionDisabled}
      onCancel={onDismissModal}
      onConfirmExportPdfButtonClick={onConfirmExportPdfButtonClick}
      onChangeExportPdfForm={onChangeExportPdfForm}
    />
  ),
  [ModalType.EMAIL_QUOTE]: (
    <EmailQuoteModal
      emailQuoteDetail={emailQuoteDetail}
      templateOptions={templateOptions}
      isActionDisabled={isActionDisabled}
      alert={modalAlert}
      onCancel={onCancelEmailQuoteButtonClick}
      onConfirm={onConfirmEmailQuoteButtonClick}
      onEmailQuoteDetailChange={onEmailQuoteDetailChange}
      onDismissAlert={onDismissAlert}
      onAddAttachments={onAddAttachments}
      onRemoveAttachment={onRemoveAttachment}
    />
  ),
  [ModalType.EMAIL_SETTINGS]: (
    <EmailSettingsModal
      onCancel={onCloseEmailSettingButtonClick}
      onConfirm={onConfirmEmailSettingButtonClick}
      title="Enter email reply details in settings"
      description="Looks like there are no email reply details for you business in Invoice and quote settings. You'll need to enter these details before you can send this email."
      alert={modalAlert}
      onDismissAlert={onDismissAlert}
    />
  ),
}[modalType]);

export default QuoteDetailModal;
