import {
  Button, DatePicker, DetailHeader, Icons, Label,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getIsActionDisabled,
  getIsOutOfBalance,
  getOptions,
} from '../BankReconciliationSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../components/handlers/handleDateChange';
import styles from './BankReconciliationOptions.module.css';

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
  onUndoReconciliationClick,
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
        <div className="form-group">
          <Label>{`Date last reconciled: ${lastReconcileDate}`}</Label>
          <Button type="link" icon={<Icons.History />} onClick={onUndoReconciliationClick} disabled={isActionDisabled}>Undo last reconciliation</Button>
        </div>
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

  const outOfBalanceClassName = isOutOfBalance ? styles.outOfBalance : '';
  const secondary = (
    <div>
      <div className={styles.closingBankStatementBalance}>
        <span className={styles.labels}>Closing bank statement balance ($)</span>
        <AmountInput
          className={styles.bankStatementBalance}
          name="closingBankStatementBalance"
          label="Closing bank statement balance ($)"
          textAlign="right"
          hideLabel
          decimalScale={2}
          value={closingBankStatementBalance}
          onChange={handleAmountInputChange(onUpdateHeaderOption)}
          onBlur={handleAmountInputChange(onAmountInputBlur)}
        />
      </div>
      <div className={styles.closingBankStatementBalance}>
        <div className={styles.labels}>Calculated closing balance</div>
        <div className={styles.balances}>{calculatedClosingBalance}</div>
      </div>
      <div className={classNames(outOfBalanceClassName, styles.closingBankStatementBalance)}>
        <div className={styles.labels}>Out of balance</div>
        <div className={styles.balances}>{outOfBalance}</div>
      </div>
    </div>
  );

  return (
    <DetailHeader primary={primary} secondary={secondary} className={styles.options} />
  );
};

const mapStateToProps = state => ({
  options: getOptions(state),
  isActionDisabled: getIsActionDisabled(state),
  isOutOfBalance: getIsOutOfBalance(state),
});

export default connect(mapStateToProps)(BankReconciliationOptions);
