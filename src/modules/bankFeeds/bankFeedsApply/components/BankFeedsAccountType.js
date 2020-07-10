import { RadioButton, RadioButtonGroup } from '@myob/myob-widgets';
import React from 'react';

const BankFeedsAccountType = ({ value, setAccountType }) => (
  <RadioButtonGroup
    value={value}
    label="Account type"
    name="accountType"
    onChange={({ value: newValue }) => setAccountType(newValue)}
    renderRadios={({ id, value: currentVal, ...props }) => (
      <>
        <RadioButton
          {...props}
          checked={currentVal === 'Trading Account'}
          value="Trading Account"
          label="Bank account"
        />
        <RadioButton
          {...props}
          checked={currentVal === 'Credit card account'}
          value="Credit card account"
          label="Credit card account"
        />
      </>
    )}
  />
);

export default BankFeedsAccountType;
