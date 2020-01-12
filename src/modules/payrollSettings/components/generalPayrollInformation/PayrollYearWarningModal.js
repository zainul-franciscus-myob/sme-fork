import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const PayrollYearWarningModal = ({
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
      <Button onClick={onConfirm}>Save</Button>
    </Modal.Footer>
  </Modal>
);

export default PayrollYearWarningModal;
