import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const BulkUnallocateModal = ({ onCancel, onConfirm }) => (
  <Modal title="Unallocate" size="small" onCancel={onCancel}>
    <Modal.Body>
      Are you sure you want to unallocate the selected bank transactions?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm}>Unallocate</Button>
    </Modal.Footer>
  </Modal>
);

export default BulkUnallocateModal;
