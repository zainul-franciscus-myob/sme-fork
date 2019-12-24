import {
  Button,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

const RegistrationErrorsModal = ({
  onCancelButtonClick,
  onViewErrorsButtonClick,
}) => (
  <Modal title="Looks like you've got some things to fix first" onCancel={onCancelButtonClick}>
    <Modal.Body>
      Before you can get set up, there&apos;s a few things in your payroll data
      you need to fix.
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-cancel-btn"
        id="modal-cancel-btn"
        testId="cancelButton"
        type="secondary"
        onClick={onCancelButtonClick}
      >
        Cancel
      </Button>
      <Button
        key="modal-view-errors-btn"
        id="modal-view-errors-btn"
        type="primary"
        onClick={onViewErrorsButtonClick}
      >
        View errors
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RegistrationErrorsModal;
