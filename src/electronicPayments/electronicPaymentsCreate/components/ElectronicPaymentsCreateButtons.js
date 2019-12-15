import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import styles from './ElectronicPaymentsCreateButtons.module.css';

const ElectronicPaymentsCreateButtons = ({ onRecordAndDownloadBankFile }) => (
  <div className={styles.buttonContainer}>
    <ButtonRow>
      <Button onClick={onRecordAndDownloadBankFile}>Record and download bank file</Button>
    </ButtonRow>
  </div>
);

export default ElectronicPaymentsCreateButtons;
