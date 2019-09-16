import { Alert, Button } from '@myob/myob-widgets';
import React from 'react';

import {
  getIsEtpAlertForLineShown,
  getIsEtpSelectionForLineShown,
} from '../EmployeePayListSelectors';
import styles from './EtpModalOpenButton.module.css';

const handleEtpButtonClick = (employeeId, handler) => () => handler({ employeeId });

const EtpModalOpenButton = ({ line, onOpenEtpModal }) => (
  <React.Fragment>
    {getIsEtpAlertForLineShown(line) && (
      <Alert type="warning">
        Select an Employment Termination Payment (ETP) benefit code
      </Alert>
    )}
    <div>
      {(getIsEtpAlertForLineShown(line)
      || getIsEtpSelectionForLineShown(line)) && (
      <Button
        className={styles.button}
        type="secondary"
        onClick={handleEtpButtonClick(line.employeeId, onOpenEtpModal)}
      >
        Select STP code
      </Button>
      )}
      <span>
        <span className={styles.selected}>
          {line.etpCode ? `Code ${line.etpCode}` : 'None'}
        </span>
        {' selected'}
      </span>
    </div>
  </React.Fragment>
);

export default EtpModalOpenButton;
