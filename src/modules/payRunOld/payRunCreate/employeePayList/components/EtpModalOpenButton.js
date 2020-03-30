import { Alert, Button } from '@myob/myob-widgets';
import React from 'react';

import {
  formatEtpCode,
  isEtpAlertForLineShown,
  isEtpSelectionForLineShown,
} from '../EmployeePayListSelectors';
import styles from './EtpModalOpenButton.module.css';

const handleEtpButtonClick = (employeeId, handler) => () => handler({ employeeId });

const EtpModalOpenButton = ({ line, onOpenEtpModal }) => {
  const selectedEtpCode = (
    <span>
      <span className={styles.selected}>
        {formatEtpCode(line)}
      </span>
      {' selected'}
    </span>
  );

  return (
    <React.Fragment>
      {isEtpAlertForLineShown(line) && (
      <Alert type="warning">
        Select an Employment Termination Payment (ETP) benefit code
      </Alert>
      )}
      {isEtpSelectionForLineShown(line) && (
      <div>
        <Button
          className={styles.button}
          type="secondary"
          onClick={handleEtpButtonClick(line.employeeId, onOpenEtpModal)}
        >
        Select ETP code
        </Button>
        {selectedEtpCode}
      </div>
      )}
    </React.Fragment>
  );
};

export default EtpModalOpenButton;
