import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const RemoveAccessModal = ({ onCancel, onConfirm, modalBody }) => (
  <Modal title="Remove access?" size="small" onCancel={onCancel}>
    <Modal.Body>{modalBody}</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="delete" onClick={onConfirm}>
        Remove
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RemoveAccessModal;
