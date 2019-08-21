import React from 'react';

import DeleteModal from '../../../components/modal/DeleteModal';
import ModalType from '../ModalType';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const BankingRuleBillModal = ({
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
        description="Deleting this rule will remove it forever. No transactions that have already been created or matched by this rule will be deleted."
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

export default BankingRuleBillModal;
