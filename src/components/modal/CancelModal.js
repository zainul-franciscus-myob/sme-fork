import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const CancelModal = ({
  onCancel, onConfirm,
}) => (
  <Modal
    title="Discard unsaved changes?"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      You&apos;ve made changes that will be lost if you don&apos;t go back and save them
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirm}>Discard</Button>
    </Modal.Footer>
  </Modal>
);

export default CancelModal;
