import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const ImportConfirmModal = ({
  onCancel,
  onConfirm,
}) => (
  <Modal
    title="Import data?"
    size="small"
    onCancel={onCancel}
  >
    <Modal.Body>
      The import cannot be undone. Are you sure you want to import?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="primary" onClick={onConfirm}>Import</Button>
    </Modal.Footer>
  </Modal>
);

export default ImportConfirmModal;
