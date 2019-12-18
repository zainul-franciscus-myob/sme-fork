import { Button, ButtonRow } from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';

const IncomeAllocationActions = ({
  onSaveButtonClick,
}) => (
  <ButtonRow>
    <Button onClick={onSaveButtonClick}>Save</Button>
  </ButtonRow>
);

IncomeAllocationActions.propTypes = {
  onSaveButtonClick: PropTypes.func.isRequired,
};


export default IncomeAllocationActions;
