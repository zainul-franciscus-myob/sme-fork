import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const DeleteModal = ({ onCancel, onConfirm, title, body }) => (
  <Modal title={title} size="small" onCancel={onCancel} canClose={false}>
    <Modal.Body>
      {body || "This can't be undone, or recovered later."}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="delete" onClick={onConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
