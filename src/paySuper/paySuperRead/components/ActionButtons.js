import {
  Button,
  ButtonRow,
} from '@myob/myob-widgets';
import React from 'react';

const authoriseButtonStatus = ['Created', 'PartiallyAuthorized'];
const reverseButtonStatus = ['FundsUnavailable', 'FundsTransferError', 'PaymentDispersmentError'];
const ActionButtons = ({
  status, onAuthorizeClick, onReverseClick, onCancelClick,
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
          <Button key="authorize" type="primary" onClick={onAuthorizeClick}>
            Authorize
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
          <Button key="reverse" type="primary" onClick={onReverseClick}>
            Reverse
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
