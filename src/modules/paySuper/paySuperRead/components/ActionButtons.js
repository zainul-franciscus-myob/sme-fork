import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const authoriseButtonStatus = ['Created', 'PartiallyAuthorised'];
const reverseButtonStatus = [
  'FundsUnavailable',
  'FundsTransferError',
  'PaymentDispersmentError',
  'PartiallyAuthorised',
  'Created',
];
const recordReversalButtonStatus = ['RecordReversal'];
const ActionButtons = ({
  status,
  isReversal,
  onCancelClick,
  onAuthoriseClick,
  onReverseClick,
  onRecordReverseClick,
}) => {
  const CancelButton = (
    <Button key="cancel" type="secondary" onClick={onCancelClick}>
      Cancel
    </Button>
  );

  const reverseButton = (
    <Button
      testid="reversalButton"
      key="reverse"
      type={authoriseButtonStatus.includes(status) ? 'secondary' : 'primary'}
      onClick={onReverseClick}
    >
      Reverse transaction
    </Button>
  );

  const authoriseButton = (
    <Button
      testid="authorizeButton"
      key="authorize"
      type="primary"
      onClick={onAuthoriseClick}
    >
      Authorise
    </Button>
  );

  if (recordReversalButtonStatus.includes(status)) {
    return (
      <ButtonRow
        primary={[
          CancelButton,
          <Button
            testid="recordReversalButton"
            key="recordReverse"
            type="primary"
            onClick={onRecordReverseClick}
          >
            Record reversal
          </Button>,
        ]}
      />
    );
  }
  return (
    <ButtonRow
      primary={[
        CancelButton,
        !isReversal && reverseButtonStatus.includes(status) && reverseButton,
        !isReversal &&
          authoriseButtonStatus.includes(status) &&
          authoriseButton,
      ]}
    />
  );
};
export default ActionButtons;
