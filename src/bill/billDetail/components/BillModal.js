import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../selectors/billSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../types/ModalType';
import SaveAndCreateNewModal from './SaveAndCreateNewModal';
import SaveAndDuplicateModal from './SaveAndDuplicateModal';

const BillModal = ({
  modalType,
  onModalClose,
  onCancelModalConfirm,
  onDeleteModalConfirm,
  onConfirmSaveAndDuplicateButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
}) => ({
  [ModalType.CancelModal]: (<CancelModal
    onConfirm={onCancelModalConfirm}
    onCancel={onModalClose}
    title="Cancel bill alterations"
    description="Are you sure you want to cancel the alterations in this bill?"
  />),
  [ModalType.DeleteModal]: (<DeleteModal
    onConfirm={onDeleteModalConfirm}
    onCancel={onModalClose}
    title="Delete bill"
    description="Are you sure you want to delete bill?"
  />),
  [ModalType.SaveAndCreateNew]: (<SaveAndCreateNewModal
    onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
    onCancel={onModalClose}
  />),
  [ModalType.SaveAndDuplicate]: (<SaveAndDuplicateModal
    onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
    onCancel={onModalClose}
  />),

}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BillModal);
