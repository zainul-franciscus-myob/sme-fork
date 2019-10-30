import React from 'react';

import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../ModalType';
import QuoteDetailSaveAndConfirmModal from './QuoteDetailSaveAndConfirmModal';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const QuoteDetailModal = ({
  modalType,
  template,
  templateOptions,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
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
      onCancel={onDismissModal}
      onConfirmExportPdfButtonClick={onConfirmExportPdfButtonClick}
      onChangeExportPdfForm={onChangeExportPdfForm}
    />
  ),
}[modalType]);

export default QuoteDetailModal;
