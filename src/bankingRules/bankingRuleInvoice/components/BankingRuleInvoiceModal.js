import { connect } from 'react-redux';
import React from 'react';

import { getModalType } from '../bankingRuleInvoiceSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';

const BankingRuleInvoiceModal = ({
  modalType,
  onDismissModal,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
}) => ({
  [ModalType.DELETE]: (
    <DeleteModal
      onConfirm={onConfirmDeleteButtonClick}
      onCancel={onDismissModal}
      title="Delete banking rule"
      description="Are you sure you want to delete this banking rule?"
    />
  ),
  [ModalType.CANCEL]: (
    <CancelModal
      onConfirm={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
      title="Cancel banking rule"
      description="Are you sure you want to cancel the alterations?"
    />
  ),
}[modalType]);

const mapStateToProps = state => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(BankingRuleInvoiceModal);
