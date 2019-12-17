import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../ExpensePayItemSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
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
      title="Delete this pay item?"
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
    />
  ),
}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ExpensePayItemModal);
