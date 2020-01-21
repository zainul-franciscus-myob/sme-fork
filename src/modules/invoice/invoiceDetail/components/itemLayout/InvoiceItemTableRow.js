import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getInvoiceLine,
  getIsSubmitting,
  getItemOptions,
  getTaxCodeOptions,
} from '../../selectors/invoiceDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../../../components/combobox/ItemCombobox';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

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
        disabled={isSubmitting}
      />

      <TextArea
        name="description"
        autoSize
        value={invoiceLine.description}
        onChange={onChange}
        disabled={isSubmitting}
      />

      <AccountCombobox
        label="accountId"
        hideLabel
        onChange={onChangeAccountId}
        items={accountOptions}
        selectedId={invoiceLine.accountId}
        addNewAccount={() => onAddAccount(
          onChangeAccountId,
        )}
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
  itemOptions: getItemOptions(state),
  accountOptions: getAccountOptions(state),
});

export default connect(mapStateToProps)(InvoiceItemTableRow);
