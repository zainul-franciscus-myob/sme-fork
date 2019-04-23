import {
  DatePicker, Input, InputLabel, RadioButton, Select, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getQuoteOptions } from '../ServiceQuoteSelectors';
import CustomerCombobox from '../../../components/combobox/CustomerCombobox';
import styles from './ServiceQuoteOptions.css';

const onComboBoxChange = handler => (option) => {
  const key = 'customerId';
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

const ServiceQuoteOptions = (props) => {
  const {
    customerOptions,
    customerId,
    quoteNumber,
    address,
    purchaseOrderNumber,
    issueDate,
    expiredDate,
    expirationTerm,
    expirationDays,
    taxInclusive,
    expirationTermOptions,
    notesToCustomer,
    onUpdateHeaderOptions,
    isCreating,
  } = props;

  return (
    <Fragment>
      <CustomerCombobox
        items={customerOptions}
        selectedId={customerId}
        onChange={onComboBoxChange(onUpdateHeaderOptions)}
        label="Customer"
        name="customerId"
        hideLabel={false}
        disabled={!isCreating}
      />
      <Input name="quoteNumber" label="Quote number" value={quoteNumber} onChange={handleInputChange(onUpdateHeaderOptions)} />
      <Input name="purchaseOrderNumber" label="Purchase order" value={purchaseOrderNumber} onChange={handleInputChange(onUpdateHeaderOptions)} />
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
      <Select name="expirationTerm" label="Expiration term" value={expirationTerm} onChange={handleInputChange(onUpdateHeaderOptions)}>
        {expirationTermOptions.map(({ name, value }) => (
          <Select.Option key={value} value={value} label={name} />
        ))}
      </Select>
      <Input name="expirationDays" label="Expiration days" value={expirationDays} onChange={handleInputChange(onUpdateHeaderOptions)} type="number" />
      <Input name="expiredDate" label="Expired date" value={expiredDate} disabled />
      <TextArea
        value={notesToCustomer}
        resize="vertical"
        name="notesToCustomer"
        label="Notes to customer"
        onChange={handleInputChange(onUpdateHeaderOptions)}
      />
    </Fragment>
  );
};

ServiceQuoteOptions.propTypes = {
  customerId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  quoteNumber: PropTypes.string.isRequired,
  purchaseOrderNumber: PropTypes.string.isRequired,
  issueDate: PropTypes.string.isRequired,
  taxInclusive: PropTypes.bool.isRequired,
  expirationTerm: PropTypes.string.isRequired,
  expirationDays: PropTypes.string.isRequired,
  expiredDate: PropTypes.string.isRequired,
  notesToCustomer: PropTypes.string.isRequired,
  expirationTermOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  customerOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

const mapStateToProps = state => getQuoteOptions(state);

export default connect(mapStateToProps)(ServiceQuoteOptions);
