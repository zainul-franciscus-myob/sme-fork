import { Button, Field, Select } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../autoFormatter/AmountInput/AmountInput';
import Popover from '../Feelix/Popover/Popover';
import getDisplayDaysForMonth from './handlers/getDisplayDaysForMonth';
import getExpirationTermsLabel from './handlers/getExpirationTermsLabel';
import getPaymentTermsPopoverLabel from './handlers/getPaymentTermsPopoverLabel';
import getShowExpirationDaysAmountInput from './handlers/getShowExpirationDaysAmountInput';
import getShowExpiryDaysOptions from './handlers/getShowExpiryDaysOptions';
import handleAmountInputChange from '../handlers/handleAmountInputChange';
import handleSelectChange from '../handlers/handleSelectChange';
import styles from './PaymentTerms.module.css';

const PaymentTerms = ({
  issueDate,
  expirationTerm,
  expirationTermOptions,
  expirationDays,
  onChange,
  label = 'Due date',
  requiredLabel = 'This is required',
  popoverLabel = 'Payment is',
  disabled,
}) => {
  const paymentTermsPopoverLabel = getPaymentTermsPopoverLabel({
    issueDate,
    expirationTerm,
    expirationTermOptions,
    expirationDays,
  });
  const showExpiryDaysOptions = getShowExpiryDaysOptions(expirationTerm);
  const expirationTermsLabel = getExpirationTermsLabel(expirationTerm);
  const displayDaysForMonth = getDisplayDaysForMonth(expirationTerm);
  const showExpirationDaysAmountInput = getShowExpirationDaysAmountInput(
    expirationTerm
  );

  const popoverBody = (
    <React.Fragment>
      <Select
        disabled={disabled}
        name="expirationTerm"
        label={popoverLabel}
        value={expirationTerm}
        onChange={handleSelectChange(onChange)}
      >
        {expirationTermOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      {showExpiryDaysOptions && (
        <div className={styles.details}>
          <div className={styles.input}>
            {showExpirationDaysAmountInput && (
              <AmountInput
                label="Expiration days"
                hideLabel
                name="expirationDays"
                value={expirationDays}
                onChange={handleAmountInputChange(onChange)}
                textAlign="right"
              />
            )}
            {!showExpirationDaysAmountInput && (
              <Select
                label="Expiration days"
                hideLabel
                name="expirationDays"
                value={expirationDays}
                onChange={handleSelectChange(onChange)}
              >
                {displayDaysForMonth.map(({ name, value }) => (
                  <Select.Option key={name} value={value} label={name} />
                ))}
              </Select>
            )}
          </div>
          <span className={styles.inputValue}>{expirationTermsLabel}</span>
        </div>
      )}
    </React.Fragment>
  );

  const triggerButton = (
    <Button disabled={disabled} type="secondary">
      {paymentTermsPopoverLabel}
    </Button>
  );

  const view = disabled ? (
    triggerButton
  ) : (
    <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
      {triggerButton}
    </Popover>
  );

  return (
    <Field
      label={label}
      requiredLabel={requiredLabel}
      renderField={() => <div className={styles.popover}>{view}</div>}
    />
  );
};

export default PaymentTerms;
