import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayDetailButtons = ({ onGoBackClick, onDeleteClick }) => (
  <ButtonRow
    secondary={[
      <Button name="deleteEmployeePay" type="delete" onClick={onDeleteClick}>
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
