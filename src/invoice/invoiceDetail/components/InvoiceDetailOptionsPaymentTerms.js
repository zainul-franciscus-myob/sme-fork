import {
  Button, Field, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailOptionsPaymentTerms } from '../selectors/paymentTermsSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import Popover from '../../../components/Feelix/Popover/Popover';
import styles from './InvoiceDetailOptionsPaymentTerms.module.css';

const onTextInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const onAmountInputChange = (name, handler) => (e) => {
  handler({
    key: name,
    value: e.target.rawValue,
  });
};

const onSelectInputChange = onTextInputChange;

const InvoiceDetailOptionsPaymentTerms = ({
  expirationTerm,
  expirationTermOptions,
  expirationDays,
  paymentTermsPopoverLabel,
  onUpdateInvoiceOption,
  showExpiryDaysOptions,
  expirationTermsLabel,
  showExpirationDaysAmountInput,
  displayDayForMonth,
}) => {
  const popoverBody = (
    <React.Fragment>
      <Select
        name="expirationTerm"
        label="Payment is"
        value={expirationTerm}
        onChange={onSelectInputChange(onUpdateInvoiceOption)}
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
              onChange={onAmountInputChange('expirationDays', onUpdateInvoiceOption)}
            />
          )}
          {!showExpirationDaysAmountInput
          && (
            <Select
              label="Expiration days"
              hideLabel
              name="expirationDays"
              value={expirationDays}
              onChange={onSelectInputChange(onUpdateInvoiceOption)}
            >
              {displayDayForMonth.map(({ name, value }) => (
                <Select.Option key={name} value={value} label={name} />
              ))}
            </Select>
          )}
        </div>
        <p className={styles.inputValue}>{expirationTermsLabel}</p>
      </div>
      )}
    </React.Fragment>
  );

  return (
    <Field
      label="Due date"
      requiredLabel="This is required"
      renderField={() => (
        <Popover body={popoverBody} preferPlace="below" closeOnOuterAction>
          <Button type="secondary">{paymentTermsPopoverLabel}</Button>
        </Popover>
      )}
    />
  );
};

const mapStateToProps = state => getInvoiceDetailOptionsPaymentTerms(state);

export default connect(mapStateToProps)(InvoiceDetailOptionsPaymentTerms);
