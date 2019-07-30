import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnsavedModal = ({
  onConfirmSave,
  onConfirmUnsave,
  onCancel,
  title = 'Unsaved changes',
  description = "You have unsaved changes. Your changes will be lost if you don't save them.",
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirmUnsave}>Don&apos;t save</Button>
      <Button type="primary" onClick={onConfirmSave}>Save</Button>
    </Modal.Footer>
  </Modal>
);

export default UnsavedModal;
