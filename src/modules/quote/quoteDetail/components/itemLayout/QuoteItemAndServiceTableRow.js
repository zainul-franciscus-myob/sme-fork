import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsCalculating,
  getIsReadOnly,
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import QuoteLineType from '../../QuoteLineType';
import QuoteTableReadOnlyRowItem from '../QuoteTableReadOnlyRowItem';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const handleAutoCompleteItemChange = (handler, name) => (item) =>
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });

const handleAmountInputChange = (handler) => (e) =>
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  });

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler(index, key, value);
};

const QuoteItemAndServiceTableRow = ({
  index,
  quoteLine: {
    type,
    itemId,
    description,
    accountId,
    unitOfMeasure,
    units,
    unitPrice,
    discount,
    amount,
    displayAmount,
    jobId,
    taxCodeId,
  },
  taxCodeOptions,
  accountOptions,
  onChange,
  isCalculating,
  isReadOnly,
  renderItemCombobox,
  onTableRowAmountInputBlur,
  onAddAccountButtonClick,
  onAddJob,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
  ...feelixInjectedProps
}) => {
  if ([QuoteLineType.HEADER, QuoteLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem value={description} />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem />
        <QuoteTableReadOnlyRowItem value={displayAmount} />
        <QuoteTableReadOnlyRowItem />
        {isShowIsTaxInclusiveAndTaxCodeColumn && <QuoteTableReadOnlyRowItem />}
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row
      {...feelixInjectedProps}
      id={index}
      index={index}
      onRemove={isCalculating ? undefined : feelixInjectedProps.onRemove}
    >
      {renderItemCombobox({
        name: 'itemId',
        label: 'Item Id',
        hideLabel: true,
        selectedId: itemId,
        disabled: isCalculating || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'itemId'),
      })}
      <TextArea
        name="description"
        label="Item name"
        value={description}
        onChange={onChange}
        disabled={isCalculating || isReadOnly}
        autoSize
        maxLength={1000}
      />
      <AccountCombobox
        label="Allocate to"
        onChange={onComboboxChange('accountId', onChange)}
        items={accountOptions}
        selectedId={accountId}
        addNewAccount={() =>
          onAddAccountButtonClick(onComboboxChange('accountId', onChange))
        }
        disabled={isCalculating || isReadOnly}
      />
      <Input
        name="unitOfMeasure"
        label="Unit"
        value={unitOfMeasure}
        onChange={onChange}
        disabled={isCalculating || isReadOnly}
        maxLength={5}
      />
      <Calculator
        name="units"
        label="No of units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        label="Unit price"
        hideLabel
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        label="Discount"
        hideLabel
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      <Calculator
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onTableRowAmountInputBlur, index)}
        textAlign="right"
        disabled={isCalculating || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isCalculating || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      {isShowIsTaxInclusiveAndTaxCodeColumn && (
        <TaxCodeCombobox
          items={taxCodeOptions}
          selectedId={taxCodeId}
          onChange={onComboboxChange('taxCodeId', onChange)}
          disabled={isCalculating || isReadOnly}
        />
      )}
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isCalculating: getIsCalculating(state),
  isReadOnly: getIsReadOnly(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTableRow);
