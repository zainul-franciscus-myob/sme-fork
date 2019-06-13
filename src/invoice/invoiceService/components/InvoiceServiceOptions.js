import {
  DatePicker, Input, InputLabel, RadioButton, Select, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getInvoiceOptions } from '../invoiceServiceSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import styles from './InvoiceServiceOptions.css';

const onComboBoxChange = handler => (option) => {
  const key = 'contactId';
  const { value } = option;

  handler({ key, value });
};

const handleInputChange = handler => (e) => {
  const { name, value } = e.target;

  handler({ key: name, value });
};

const handleIssueDateChange = handler => ({ value }) => {
  const key = 'issueDate';

  handler({ key, value });
};

const handleRadioChange = handler => (e) => {
  const { name, value } = e.target;

  handler({ key: name, value: value === 'true' });
};

const InvoiceServiceOptions = (props) => {
  const {
    contactOptions,
    contactId,
    number,
    address,
    orderNumber,
    issueDate,
    expiredDate,
    expirationTerm,
    expirationDays,
    taxInclusive,
    expirationTermOptions,
    notes,
    onUpdateHeaderOptions,
    isCreating,
  } = props;

  return (
    <Fragment>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="contactId"
        hideLabel={false}
        disabled={!isCreating}
      />
      <Input name="number" label="Invoice number" value={number} onChange={handleInputChange(onUpdateHeaderOptions)} />
      <Input
        name="orderNumber"
        label="Purchase order"
        value={orderNumber}
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={20}
      />
      <span className={styles.address}>{address}</span>
      <DatePicker
        label="Date of issue"
        name="issueDate"
        value={issueDate}
        onSelect={handleIssueDateChange(onUpdateHeaderOptions)}
      />
      <div className="form-group">
        <InputLabel label="Amounts are" id="isTaxInclusive" />
        <div>
          <RadioButton
            name="taxInclusive"
            label="Tax inclusive"
            value="true"
            checked={taxInclusive}
            onChange={handleRadioChange(onUpdateHeaderOptions)}
          />
          <RadioButton
            name="taxInclusive"
            label="Tax exclusive"
            value="false"
            checked={!taxInclusive}
            onChange={handleRadioChange(onUpdateHeaderOptions)}
          />
        </div>
      </div>
      <Select name="expirationTerm" label="Expiration terms" value={expirationTerm} onChange={handleInputChange(onUpdateHeaderOptions)}>
        {expirationTermOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Input name="expirationDays" label="Expiration days" value={expirationDays} onChange={handleInputChange(onUpdateHeaderOptions)} type="number" />
      <Input name="expiredDate" label="Expired date" value={expiredDate} disabled />
      <TextArea
        value={notes}
        resize="vertical"
        name="notes"
        label="Notes to customer"
        onChange={handleInputChange(onUpdateHeaderOptions)}
        maxLength={255}
      />
    </Fragment>
  );
};

InvoiceServiceOptions.propTypes = {
  contactId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  orderNumber: PropTypes.string.isRequired,
  issueDate: PropTypes.string.isRequired,
  taxInclusive: PropTypes.bool.isRequired,
  expirationTerm: PropTypes.string.isRequired,
  expirationDays: PropTypes.string.isRequired,
  expiredDate: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  expirationTermOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  contactOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

const mapStateToProps = state => getInvoiceOptions(state);

export default connect(mapStateToProps)(InvoiceServiceOptions);
