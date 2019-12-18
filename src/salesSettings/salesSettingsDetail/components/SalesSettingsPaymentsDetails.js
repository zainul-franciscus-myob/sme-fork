import {
  Card, Checkbox, CheckboxGroup, Field, FieldGroup, Select,
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
import Region from '../../../common/types/Region';
import handleCheckboxChange from '../../../components/handlers/handleCheckboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';
import styles from './SalesSettingsPaymentsDetails.module.css';

const SalesSettingsPaymentsDetails = ({
  region,
  salesSettings,
  paymentTerms,
  dateOfMonth,
  showDateField,
  showDateInput,
  dateInputPostfix,
  onUpdateSalesSettingsItem,
}) => {
  const paymentTerm = (
    <FieldGroup label="Default payment terms">
      <p>
          Choose the default payment terms for your invoices.
          You can always change these terms when creating an invoice.
      </p>
      <Select
        name="paymentType"
        label="Payment is"
        value={salesSettings.paymentType}
        onChange={handleInputChange(onUpdateSalesSettingsItem)}
      >
        {paymentTerms.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      { showDateField && (
      <Field
        label="Date input field"
        hideLabel
        renderField={() => (
          <div className={styles.dateInput}>
            {
                  showDateInput ? (
                    <input
                      name="numberOfDaysForBalanceDue"
                      className="form-control"
                      value={salesSettings.numberOfDaysForBalanceDue}
                      onChange={handleInputChange(onUpdateSalesSettingsItem)}
                    />
                  ) : (
                    <select
                      name="numberOfDaysForBalanceDue"
                      className="form-control"
                      value={salesSettings.numberOfDaysForBalanceDue}
                      onChange={handleInputChange(onUpdateSalesSettingsItem)}
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
      <p>Select the payment options you want to include on your sales invoice.</p>
      {
        <PaymentOptions onUpdateSalesSettingsItem={onUpdateSalesSettingsItem} />
        }
      <hr />
      <CheckboxGroup
        label="Allow payments by mail"
        hideLabel
        renderCheckbox={() => (
          <Checkbox
            name="isAllowPaymentsByMail"
            label="Allow payments by mail"
            checked={salesSettings.isAllowPaymentsByMail}
            onChange={handleCheckboxChange(onUpdateSalesSettingsItem)}
          />
        )}
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
  region: getRegion(state),
  paymentTerms: getPaymentTerms(state),
  dateOfMonth: getDateOfMonth(state),
  salesSettings: getTabData(state),
  showDateField: getShowDateField(state),
  showDateInput: getShowDateInput(state),
  dateInputPostfix: getDateInputPostfix(state),
});

export default connect(mapStateToProps)(SalesSettingsPaymentsDetails);
