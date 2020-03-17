import {
  Card, Field, FieldGroup, Select,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDateInputPostfix,
  getDateOfMonth,
  getPaymentTerms,
  getRegion,
  getShowDateField,
  getShowDateInput,
  getTabData,
} from '../SalesSettingsDetailSelectors';
import AuPaymentOptions from './AuPaymentOptions';
import NzPaymentOptions from './NzPaymentOptions';
import Region from '../../../../common/types/Region';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './SalesSettingsPaymentsDetails.module.css';

const SalesSettingsPaymentsDetails = ({
  dateInputPostfix,
  dateOfMonth,
  onSubscribeNowClick,
  onUpdateSalesSettingsItem,
  paymentTerms,
  region,
  salesSettings,
  showDateField,
  showDateInput,
}) => {
  const paymentTerm = (
    <FieldGroup label="Default payment terms">
      <p>
        Choose the default payment terms for your invoices.
        You can always change these terms when creating an invoice.
      </p>

      <Select
        label="Payment is"
        name="paymentType"
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
        value={salesSettings.paymentType}
      >
        {
          paymentTerms.map(({ name, value }) => (
            <Select.Option key={value} value={value} label={name} />))
        }
      </Select>

      { showDateField && (
        <Field
          hideLabel
          label="Date input field"
          renderField={() => (
            <div className={styles.dateInput}>
              {
                showDateInput ? (
                  <input
                    className="form-control"
                    name="numberOfDaysForBalanceDue"
                    onChange={handleInputChange(onUpdateSalesSettingsItem)}
                    value={salesSettings.numberOfDaysForBalanceDue}
                  />
                ) : (
                  <select
                    className="form-control"
                    name="numberOfDaysForBalanceDue"
                    onChange={handleInputChange(onUpdateSalesSettingsItem)}
                    value={salesSettings.numberOfDaysForBalanceDue}
                  >
                    {dateOfMonth.map(({ name, value }) => (
                      <option key={value} value={value}>{name}</option>
                    ))}
                  </select>
                )
              }
              <span className={styles.inputPostfix}>{ dateInputPostfix }</span>
            </div>
          )}
        />
      )}
    </FieldGroup>
  );

  const PaymentOptions = ({
    [Region.au]: AuPaymentOptions,
    [Region.nz]: NzPaymentOptions,
  })[region];

  const payDirect = (
    <FieldGroup label="Invoice payment options">
      <p>
        Select the payment options you want to include on your sales invoice.
      </p>

      <PaymentOptions
        onSubscribeNowClick={onSubscribeNowClick}
        onUpdateSalesSettingsItem={onUpdateSalesSettingsItem}
      />
    </FieldGroup>
  );

  return (
    <Card>
      { paymentTerm }
      { payDirect }
    </Card>
  );
};

const mapStateToProps = state => ({
  dateInputPostfix: getDateInputPostfix(state),
  dateOfMonth: getDateOfMonth(state),
  paymentTerms: getPaymentTerms(state),
  region: getRegion(state),
  salesSettings: getTabData(state),
  showDateField: getShowDateField(state),
  showDateInput: getShowDateInput(state),
});

export default connect(mapStateToProps)(SalesSettingsPaymentsDetails);
