import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../ExpensePayItemSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';

const ExpensePayItemModal = ({
  modalType,
  onDismissModal,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
}) => ({
  [ModalType.DELETE]: (
    <DeleteModal
      onConfirm={onConfirmDeleteButtonClick}
      onCancel={onDismissModal}
      title="Delete expense pay item"
      description="Are you sure you want to delete?"
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
      title="Cancel expense pay item"
      description="Are you sure you want to cancel the alterations?"
    />
  ),
}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ExpensePayItemModal);
