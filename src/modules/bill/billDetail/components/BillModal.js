import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../selectors/billSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ExportPdfModal from './ExportPdfModal';
import ModalType from '../types/ModalType';
import SaveAndCreateNewModal from './SaveAndCreateNewModal';
import SaveAndDuplicateModal from './SaveAndDuplicateModal';
import UnlinkDocumentModal from './UnlinkDocumentModal';

const BillModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onUnlinkDocumentConfirm,
  exportPdfModalListeners,
}) => ({
  [ModalType.CancelModal]: (<CancelModal
    onConfirm={onCancelModalConfirm}
    onCancel={onModalClose}
  />),
  [ModalType.DeleteModal]: (<DeleteModal
    onConfirm={onDeleteModalConfirm}
    onCancel={onModalClose}
    title="Delete this bill?"
  />),
  [ModalType.SaveAndCreateNew]: (<SaveAndCreateNewModal
    onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
    onCancel={onModalClose}
  />),
  [ModalType.SaveAndDuplicate]: (<SaveAndDuplicateModal
    onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
    onCancel={onModalClose}
  />),
  [ModalType.ExportPdf]: (<ExportPdfModal listeners={exportPdfModalListeners} />),
  [ModalType.UnlinkDocument]: (<UnlinkDocumentModal
    onConfirm={onUnlinkDocumentConfirm}
    onCancel={onModalClose}
  />),
}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BillModal);