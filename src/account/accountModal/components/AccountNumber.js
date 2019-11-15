import { Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountNumber,
  getIsAccountNumberDisabled,
} from '../accountModalSelectors';
import handleInputChange from '../../../components/handlers/handleInputChange';
import style from './AccountNumber.module.css';

const AccountNumber = ({
  accountNumber,
  onChange,
  isAccountNumberDisabled,
  onBlur,
}) => (
  <Input
    className={style.number}
    name="accountNumber"
    label="Account number"
    requiredLabel="This is required"
    value={accountNumber}
    onChange={handleInputChange(onChange)}
    onBlur={handleInputChange(onBlur)}
    disabled={isAccountNumberDisabled}
  />
);

const mapStateToProps = state => ({
  accountNumber: getAccountNumber(state),
  isAccountNumberDisabled: getIsAccountNumberDisabled(state),
});

export default connect(mapStateToProps)(AccountNumber);
