import { Alert, Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const PayrollYearWarningModal = ({
  onCancel, onConfirm, title, description,
}) => (
  <Modal
    title={title}
    onCancel={onCancel}
  >
    <Modal.Body>
      <Alert type="warning">
        The current payroll year can&apos;t be altered after you&apos;ve saved it.
      </Alert>
      {description}
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm}>Save</Button>
    </Modal.Footer>
  </Modal>
);

export default PayrollYearWarningModal;
