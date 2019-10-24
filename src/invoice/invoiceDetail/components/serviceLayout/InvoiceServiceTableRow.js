import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceLine } from '../../selectors/serviceLayoutSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const handleOnComboboxChange = (handler, name) => item => handler({
  target: {
    name,
    value: item.id,
  },
});


const InvoiceServiceTableRow = ({
  invoiceLine,
  index,
  onChange,
  onComboboxChange,
  onAmountInputFieldChange,
  onRowInputBlur,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountOptions,
    allocatedAccountId,
    taxCodeOptions,
    taxCodeId,
    amount,
  } = invoiceLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <Input
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        maxLength={255}
      />
      <AccountCombobox
        label="Account"
        hideLabel
        onChange={handleOnComboboxChange(onComboboxChange, 'allocatedAccountId')}
        items={accountOptions}
        selectedId={allocatedAccountId}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={handleOnComboboxChange(onComboboxChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        textAlign="right"
        onChange={onAmountInputFieldChange}
        onBlur={onRowInputBlur}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
