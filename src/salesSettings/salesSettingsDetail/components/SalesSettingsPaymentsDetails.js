import {
  Card, Field, FieldGroup, Select,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDateInputPostfix, getDateOfMonth, getIsRegistered, getPayDirectLink,
  getPaymentTerms,
  getShowDateField, getShowDateInput, getTabData,
} from '../SalesSettingsDetailSelectors';
import styles from './SalesSettingPaymentDetail.css';

const onInputChange = handler => e => handler({
  key: e.target.name,
  value: e.target.value,
});

const SalesSettingsPaymentsDetails = ({
  salesSettings,
  paymentTerms,
  dateOfMonth,
  showDateField,
  showDateInput,
  dateInputPostfix,
  onUpdateSalesSettingsItem,
  payDirectLink,
  isRegistered,
}) => {
  const paymentTerm = (
    <Card>
      <FieldGroup label="Default payment terms">
        <p>
          Choose the default payment terms for your invoices.
          You can always change these terms when creating an invoice.
        </p>
        <Select
          name="paymentType"
          label="Payment is"
          value={salesSettings.paymentType}
          onChange={onInputChange(onUpdateSalesSettingsItem)}
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
                      onChange={onInputChange(onUpdateSalesSettingsItem)}
                    />
                  ) : (
                    <select
                      name="numberOfDaysForBalanceDue"
                      className="form-control"
                      value={salesSettings.numberOfDaysForBalanceDue}
                      onChange={onInputChange(onUpdateSalesSettingsItem)}
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
    </Card>
  );

  const payDirect = (
    <Card>
      <FieldGroup label="Invoice payments">
        {
          isRegistered ? (
            <p>
              You have online invoice payments
              <span className={styles.status}> activated</span>
              <span>. </span>
              <a href={payDirectLink} target="_blank" rel="noopener noreferrer">Edit preferences</a>
            </p>
          ) : (
            <a href={payDirectLink} target="_blank" rel="noopener noreferrer">Set up online invoice payments</a>
          )
        }
      </FieldGroup>
    </Card>
  );

  return (
    <React.Fragment>
      { paymentTerm }
      { payDirect }
    </React.Fragment>
  );
};

SalesSettingsPaymentsDetails.propTypes = {
  paymentTerms: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  salesSettings: PropTypes.shape({}).isRequired,
  dateOfMonth: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showDateField: PropTypes.bool.isRequired,
  showDateInput: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  dateInputPostfix: PropTypes.string.isRequired,
  payDirectLink: PropTypes.string.isRequired,
  onUpdateSalesSettingsItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paymentTerms: getPaymentTerms(state),
  dateOfMonth: getDateOfMonth(state),
  salesSettings: getTabData(state),
  isRegistered: getIsRegistered(state),
  showDateField: getShowDateField(state),
  showDateInput: getShowDateInput(state),
  dateInputPostfix: getDateInputPostfix(state),
  payDirectLink: getPayDirectLink(state),
});

export default connect(mapStateToProps)(SalesSettingsPaymentsDetails);
