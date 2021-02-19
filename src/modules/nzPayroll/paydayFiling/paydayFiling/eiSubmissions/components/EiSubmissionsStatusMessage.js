import { Alert } from '@myob/myob-widgets';
import React from 'react';

const EiSubmissionsStatusMessage = ({ status, responseCode, detail }) => {
  switch (status) {
    case 'Not submitted':
      return (
        <Alert type="warning">
          <p>
            This information has not been submitted to Inland Revenue. Make sure
            you&apos;re authorised to submit this to Inland Revenue in the
            Inland Revenue settings page.
          </p>
          <a
            href="http://help.myob.com/wiki/x/3WjnAQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            What if I can&apos;t authorise MYOB right now?
          </a>
        </Alert>
      );
    case 'Rejected':
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
    case 'Error':
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
    case 'Submitted':
      return (
        <Alert type="success">
          Submission to IR successful. Check myIR for further updates.
        </Alert>
      );
    case 'Submitting':
      return (
        <Alert type="info">
          This information is currently being submitted to Inland Revenue.
        </Alert>
      );
    default:
      return undefined;
  }
};

export default EiSubmissionsStatusMessage;
