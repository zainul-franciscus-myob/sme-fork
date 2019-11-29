import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsNewLine,
  getIsServiceLine,
  getIsSubmitting,
  getItemOptions,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../../components/combobox/ItemCombobox';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';

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

const InvoiceItemTableRow = ({
  index,
  onChange,
  invoiceLine,
  taxCodeOptions,
  accountOptions,
  itemOptions,
  isSubmitting,
  isNewLine,
  isServiceLine,
  onUpdateAmount,
  onAddItemButtonClick,
  onAddAccount,
  ...feelixInjectedProps
}) => {
  const onChangeAccountId = onComboboxChange('accountId', onChange);
  const onChangeItemId = onComboboxChange('itemId', onChange);

  return (
    <LineItemTable.Row {...feelixInjectedProps} id={index} index={index}>
      <ItemCombobox
        addNewItem={() => onAddItemButtonClick(onChangeItemId)}
        name="itemId"
        items={itemOptions}
        selectedId={invoiceLine.itemId}
        onChange={onChangeItemId}
        disabled={isSubmitting || isServiceLine}
      />

      <TextArea
        name="description"
        autoSize
        value={invoiceLine.description}
        onChange={onChange}
        disabled={isSubmitting || isNewLine}
      />

      <AccountCombobox
        label="Account"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={invoiceLine.accountId}
        addNewAccount={() => onAddAccount(
          onChangeAccountId,
        )}
        disabled={isSubmitting}
      />

      <AmountInput
        name="units"
        value={invoiceLine.units}
        onChange={onAmountInputChange('units', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'units')}
        disabled={isSubmitting || isNewLine || isServiceLine}
        decimalScale={6}
      />

      <AmountInput
        name="unitPrice"
        value={invoiceLine.unitPrice}
        onChange={onAmountInputChange('unitPrice', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'unitPrice')}
        textAlign="right"
        disabled={isSubmitting || isNewLine || isServiceLine}
        decimalScale={6}
      />

      <AmountInput
        name="discount"
        value={invoiceLine.displayDiscount}
        onChange={onAmountInputChange('discount', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'discount')}
        textAlign="right"
        disabled={isSubmitting || isNewLine || isServiceLine}
      />

      <AmountInput
        name="amount"
        value={invoiceLine.displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onInputBlur(onUpdateAmount, index, 'amount')}
        textAlign="right"
        disabled={isSubmitting || isNewLine}
      />

      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={invoiceLine.taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSubmitting || isNewLine}
        left
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
  isSubmitting: getIsSubmitting(state),
  itemOptions: getItemOptions(state),
  isServiceLine: getIsServiceLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isNewLine: getIsNewLine(state, props),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
