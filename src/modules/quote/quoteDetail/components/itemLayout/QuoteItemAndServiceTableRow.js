import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions,
  getIsCalculating,
  getIsJobComboboxDisabled,
  getIsReadOnly,
  getItemOptions,
  getQuoteLine,
  getTaxCodeOptions,
} from '../../selectors/QuoteDetailSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../../components/Calculator/Calculator';
import ItemCombobox from '../../../../../components/combobox/ItemCombobox';
import JobCombobox from '../../../../../components/combobox/JobCombobox';
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
    allocatedAccountId,
    unitOfMeasure,
    units,
    unitPrice,
    discount,
    amount,
    jobId,
    taxCodeId,
    lineJobOptions,
  },
  itemOptions,
  taxCodeOptions,
  accountOptions,
  onChange,
  isCalculating,
  isReadOnly,
  onTableRowAmountInputBlur,
  onAddItemButtonClick,
  onAddAccountButtonClick,
  onAddJob,
  isQuoteJobColumnEnabled,
  isJobComboboxDisabled,
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
        <QuoteTableReadOnlyRowItem value={amount} />
        {isQuoteJobColumnEnabled && <QuoteTableReadOnlyRowItem />}
        <QuoteTableReadOnlyRowItem />
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
      <ItemCombobox
        addNewItem={() =>
          onAddItemButtonClick(onComboboxChange('itemId', onChange))
        }
        items={itemOptions}
        selectedId={itemId}
        onChange={onComboboxChange('itemId', onChange)}
        label="Item number"
        name="itemId"
        disabled={isCalculating || isReadOnly}
      />
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
        onChange={onComboboxChange('allocatedAccountId', onChange)}
        items={accountOptions}
        selectedId={allocatedAccountId}
        addNewAccount={() =>
          onAddAccountButtonClick(
            onComboboxChange('allocatedAccountId', onChange)
          )
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
      {isQuoteJobColumnEnabled && (
        <JobCombobox
          items={lineJobOptions}
          selectedId={jobId}
          onChange={onComboboxChange('jobId', onChange)}
          addNewJob={() => onAddJob(onComboboxChange('jobId', onChange))}
          disabled={isJobComboboxDisabled || isCalculating || isReadOnly}
          allowClear
          left
        />
      )}
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isCalculating || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
  itemOptions: getItemOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  accountOptions: getAccountOptions(state),
  isCalculating: getIsCalculating(state),
  isReadOnly: getIsReadOnly(state),
  isJobComboboxDisabled: getIsJobComboboxDisabled(state),
});

export default connect(mapStateToProps)(QuoteItemAndServiceTableRow);
