import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../ItemQuoteSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ModalType from '../ModalType';

const ItemQuoteModal = ({
  modalType,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
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
}[modalType] || null);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ItemQuoteModal);
