import { Alert } from '@myob/myob-widgets';
import React from 'react';

const NotSubmittedStatusMessage = () => {
  return (
    <Alert type="warning">
      <p>
        This information has not been submitted to Inland Revenue. Make sure
        you&apos;re authorised to submit this to Inland Revenue in the Inland
        Revenue settings page.
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
};

export default NotSubmittedStatusMessage;
