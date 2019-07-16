import {
  Checkbox, Columns, DatePicker, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getBillPaymentOptions } from '../BillPaymentDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import ContactCombobox from '../../../components/combobox/ContactCombobox';
import styles from './BillPaymentDetailOptions.module.css';

const onCheckBoxChange = handler => (
  { target: { name: key, checked: value } },
) => handler({ key, value });

const onTextFieldChange = handler => ({ target: { name: key, value } }) => handler({ key, value });

const onComboBoxChange = handler => key => item => handler({ key, value: item.id });

const onDateChange = handler => key => ({ value }) => handler({ key, value });

const BillPaymentOptions = (props) => {
  const {
    suppliers,
    supplierId,
    accounts,
    accountId,
    description,
    referenceId,
    onUpdateHeaderOption,
    showPaidBills,
    date,
    shouldDisableFields,
  } = props;

  return (
    <Columns type="three">
      <ContactCombobox
        disabled={shouldDisableFields}
        items={suppliers}
        selectedId={supplierId}
        onChange={onComboBoxChange(onUpdateHeaderOption)('supplierId')}
        label="Supplier"
        name="Supplier"
        hideLabel={false}
        hintText="Select supplier"
      />

      <AccountCombobox
        label="Pay from"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        onChange={onComboBoxChange(onUpdateHeaderOption)('accountId')}
      />

      <TextArea
        name="description"
        label="Description"
        resize="vertical"
        value={description}
        onChange={onTextFieldChange(onUpdateHeaderOption)}
      />

      <Input
        name="referenceId"
        label="Reference"
        value={referenceId}
        onChange={onTextFieldChange(onUpdateHeaderOption)}
      />

      <DatePicker
        label="Date"
        name="Date"
        value={date}
        onSelect={onDateChange(onUpdateHeaderOption)('date')}
      />

      <div className="form-group">
        <div className={styles.checkbox}>
          <Checkbox
            disabled={shouldDisableFields}
            name="showPaidBills"
            label="Show paid bills"
            checked={showPaidBills}
            onChange={onCheckBoxChange(onUpdateHeaderOption)}
          />
        </div>
      </div>
    </Columns>
  );
};

const mapStateToProps = state => getBillPaymentOptions(state);

BillPaymentOptions.propTypes = {
  suppliers: PropTypes.arrayOf(PropTypes.shape({
    contactType: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    displayId: PropTypes.string,
  })).isRequired,
  supplierId: PropTypes.string.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    displayName: PropTypes.string,
    accountType: PropTypes.string,
    taxCodeId: PropTypes.string,
    displayId: PropTypes.string,
  })).isRequired,
  accountId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  showPaidBills: PropTypes.bool.isRequired,
  onUpdateHeaderOption: PropTypes.func.isRequired,
  shouldDisableFields: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(BillPaymentOptions);
