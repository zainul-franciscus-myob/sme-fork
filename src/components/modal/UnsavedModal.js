import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnsavedModal = ({
  onConfirmSave,
  onConfirmUnsave,
  onCancel,
  title = 'Unsaved changes',
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
      <Button type="delete" onClick={onConfirmUnsave} disabled={isActionsDisabled}>Don&apos;t save</Button>
      <Button type="primary" onClick={onConfirmSave} disabled={isActionsDisabled}>Save</Button>
    </Modal.Footer>
  </Modal>
);

export default UnsavedModal;
