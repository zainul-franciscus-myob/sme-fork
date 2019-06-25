import {
  DatePicker, Input, ReadOnly, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccounts, getIsCreating, getRefund } from '../receiveRefundSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import FormCard from '../../../components/FormCard/FormCard';

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
    accounts,
    onRefundDetailsChange,
  } = props;

  const {
    referenceId,
    date,
    contactName,
    accountId,
    accountName,
    amount,
    description,
  } = refund;

  const createView = (
    <FormCard>
      <ReadOnly name="contactName" label="Supplier">{contactName}</ReadOnly>
      <AccountCombobox
        label="Account"
        hideLabel={false}
        items={accounts}
        selectedId={accountId}
        onChange={handleAccountComboboxChange(onRefundDetailsChange, 'accountId')}
      />
      <AmountInput label="Amount" name="amount" value={amount} onChange={handleAmountChange(onRefundDetailsChange)} />
      <TextArea
        name="description"
        label="Description"
        autoSize
        resize="vertical"
        maxLength={255}
        value={description}
        onChange={onInputChange(onRefundDetailsChange)}
      />
      <Input name="referenceId" label="Reference" value={referenceId} onChange={onInputChange(onRefundDetailsChange)} />
      <DatePicker name="date" label="Date" value={date} onSelect={handleDateChange(onRefundDetailsChange, 'date')} />
    </FormCard>
  );

  const readonlyView = (
    <FormCard>
      <ReadOnly name="contactName" label="Supplier">{contactName}</ReadOnly>
      <ReadOnly name="account" label="Account">{accountName}</ReadOnly>
      <ReadOnly name="amount" label="Amount">{amount}</ReadOnly>
      <ReadOnly name="description" label="Description">{description}</ReadOnly>
      <ReadOnly name="referenceId" label="Reference">{referenceId}</ReadOnly>
      <ReadOnly name="date" label="Date">{date}</ReadOnly>
    </FormCard>
  );

  return isCreating ? createView : readonlyView;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  refund: getRefund(state),
  accounts: getAccounts(state),
});

export default connect(mapStateToProps)(ReceiveRefundDetail);
