import { Alert } from '@myob/myob-widgets';
import React from 'react';

const EiSubmissionErrorMessage = ({ onDismissAlert, alertMessage }) => (
  <Alert type="danger" onDismiss={onDismissAlert}>
    <p>{alertMessage}</p>
  </Alert>
);

export default EiSubmissionErrorMessage;
