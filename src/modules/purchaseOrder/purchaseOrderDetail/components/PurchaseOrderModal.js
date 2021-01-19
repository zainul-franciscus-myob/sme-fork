import { connect } from 'react-redux';
import React from 'react';

import {
  getModalAlert,
  getModalType,
} from '../selectors/purchaseOrderSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmailPurchaseOrderModal from './email/EmailPurchaseOrderModal';
import EmailSettingsModal from './email/EmailSettingsModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../types/ModalType';
import SaveAndCreateNewModal from './SaveAndCreateNewModal';
import SaveAndDuplicateModal from './SaveAndDuplicateModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const PurchaseOrderModal = ({
  modalType,
  templateOptions,
  isActionDisabled,
  modalAlert,
  onModalClose,
  onCancelModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndRedirect,
  onDeleteModalConfirm,
  onDiscardAndRedirect,
  exportPdfModalListeners,
  emailPurchaseOrderDetailModalListeners,
  emailSettingsModalListeners,
}) =>
  ({
    [ModalType.CANCEL]: (
      <CancelModal onConfirm={onCancelModalConfirm} onCancel={onModalClose} />
    ),
    [ModalType.DELETE]: (
      <DeleteModal
        onConfirm={onDeleteModalConfirm}
        onCancel={onModalClose}
        title="Delete this purchase order?"
      />
    ),

    [ModalType.SAVE_AND_CREATE_NEW]: (
      <SaveAndCreateNewModal
        onConfirmSaveAndCreateNewButtonClick={
          onConfirmSaveAndCreateNewButtonClick
        }
        onCancel={onModalClose}
      />
    ),
    [ModalType.SAVE_AND_DUPLICATE]: (
      <SaveAndDuplicateModal
        onConfirmSaveAndDuplicateButtonClick={
          onConfirmSaveAndDuplicateButtonClick
        }
        onCancel={onModalClose}
      />
    ),
    [ModalType.UNSAVED]: (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onModalClose}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    ),
    [ModalType.EXPORT_PDF]: (
      <ExportPdfModal listeners={exportPdfModalListeners} />
    ),
    [ModalType.EMAIL_PURCHASE_ORDER]: (
      <EmailPurchaseOrderModal
        templateOptions={templateOptions}
        isActionDisabled={isActionDisabled}
        alert={modalAlert}
        onCancel={emailPurchaseOrderDetailModalListeners.onCloseModal}
        onConfirm={emailPurchaseOrderDetailModalListeners.onConfirm}
        onEmailPurchaseOrderDetailChange={
          emailPurchaseOrderDetailModalListeners.onEmailPurchaseOrderDetailChange
        }
        onDismissAlert={emailPurchaseOrderDetailModalListeners.onDismissAlert}
        onAddAttachments={
          emailPurchaseOrderDetailModalListeners.onAddAttachments
        }
        onRemoveAttachment={
          emailPurchaseOrderDetailModalListeners.onRemoveAttachment
        }
      />
    ),
    [ModalType.EMAIL_SETTINGS]: (
      <EmailSettingsModal
        onCancel={emailSettingsModalListeners.onCloseModal}
        onConfirm={emailSettingsModalListeners.onConfirm}
        alert={modalAlert}
        title="Enter email reply details in settings"
        description="Looks like there are no email reply details for your business in Purchases settings. You'll need to enter these details before you can send this email."
        onDismissAlert={emailSettingsModalListeners.onDismissAlert}
      />
    ),
  }[modalType]);

const mapStateToProps = (state) => ({
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PurchaseOrderModal);
