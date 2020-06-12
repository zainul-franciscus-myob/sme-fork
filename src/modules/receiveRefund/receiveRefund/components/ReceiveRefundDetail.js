import {
  DatePicker, DetailHeader, Input, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getContactOptions, getIsCreating, getRefund,
} from '../receiveRefundSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import CustomerCombobox from '../../../../components/combobox/CustomerCombobox';

const onInputChange = handler => (e) => {
  const { value, name } = e.target;
  handler({ key: name, value });
};

const handleDateChange = (handler, key) => ({ value }) => {
  handler({ key, value });
};

const handleAmountChange = handler => (e) => {
  const { name, rawValue } = e.target;
  handler({ key: name, value: rawValue });
};

const handleAccountComboboxChange = (handler, key) => (item) => {
  handler({ key, value: item.id });
};

const ReceiveRefundDetail = (props) => {
  const {
    isCreating,
    refund,
    contactOptions,
    accountOptions,
    onRefundDetailsChange,
  } = props;

  const {
    referenceId,
    date,
    contactId,
    accountId,
    amount,
    description,
  } = refund;

  const requiredLabel = isCreating ? 'This is required' : undefined;

  const primary = (
    <>
      <CustomerCombobox
        items={contactOptions}
        selectedId={contactId}
        label="Supplier"
        name="supplier"
        hideLabel={false}
        disabled
      />
      <AccountCombobox
        label="Bank account"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={handleAccountComboboxChange(onRefundDetailsChange, 'accountId')}
        requiredLabel={requiredLabel}
        disabled={!isCreating}
      />
      <AmountInput
        label="Refund amount ($)"
        name="amount"
        value={amount}
        onChange={handleAmountChange(onRefundDetailsChange)}
        requiredLabel={requiredLabel}
        textAlign="right"
        disabled={!isCreating}
        width="sm"
      />
      <TextArea
        name="description"
        label="Description of transaction"
        autoSize
        resize="vertical"
        maxLength={255}
        value={description}
        onChange={onInputChange(onRefundDetailsChange)}
        disabled={!isCreating}
        rows={1}
      />
    </>
  );

  const secondary = (
    <>
      <Input
        name="referenceId"
        label="Reference number"
        value={referenceId}
        onChange={onInputChange(onRefundDetailsChange)}
        maxLength={13}
        requiredLabel={requiredLabel}
        disabled={!isCreating}
      />
      <DatePicker
        name="date"
        label="Date"
        value={date}
        onSelect={handleDateChange(onRefundDetailsChange, 'date')}
        requiredLabel={requiredLabel}
        disabled={!isCreating}
      />

    </>
  );

  return <DetailHeader primary={primary} secondary={secondary} />;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  refund: getRefund(state),
  contactOptions: getContactOptions(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(ReceiveRefundDetail);
