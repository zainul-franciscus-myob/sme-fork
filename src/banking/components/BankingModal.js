import React from 'react';

import BulkUnallocateModal from './BulkUnallocateModal';
import CancelModal from '../../components/modal/CancelModal';

const BankingModal = ({
  modalType,
  onCloseCancelModal,
  onConfirmCancelModal,
  onCancelUnallocateModal,
  onConfirmUnallocateModal,
  onRenderBankingRuleModal,
}) => {
  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseCancelModal}
        onConfirm={onConfirmCancelModal}
        title="Cancel bank transaction alterations"
        description="Are you sure you want to cancel the alterations for this bank transaction?"
      />
    );
  } else if (modalType === 'bulkUnallocate') {
    modal = (
      <BulkUnallocateModal
        onCancel={onCancelUnallocateModal}
        onConfirm={onConfirmUnallocateModal}
        title="Unallocate"
        description="Are you sure you want to unallocate the selected bank transactions?"
      />
    );
  } else if (modalType === 'bankingRule') {
    modal = onRenderBankingRuleModal();
  }
  return modal;
};

export default BankingModal;
