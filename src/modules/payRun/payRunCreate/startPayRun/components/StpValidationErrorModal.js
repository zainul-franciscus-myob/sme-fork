import {
  Button,
  ButtonRow,
  Modal,
} from '@myob/myob-widgets';
import React from 'react';

import styles from './StartPayRunView.module.css';


const StpValidationErrorModal = ({
  onCancel,
  onContinue,
  onUpdateDetails,
}) => (
  <Modal
    testid="stpValidationErrorModal"
    title="Update payroll details before pay run?"
    onCancel={onCancel}
    onContinue={onContinue}
    onUpdateDetails={onUpdateDetails}
  >
    <Modal.Body>
      <h3>
        Looks like some of your payroll information doesn&#39;t meet ATO
        requirements for Single Touch Payroll
      </h3>

      <p>
        You should update these details, so you can successfully report to the ATO.
      </p>

      <p>
        If you continue the pay run, it&#39;s likely this report will be rejected
        by the ATO, and you&#39;ll
        need to update and submit this information later.
      </p>
    </Modal.Body>
    <div className={styles.existingPayRunModalButtons}>
      <ButtonRow
        primary={[
          <Button key="editExistingPayRunButton" type="secondary" onClick={onContinue}>
            Continue pay run
          </Button>,
          <Button key="createPayRunButton" testid="createPayRunButton" type="primary" onClick={onUpdateDetails}>
            Update details
          </Button>,
        ]}
      />
    </div>

  </Modal>
);

export default StpValidationErrorModal;
