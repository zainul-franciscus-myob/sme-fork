import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnlinkDocumentModal = ({
  onCancel, onConfirm,
}) => (
  <Modal
    title="Unlink source document?"
    size="small"
    onCancel={onCancel}
    canClose={false}
  >
    <Modal.Body>
      Unlinking this document will sent it back to the in tray.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Go back</Button>
      <Button type="delete" onClick={onConfirm}>Unlink</Button>
    </Modal.Footer>
  </Modal>
);

export default UnlinkDocumentModal;
