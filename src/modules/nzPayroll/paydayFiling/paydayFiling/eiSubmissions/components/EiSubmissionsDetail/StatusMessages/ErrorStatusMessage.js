import { Alert } from '@myob/myob-widgets';
import React from 'react';

const ErrorStatusMessage = ({ responseCode, detail }) => {
  return (
    <Alert type="danger">
      IR error code: {responseCode} {detail}. Learn how to resolve this by
      visiting the&nbsp;
      <a
        href="http://help.myob.com/wiki/x/cw0dAg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Payday filing error help page
      </a>
      .
    </Alert>
  );
};

export default ErrorStatusMessage;
