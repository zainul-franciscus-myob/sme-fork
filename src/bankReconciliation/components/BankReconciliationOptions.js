import {
  DatePicker, DetailHeader, Field, ReadOnly,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsActionDisabled,
  getIsOutOfBalance,
  getOptions,
} from '../BankReconciliationSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';
import handleDateChange from '../../components/handlers/handleDateChange';
import style from './BankReconciliationOptions.module.css';

const BankReconciliationOptions = ({
  options: {
    statementDate,
    selectedAccountId,
    closingBankStatementBalance,
    calculatedClosingBalance,
    outOfBalance,
    lastReconcileDate,
    accounts,
  },
  isActionDisabled,
  isOutOfBalance,
  onUpdateHeaderOption,
  onAmountInputBlur,
}) => {
  const primary = (
    <div>
      <AccountCombobox
        items={accounts}
        selectedId={selectedAccountId}
        onChange={handleComboboxChange('selectedAccountId', onUpdateHeaderOption)}
        label="Account"
        name="selectedAccountId"
        hideLabel={false}
        disabled={isActionDisabled}
      />
      { lastReconcileDate && (
        <Field label={`Date last reconciled: ${lastReconcileDate}`} renderField={() => {}} />
      )}
      <DatePicker
        label="Bank statement closing date"
        name="statementDate"
        value={statementDate}
        onSelect={handleDateChange('statementDate', onUpdateHeaderOption)}
        disabled={isActionDisabled}
      />
    </div>
  );

  const outOfBalanceClassName = isOutOfBalance ? style.outOfBalance : '';
  const secondary = (
    <div>
      <AmountInput
        name="closingBankStatementBalance"
        label="Closing bank statement balance ($)"
        decimalScale={2}
        value={closingBankStatementBalance}
        onChange={handleAmountInputChange(onUpdateHeaderOption)}
        onBlur={handleAmountInputChange(onAmountInputBlur)}
      />
      <ReadOnly label="Calculated closing balance" name="calculatedClosingBalance">
        {calculatedClosingBalance}
      </ReadOnly>
      <div className={outOfBalanceClassName}>
        <ReadOnly label="Out of balance" name="outOfBalance" className={outOfBalanceClassName}>
          {outOfBalance}
        </ReadOnly>
      </div>
    </div>
  );

  return (
    <DetailHeader primary={primary} secondary={secondary} />
  );
};

const mapStateToProps = state => ({
  options: getOptions(state),
  isActionDisabled: getIsActionDisabled(state),
  isOutOfBalance: getIsOutOfBalance(state),
});

export default connect(mapStateToProps)(BankReconciliationOptions);
