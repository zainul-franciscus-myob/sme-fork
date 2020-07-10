import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnmatchTransactionModal = ({ onCancel, onConfirm }) => (
  <Modal title="Unmatch this transaction?" size="small" onCancel={onCancel}>
    <Modal.Body>
      {"Don't worry, you're not deleting anything or changing the paid status."}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm}>Unmatch</Button>
    </Modal.Footer>
  </Modal>
);

export default UnmatchTransactionModal;
