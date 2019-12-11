import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const DeleteModal = ({
  onCancel, onConfirm, title,
}) => (
  <Modal
    title={title}
    size="small"
    onCancel={onCancel}
    canClose={false}
  >
    <Modal.Body>
      This can&apos;t be undone, or recovered later.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirm}>Delete</Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
