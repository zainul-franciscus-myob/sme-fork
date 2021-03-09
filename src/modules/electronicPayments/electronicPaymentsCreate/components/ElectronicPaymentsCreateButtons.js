import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import styles from './ElectronicPaymentsCreateButtons.module.css';

const ElectronicPaymentsCreateButtons = ({
  onRecordAndDownloadBankFile,
  showSendPaymentsButton,
  disableSendPayment,
}) => {
  const sendPaymentsButton = (
    <Button onClick={() => {}} disabled={disableSendPayment}>
      Send Payments
    </Button>
  );
  return (
    <div className={styles.buttonContainer}>
      <ButtonRow>
        {showSendPaymentsButton ? sendPaymentsButton : <></>}
        <Button onClick={onRecordAndDownloadBankFile}>
          Record and download
        </Button>
      </ButtonRow>
    </div>
  );
};

export default ElectronicPaymentsCreateButtons;
