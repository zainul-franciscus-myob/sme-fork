import React from 'react';

import UnsavedModal from '../../../components/modal/UnsavedModal';

const TemplateModal = ({
  onCloseModal,
  onConfirmUnsave,
  onConfirmSave,
}) => (
  <UnsavedModal
    onConfirmSave={onConfirmSave}
    onConfirmUnsave={onConfirmUnsave}
    onCancel={onCloseModal}
  />
);

export default TemplateModal;
