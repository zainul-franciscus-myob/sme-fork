import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceLine,
  getIsSubmitting,
  getSelectedAccount,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountAutoComplete from '../../../../components/AutoComplete/AccountAutoComplete';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onAutoCompleteChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item,
    },
  });
};

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onInputBlur = (handler, index, key) => () => handler({ index, key });

const InvoiceServiceTableRow = ({
  invoiceLine,
  taxCodeOptions,
  index,
  isSubmitting,
  selectedAccount,
  onChange,
  onUpdateAmount,
  onAddAccount,
  onLoadAccounts,
  ...feelixInjectedProps
}) => {
  const {
    description,
    taxCodeId,
    displayAmount,
  } = invoiceLine;

  const onChangeAccountId = onAutoCompleteChange('accountId', onChange);

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
        disabled={isSubmitting}
      />
      <AccountAutoComplete
        label="accountId"
        hideLabel
        onChange={onChangeAccountId}
        onLoad={onLoadAccounts}
        selectedItem={selectedAccount}
        addNewAccount={() => onAddAccount(
          onChangeAccountId,
        )}
        disabled={isSubmitting}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={displayAmount}
        textAlign="right"
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'amount')}
        disabled={isSubmitting}
      />
      <TaxCodeCombobox
        label="Tax code"
        hideLabel
        onChange={onComboboxChange('taxCodeId', onChange)}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isSubmitting}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  isSubmitting: getIsSubmitting(state),
  selectedAccount: getSelectedAccount(state, props),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
