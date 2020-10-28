import { FieldSet } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getTabData } from '../SalesSettingsDetailSelectors';
import AutoFormatter from '../../../../components/autoFormatter/AutoFormatterCore/AutoFormatter';
import NzBankAccountNumberCharacterLimits from './NzBankAccountNumberCharacterLimits';
import buildAmountInputChangeEvent from '../../../../components/autoFormatter/AmountInput/buildAmountInputChangeEvent';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import styles from './NzAccountNumberInputs.module.css';

const handleOnChange = (handle, currentValue) => (event) => {
  const maybeEvent = buildAmountInputChangeEvent(event, currentValue);

  if (maybeEvent) {
    handle(maybeEvent);
  }
};

const NumericInput = ({
  value,
  requiredLabel,
  maxLength,
  onChange,
  ...props
}) => (
  <AutoFormatter
    {...props}
    onChange={handleOnChange(onChange, value)}
    value={value}
    requiredLabel={requiredLabel}
    options={{
      numericOnly: true,
      blocks: [maxLength],
    }}
  />
);

const NzAccountNumberInputs = ({
  salesSettings: { bankNumber, branch, accountNumber, suffix },
  onChange,
}) => (
  <FieldSet
    label="Account number"
    requiredLabel="This field is required"
    renderField={() => (
      <div className={styles.container}>
        <div className={styles.bankNumber}>
          <NumericInput
            name="bankNumber"
            label="Bank"
            value={bankNumber}
            maxLength={NzBankAccountNumberCharacterLimits.bankNumber}
            onChange={handleAmountInputChange(onChange)}
          />
        </div>
        <div className={styles.branch}>
          <NumericInput
            name="branch"
            label="Branch"
            value={branch}
            maxLength={NzBankAccountNumberCharacterLimits.branch}
            onChange={handleAmountInputChange(onChange)}
          />
        </div>
        <div className={styles.accountNumber}>
          <NumericInput
            name="accountNumber"
            label="Acc no"
            value={accountNumber}
            maxLength={NzBankAccountNumberCharacterLimits.accountNumber}
            onChange={handleAmountInputChange(onChange)}
          />
        </div>
        <div className={styles.suffix}>
          <NumericInput
            name="suffix"
            label="Suffix"
            value={suffix}
            maxLength={NzBankAccountNumberCharacterLimits.suffix}
            onChange={handleAmountInputChange(onChange)}
          />
        </div>
      </div>
    )}
  />
);

const mapStateToProps = (state) => ({
  salesSettings: getTabData(state),
});

export default connect(mapStateToProps)(NzAccountNumberInputs);
