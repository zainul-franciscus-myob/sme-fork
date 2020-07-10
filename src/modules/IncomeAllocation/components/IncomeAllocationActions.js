import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

const IncomeAllocationActions = ({ onSaveButtonClick }) => (
  <ButtonRow>
    <Button onClick={onSaveButtonClick}>Save</Button>
  </ButtonRow>
);

export default IncomeAllocationActions;
