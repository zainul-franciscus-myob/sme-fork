import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayDetailButtons = ({ onGoBackClick }) => (
  <ButtonRow
    primary={[
      <Button type="secondary" onClick={onGoBackClick}>
        Go back
      </Button>,
    ]}
  />
);

export default EmployeePayDetailButtons;
