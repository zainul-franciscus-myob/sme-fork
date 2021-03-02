import { Alert } from '@myob/myob-widgets';
import React from 'react';

const SubmittedStatusMessage = () => {
  return (
    <Alert type="success">
      Submission to IR successful. Check myIR for further updates.
    </Alert>
  );
};

export default SubmittedStatusMessage;
