import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../selectors/purchaseOrderSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../types/ModalType';
import SaveAndCreateNewModal from './SaveAndCreateNewModal';
import SaveAndDuplicateModal from './SaveAndDuplicateModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const PurchaseOrderModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndRedirect,
  onDeleteModalConfirm,
  onDiscardAndRedirect,
  exportPdfModalListeners,
}) =>
  ({
    [ModalType.CancelModal]: (
      <CancelModal onConfirm={onCancelModalConfirm} onCancel={onModalClose} />
    ),
    [ModalType.DeleteModal]: (
      <DeleteModal
        onConfirm={onDeleteModalConfirm}
        onCancel={onModalClose}
        title="Delete this purchase order?"
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
  }[modalType]);

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PurchaseOrderModal);
