import { Button, Modal } from '@myob/myob-widgets';
import React from 'react';

const TerminationConfirmModal = ({ onCancel, onSave }) => (
  <Modal title="Save Employee?" onCancel={onCancel}>
    <Modal.Body>
      If you save a termination date, the employee&apos;s leave balances and
      standard pay will be deleted.
    </Modal.Body>
    <Modal.Footer>
      <Button type="secondary" onClick={onCancel}>
        Go Back
      </Button>
      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </Modal.Footer>
  </Modal>
);

export default TerminationConfirmModal;
