import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayDetailButtons = ({
  onGoBackClick,
  onDeleteButtonClick,
}) => (
  <ButtonRow
    secondary={[
      <Button type="secondary" onClick={onDeleteButtonClick}>
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
