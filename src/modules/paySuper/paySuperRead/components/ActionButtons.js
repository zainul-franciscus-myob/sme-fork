import {
  Button,
  ButtonRow,
} from '@myob/myob-widgets';
import React from 'react';

const authoriseButtonStatus = ['Created', 'PartiallyAuthorised'];
const reverseButtonStatus = ['FundsUnavailable', 'FundsTransferError', 'PaymentDispersmentError'];
const ActionButtons = ({
  status, onCancelClick, onAuthoriseClick, onReverseClick,
}) => {
  const CancelButton = (
    <Button key="cancel" type="secondary" onClick={onCancelClick}>
      Cancel
    </Button>
  );
  if (authoriseButtonStatus.includes(status)) {
    return (
      <ButtonRow
        primary={[
          CancelButton,
          <Button key="authorize" type="primary" onClick={onAuthoriseClick}>
            Authorise
          </Button>,
        ]}
      />
    );
  }
  if (reverseButtonStatus.includes(status)) {
    return (
      <ButtonRow
        primary={[
          CancelButton,
          <Button testId="reversalButton" key="reverse" type="primary" onClick={onReverseClick}>
            Reverse transaction
          </Button>,
        ]}
      />
    );
  }
  return (
    <ButtonRow
      primary={[
        CancelButton,
      ]}
    />
  );
};
export default ActionButtons;
