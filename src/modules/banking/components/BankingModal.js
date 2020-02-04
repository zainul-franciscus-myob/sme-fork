import React from 'react';

import BulkUnallocateModal from './BulkUnallocateModal';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalTypes from '../ModalTypes';
import TransferMoneyModal from './TransferMoneyModal';
import UnmatchTransactionModal from './UnmatchTransactionModal';

const BankingModal = ({
  modalType,
  onCloseModal,
  onConfirmCancelModal,
  onConfirmUnallocateModal,
  onRenderBankingRuleModal,
  onConfirmUnmatchTransactionModal,
  onDeleteAttachmentModal,
  onSaveTransferMoney,
  onUpdateTransfer,
  onDismissModalAlert,
}) => {
  let modal;
  if (modalType === ModalTypes.CANCEL) {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onConfirmCancelModal}
      />
    );
  } else if (modalType === ModalTypes.BULK_UNALLOCATE) {
    modal = (
      <BulkUnallocateModal
        onCancel={onCloseModal}
        onConfirm={onConfirmUnallocateModal}
        title="Unallocate"
        description="Are you sure you want to unallocate the selected bank transactions?"
      />
    );
  } else if (modalType === ModalTypes.BANKING_RULE) {
    modal = onRenderBankingRuleModal();
  } else if (modalType === ModalTypes.UNMATCH_TRANSACTION) {
    modal = (
      <UnmatchTransactionModal
        onCancel={onCloseModal}
        onConfirm={onConfirmUnmatchTransactionModal}
      />
    );
  } else if (modalType === ModalTypes.DELETE_ATTACHMENT) {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteAttachmentModal}
        title="Delete this attachment?"
      />
    );
  } else if (modalType === ModalTypes.TRANSFER_MONEY) {
    modal = (
      <TransferMoneyModal
        onCancel={onCloseModal}
        onConfirm={onSaveTransferMoney}
        onUpdateTransfer={onUpdateTransfer}
        onDismissModalAlert={onDismissModalAlert}
      />
    );
  }
  return modal;
};

export default BankingModal;
