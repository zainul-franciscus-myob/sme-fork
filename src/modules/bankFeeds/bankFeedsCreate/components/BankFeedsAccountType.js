import { RadioButtonGroup } from '@myob/myob-widgets';
import React from 'react';

import handleRadioButtonChange from '../../../../components/handlers/handleRadioButtonChange';

const BankFeedsAccountType = ({ onUpdateForm }) => (
  <RadioButtonGroup
    defaultValue="Bank account"
    label="Account type"
    name="accountType"
    onChange={handleRadioButtonChange('accountType', onUpdateForm)}
    options={['Bank account', 'Credit card account']}
  />
);

export default BankFeedsAccountType;
