import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const TerminateModal = ({ onCancel, onConfirm }) => (
  <Modal title="Discard replace process?" size="small" onCancel={onCancel}>
    <Modal.Body>
      There are still some transactions to be replaced. Do you want to discard
      the remaining changes?
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button type="delete" onClick={onConfirm} autoFocus>
        Discard
      </Button>
    </Modal.Footer>
  </Modal>
);

export default TerminateModal;
