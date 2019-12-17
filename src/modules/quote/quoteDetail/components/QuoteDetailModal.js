import { connect } from 'react-redux';
import React from 'react';

import { getEmailQuoteDetail } from '../selectors/EmailSelectors';
import {
  getExportPdfTemplate,
  getIsModalActionDisabled,
  getModal,
  getModalAlert,
  getTemplateOptions,
} from '../selectors/QuoteDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmailQuoteModal from './email/EmailQuoteModal';
import EmailSettingsModal from './email/EmailSettingsModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../ModalType';
import QuoteDetailSaveAndConfirmModal from './QuoteDetailSaveAndConfirmModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const QuoteDetailModal = ({
  modal: { type = '' },
  template,
  templateOptions,
  isActionDisabled,
  emailQuoteDetail,
  modalAlert,
  listeners: {
    onDismissModal,
    onConfirmCancelButtonClick,
    onConfirmDeleteButtonClick,
    onConfirmSaveButtonClick,
    onConfirmUnsaveButtonClick,
    onConfirmSaveAndCreateNewButtonClick,
    onConfirmSaveAndDuplicateButtonClick,
    onConfirmExportPdfButtonClick,
    onConfirmEmailQuoteButtonClick,
    onChangeExportPdfTemplate,
    onEmailQuoteDetailChange,
    onDismissAlert,
    onAddAttachments,
    onRemoveAttachment,
    onCancelEmailQuoteButtonClick,
    onConfirmEmailSettingButtonClick,
    onCloseEmailSettingButtonClick,
  },
}) => ({
  [ModalType.DELETE]: (
    <DeleteModal
      onConfirm={onConfirmDeleteButtonClick}
      onCancel={onDismissModal}
      title="Delete this quote?"
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
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
      onChangeExportPdfForm={onChangeExportPdfTemplate}
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
}[type]);

const mapStateToProps = state => ({
  modal: getModal(state),
  template: getExportPdfTemplate(state),
  templateOptions: getTemplateOptions(state),
  isActionDisabled: getIsModalActionDisabled(state),
  emailQuoteDetail: getEmailQuoteDetail(state),
  modalAlert: getModalAlert(state),
});

export default connect(mapStateToProps)(QuoteDetailModal);
