import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayDetailButtons = ({
  onGoBackClick,
  onDeleteButtonClick,
  onReverseButtonClick,
  showReverse,
}) => (
  <ButtonRow
    secondary={[
      showReverse && <Button
        key="modal-reverse-btn"
        id="modal-reverse-btn"
        type="secondary"
        onClick={onReverseButtonClick}
      >
        Reverse Pay
      </Button>,
      !showReverse && <Button type="secondary" onClick={onDeleteButtonClick}>
          Delete
      </Button>,
    ]}

    primary={[
      <Button type="secondary" onClick={onGoBackClick}>
          Go back
      </Button>,
    ]}
  />
);

export default EmployeePayDetailButtons;
