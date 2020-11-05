import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../selectors/billSelectors';
import BillDetailPreConversionModal from './BillDetailPreConversionModal';
import BillRecordPaymentModal from './BillRecordPaymentModal';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../types/ModalType';
import SaveAmountDueWarningModal from './SaveAmountDueWarningModal';
import SaveAndCreateNewModal from './SaveAndCreateNewModal';
import SaveAndDuplicateModal from './SaveAndDuplicateModal';
import UnlinkDocumentModal from './UnlinkDocumentModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const BillModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onConfirmSaveAmountDueWarningButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndRedirect,
  onDeleteModalConfirm,
  onDiscardAndRedirect,
  onUnlinkDocumentConfirm,
  exportPdfModalListeners,
  preConversionModalListeners,
  recordBillPaymentModalListeners,
}) =>
  ({
    [ModalType.CancelModal]: (
      <CancelModal onConfirm={onCancelModalConfirm} onCancel={onModalClose} />
    ),
    [ModalType.DeleteModal]: (
      <DeleteModal
        onConfirm={onDeleteModalConfirm}
        onCancel={onModalClose}
        title="Delete this bill?"
      />
    ),
    [ModalType.SaveAmountDueWarning]: (
      <SaveAmountDueWarningModal
        onConfirm={onConfirmSaveAmountDueWarningButtonClick}
        onCancel={onModalClose}
      />
    ),
    [ModalType.SaveAndCreateNew]: (
      <SaveAndCreateNewModal
        onConfirmSaveAndCreateNewButtonClick={
          onConfirmSaveAndCreateNewButtonClick
        }
        onCancel={onModalClose}
      />
    ),
    [ModalType.SaveAndDuplicate]: (
      <SaveAndDuplicateModal
        onConfirmSaveAndDuplicateButtonClick={
          onConfirmSaveAndDuplicateButtonClick
        }
        onCancel={onModalClose}
      />
    ),
    [ModalType.Unsaved]: (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onModalClose}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    ),
    [ModalType.ExportPdf]: (
      <ExportPdfModal listeners={exportPdfModalListeners} />
    ),
    [ModalType.UnlinkDocument]: (
      <UnlinkDocumentModal
        onConfirm={onUnlinkDocumentConfirm}
        onCancel={onModalClose}
      />
    ),
    [ModalType.PreConversionBill]: (
      <BillDetailPreConversionModal
        onConfirm={preConversionModalListeners.onConfirm}
        onCancel={preConversionModalListeners.onCancel}
      />
    ),
    [ModalType.RecordPayment]: (
      <BillRecordPaymentModal
        onCancel={recordBillPaymentModalListeners.onCancel}
        onEditSupplierClick={
          recordBillPaymentModalListeners.onEditSupplierClick
        }
        onRecordPaymentModalOpen={
          recordBillPaymentModalListeners.onRecordPaymentModalOpen
        }
        onRecordMultiplePayments={
          recordBillPaymentModalListeners.onRecordMultiplePayments
        }
        onSaveBillPayment={recordBillPaymentModalListeners.onSaveBillPayment}
        onUpdateHeaderOption={
          recordBillPaymentModalListeners.onUpdateHeaderOption
        }
        onUpdateIsElectronicPayment={
          recordBillPaymentModalListeners.onUpdateIsElectronicPayment
        }
        onUpdateBillPaymentAmountFields={
          recordBillPaymentModalListeners.onUpdateBillPaymentAmountFields
        }
      />
    ),
  }[modalType]);

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BillModal);
