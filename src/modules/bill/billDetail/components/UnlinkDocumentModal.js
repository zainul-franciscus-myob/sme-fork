import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const UnlinkDocumentModal = ({ onCancel, onConfirm }) => (
  <Modal title="Unlink source document?" size="small" onCancel={onCancel}>
    <Modal.Body>
      Unlinking this document will return it to the In tray.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="delete" onClick={onConfirm}>
        Unlink
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UnlinkDocumentModal;
