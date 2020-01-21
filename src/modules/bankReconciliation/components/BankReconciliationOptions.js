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
    hasReconciled,
  },
  isActionDisabled,
  isOutOfBalance,
  onUpdateHeaderOption,
  onAmountInputBlur,
  onUndoReconciliationClick,
}) => {
  const primary = (
    <div>
      <div className={styles.accountInfo}>
        <AccountCombobox
          items={accounts}
          selectedId={selectedAccountId}
          onChange={handleComboboxChange(
            'selectedAccountId',
            onUpdateHeaderOption,
          )}
          label="Account"
          name="selectedAccountId"
          disabled={isActionDisabled}
        />
        <DatePicker
          label="Statement date"
          name="statementDate"
          value={statementDate}
          onSelect={handleDateChange('statementDate', onUpdateHeaderOption)}
          disabled={isActionDisabled}
          requiredLabel="This is required"
        />
      </div>
      <div className="form-group">
        <Label>
          {`Last reconciled: ${
            hasReconciled ? lastReconcileDate : 'Never'
          }`}
        </Label>
        {
          hasReconciled && (
            <Button
              className={styles.undoButton}
              type="link"
              icon={<Icons.History />}
              onClick={onUndoReconciliationClick}
              disabled={isActionDisabled}
            >
              Undo
            </Button>
          )
        }
      </div>
    </div>
  );

  const outOfBalanceClassName = isOutOfBalance ? styles.outOfBalance : '';
  const secondary = (
    <div>
      <div className={styles.closingBankStatementBalance}>
        <AmountInput
          className={styles.bankStatementBalance}
          name="closingBankStatementBalance"
          label="Closing bank statement balance ($)"
          requiredLabel="This is required"
          textAlign="right"
          decimalScale={2}
          value={closingBankStatementBalance}
          onChange={handleAmountInputChange(onUpdateHeaderOption)}
          onBlur={handleAmountInputChange(onAmountInputBlur)}
        />
      </div>
      <div className={styles.closingBankStatementBalance}>
        <div className={styles.labels}>Calculated closing balance</div>
        <div className={styles.balances}><span>{calculatedClosingBalance}</span></div>
      </div>
      <div
        className={classNames(
          outOfBalanceClassName,
          styles.closingBankStatementBalance,
        )}
      >
        <div className={styles.labels}>Out of balance</div>
        <div className={styles.balances}><span>{outOfBalance}</span></div>
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
