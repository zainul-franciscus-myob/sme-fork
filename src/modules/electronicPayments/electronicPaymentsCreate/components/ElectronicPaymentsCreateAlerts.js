import { Alert } from '@myob/myob-widgets';
import React from 'react';

const ElectronicPaymentsCreateAlert = ({ alert, onDismissAlert }) =>
  alert ? (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  ) : (
    <Alert type="info">
      Make sure the employee&apos;s BSB and account number is correct. You may
      not be able to recover a payment made to the wrong account.
    </Alert>
  );

export default ElectronicPaymentsCreateAlert;
