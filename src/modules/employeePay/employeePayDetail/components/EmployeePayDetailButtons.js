import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayDetailButtons = ({
  onGoBackClick,
  onDeleteButtonClick,
  onReverseButtonClick,
  showReverse,
  showDelete,
}) => (
  <ButtonRow
    secondary={[
      showReverse && (
        <Button
          key="pay-detail-reverse-btn"
          id="pay-detail-reverse-btn"
          type="secondary"
          onClick={onReverseButtonClick}
        >
          Reverse Pay
        </Button>
      ),
      showDelete && (
        <Button
          type="secondary"
          testid="pay-detail-delete-btn"
          onClick={onDeleteButtonClick}
        >
          Delete
        </Button>
      ),
    ]}
    primary={[
      <Button type="secondary" onClick={onGoBackClick}>
        Go back
      </Button>,
    ]}
  />
);

export default EmployeePayDetailButtons;
