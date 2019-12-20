import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountNumber, getIsAccountNumberDisabled } from '../accountDetailSelectors';
import handleInputChange from '../../../../components/handlers/handleInputChange';

const AccountNumber = ({
  accountNumber,
  onChange,
  isAccountNumberDisabled,
  onBlur,
}) => (
  <Input
    name="accountNumber"
    label="Account number"
    requiredLabel="This is required"
    value={accountNumber}
    onChange={handleInputChange(onChange)}
    onBlur={handleInputChange(onBlur)}
    disabled={isAccountNumberDisabled}
    width="sm"
  />
);

const mapStateToProps = state => ({
  accountNumber: getAccountNumber(state),
  isAccountNumberDisabled: getIsAccountNumberDisabled(state),
});

export default connect(mapStateToProps)(AccountNumber);
