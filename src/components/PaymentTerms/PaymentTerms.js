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
  const showExpirationDaysAmountInput = getShowExpirationDaysAmountInput(expirationTerm);

  const popoverBody = (
    <React.Fragment>
      <Select
        name="expirationTerm"
        label="Payment is"
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
            {showExpirationDaysAmountInput
            && (
              <AmountInput
                label="Expiration days"
                hideLabel
                name="expirationDays"
                value={expirationDays}
                onChange={handleAmountInputChange(onChange)}
                textAlign="right"
              />
            )}
            {!showExpirationDaysAmountInput
            && (
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

  return (
    <Field
      label={label}
      requiredLabel={requiredLabel}
      renderField={() => (
        <div className={styles.popover}>
          <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
            <Button type="secondary">{paymentTermsPopoverLabel}</Button>
          </Popover>
        </div>
      )}
    />
  );
};

export default PaymentTerms;
