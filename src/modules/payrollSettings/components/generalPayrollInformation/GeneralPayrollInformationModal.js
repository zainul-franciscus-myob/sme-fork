import React from 'react';

import UnsavedModal from '../../../../components/modal/UnsavedModal';

const GeneralPayrollInformationModal = ({
  onDismissModal,
  onConfirmSave,
  onConfirmCancelButtonClick,
}) => (
  <UnsavedModal
    onConfirmSave={onConfirmSave}
    onConfirmUnsave={onConfirmCancelButtonClick}
    onCancel={onDismissModal}
  />
);

export default GeneralPayrollInformationModal;
