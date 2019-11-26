import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccountOptions, getTaxCodeOptions } from '../../selectors/invoiceDetailSelectors';
import { getInvoiceLine, getIsAccountComboboxDisabled } from '../../selectors/serviceLayoutSelectors';
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
  accountOptions,
  taxCodeOptions,
  index,
  onChange,
  onComboboxChange,
  onAmountInputFieldChange,
  onRowInputBlur,
  onAddAccount,
  isAccountComboboxDisabled,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountId,
    taxCodeId,
    amount,
  } = invoiceLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <TextArea
        name="description"
        autoSize
        value={description}
        onChange={onChange}
      />
      <AccountCombobox
        label="Account"
        hideLabel
        onChange={handleOnComboboxChange(onComboboxChange, 'accountId')}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() => onAddAccount(
          handleOnComboboxChange(onComboboxChange, 'accountId'),
        )}
        disabled={isAccountComboboxDisabled}
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
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={handleOnComboboxChange(onComboboxChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isAccountComboboxDisabled: getIsAccountComboboxDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
