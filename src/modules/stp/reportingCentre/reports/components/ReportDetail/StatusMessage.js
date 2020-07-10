import { Alert } from '@myob/myob-widgets';
import React from 'react';

const StatusMessage = ({ status }) => {
  switch (status) {
    case 'Not sent':
      return (
        <Alert type="warning">
          Not sent! This pay has been recorded, but not reported to the ATO as
          the declaration hasn&apos;t been made. Don&apos;t forget to report
          this payroll information as soon as you can!
        </Alert>
      );
    case 'Sending':
      return (
        <Alert type="info">
          This payroll information is being sent to the ATO. Check back later to
          confirm it&apos;s status.
        </Alert>
      );
    case 'Sent':
      return (
        <Alert type="info">
          Sent! This payroll report has been sent to the ATO. Check back later
          to see if it&apos;s been accepted.
        </Alert>
      );
    case 'Accepted':
      return (
        <Alert type="success">
          This payroll report has been accepted by the ATO.
        </Alert>
      );
    case 'Accepted with errors':
      return (
        <Alert type="warning">
          Accepted with errors. The good news is this report has been accepted
          by the ATO. But, there are a few things you need to fix before your
          next pay run. These are listed below.
        </Alert>
      );
    case 'Failed':
      return (
        <Alert type="danger">
          We can&apos;t send this payroll report to the ATO because the ABN
          connected to the ATO doesn&apos;t match the ABN in business details.
        </Alert>
      );
    case 'Rejected':
      return (
        <Alert type="danger">
          Rejected. Unfortunately, this report has been rejected by the ATO. The
          things you need to fix are listed below. Once you&apos;ve fixed
          everything, process this pay run again.
        </Alert>
      );
    default:
      return undefined;
  }
};

export default StatusMessage;
