import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnsavedModal = ({
  onConfirmSave,
  onConfirmSaveText = 'Save',
  onConfirmUnsave,
  onCancel,
  title = 'Save changes?',
  description = "Looks like you've made changes. Do you want to save these changes?",
  isActionsDisabled = false,
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
    canClose={!isActionsDisabled}
  >
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel} disabled={isActionsDisabled}>Go back</Button>
      <Button type="delete" onClick={onConfirmUnsave} disabled={isActionsDisabled}>Discard</Button>
      <Button type="primary" onClick={onConfirmSave} disabled={isActionsDisabled}>{onConfirmSaveText}</Button>
    </Modal.Footer>
  </Modal>
);

export default UnsavedModal;
