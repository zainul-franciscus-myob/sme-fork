import {
  Button,
  ButtonRow,
} from '@myob/myob-widgets';
import React from 'react';

const authoriseButtonStatus = ['Created', 'PartiallyAuthorized'];
const reverseButtonStatus = ['FundsUnavailable', 'FundsTransferError', 'PaymentDispersementError'];
const ActionButtons = ({
  status, onCancelClick, onAuthorizeClick, onReverseClick,
}) => {
  if (authoriseButtonStatus.includes(status)) {
    return (
      <ButtonRow
        primary={[
          <Button key="cancel" type="secondary" onClick={onCancelClick}>
            Cancel
          </Button>,
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
          <Button key="cancel" type="secondary" onClick={onCancelClick}>
            Cancel
          </Button>,
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
        <Button key="cancel" type="secondary" onClick={onCancelClick}>
          Cancel
        </Button>,
      ]}
    />
  );
};
export default ActionButtons;
