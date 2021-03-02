import React from 'react';

import ErrorStatusMessage from './StatusMessages/ErrorStatusMessage';
import NotSubmittedStatusMessage from './StatusMessages/NotSubmittedStatusMessage';
import SubmittedStatusMessage from './StatusMessages/SubmittedStatusMessage';
import SubmittingStatusMessage from './StatusMessages/SubmittingStatusMessage';

const EiSubmissionsStatusMessage = ({ status, responseCode, detail }) => {
  switch (status) {
    case 'Not submitted':
      return <NotSubmittedStatusMessage />;
    case 'Rejected':
      return <ErrorStatusMessage detail={detail} responseCode={responseCode} />;
    case 'Error':
      return <ErrorStatusMessage detail={detail} responseCode={responseCode} />;
    case 'Submitted':
      return <SubmittedStatusMessage />;
    case 'Submitting':
      return <SubmittingStatusMessage />;
    default:
      return null;
  }
};

export default EiSubmissionsStatusMessage;
