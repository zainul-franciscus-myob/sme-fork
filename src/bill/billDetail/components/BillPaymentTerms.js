import { Button, Field, Select } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDisplayDaysForCurrentMonth,
  getExpirationTermsLabel,
  getPaymentTermsPopoverLabel,
  getShowExpirationDaysAmountInput,
  getShowExpiryDaysOptions,
} from '../selectors/BillPaymentTermsSelectors';
import {
  getExpirationDays,
  getExpirationTerm,
  getExpirationTermOptions,
} from '../selectors/billSelectors';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import Popover from '../../../components/Feelix/Popover/Popover';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleSelectChange from '../../../components/handlers/handleSelectChange';
import styles from './BillPaymentTerms.module.css';

const BillPaymentTerms = ({
  expirationTerm,
  expirationTermOptions,
  expirationDays,
  expirationTermsLabel,
  paymentTermsPopoverLabel,
  showExpiryDaysOptions,
  showExpirationDaysAmountInput,
  displayDaysForMonth,
  onUpdateBillOption,
  onClickPaymentTerms,
}) => {
  const popoverBody = (
    <React.Fragment>
      <Select
        name="expirationTerm"
        label="Payment is"
        value={expirationTerm}
        onChange={handleSelectChange(onUpdateBillOption)}
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
                onChange={handleAmountInputChange(onUpdateBillOption)}
              />
            )}
            {!showExpirationDaysAmountInput
            && (
              <Select
                label="Expiration days"
                hideLabel
                name="expirationDays"
                value={expirationDays}
                onChange={handleSelectChange(onUpdateBillOption)}
              >
                {displayDaysForMonth.map(({ name, value }) => (
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
        <div className={styles.popover}>
          {/* @TODO: fix the jank of the popover closing when user update input */}
          <Popover body={popoverBody} closeOnOuterAction>
            <Button type="secondary" onClick={onClickPaymentTerms}>{paymentTermsPopoverLabel}</Button>
          </Popover>
        </div>
      )}
    />
  );
};

const mapStateToProps = state => ({
  expirationTermOptions: getExpirationTermOptions(state),
  expirationTerm: getExpirationTerm(state),
  expirationDays: getExpirationDays(state),
  paymentTermsPopoverLabel: getPaymentTermsPopoverLabel(state),
  expirationTermsLabel: getExpirationTermsLabel(state),
  showExpiryDaysOptions: getShowExpiryDaysOptions(state),
  showExpirationDaysAmountInput: getShowExpirationDaysAmountInput(state),
  displayDaysForMonth: getDisplayDaysForCurrentMonth(state),
});

export default connect(mapStateToProps)(BillPaymentTerms);
