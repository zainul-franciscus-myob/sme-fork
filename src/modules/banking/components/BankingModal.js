import React from 'react';

import BulkUnallocateModal from './BulkUnallocateModal';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ModalTypes from '../types/ModalTypes';
import TransferMoneyModal from './TransferMoneyModal';
import UnmatchTransactionModal from './UnmatchTransactionModal';

const BankingModal = ({
  modalType,
  onCloseModal,
  onConfirmCancelModal,
  onConfirmUnallocateModal,
  onConfirmUnmatchTransactionModal,
  onDeleteAttachmentModal,
  onSaveTransferMoney,
  onUpdateTransfer,
  onDismissModalAlert,
}) => {
  return {
    [ModalTypes.CANCEL]: (
      <CancelModal onCancel={onCloseModal} onConfirm={onConfirmCancelModal} />
    ),
    [ModalTypes.BULK_UNALLOCATE]: (
      <BulkUnallocateModal
        onCancel={onCloseModal}
        onConfirm={onConfirmUnallocateModal}
      />
    ),
    [ModalTypes.UNMATCH_TRANSACTION]: (
      <UnmatchTransactionModal
        onCancel={onCloseModal}
        onConfirm={onConfirmUnmatchTransactionModal}
      />
    ),
    [ModalTypes.DELETE_ATTACHMENT]: (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteAttachmentModal}
        title="Delete this attachment?"
      />
    ),
    [ModalTypes.TRANSFER_MONEY]: (
      <TransferMoneyModal
        onCancel={onCloseModal}
        onConfirm={onSaveTransferMoney}
        onUpdateTransfer={onUpdateTransfer}
        onDismissModalAlert={onDismissModalAlert}
      />
    ),
  }[modalType];
};

export default BankingModal;
