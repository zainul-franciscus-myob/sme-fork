import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getInvoiceLine,
  getIsSubmitting,
  getSelectedAccount,
  getSelectedItem,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountAutoComplete from '../../../../components/AutoComplete/AccountAutoComplete';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemAutoComplete from '../../../../components/AutoComplete/ItemAutoComplete';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const onAutoCompleteChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item,
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

const InvoiceItemTableRow = ({
  index,
  onChange,
  invoiceLine,
  taxCodeOptions,
  selectedItem,
  isSubmitting,
  selectedAccount,
  onUpdateAmount,
  onAddItemButtonClick,
  onAddAccount,
  onLoadAccounts,
  onLoadItems,
  ...feelixInjectedProps
}) => {
  const onChangeAccountId = onAutoCompleteChange('accountId', onChange);
  const onChangeItemId = onAutoCompleteChange('itemId', onChange);

  return (
    <LineItemTable.Row {...feelixInjectedProps} id={index} index={index}>
      <ItemAutoComplete
        label="itemId"
        hideLabel
        onChange={onChangeItemId}
        onLoad={onLoadItems}
        selectedItem={selectedItem}
        addNewItem={() => onAddItemButtonClick(onChangeItemId)}
        disabled={isSubmitting}
      />

      <TextArea
        name="description"
        autoSize
        value={invoiceLine.description}
        onChange={onChange}
        disabled={isSubmitting}
      />

      <AccountAutoComplete
        label="accountId"
        hideLabel
        onChange={onChangeAccountId}
        onLoad={onLoadAccounts}
        selectedItem={selectedAccount}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
        disabled={isSubmitting}
      />

      <Input
        name="unitOfMeasure"
        value={invoiceLine.unitOfMeasure}
        onChange={onChange}
        disabled={isSubmitting}
        maxLength={5}
      />

      <AmountInput
        name="units"
        value={invoiceLine.units}
        onChange={onAmountInputChange('units', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'units')}
        disabled={isSubmitting}
        decimalScale={6}
      />

      <AmountInput
        name="unitPrice"
        value={invoiceLine.unitPrice}
        onChange={onAmountInputChange('unitPrice', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'unitPrice')}
        textAlign="right"
        disabled={isSubmitting}
        decimalScale={6}
      />

      <AmountInput
        name="discount"
        value={invoiceLine.displayDiscount}
        onChange={onAmountInputChange('discount', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'discount')}
        textAlign="right"
        disabled={isSubmitting}
      />

      <AmountInput
        name="amount"
        value={invoiceLine.displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'amount')}
        textAlign="right"
        disabled={isSubmitting}
      />

      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={invoiceLine.taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting}
        left
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  isSubmitting: getIsSubmitting(state),
  taxCodeOptions: getTaxCodeOptions(state),
  selectedAccount: getSelectedAccount(state, props),
  selectedItem: getSelectedItem(state, props),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
