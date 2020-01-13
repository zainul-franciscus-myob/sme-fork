import {
  Button,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

import errorsImage from './images/errors-modal.svg';
import styles from './RegistrationErrorsModal.module.css';

const RegistrationErrorsModal = ({
  onCancelButtonClick,
  onViewErrorsButtonClick,
}) => (
  <Modal title="Looks like you've got some things to fix first" onCancel={onCancelButtonClick}>
    <Modal.Body>
      <div className={styles.imageContainer}>
        <img src={errorsImage} alt="errors modal" />
      </div>
      <p>
        Before you can get set up, there&apos;s a few things in your payroll data
        you need to fix.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        key="modal-cancel-btn"
        id="modal-cancel-btn"
        testid="cancelButton"
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
