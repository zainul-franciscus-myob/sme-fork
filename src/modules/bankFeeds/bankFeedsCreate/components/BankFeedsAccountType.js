import {
  RadioButton,
  RadioButtonGroup,
} from '@myob/myob-widgets';
import React from 'react';

import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';

const BankFeedsAccountType = ({
  onUpdateForm,
}) => (
  <RadioButtonGroup
    defaultValue="Bank account"
    label="Account type"
    name="accountType"
    onChange={handleRadioButtonChange('accountType', onUpdateForm)}
    renderRadios={({ id, value, ...props }) => (
      <>
        <RadioButton {...props} checked={value === 'Trading Account'} key="Trading Account" value="Trading Account" label="Bank account" />
        <RadioButton {...props} checked={value === 'Credit card account'} key="Credit card account" value="Credit card account" label="Credit card account" />
      </>
    )}
  />
);

export default BankFeedsAccountType;
