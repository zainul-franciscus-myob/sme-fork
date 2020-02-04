import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const BulkUnallocateModal = ({
  onCancel, onConfirm, title, description,
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
      <Button type="secondary" onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm}>Unallocate</Button>
    </Modal.Footer>
  </Modal>
);

export default BulkUnallocateModal;
