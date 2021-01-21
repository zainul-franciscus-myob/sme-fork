import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const RecodeModal = ({ onCancel, onConfirm }) => (
  <Modal title="Replace selection?" size="small" onCancel={onCancel}>
    <Modal.Body>This can’t be undone, or recovered later.</Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go back
      </Button>
      <Button onClick={onConfirm}>Replace</Button>
    </Modal.Footer>
  </Modal>
);

export default RecodeModal;
