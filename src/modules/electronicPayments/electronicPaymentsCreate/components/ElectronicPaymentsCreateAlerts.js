import { Alert } from '@myob/myob-widgets';
import React from 'react';

const ElectronicPaymentsCreateAlert = ({ alert, onDismissAlert }) =>
  alert ? (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message.split('\n').reduce((a, b) => (
        <>
          {a}
          <br />
          {b}
        </>
      ))}
    </Alert>
  ) : (
    <Alert type="info">
      Make sure the recipient&apos;s BSB and account number is correct. You may
      not be able to recover a payment made to the wrong account.
    </Alert>
  );

export default ElectronicPaymentsCreateAlert;
