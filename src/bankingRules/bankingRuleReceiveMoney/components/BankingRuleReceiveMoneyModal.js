import React from 'react';

import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const BankingRuleReceiveMoneyModal = ({
  modal: { type = '' },
  onDismissModal,
  onConfirmSave,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
}) => {
  if (type === ModalType.DELETE) {
    return (
      <DeleteModal
        onConfirm={onConfirmDeleteButtonClick}
        onCancel={onDismissModal}
        title="Delete this rule?"
      />
    );
  }
  return (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
    />
  );
};

export default BankingRuleReceiveMoneyModal;
