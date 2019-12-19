import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import styles from './ElectronicPaymentsCreateButtons.module.css';

const ElectronicPaymentsCreateButtons = ({ onRecordAndDownloadBankFile }) => (
  <div className={styles.buttonContainer}>
    <ButtonRow>
      <Button onClick={onRecordAndDownloadBankFile}>Record and download</Button>
    </ButtonRow>
  </div>
);

export default ElectronicPaymentsCreateButtons;
