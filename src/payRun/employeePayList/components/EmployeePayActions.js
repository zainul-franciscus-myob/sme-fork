import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const EmployeePayActions = ({
  onNextButtonClick,
  onPreviousButtonClick,
}) => (
  <ButtonRow
    primary={[
      <Button key="previous" name="previous" type="secondary" onClick={onPreviousButtonClick}>
          Previous
      </Button>,
      <Button key="save" name="save" type="primary" onClick={onNextButtonClick}>
          Next
      </Button>,
    ]}
  />
);

export default EmployeePayActions;
