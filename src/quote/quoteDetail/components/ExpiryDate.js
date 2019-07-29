import {
  Button, Field, Popover, Select,
} from '@myob/myob-widgets';
import React, { Fragment } from 'react';

import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './ExpiryDate.module.css';

const ExpiryDate = ({
  expirationTerm,
  expirationTerms,
  expirationDays,
  popoverLabel,
  onChange,
  showExpiryDaysOptions,
  expirationTermsLabel,
  showExpirationDaysAmountInput,
  displayDaysForMonth,
}) => {
  const popoverBodyChild = (
    <Fragment>
      <Select
        name="expirationTerm"
        label="Payment is"
        value={expirationTerm}
        onChange={handleSelectChange(onChange)}
      >
        {expirationTerms.map(({ name, value }) => (
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
    </Fragment>
  );

  const popoverBody = (
    <Popover.Body child={popoverBodyChild} />
  );

  return (
    <Field
      label="Expiry date"
      renderField={() => (
        <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
          <Button type="secondary">{popoverLabel}</Button>
        </Popover>
      )}
    />
  );
};

export default ExpiryDate;
