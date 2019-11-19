import { connect } from 'react-redux';
import React from 'react';

import { getOpeningBalance } from '../accountModalSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import onAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import style from './AccountOpeningBalance.module.css';

const AccountOpeningBalance = ({ openingBalance, onChange }) => (
  <AmountInput
    className={style.openingBalance}
    name="openingBalance"
    label="Opening balance ($)"
    value={openingBalance}
    onChange={onAmountInputChange(onChange)}
    decimalScale={2}
    numeralIntegerScale={13}
  />
);

const mapStateToProps = state => ({
  openingBalance: getOpeningBalance(state),
});

export default connect(mapStateToProps)(AccountOpeningBalance);