import { connect } from 'react-redux';
import React from 'react';

import { getOpeningBalance } from '../accountDetailSelectors';
import FormattedAmountInput from '../../../../components/autoFormatter/AmountInput/FormattedAmountInput';
import onAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import style from './AccountOpeningBalance.module.css';

const AccountOpeningBalance = ({ openingBalance, onChange }) => (
  <FormattedAmountInput
    className={style.openingBalance}
    name="openingBalance"
    label="Opening balance ($)"
    value={openingBalance}
    onChange={onAmountInputChange(onChange)}
    numeralDecimalScaleMax={2}
    numeralIntegerScale={13}
  />
);

const mapStateToProps = (state) => ({
  openingBalance: getOpeningBalance(state),
});

export default connect(mapStateToProps)(AccountOpeningBalance);
